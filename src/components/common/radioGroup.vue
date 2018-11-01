<template>
  <div class="radio-group">
    <div v-for="item in data">
      <input :id="item.id" type="radio"
        :name="name"
        :value="item.value"
        :checked="checkedVal==item.value"
        @click="setChecked(item.value)">
      <label :for="item.id">{{item.label}}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "name"],
  data() {
    return {
      checkedVal: -1,
    };
  },
  methods: {
    setChecked(val) {
      this.checkedVal = val;
      this.$emit('input', val);
    },
  }
};
</script>

<style scoped>
.radio-group {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}
.radio-group > div {
  margin-right: 3rem;
  line-height: 2rem;
}
.radio-group > div:nth-last-child(1) {
  margin-right: 0.625rem;
}
.radio-group label {
  position: relative;
  left: 0.625rem;
  width: 3rem;
  font-family: PingFangSC-Regular;
  font-size: 1rem;
  color: #7C7C7C;
  letter-spacing: 0;
}
.radio-group label::after {
  position: absolute;
  top: 0;
  left: -1.75rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 1.25rem;
  height: 1.25rem;
  content: "";
  border: 1px solid #7c7c7c;
  border-radius: 50%;
  background: #fff;
}
.radio-group input {
  visibility: hidden;
}
.radio-group input:checked + label {
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: #3F3F3F;
}
.radio-group input:checked + label::after {
  border: none;
  background-image: url("../../assets/img/xuanze@2x.png");
  background-size: 1.25rem 1.25rem;
}
</style>