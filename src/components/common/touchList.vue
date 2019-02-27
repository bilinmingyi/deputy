<template>
  <div class="touch-list-box">
    <ul>
      <li
        :class="['list-item', {'slide-right': activeItem == index}]"
        v-for="(item, index) in data"
      >
        <div
          class="list-box"
          @touchstart.capture="touchStart"
          @touchend.capture="touchEnd(index, $event)"
          @click="skip(index)"
        >
          <slot :prop="item" :index="index"></slot>
        </div>
        <button class="delete-btn" @click.stop="deleteItem">删除</button>
      </li>
    </ul>
    <div class="no_data" v-if="data.length!=undefined && data.length==0 && noDataTips">暂无信息</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    canDelete: {
      type: Boolean,
      default: true
    },
    noDataTips: {
      type: Boolean,
      default: true
    },
    relativeActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeItem: -1,
      startX: 0,
      endX: 0
    };
  },
  created() {},
  computed: {
    getkey() {
      return this.mykey;
    }
  },
  watch: {
    relativeActive(newVal) {
      if (newVal) {
        this.restSlide();
      }
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
      if (!this.canDelete) {
        return;
      }
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(index, e) {
      if (!this.canDelete) {
        return;
      }
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑
      if (this.startX - this.endX > 100) {
        this.restSlide();
        this.activeItem = index;
        this.$emit("active");
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
      this.$emit("reset");
    },
    //删除
    deleteItem(e) {
      // 当前索引
      let index = this.activeItem;
      // 复位
      this.activeItem = -1;
      // 删除
      this.$emit("delete", index);
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

.touch-list-box ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.touch-list-box .list-item {
  position: relative;
  min-height: 2.75rem;
  margin-bottom: 0.625rem;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  transform: translate3d(0, 0, 0);
}

.touch-list-box ul .list-item:nth-last-child(1) {
  margin-bottom: 0;
}

.touch-list-box .list-item.slide-right {
  transform: translate3d(-6rem, 0, 0);
}

.touch-list-box .list-box {
  border: 1px solid #08bac6;
  border-radius: 0.25rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
}

.touch-list-box .list-item .delete-btn {
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

.touch-list-box .no_data {
  color: #8c8c8c;
  text-align: center;
  font-size: 0.94rem;
  padding: 0.7825rem 0;
}

.touch-list-box .list-content {
  flex: 1;
  display: flex;
  min-height: 100%;
  align-items: stretch;
  font-family: PingFangSC-Regular;
  font-size: 15px;
  color: #3f3f3f;
  letter-spacing: 0;
}

.touch-list-box .list-content-index {
  min-width: 36px;
  background: rgba(235, 248, 249, 1);
  border-radius: 4px 0px 0px 4px;
  border-right: 1px solid rgba(8, 186, 198, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.touch-list-box .list-content-detail {
  flex: 1;
  padding: 8px 12px;
  line-height: 25px;
}
</style>
