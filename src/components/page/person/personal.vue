<template>
  <div>
    <d-header :isCanBack="false">
      个人中心
    </d-header>
    <section class="person_content">
      <img v-if="avatar!==''" :src="avatar"/>
      <img v-else class="person_portrait" src="../../../assets/img/ndb.png">
      <div class="person_infor">
        <div>
          <span class="person_name">{{name}}</span>
          <span class="person_age">{{birthday|birthToYear}}岁</span>
        </div>
        <div class="person_id">帐号ID：{{id}}</div>
      </div>
      <div>
        <router-link to="/personal/changeInfor">
          <img class="person_change" src="../../../assets/img/fanghui@2x.png"/>
        </router-link>
      </div>
    </section>
    <section class="person_list">
      <ul>
        <router-link to="/personal/myAchievement">
          <li>
            <img src="../../../assets/img/yj.png">
            <span> 我的业绩</span>
          </li>
        </router-link>

        <hr class="full-screen-hr">
        <router-link to="/personal/myTeam">
          <li>
            <img src="../../../assets/img/td.png">
            我的团队
          </li>
        </router-link>

        <hr class="full-screen-hr">
        <router-link to="/personal/teamAchievement">
          <li>
            <img src="../../../assets/img/tdyj.png">
            团队业绩
          </li>
        </router-link>
      </ul>
      <hr class="full-screen-hr">
    </section>
    <d-footer :activeItem="3"></d-footer>
  </div>
</template>

<script>
import dHeader from "@/components/common/dHeader.vue";
import dFooter from "@/components/common/dFooter.vue";

export default {
  name: "personal",
  components: {
    "d-header": dHeader,
    "d-footer": dFooter
  },
  data(){
    return {
      name:"",
      id:"",
      avatar:"",
      birthday:""
    }
  },
  filters:{
    birthToYear(val){
      var today=new Date();
      return Number(today.getFullYear())-Number(new Date(Number(val)).getFullYear());
    }
  },
  created(){
    this.getPerson();
  },
  methods:{
    getPerson(){
      var self=this;
      this.axios.post("/apis/weixin/sales/info").then(
        (respone) => {
          var res=respone.data;
          if(res.code==1000){
            console.log(this)
            self.name=res.data.name;
            self.id=res.data.id;
            self.avatar=res.data.avatar;
            self.birthday=res.data.birthday;
          }else {
            alert(res.msg)
          }
        }
      ).catch(
        function (error) {
          console.log(error)
        }
      )
    }
  }
};
</script>

<style scoped>
.person_content {
  margin-top: 2.75rem;
  background: #ffffff;
  display: flex;
  padding: 1.375rem 1.25rem;
  align-items: center;
  margin-bottom: 0.78rem;
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

.person_change {
  height: 1.25rem;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  padding-left: 0.5rem;
}

.person_list {
  background: #ffffff;
  font-size: 1rem;
}

.person_list ul {
  padding-left: 0.94rem;
  padding-right: 0.94rem;
}

.person_list li {
  display: flex;
  padding: 0.815rem 0 0.78rem;
  color: #3f3f3f;
}

.person_list li img {
  height: 1.25rem;
  margin-right: 0.5rem;
}
</style>
