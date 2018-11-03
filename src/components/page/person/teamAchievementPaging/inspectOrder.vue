<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  activated() {
    console.log(3);
  }
};
</script>

<style scoped>
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
.width-80 {
  width: 5rem;
}
.f12 {
  font-size: 0.75rem !important;
}
</style>