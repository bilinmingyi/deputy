<template>
  <div>
    <d-header>检验录单</d-header>
    <section class="content">
      <info-header>患者信息</info-header>
      <div class="bg-fff pl15 pr15 mb12">
        <div class="pay_line_two">
          <span class="pr16">所属医生</span>
          <select class="doctor_select">
            <option value="">请选择所属医生</option>
            <option>刁医生</option>
          </select>
        </div>
        <hr class="full-screen-hr">
        <div class="pay_line_two">
          <span class="pr16">患者姓名</span>
          <span>王尼玛</span>
        </div>
        <hr class="full-screen-hr">
        <div class="pay_line_two">
          <span class="pr16">患者电话</span>
          <span>15876789544</span>
        </div>
        <hr class="full-screen-hr">
        <div class="pay_line_two">
          <span class="pr16">患者性别</span>
          <span>
            <d-radio :name="'sex'" :id="'sex-man'" :checkedVal=1 :curVal="1">男</d-radio>
            <d-radio :name="'sex'" :id="'sex-woman'" :checkedVal=2>女</d-radio>
            <d-radio :name="'sex'" :id="'sex-no'" :checkedVal=0>保密</d-radio>
          </span>
        </div>
        <hr class="full-screen-hr">
        <div class="pay_line_two">
          <span class="pr16">患者年龄</span>
          <div>
            <input type="number" class="patient_age" />岁
            <input type="number" class="patient_age" />月
          </div>
        </div>
      </div>
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
            <d-radio :name="'pay-type'" :id="'pay-type-yb'" :checkedVal=4 :curVal="checkedPayType"
                     @change="checkedPayType=4">微信
            </d-radio>
          </div>
          <div>
            <d-radio :name="'pay-type'" :id="'pay-type-yhk'" :checkedVal=5 :curVal="checkedPayType"
                     @change="checkedPayType=5">支付宝
            </d-radio>
          </div>
          <div>
            <d-radio :name="'pay-type'" :id="'pay-type-qf'" :checkedVal=6 :curVal="checkedPayType"
                     @change="checkedPayType=6">欠费处理
            </d-radio>
          </div>
        </div>
      </div>
      <div class="payment">
        <span>备注</span>
        <input type="text" placeholder="请输入备注" style="border: none;outline: none">
      </div>
      <div class="pay_operation">
        <button>关闭</button>
        <button>取消订单</button>
        <button>提交</button>
      </div>
    </section>
  </div>
</template>

<script>
  import dHeader from "@/components/common/dHeader.vue";
  import infoHeader from "@/components/common/infoHeader";
  import dRadio from "@/components/common/dRadio";
  import touchList from "@/components/common/touchList";

  export default {
    name: "newOrderPage",
    components: {
      dHeader,
      infoHeader,
      dRadio,
      touchList
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

  .pay_line .pay_money {
    color: #EB6262 !important;
    font-weight: bold;
  }

  .pay_type_block {
    display: flex;
  }

  .pay_type_block div {
    flex: 1;
  }

  .pay_line_two {
    font-size: 1rem;
    color: #3F3F3F;
    padding: 0.78rem 0;
    display: flex;
  }

  .doctor_select {
    border: none;
    outline: none;
    font-size: 1rem;
    color: #7C7C7C;
    flex: 1;
  }
  .pay_line_two >>> .d-radio{
    margin-right: 1.5rem;
  }
  .patient_age{
    border: none;
    width: 2rem;
    outline: none;
    text-align: center;
    font-size: 1rem;
    color: #3C3C3C;
  }

</style>
