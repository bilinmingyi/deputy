<template>
  <div class="main">
    <d-header :cb="!showSeries" @click="judgeStatus">检验项目</d-header>
    <d-search @on-search="getData" placeholder="请输入检验项目名称"></d-search>
    <section class="content">
      <div class="project-box p15">
        <ul v-if="showSeries">
          <li v-for="item in seriesList" @click.stop="getData(item, 'detail')">
            {{item}}
          </li>
        </ul>
        <ul v-else>
          <li v-for="item in dataList" @click.stop="addProject(item)"
            :class="[{'active_li':checkAddMed(item)},
            {'checkset-li': item.dy_checks},
            {'active_set_li': item.dy_checks && checkAddMed(item)}]">
            {{item.name}}（{{item.trade_price}}元）
          </li>
        </ul>
      </div>
    </section>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
  import dHeader from "@/components/common/dHeader";
  import dSearch from "@/components/common/dSearch";
  import {mapState, mapActions} from 'vuex'
  import dLoad from "@/components/common/dLoad";
  export default {
    components: {
      dHeader,
      dSearch,
      dLoad
    },
    data() {
      return {
        showLoad: false,
        activePage: 1,
        dataList: [],
        timer: "",
        showSeries: true,
        seriesList: [],
        scrollTop: 0
      };
    },
    computed: {
      ...mapState('newCheckOrder', {
        preItems: state => state.prescription.items,
        contains: state => state.prescription.contains,
        clinicId: state => state.clinic.clinicId
      })
    },
    watch: {
      preItems: {
        deep: true,
        handler(newVal, oldVal) {
          var allPrice = 0;
          newVal.forEach(item => {
            allPrice += Number(item.trade_price);
          })
          this.set_price(allPrice)
        }
      }
    },
    created(){
      this.getData(" ", "default");
    },
    methods: {
      ...mapActions('newCheckOrder', [
        'push_checkItem',
        'push_contain',
        'set_price'
      ]),
      getData(name,type) {
        var url = "", params = {};
        this.showLoad = true;
        if (type == "default" || name === '') {
          url = "/stockmng/dyCheck/category";
        } else if (type == "detail") {
          url = "/weixin/sales/dyCheckAndSet/list";
          params = { category: name, need_checks: 1, clinic_id: this.clinicId};
          this.scrollTop = document.documentElement.scrollTop;
        } else {
          url = "/weixin/sales/dyCheckAndSet/list";
          params = {
            query: name,
            need_checks: 1,
            clinic_id: this.clinicId
          }
          this.scrollTop = document.documentElement.scrollTop;
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.axios.post(url, params).then((respone) => {
            let res = respone.data;
            if (res.code == 1000) {
              if (type == "default" || name === '') {          
                this.showSeries = true;
                document.documentElement.scrollTop = this.scrollTop;
                this.seriesList = res.data;
              } else {
                this.showSeries = false;
                document.documentElement.scrollTop = 0;
                let data = res.data;
                this.dataList = data.dy_checkset_list.concat(
                  data.dy_check_list
                );
              }
            } else {
              this.$Message.infor(res.msg)
            }
          }).catch((error) => {
            console.log(error)
          }).then(() => {
            this.showLoad = false;
          });
        }, 150);

      },
      changeTab(type) {
        this.activePage = type;
        this.$nextTick(() => {
          document.querySelector('#dsearch').value="";
        });
        this.dataList = [];
        this.getData(' ',true);
      },
      addProject(item) {
        this.activePage  = item.dy_checks ? 2 : 1;
        if (this.checkItemAdd(item)) {
          this.$Message.infor("已存在项目或者项目部分");
          return
        }
        this.push_checkItem({
          ...item,
          "type": this.activePage
        })
        this.updateItem();
      },
      updateItem(){
          this.showLoad = true;
          var list = [];
          this.preItems.forEach(item => {
            if (item.type === 1) {
              list.push(item.specimen_container_code)
            } else if (item.type === 2) {
              item.dy_checks.forEach(check => {
                list.push(check.specimen_container_code)
              })
            }
          })
          if (list.length === 0) {
           this.$router.go(-1);
          } else {
            this.axios.post("/stockmng/specimenContainer/list", {
              codes: list
            }).then(respone => {
              const res = respone.data;
              const selectContains = JSON.parse(JSON.stringify(this.contains));

              if (res.code === 1000) {
                res.data.forEach(item => {
                  for (var i = 0; i < selectContains.length; i++) {
                    if (selectContains[i].code === item.code) {
                      break
                    }
                  }
                  if (i === selectContains.length) {
                    this.push_contain({
                      num: 1,
                      memo: '',
                      code: item.code,
                      id: item.id,
                      name: item.name,
                      barCode: ''
                    })
                  }
                })
                this.$router.go(-1);
              } else {
                this.$Message.infor(res.msg);
              }
            }).catch(error => {
              console.log(error)
            }).then(() => { this.showLoad = false; })
          }

      },
      checkItemAdd(item) {
        var list = [];
        this.preItems.forEach(item => {
          if (item.type === 1) {
            list.push(item.id)
          } else if (item.type === 2) {
            item.dy_checks.forEach(check => {
              list.push(check.id)
            })
          }
        });
        if (this.activePage === 1) {
          for (var i = 0; i < list.length; i++) {
            if (item.id === list[i]) {
              return true;
            }
          }
          return false
        } else if (this.activePage === 2) {
          for (var j = 0; j < item.dy_checks.length; j++) {
            for (var i = 0; i < list.length; i++) {
              if (item.dy_checks[j].id === list[i]) {
                return true
              }
            }
          }
          return false
        }

      },
      checkAddMed(item) {
        let id = item.id;
        for (var i = 0; i < this.preItems.length; i++) {
          if (this.preItems[i].id === id && this.preItems[i].type === (item.dy_checks ? 2 : 1)) {
            return true
          }
        }
        return false
      },
      judgeStatus() {
        this.showSeries = true;
        setTimeout(() => {
          document.documentElement.scrollTop = this.scrollTop;
        })
      }
    }
  };
</script>

<style scoped>
  .nav_block {
    position: fixed;
    top: 44px;
    width: 100%;
    z-index: 999;
  }

  .nav_list {
    display: flex;
    line-height: 3rem;
    height: 3rem;
    background: #fafafa;
    font-size: 1rem;
    color: #7c7c7c;
  }

  .nav_list li {
    flex: 1;
    text-align: center;
  }

  .nav_list .active {
    background: #ffffff;
    font-size: 1rem;
    color: #08bac6;
    font-weight: bold;
    border-bottom: 2px solid #08bac6;
  }

  .main >>> .block-fix {
    top: 2.75rem;
  }

  .content {
    position: relative;
    top: 6rem;
  }

  .project-box {
    background: #fff;
  }

  .project-box ul {
    display: flex;
    flex-wrap: wrap;
  }

  .project-box ul li {
    min-height: 2.75rem;
    min-width: 100%;
    padding: 0 0.5rem;
    margin-bottom: 0.625rem;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem;
    flex: 1;
    background: #ebf8f9;
    border: 1px solid #08bac6;
    border-radius: 0.25rem;
  }

  .project-box ul .active_li {
    background: #08bac6;
    color: #FFFFFF;
  }
  
  .project-box ul .checkset-li {
    background: #FFFEF2;
    border: 1px solid #EEAE1D;
    border-radius: 0.25rem;
  }

  .project-box ul .active_set_li {
    background: #EEAE1D;
    color: #ffffff;
  }
</style>
