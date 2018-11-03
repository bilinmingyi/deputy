<template>
  <div :class="['d-timer', {'border': !noBorder}]">
    <div class="fast_block">
        <button :class="{'cur': curBtn == 1}">今日</button>
        <button :class="{'cur': curBtn == 2}">昨日</button>
        <button :class="{'cur': curBtn == 3}">本月</button>
        <button :class="{'cur': curBtn == 4}">上月</button>
      </div>
      <div class="input_block">
        <input placeholder="起始日期" type="date" v-model="startDate">
        <input placeholder="结束日期" type="date" v-model="endDate">
        <div>
          <button>查询</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    fastDate: {
      type: Number,
      default: 1
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myFastDate: this.fastDate,
      startDate: "",
      endDate: ""
    };
  },
  created() {},
  computed: {
    curBtn() {
      // TODO:
      return 1;
    },
    startTime() {
      return new Date(this.startDate).getTime();
    },
    endTime() {
      return new Date(this.endDate).getTime() + 86399999;
    }
  },
  methods: {}
};
</script>

<style scoped>
.d-timer {
  background: #ffffff;
  width: 100%;
  z-index: 999;
  position: relative;
}
.d-timer.border::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #d9d9d9;
  transform: scaleY(0.5);
}
.fast_block {
  display: flex;
  width: 100%;
  padding: 0 0.75rem;
}
.fast_block button {
  flex: 1;
  background: #ebf8f9;
  border: 0.0625rem solid #08bac6;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #3f3f3f;
  padding: 0.375rem 0;
  margin: 0.5rem 0.25rem;
}
.input_block {
  display: flex;
  width: 100vw;
  padding: 0.5rem 0.94rem;
}
.input_block input {
  border: 0.0625rem solid #08bac6;
  border-radius: 0.25rem;
  width: calc(50vw - 3.38rem);
  margin-right: 0.565rem;
  text-align: center;
}
.input_block button {
  background: #08bac6;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #ffffff;
  border: none;
  width: 3.75rem;
  padding: 0.375rem 1rem;
  display: block;
}
.d-timer input:focus {
  outline-color: #08bac6;
}
.d-timer .cur {
  border: 1px solid #08bac6;
  background: #08bac6;
  color: #fff;
}
</style>