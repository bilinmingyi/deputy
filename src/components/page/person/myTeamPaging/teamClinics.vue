<template>
  <div class="main">
    <d-search @on-search="getData"></d-search>
    <section class="clinic_content">
      <ul>
        <li v-for="item in clinicList">
          <router-link :to="`/clinic/clinicDetail/${item.id}`">
            <div class="order_infor">
              <div class="order_infor_top">
                <div>{{item.name}}</div>
                <div :class="item.type==1?'bg_4D':'bg_EB'">{{item.type | clinicType}}</div>
              </div>
              <div class="order_infor_bottom">
                地址：{{item.address}}
              </div>
            </div>
            <hr class="full-screen-hr">
          </router-link>
        </li>
      </ul>
      <!-- <div class="add_more">查看更多...</div> -->
    </section>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
import dSearch from "@/components/common/dSearch";
import dLoad from "@/components/common/dLoad";
export default {
  components: {
    dSearch,
    dLoad
  },
  data() {
    return {
      showLoad: false,
      teamId: null,
      clinicList: []
    };
  },
  filters: {
    clinicType: function(val) {
      var list = [{ code: 1, name: "普通诊所" }, { code: 2, name: "淳道诊所" }];
      for (var i = 0; i < list.length; i++) {
        if (list[i].code == val) {
          return list[i].name;
        }
      }
    }
  },
  created() {
    this.teamId = this.$route.query.teamId;
    this.getData();
  },
  methods: {
    getData(name) {
      this.showLoad = true;
      this.axios
        .post("/weixin/salesTeam/clinic/list", {
          sales_channel_id: this.teamId,
          name
        })
        .then(response => {
          let res = response.data;
          if (res.code == 1000) {
            this.clinicList = res.data;
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.showLoad = false;
        });
    }
  }
};
</script>

<style scoped>
.main >>> .block-fix {
  top: 5.75rem;
}
.clinic_content {
  background: #ffffff;
  margin-top: 3rem;
}

.order_infor {
  padding: 0.625rem 1rem;
}

.order_infor_top {
  display: flex;
}

.order_infor_top div:first-child {
  color: #3f3f3f;
  font-size: 1rem;
  font-weight: bolder;
}

.order_infor_top div:last-child {
  font-size: 0.625rem;
  color: #ffffff;
  border-radius: 4px;
  height: 1.25rem;
  line-height: 1.25rem;
  padding: 0 0.25rem;
  margin-left: 0.5rem;
}

.bg_EB {
  background: #eb6262;
}

.bg_ED {
  background: #edab15;
}

.bg_4D {
  background: #4dbc89;
}

.order_infor_bottom {
  margin-top: 0.5rem;
  color: #7c7c7c;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
