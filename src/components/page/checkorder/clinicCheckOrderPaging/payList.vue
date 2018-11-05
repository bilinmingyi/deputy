<template>
    <div>
      <router-link to="/checkListPage/clinicCheckOrderPage/confirmedOrderDetail/1212">
        <div class="order_item">
          <div class="order_item_top">
            <span>李教授</span>
            <span>18/10/01 14:12</span>
          </div>
          <div class="order_item_middle">
            <span>王尼玛</span>
            <span>待确认</span>
          </div>
          <div class="order_item_bottom">
            <span>付款金额：323</span>
          </div>
          <hr class="full-screen-hr">
        </div>
      </router-link>
      <div class="add_more">查看更多...</div>
    </div>
</template>

<script>
    export default {
        name: "payList"
    }
</script>

<style scoped>

</style>
