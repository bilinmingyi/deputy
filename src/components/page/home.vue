<template>
  <div>
    <section class="home_top">

      <router-link class="top_item" to="/cloudListPage">
        <img src="../../assets/img/kf.png">
        <span>检验开方</span>
      </router-link>
      <div class="top_item_line"></div>
      <router-link class="top_item" to="/home/dyCheckConfirmOrderList">
        <img src="../../assets/img/sk.png">
        <span>检验收款</span>
      </router-link>
    </section>
    <section class="home_content">
      <div class="home_content_title">

        <span>待确认检验单</span>
      </div>
      <hr class="full-screen-hr">
      <section class="clinicList">
        <ul>
          <li class="clinic-item" v-for="item in dataList">
            <div class="clinic-item-content">
              <img src="@/assets/img/menzhen.png">
              <div>
                <span>{{item.clinic_name}}</span><br>
                <span class="color-8c">待确认：<span class="red_a">{{item.sum}}</span></span>
              </div>
            </div>
            <router-link :to="{path:`/checkListPage/clinicCheckOrderPage/${item.clinic_id}`, query:{name:`${item.clinic_name}`}}" class="clinic-item-btn">去处理</router-link>
          </li>
          <li class="clinic-none" v-show="dataList.length==0 && isComplete">暂无数据</li>
        </ul>
        <!--<div class="add_more">查看更多...</div>-->
      </section>
    </section>
    <div>
      <!--<img :src="appRoot+'/public/deputy/img/noInfor@2x.png'" class="no_infor">-->
    </div>
    <d-footer :activeItem="1"></d-footer>
  </div>
</template>

<script>
  import dFooter from "@/components/common/dFooter"
  import dSearch from '@/components/common/dSearch.vue'
  export default {
    name: "home",
    components: {
      dFooter,
    },
    data: function () {
      return {
        showLoad: false,
        dataList: [],
        isComplete:false
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData: function (name) {
        var self = this;
        this.showLoad = true;
        self.axios.post("/weixin/sales/dyCheckOrder/num", {
          "query": name
        }).then((respone) => {
          var res = respone.data;
          self.isComplete=true;
          if (res.code == 1000) {
            this.dataList = res.data;
          } else {
            this.$Message.infor(res.msg)
          }
        }).catch(console.log).then(() => this.showLoad = false)
      }
    }
  }
</script>

<style scoped>
  .home_top {
    display: flex;
    justify-content: center;
    background: #fff;
    margin-bottom: 0.75rem;
  }
  .top_item_line{
    border-right: 1px solid #D9D9D9;;
    -webkit-transform: scaleX(0.5);
    -moz-transform: scaleX(0.5);
    -ms-transform: scaleX(0.5);
    -o-transform: scaleX(0.5);
    transform: scaleX(0.5);
  }
  .home_top .top_item {
    flex: 1;
    padding: 1.5rem 0 1.44rem 0;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .home_top .top_item span {
    font-size: 0.875rem;
    color: #3F3F3F;
    padding-top: 0.625rem;
  }

  .home_top .top_item img {
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
    display: inline-block;
  }

  .home_content {
    background: #ffffff;
  }

  .home_content_title {
    font-size: 1rem;
    font-weight: bold;
    color: #3F3F3F;
    padding: 0.815rem 0 0.78rem 0.94rem;
    display: flex;
    align-items: center;
  }

  .home_content_title img {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.375rem;
    margin-left: 0.9375rem;
  }

  .order_infor_top div:first-child {
    flex: 1;
    color: #3F3F3F;
    font-size: 1rem;
    font-weight: bolder;
  }

  .order_infor_top div:last-child {
    font-size: 0.875rem;
    color: #3F3F3F;
    margin-right: 0.5rem;
  }

  .clinicList {
    background: #ffffff;
    margin-bottom: 3.125rem;
  }

  .clinic-item {
    min-height: 5rem;
    width: 100vw;
    padding: 0 0.9375rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 0.9375rem;
    color: #3f3f3f;
    letter-spacing: 0;
    line-height: 1.5rem;
  }
  .clinic-item::after {
    content: "";
    border-bottom: 1px solid #d9d9d9;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    transform: scaleY(0.5);
  }

  .clinic-item:nth-last-child(1)::after {
    border: none;
  }

  .clinic-item-content {
    display: flex;
    align-items: center;
  }

  .clinic-item-content img {
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
  }

  .clinic-item-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 2rem;
    min-width: 3.75rem;
    padding: 0.25rem 0.5rem;
    background: #ebf8f9;
    border: 1px solid #08bac6;
    border-radius: 0.25rem;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgb(90, 61, 61);
    letter-spacing: 0;
  }

  .clinic-none {
    color: #7c7c7c;
    font-size: 0.875rem;
    background: #fafafa;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
  }

  .color-8c {
    color: #8c8c8c;
  }

  .red_a {
    color: #ec6f6f;
  }
</style>
