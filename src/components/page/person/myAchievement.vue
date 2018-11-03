<template>
    <div>
      <d-header>我的业绩</d-header>
      <d-nav class="nav">
        <li :class="{'active': activePage==1}" @click="activePage=1">云药房</li>
        <li :class="{'active': activePage==2}" @click="activePage=2">云处方</li>
        <li :class="{'active': activePage==3}" @click="activePage=3">检验订单</li>
      </d-nav>
      <d-timer class="timer"></d-timer>
      <section class="content" v-if="activePage==1">
        <div class="bg-fff p15 mb12">
          <table class="d-table" data-type="2">
            <tbody>
              <tr>
                <th class="width-100"><div>业绩汇总</div></th>
                <th><div>业绩</div></th>
              </tr>
              <tr>
                <td class="bg-medium">中药饮片</td>
                <td>123</td>
              </tr>
              <tr>
                <td class="bg-medium">颗粒饮片</td>
                <td>456</td>
              </tr>
              <tr>
                <td class="bg-medium">中西成药</td>
                <td>789</td>
              </tr>
              <tr>
                <td class="bg-medium">中药产品</td>
                <td>012</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bg-fff">
          <div class="achi-item">
            <div class="achi-item-title">
              <span>深圳淳道门诊</span>
              <span>业绩<span class="color-ec6464">￥3097</span></span>
            </div>
            <div class="achi-item-content">
              <div>
                <span>￥897</span>
                <span>中药饮片</span>
              </div>
              <div>
                <span>￥897</span>
                <span>颗粒饮片</span>
              </div>
              <div>
                <span>￥897</span>
                <span>中成西药</span>
              </div>
              <div>
                <span>￥897</span>
                <span>中药产品</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="content" v-if="activePage==2">
        <div class="bg-fff p15 mb12">
          <table class="d-table" data-type="2">
            <tbody>
              <tr>
                <th class="width-100"><div>业绩汇总</div></th>
                <th><div>业绩</div></th>
              </tr>
              <tr>
                <td class="bg-medium">中药饮片</td>
                <td>123</td>
              </tr>
              <tr>
                <td class="bg-medium">颗粒饮片</td>
                <td>456</td>
              </tr>
              <tr>
                <td class="bg-medium">中西成药</td>
                <td>789</td>
              </tr>
              <tr>
                <td class="bg-medium">中药产品</td>
                <td>012</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bg-fff">
          <div class="achi-item">
            <div class="achi-item-title">
              <span>深圳淳道门诊</span>
              <span>业绩<span class="color-ec6464">￥3097</span></span>
            </div>
            <div class="achi-item-content">
              <div>
                <span>￥897</span>
                <span>中药饮片</span>
              </div>
              <div>
                <span>￥897</span>
                <span>颗粒饮片</span>
              </div>
              <div>
                <span>￥897</span>
                <span>中成西药</span>
              </div>
              <div>
                <span>￥897</span>
                <span>中药产品</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="content" v-if="activePage==3">
        <div class="content-title pl15 pr15">
          <span class="mr8">业绩总汇</span><span class="color-ec6464">￥44654</span>
        </div>
        <div class="bg-fff pl15 pr15 pb12 mb12">
          <table class="d-table" data-type="2">
            <tbody>
              <tr>
                <th class="width-80"><div>序号</div></th>
                <th><div>诊所名称</div></th>
                <th><div>业绩</div></th>
              </tr>
              <tr>
                <td class="bg-medium">1</td>
                <td class="f12">深圳淳道门诊</td>
                <td>123</td>
              </tr>
              <tr>
                <td class="bg-medium">2</td>
                <td>深圳淳道门诊</td>
                <td>456</td>
              </tr>
              <tr>
                <td class="bg-medium">3</td>
                <td>深圳淳道门诊</td>
                <td>789</td>
              </tr>
              <tr>
                <td class="bg-medium">4</td>
                <td>深圳淳道门诊</td>
                <td>012</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
</template>

<script>
import dHeader from "@/components/common/dHeader";
import dNav from "@/components/common/dNav";
import dTimer from "@/components/common/dTimer";
export default {
  components: {
    dHeader,
    dNav,
    dTimer
  },
  data() {
    return {
      activePage: 1
    };
  }
};
</script>

<style scoped>
:root .nav {
  position: fixed;
  margin-top: 2.75rem;
}
:root .timer {
  position: fixed;
  top: 5.75rem;
}
.content {
  position: relative;
  top: 11.75rem;
}
.content-title {
  background: #fff;
  min-height: 2.75rem;
  font-family: PingFangSC-Medium;
  font-size: 1rem;
  line-height: 3rem;
  font-weight: 700;
  color: #3f3f3f;
  letter-spacing: 0;
  text-align: left;
}
.f12 {
  font-size: 0.75rem !important;
}
.width-80 {
  width: 5rem;
}
.width-100 {
  width: 6.25rem;
}
.achi-item {
  padding: 0.4rem 0.9375rem;
  position: relative;
}
.achi-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #d9d9d9;
  transform: scaleY(0.5);
}
.achi-item-title {
  display: flex;
  justify-content: space-between;
  font-family: PingFangSC-Medium;
  font-size: 1rem;
  color: #3f3f3f;
  letter-spacing: 0;
  line-height: 1.5rem;
  font-weight: 700;
}
.achi-item-content {
  display: flex;
  flex-wrap: wrap;
  line-height: 1.25rem;
}
.achi-item-content > * {
  padding: 0.25rem 0;
  min-width: 25%;
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #7c7c7c;
  letter-spacing: 0;
}
.achi-item-content > * > * {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
