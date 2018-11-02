<template>
  <div>
    <d-header>订单详情</d-header>
    <section class="content">
      <info-bar :title="'患者详情'">
        <div>
          <span>就诊时间：</span>
          <span>{{order.time}}</span>
        </div>
        <div>
          <span>患者姓名：</span>
          <span>{{order.patientName}}</span>
        </div>
        <div>
          <span>联系电话：</span>
          <span>{{order.mobile}}</span>
        </div>
        <div>
          <span>就诊医生：</span>
          <span>{{order.doctor}}</span>
        </div>
      </info-bar>
      <info-header>处方信息</info-header>
      <div class="bg-fff p15 mb12">
        <touch-list :data="touchListData">
          <div slot-scope="{prop}">
            <span>{{prop.name}}</span>
          </div>
        </touch-list>
      </div>
      <info-header>
        条码信息
        <button slot="btn">编辑条码</button>
      </info-header>
      <div class="bg-fff p15 mb12">

      </div>
      <info-header>上传图片</info-header>
      <div class="bg-fff p15 mb12 upload_img_block">
        <div class="add_img">+</div>
        <div class="add_img">+</div>
        <div class="add_img">+</div>
        <div class="add_img_title">最多可上传3张照片</div>
      </div>


      <info-header>支付信息</info-header>
      <div class="bg-fff pl15 pr15 mb12">
        <div class="pay_line">
          <span>订单金额</span>
          <span class="pay_money">￥566</span>
        </div>
        <hr class="full-screen-hr">
        <div class="pay_line">
          <span>支付方式</span>
          <span>微信</span>
        </div>
        <hr class="full-screen-hr">
        <div class="pay_line pay_type_block">
          <div>
            <d-radio :name="'pay-type'" :id="'pay-type-yb'" :checkedVal=4 :curVal="checkedPayType" @change="checkedPayType=4">微信</d-radio>
          </div>
          <div>
            <d-radio :name="'pay-type'" :id="'pay-type-yhk'" :checkedVal=5 :curVal="checkedPayType" @change="checkedPayType=5">支付宝</d-radio>
          </div>
          <div>
            <d-radio :name="'pay-type'" :id="'pay-type-qf'" :checkedVal=6 :curVal="checkedPayType" @change="checkedPayType=6">欠费处理</d-radio>
          </div>
        </div>
      </div>

      <div class="payment">
        <span>备注</span>
        <input type="text" placeholder="请输入备注" style="border: none;outline: none">
      </div>
      <div class="pay_operation">
        <button>关闭</button>
        <button>给诊所退款</button>
        <button>确认</button>
      </div>
    </section>

  </div>
</template>

<script>
  import dHeader from "@/components/common/dHeader.vue"
  import infoBar from "@/components/common/infoBar";
  import infoHeader from "@/components/common/infoHeader";
  import touchList from "@/components/common/touchList";
  import dRadio from "@/components/common/dRadio";

  export default {
    name: "confirmedOrderDetail",
    components: {
      dHeader,
      infoBar,
      infoHeader,
      touchList,
      dRadio
    },
    data() {
      return {
        order: {
          time: "2018-12-23 22:26",
          patientName: "王尼玛",
          mobile: "13245678901",
          doctor: "李教授"
        },
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
        checkedPayType: 4,
        payType: [
          {
            id: 'pay-type-wx',
            value: 1,
            label: '微信',
          },
          {
            id: 'pay-type-zfb',
            value: 2,
            label: '支付宝',
          },
          {
            id: 'pay-type-xj',
            value: 3,
            label: '现金',
          }
        ],
        counter: 0,
      };
    }
  }
</script>

<style scoped>
  .content {
    min-height: calc(100vh - 2.75rem);
    width: 100vw;
    margin: 2.75rem 0 0 0;
  }

  .payment {
    background: #FFFFFF;
    color: #3F3F3F;
    font-size: 1rem;
    padding: 0.78rem 0.94rem;
    margin-bottom: 4.25rem;
    display: flex;
  }

  .payment input {
    font-size: 1rem;
    padding: 0 1rem;
    flex: 1;
  }

  .pay_line {
    font-size: 1rem;
    color: #7C7C7C;
    padding: 0.78rem 0;
  }

  .pay_line span:nth-child(2) {
    color: #3F3F3F;
    padding-left: 1rem;
  }
  .pay_line .pay_money{
    color: #EB6262!important;
    font-weight: bold;
  }
  .pay_type_block{
    display: flex;
  }
  .pay_type_block div{
    flex: 1;
  }

</style>
