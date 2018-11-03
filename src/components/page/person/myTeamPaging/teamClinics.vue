<template>
  <div class="main">
    <d-search @on-search="getData"></d-search>
    <section class="clinic_content">
      <ul>
        <router-link to="/clinic/clinicDetail/117">
          <li>
            <div class="order_infor">
              <div class="order_infor_top">
                <div>采购订单下单</div>
                <div class="bg_EB">综合诊所</div>
              </div>
              <div class="order_infor_bottom">
                深圳淳道门诊：这是消息这是消息这是消这是消息消息这是消息这是消息这是消这是消息消息
              </div>
            </div>
            <hr class="full-screen-hr">
          </li>
        </router-link>
        <router-link to="/clinic/clinicDetail/118">
          <li>
            <div class="order_infor">
              <div class="order_infor_top">
                <div>采购订单下单</div>
                <div class="bg_ED">西医诊所</div>
              </div>
              <div class="order_infor_bottom">
                深圳淳道门诊：这是消息这是消息这是消这是消息消息这是消息这是消息这是消这是消息消息
              </div>
            </div>
            <hr class="full-screen-hr">
          </li>
        </router-link>
        <router-link to="/clinic/clinicDetail/119">
          <li>
            <div class="order_infor">
              <div class="order_infor_top">
                <div>采购订单下单</div>
                <div class="bg_4D">西医诊所</div>
              </div>
              <div class="order_infor_bottom">
                深圳淳道门诊：这是消息这是消息这是消这是消息消息这是消息这是消息这是消这是消息消息
              </div>
            </div>
            <hr class="full-screen-hr">
          </li>
        </router-link>
        <router-link to="/clinic/clinicDetail/117">
          <li>
            <div class="order_infor">
              <div class="order_infor_top">
                <div>采购订单下单</div>
                <div class="bg_EB">综合诊所</div>
              </div>
              <div class="order_infor_bottom">
                深圳淳道门诊：这是消息这是消息这是消这是消息消息这是消息这是消息这是消这是消息消息
              </div>
            </div>
            <hr class="full-screen-hr">
          </li>
        </router-link>
        <router-link to="/clinic/clinicDetail/118">
          <li>
            <div class="order_infor">
              <div class="order_infor_top">
                <div>采购订单下单</div>
                <div class="bg_ED">西医诊所</div>
              </div>
              <div class="order_infor_bottom">
                深圳淳道门诊：这是消息这是消息这是消这是消息消息这是消息这是消息这是消这是消息消息
              </div>
            </div>
            <hr class="full-screen-hr">
          </li>
        </router-link>
        <router-link to="/clinic/clinicDetail/119">
          <li>
            <div class="order_infor">
              <div class="order_infor_top">
                <div>采购订单下单</div>
                <div class="bg_4D">西医诊所</div>
              </div>
              <div class="order_infor_bottom">
                深圳淳道门诊：这是消息这是消息这是消这是消息消息这是消息这是消息这是消这是消息消息
              </div>
            </div>
            <hr class="full-screen-hr">
          </li>
        </router-link>
        <router-link to="/clinic/clinicDetail/117">
          <li>
            <div class="order_infor">
              <div class="order_infor_top">
                <div>采购订单下单</div>
                <div class="bg_EB">综合诊所</div>
              </div>
              <div class="order_infor_bottom">
                深圳淳道门诊：这是消息这是消息这是消这是消息消息这是消息这是消息这是消这是消息消息
              </div>
            </div>
            <hr class="full-screen-hr">
          </li>
        </router-link>
        <router-link to="/clinic/clinicDetail/118">
          <li>
            <div class="order_infor">
              <div class="order_infor_top">
                <div>采购订单下单</div>
                <div class="bg_ED">西医诊所</div>
              </div>
              <div class="order_infor_bottom">
                深圳淳道门诊：这是消息这是消息这是消这是消息消息这是消息这是消息这是消这是消息消息
              </div>
            </div>
            <hr class="full-screen-hr">
          </li>
        </router-link>
        <router-link to="/clinic/clinicDetail/119">
          <li>
            <div class="order_infor">
              <div class="order_infor_top">
                <div>采购订单下单</div>
                <div class="bg_4D">西医诊所</div>
              </div>
              <div class="order_infor_bottom">
                深圳淳道门诊：这是消息这是消息这是消这是消息消息这是消息这是消息这是消这是消息消息
              </div>
            </div>
            <hr class="full-screen-hr">
          </li>
        </router-link>
      </ul>
      <div class="add_more">查看更多...</div>
    </section>
  </div>
</template>

<script>
import dSearch from "@/components/common/dSearch";
export default {
  components: {
    dSearch
  },
  data() {
    return {};
  },
  activated() {
    console.log(2);
  },
  methods: {
    getData() {
      console.log(name);
    }
  }
};
</script>

<style scoped>
.main >>> .block-fix {
  top: 5.75rem;
}
.clinic_content {
  background: #ffffff;
  margin-top: 3rem;
}

.order_infor {
  padding: 0.625rem 1rem;
}

.order_infor_top {
  display: flex;
}

.order_infor_top div:first-child {
  color: #3f3f3f;
  font-size: 1rem;
  font-weight: bolder;
}

.order_infor_top div:last-child {
  font-size: 0.625rem;
  color: #ffffff;
  border-radius: 4px;
  height: 1.25rem;
  line-height: 1.25rem;
  padding: 0 0.25rem;
  margin-left: 0.5rem;
}

.bg_EB {
  background: #eb6262;
}

.bg_ED {
  background: #edab15;
}

.bg_4D {
  background: #4dbc89;
}

.order_infor_bottom {
  margin-top: 0.5rem;
  color: #7c7c7c;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>