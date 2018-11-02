<template>
  <div class="counter">
    <img src="@/assets/img/jia@2x.png" class="add" v-on:click="$emit('input', myNum < max ? ++myNum : myNum)">
    <input type="number" @input="$emit('input', Number(myNum))" v-model="myNum">
    <img src="@/assets/img/jian@2x.png" class="sub" v-on:click="$emit('input', myNum > min ? --myNum : myNum)">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    }
  },
  data() {
    return {
      myNum: this.value
    };
  },
  watch: {
    myNum(newVal) {
      if (newVal < this.min) {
        this.myNum = this.min;
      } else if (newVal > this.max) {
        this.myNum = this.max
      }
    }
  }
};
</script>

<style scoped>
.counter {
  display: flex;
}
.counter img {
  width: 2.75rem;
  height: 2.75rem;
}
.counter input {
  border: 1px solid #08bac6;
  border-radius: 0.25rem;
  text-align: center;
  font-family: PingFangSC-Light;
  font-size: 1rem;
  color: #8c8c8c;
  letter-spacing: 0;
  margin: 0 0.75rem;
  width: 5rem;
  flex: 1;
}
.counter input:focus {
  outline-color: #08bac6;
}
</style>