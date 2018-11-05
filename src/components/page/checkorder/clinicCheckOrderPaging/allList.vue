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
        name: "allList"
    }
</script>

<style scoped>

  .order_item {
    background: #FFFFFF;
    font-size: 0.94rem;
    color: #7C7C7C;
  }

  .order_item_top {
    color: #3F3F3F;
    display: flex;
    padding: 0.625rem 0.94rem 0.25rem;
  }

  .order_item_top span:first-child {
    flex: 1;
    font-weight: bold;
  }

  .order_item_top span:last-child {
    font-size: 0.875rem;
  }

  .order_item_middle {
    display: flex;
    padding: 0 0.94rem 0.25rem;
  }

  .order_item_middle span:first-child {
    flex: 1;
  }

  .order_item_middle span:last-child {
    color: #EB6262;
  }

  .order_item_bottom {
    padding: 0 0.94rem 0.625rem;
  }
</style>
