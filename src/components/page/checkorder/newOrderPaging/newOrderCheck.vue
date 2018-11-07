<template>
  <div>
    <info-header>
      检验项目
      <button slot="btn">添加项目</button>
    </info-header>
    <div class="bg-fff p15 mb12">
      <touch-list :data="touchListData">
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

  export default {
    name: "orderCheck",
    components: {
      infoHeader,
      touchList
    },
    data(){
      return {
        touchListData: [
          {
            name: "甲功三项",
            age: 12
          },
          {
            name: "血常规",
            age: 34
          },
          {
            name: "肾功能常规",
            age: 56
          }
        ],
      }
    }
  }
</script>

<style scoped>

</style>
