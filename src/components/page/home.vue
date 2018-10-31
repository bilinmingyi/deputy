<template>
    <div>
      <section class="home_top">
        <div class="top_item">
          <img src="../../assets/img/yf.png">
          <span>云药房订单</span>
        </div>
        <div class="top_item">
          <img src="../../assets/img/yf.png">
          <span>云药房订单</span>
        </div>
        <div class="top_item">
          <img src="../../assets/img/yf.png">
          <span>云药房订单</span>
        </div>
      </section>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>
  .home_top{
    display: flex;
    justify-content: center;
  }
  .home_top .top_item{
    flex: 1;
    padding: 16px 0 18px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .home_top .top_item span{
    font-size: 14px;
    color: #3F3F3F;
    padding-top: 10px;
  }
  .home_top .top_item img{
    width: 36px;
    height: 36px;
    margin: 0 auto;
    display: inline-block;
  }
</style>
