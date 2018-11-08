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
      <touch-list :data="preItems" @delete="deleteCheckItem">
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
        preItems: state => state.prescription.items,
        contains: state => state.prescription.contains
      })
    },
    methods: {
      ...mapActions('newCheckOrder', [
        'delete_checkItem',
        'delete_contain',
        'clear_contain'
      ]),
      deleteCheckItem(index) {
        this.delete_checkItem(index);
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
        if(list.length===0){
          this.clear_contain();
        }
        this.axios.post("/apis/stockmng/specimenContainer/list", {
          codes: list
        }).then(respone => {
          const res = respone.data;
          const selectContains = JSON.parse(JSON.stringify(this.contains));

          if (res.code === 1000) {
            const resData = res.data;
            if (selectContains.length !== res.data.length) {
              selectContains.forEach((contain,index) => {
                for (var i=0;i<resData.length;i++){
                  if(resData[i].code===contain.code){
                    break
                  }
                }
                if(i===resData.length){
                  this.delete_contain(index)
                }
              })
            }
          } else {
            this.$Message.infor(res.msg);
          }
        })

      }
    }
  }
</script>

<style scoped>

</style>
