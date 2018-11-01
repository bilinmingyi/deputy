<template>
<div class="touch-list-box">
  <ul>
    <li :class="['list-item', {'slide-right': activeItem == index}]" v-for='(item, index) in data'>
      <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd(index, $event)" @click="skip(index)">
        <slot :prop="item"></slot>
      </div>
      <button class="delete-btn" @click.stop='deleteItem'>删除</button>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      activeItem: -1,
      startX: 0,
      endX: 0
    };
  },
  computed: {
    getkey() {
      return this.mykey;
    }
  },
  methods: {
    //跳转
    skip(index) {
      if (this.activeItem >= 0) {
        this.restSlide();
      } else {
        console.log(this.data[index]);
      }
    },
    //滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(index, e) {
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑
      if (this.startX - this.endX > 100) {
        this.restSlide();
        this.activeItem = index;
      }
      // 右滑
      if (this.startX - this.endX < -100) {
        this.restSlide();
        this.activeItem = -1;
      }
      this.startX = 0;
      this.endX = 0;
    },
    //复位滑动状态
    restSlide() {
      this.activeItem = -1;
    },
    //删除
    deleteItem(e) {
      // 当前索引
      let index = this.activeItem;
      // 复位
      this.activeItem = -1;
      // 删除
      this.data.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.touch-list-box {
  width: 100%;
  overflow: hidden;
  background: #fff;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
.list-item {
  position: relative;
  min-height: 2.75rem;
  margin-bottom: 0.625rem;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  transform: translate3d(0, 0, 0);
}
ul .list-item:nth-last-child(1) {
  margin-bottom: 0;
}
.list-item.slide-right {
  transform: translate3d(-6rem, 0, 0);
}
.list-box {
  border: 1px solid #08BAC6;
  border-radius: 0.25rem;
  padding: 0.2rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.list-item .delete-btn {
  width: 5rem;
  margin-left: 1rem;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  background: rgba(235, 98, 98, 1);
  font-family: PingFangSC-Regular;
  font-size: 1rem;
  font-weight: 400;
  line-height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: -6rem;
}
</style>