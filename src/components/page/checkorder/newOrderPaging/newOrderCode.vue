<template>
  <div>
    <info-header>
      条码信息
      <button slot="btn">
        <router-link to="/checkListPage/newOrderPage/editBarCode" style="color:#3f3f3f;">
          编辑条码
        </router-link>
      </button>
    </info-header>
    <div class="bg-fff p15 mb12">
      <ul>
        <li class="list-item" v-for="contain in contains">{{contain.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import infoHeader from "@/components/common/infoHeader";
  import {mapState} from 'vuex'

  export default {
    name: "newOrderCode",
    components: {
      infoHeader
    },
    computed: {
      ...mapState('newCheckOrder', {
        contains: state => state.prescription.contains
      })
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .list-item {
    height: 2.75rem;
    line-height: 2.75rem;
    margin-bottom: 0.625rem;
    border: 1px solid #08BAC6;
    border-radius: 0.25rem;
    background: #fff;
    text-align: center;
    font-size: 0.94 rm;
  }

  ul .list-item:nth-last-child(1) {
    margin-bottom: 0;
  }
</style>
