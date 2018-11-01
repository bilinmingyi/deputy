<template>
  <div class="d-radio">
    <input type="radio" :id="id" :name="name" :value="value"
      :checked="checkedVal==value"
      @input="$emit('input', value);">
      <label :for="id"><slot></slot></label>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "value", "checkedVal"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.d-radio {
  display: inline-block; 
  margin-right: 0.625rem;
  line-height: 2rem;
}
.d-radio label {
  position: relative;
  left: 0.625rem;
  width: 3rem;
  font-family: PingFangSC-Regular;
  font-size: 1rem;
  color: #7c7c7c;
  letter-spacing: 0;
}
.d-radio label::after {
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
.d-radio input {
  visibility: hidden;
}
.d-radio input:checked + label {
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: #3f3f3f;
}
.d-radio input:checked + label::after {
  border: none;
  background-image: url("../../assets/img/xuanze@2x.png");
  background-size: 1.25rem 1.25rem;
}
</style>