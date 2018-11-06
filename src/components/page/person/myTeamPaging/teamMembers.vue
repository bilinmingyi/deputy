<template>
  <div>
    <div class="person_content" v-for="item in teamMembers">
      <img class="person_portrait" src="@/assets/img/ndb.png">
      <div class="person_infor" :id="item.id">
        <div>
          <span class="person_name">{{item.contract}}</span>
        </div>
        <div class="person_mobile">联系电话：{{item.phone_num}}</div>
      </div>
    </div>
    <!-- <div class="person_content">
      <img class="person_portrait" src="@/assets/img/nv.png">
      <div class="person_infor">
        <div>
          <span class="person_name">张代表</span>
        </div>
        <div class="person_mobile">联系电话：124343423432</div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamId: null,
      teamMembers: [],
    };
  },
  created() {
    this.teamId = this.$route.query.teamId;
    this.getMembers();
  },
  methods: {
    getMembers() {
      this.axios
        .post("/apis/weixin/salesTeam/list", {
          sales_channel_id: this.teamId
        })
        .then(response => {
          let res = response.data;
          if (res.code == 1000) {
            this.teamMembers = res.data;
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
/* 团队列表项 */
.person_content {
  background: #ffffff;
  display: flex;
  padding: 0.75rem 0.9375rem;
  align-items: center;
  position: relative;
}
.person_content::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #d9d9d9;
  transform: scaleY(0.5);
}
.person_portrait {
  height: 3.5rem;
  width: 3.5rem;
  margin-right: 0.625rem;
}
.person_infor {
  flex: 1;
  font-size: 1rem;
  color: #7c7c7c;
  line-height: 1.5rem;
}
.person_age {
  background: #2cbbf4;
  font-size: 0.75rem;
  color: #ffffff;
  padding: 0.03rem 0.315rem;
  border-radius: 3.125rem;
}
.person_name {
  color: #3f3f3f;
  font-weight: bold;
  margin-right: 0.75rem;
}
.person_id {
  margin-top: 0.5rem;
}
.person_mobile {
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #7c7c7c;
  letter-spacing: 0;
}
</style>
