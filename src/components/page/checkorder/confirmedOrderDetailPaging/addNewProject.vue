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
            {{item.name}} ({{item.trade_price}}元)
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
import { mapState, mapGetters, mapActions } from "vuex";
import dLoad from "@/components/common/dLoad";
export default {
  components: {
    dHeader,
    dSearch,
    dLoad
  },
  props: ["orderSeqno"],
  data() {
    return {
      showLoad: false,
      activePage: 1,
      timer: "",
      dataList: [],
      isFirst: true
    };
  },
  computed: {
    ...mapState("changeCheckOrder", {
      newProjects: state => state.newProjects,
      projects: state => state.order.items_info
    }),
    ...mapGetters("changeCheckOrder", ["curProjects"])
  },
  created(){
    this.getData(' ',true);
  },
  methods: {
    ...mapActions("changeCheckOrder", ["add_project", "clear_newProjectList"]),
    getData(name,defaultList) {
      let url = "",
        params = {};
      if (this.activePage == 1) {
        url = "/stockmng/dyCheck/list";
        params = {
          query: name,
          status: 1
        };
      } else if (this.activePage == 2) {
        url = "/stockmng/dyCheckset/list";
        params = {
          query: name,
          status: 1,
          need_checks: 1
        };
      }
      if(defaultList){
        Object.assign(params,{"page_size":10,"page":1});
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (name === "") {
          this.dataList = [];
          return;
        }
        this.axios
          .post(url, params)
          .then(respone => {
            let res = respone.data;
            if (res.code == 1000) {
              this.dataList = res.data;
            } else {
              this.$Message.infor(res.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }, 150);
    },
    changeTab(type) {
      this.activePage = type;
      this.dataList = [];
      if (this.isFirst) {
        this.isFirst = false;
        this.getData(' ',true);
      }
    },
    addProject(item) {
      if (this.checkAddMed(item.id)) {
        this.$Message.infor("该项目已添加");
        return;
      }
      if (!this.canAdd(item)) {
        return;
      }
      this.add_project({
        project: item,
        type: this.activePage
      });
      this.updateProject()
    },
    checkAddMed(id) {
      let arr1 =
        this.activePage === 1
          ? this.newProjects.check_list
          : this.newProjects.checkset_list;
      let arr2 = this.curProjects;
      return (
        arr1.find(item => item.id === id) ||
        arr2.check_list.find(item => item.item_id === id) ||
        arr2.checkset_list.find(item => item.set_id === id)
      );
    },
    canAdd(item) {
      let arr = this.projects;
      let itemList = item.dy_checks ? item.dy_checks : [item];
      for (let i = 0, len = itemList.length; i < len; i++) {
        let cur = itemList[i];
        for (let j = 0, jLen = arr.length; j < jLen; j++) {
          if (arr[j].item_id === cur.id) {
            if (arr[j].set_id) {
              this.$Message.infor(`该项目与 ${arr[j].set_name} 有重复内容`);
            } else {
              this.$Message.infor(`该项目与 ${arr[j].name} 有重复内容`);
            }
            return false;
          }
        }
      }
      return true;
    },
    updateProject() {
      this.showLoad = true;
      if (
        !this.newProjects.check_list.length &&
        !this.newProjects.checkset_list.length
      ) {
        this.$router.go(-1);
        return;
      }
      const [check, checkSet] = [[], []];
      this.curProjects.check_list.forEach(item => {
        check.push({ cloud_item_id: item.item_id });
      });
      this.curProjects.checkset_list.forEach(item => {
        checkSet.push({ set_id: item.set_id });
      });
      let params = {
        order_seqno: this.orderSeqno,
        check_list: check.concat(
          this.newProjects.check_list.map(item => {
            return {
              cloud_item_id: item.id
            };
          })
        ),
        checkset_list: checkSet.concat(
          this.newProjects.checkset_list.map(item => {
            return {
              set_id: item.id
            };
          })
        )
      };

      this.axios
        .post("/weixin/sales/dyCheckOrder/update", params)
        .then(respone => {
          const res = respone.data;
          if (res.code === 1000) {
            // 更新vuex
            this.clear_newProjectList();
          } else {
            this.$Message.infor(res.msg);
          }
          this.$router.go(-1);
        })
        .catch(console.log)
        .then(() => {
          this.showLoad = false;
        });
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
  color: #ffffff;
}
</style>
