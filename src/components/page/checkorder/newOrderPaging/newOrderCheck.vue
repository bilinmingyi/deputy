<template>
  <div>
    <info-header>
      检验项目
      <button slot="btn">
        <router-link to="/checkListPage/newOrderPage/addNewProject" style="color:#3f3f3f;">
          添加项目
        </router-link>
      </button>
    </info-header>
    <div class="bg-fff p15 mb12">
      <touch-list :data="preItems" @delete="delete_checkItem">
        <div slot-scope="{prop}">
          <span>{{prop.name}}</span>
        </div>
      </touch-list>
    </div>
  </div>
</template>

<script>
  import infoHeader from "@/components/common/infoHeader";
  import touchList from "@/components/common/touchList";
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "orderCheck",
    components: {
      infoHeader,
      touchList
    },
    data() {
      return {
        touchListData: [],
      }
    },
    computed: {
      ...mapState('newCheckOrder', {
        preItems: state => state.prescription.items
      })
    },
    methods: {
      ...mapActions('newCheckOrder', [
        'delete_checkItem'
      ]),
    }
  }
</script>

<style scoped>

</style>
