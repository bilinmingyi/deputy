<template>
    <div>
      <d-header>云处方订单</d-header>
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
        <info-bar :title="'配送地址'">
          <button slot="btn">选择地址</button>
          <div>
            <span>联系人名：</span>
            <span>{{order.time}}</span>
          </div>
          <div>
            <span>联系电话：</span>
            <span>{{order.patientName}}</span>
          </div>
          <div>
            <span>详细地址：</span>
            <span>{{order.mobile}}</span>
          </div>
          <div>
            <span>就诊医生：</span>
            <span>{{order.doctor}}</span>
          </div>
        </info-bar>
        <info-header>处方信息</info-header>
        <div class="bg-fff p16 mb12">
          <table class="d-table" data-type="1">
            <tbody>
              <tr>
                <th>处方类型</th>
                <th>发药类型</th>
                <th>金额</th>
              </tr>
              <tr>
                <td>中药饮片</td>
                <td>云药房</td>
                <td>123</td>
              </tr>
              <tr>
                <td>颗粒饮片</td>
                <td>本机构</td>
                <td>456</td>
              </tr>
              <tr>
                <td>附加服务</td>
                <td>云药房</td>
                <td>789</td>
              </tr>
              <tr>
                <td>中药饮片</td>
                <td>本机构</td>
                <td>012</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bg-fff p15 mb12">
          <table class="d-table" data-type="2">
            <tbody>
              <tr>
                <th><div>处方类型</div></th>
                <th><div>发药类型</div></th>
                <th><div>金额</div></th>
              </tr>
              <tr>
                <td class="bg-medium">中药饮片</td>
                <td>云药房</td>
                <td>123</td>
              </tr>
              <tr>
                <td class="bg-medium">颗粒饮片</td>
                <td>本机构</td>
                <td>456</td>
              </tr>
              <tr>
                <td class="bg-medium">附加服务</td>
                <td>云药房</td>
                <td>789</td>
              </tr>
              <tr>
                <td class="bg-medium">中药饮片</td>
                <td>本机构</td>
                <td>012</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bg-fff p15 mb12">
          <touch-list :data="touchListData">
            <div slot-scope="{prop}">
                <span>{{prop.name}}</span>
            </div>
          </touch-list>  
        </div>
        <div class="bg-fff pl15 pr15 pt12 pb12 mb12">
          <radio-group :name="'pay-type'" :data="payType" v-model="checkedPayType"></radio-group>
        </div>
      </section>
      <!-- <d-footer :activeItem="2"></d-footer> -->
    </div>
</template>

<script>
import dHeader from "@/components/common/dHeader";
import dFooter from "@/components/common/dFooter";
import infoBar from "@/components/common/infoBar";
import infoHeader from "@/components/common/infoHeader";
import touchList from "@/components/common/touchList";
import radioGroup from "@/components/common/radioGroup";
export default {
  components: {
    dHeader,
    dFooter,
    infoBar,
    infoHeader,
    touchList,
    radioGroup,
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
      checkedPayType: 6,
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
    };
  }
};
</script>

<style scoped>
.content {
  min-height: calc(100vh - 2.75rem);
  width: 100vw;
  margin: 2.75rem 0 0 0;
}
</style>
