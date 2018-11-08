<template>
  <div class="main">
    <d-header>检验项目</d-header>
    <div class="nav_block">
      <nav class="nav_list">
        <li :class="{'active': activePage==1}" @click="changeTab(1)">基本项目</li>
        <li :class="{'active': activePage==2}" @click="changeTab(2)">组合项目</li>
      </nav>
      <hr class="full-screen-hr">
    </div>
    <d-search @on-search="getData" placeholder="请输入检验项目名称"></d-search>
    <section class="content">
      <div class="project-box p15">
        <ul>
          <li v-for="item in dataList" @click.stop="addProject(item)" :class="{'active_li':checkAddMed(item.id)}">
            {{item.name}}（{{item.trade_price}}元）
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
  import dHeader from "@/components/common/dHeader";
  import dSearch from "@/components/common/dSearch";
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      dHeader,
      dSearch
    },
    data() {
      return {
        activePage: 1,
        dataList: [],
        timer: ""
      };
    },
    computed: {
      ...mapState('newCheckOrder', {
        preItems: state => state.prescription.items,
        contains: state => state.prescription.contains
      })
    },
    beforeRouteLeave(to, from, next) {
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
      this.axios.post("/apis/stockmng/specimenContainer/list",{
        codes:list
      }).then(respone =>{
        const res=respone.data;
        const selectContains=JSON.parse(JSON.stringify(this.contains));

        if(res.code===1000){
          res.data.forEach(item => {
            for(var i=0;i<selectContains.length;i++){
              if(selectContains[i].code===item.code){
                break
              }
            }
            if(i===selectContains.length){
              this.push_contain({
                num:0,
                memo:'',
                code:item.code,
                id:item.id,
                name:item.name,
                barCode:''
              })
            }
          })
          next();
        }else {
          this.$Message.infor(res.data);
          next(false);
        }
      })
    },
    methods: {
      ...mapActions('newCheckOrder', [
        'push_checkItem',
        'push_contain'
      ]),
      getData(name) {
        var url = "", params = {};
        if (this.activePage == 1) {
          url = "/apis/stockmng/dyCheck/list"
          params = {
            "query": name,
            "status": 1
          }
        } else if (this.activePage == 2) {
          url = "/apis/stockmng/dyCheckset/list"
          params = {
            "query": name,
            "status": 1,
            "need_checks": 1
          }
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          if (name === '') {
            this.dataList = [];
            return
          }
          this.axios.post(url, params).then((respone) => {
            let res = respone.data;
            if (res.code == 1000) {
              this.dataList = res.data;
            } else {
              this.$Message.infor(res.msg)
            }
          }).catch((error) => {
            console.log(error)
          })
        }, 150);

      },
      changeTab(type) {
        this.activePage = type;
        this.dataList = [];
      },
      addProject(item) {
        if (this.checkAddMed(item.id)) {
          this.$Message.infor("该项目已添加")
          return
        }
        this.push_checkItem({
          ...item,
          "type": this.activePage
        })
      },
      checkAddMed(id) {
        for (var i = 0; i < this.preItems.length; i++) {
          if (this.preItems[i].id === id && this.preItems[i].type === this.activePage) {
            return true
          }
        }
        return false
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
    top: calc(44px + 3rem);
  }

  .content {
    position: relative;
    top: calc(44px + 6rem);
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
</style>
