<template>
    <div>
      <d-header>我的团队</d-header>
      <d-nav class="nav">
        <li :class="{'active': activePage==1}" @click="activePage=1">团队成员</li>
        <li :class="{'active': activePage==2}" @click="activePage=2">团队诊所</li>
      </d-nav>
      <section class="content">
        <keep-alive>
          <component v-bind:is="currentTabComponent"></component>
        </keep-alive>
      </section>
    </div>
</template>

<script>
import dHeader from "@/components/common/dHeader";
import dNav from "@/components/common/dNav";
import teamMembers from "./myTeamPaging/teamMembers";
import teamClinics from "./myTeamPaging/teamClinics";
export default {
  components: {
    dHeader,
    dNav,
    teamMembers,
    teamClinics
  },
  data() {
    return {
      activePage: 1,
    };
  },
  computed: {
    currentTabComponent() {
      switch (this.activePage) {
        case 1:
          return "team-members";
          break;
        case 2:
          return "team-clinics";
          break;
        default:
          return "team-members";
          break;
      }
    }
  },
};
</script>

<style scoped>
:root .nav {
  position: fixed;
  margin-top: 2.75rem;
}
.content {
  position: relative;
  top: 5.75rem;
  padding-bottom: 8.75rem;
}
</style>
