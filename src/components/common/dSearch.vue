<template>
  <div class="bg-ff block-fix">
    <div class="search">
      <div class="search_left">
        <img src="../../assets/img/ss.png">
        <input type="text" placeholder="诊所名称" v-model="searchName" @input="searchInput()"/>
      </div>
      <div>
        <button class="search_btn">查询</button>
      </div>
    </div>
    <hr class="full-screen-hr">
  </div>

</template>

<script>
  export default {
    name: "dSearch",
    data:function () {
      return{
        searchName:"",
        timer:""
      }
    },
    methods:{
      searchInput:function () {
        var self=this;
        clearTimeout(self.timer);
        self.timer=setTimeout(function () {
          self.$emit("on-search",self.searchName)
        },300);
      }
    }

  }
</script>

<style scoped>
  .block-fix{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
  }
  .search {
    background: #ffffff;
    display: flex;
    padding: 0.5rem 0.94rem;
  }

  .search_left {
    flex: 1;
    background: #EDEDED;
    border-radius: 0.25rem;
    margin-right: 0.75rem;
    padding: 0.375rem 0.75rem;
    display: flex;
  }

  .search_left img {
    height: 1.25rem;
  }

  .search_left input {
    border: none;
    background: transparent;
    outline: none;
    padding-left: 0.395rem;
  }

  .search_left input::-webkit-input-placeholder {
    font-size: 0.875rem;
    color: #8C8C8C;
  }

  .search_btn {
    background: #08BAC6;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #FFFFFF;
    padding: 0.375rem 1rem;
    border: none;
  }
</style>
