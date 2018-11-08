<template>
    <div class="yo-scroll" :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
      <section class="inner" :style="{ transform: 'translateY('+ top + 'px'}">
        <header class="pull-refresh">
            <slot name="pull-refresh">
                <span class="down-tip">下拉更新</span>
                <span class="up-tip">松开刷新数据</span>
                <span class="refresh-tip">加载中……</span>
            </slot>
        </header>
        <slot>
        </slot>
        <footer class="load-more" v-if="enableInfinite && !this.top && this.state === 0">
          <div class="more-data" v-show="!dataList.noFlag">
            <slot name="load-more">
                <span v-show="downFlag === false">上啦加载更多</span>
                <span v-show="downFlag === true">加载中……</span>
            </slot>
          </div>
          <div class="null-data" v-show="dataList.noFlag">暂无更多数据</div>
        </footer>
      </section>
    </div>
</template>

<script>
export default {
  props: {
    offset: {
      type: Number,
      default: 48 //默认高度
    },
    enableInfinite: {
      type: Boolean,
      default: false
    },
    enableRefresh: {
      type: Boolean,
      default: true
    },
    dataList: {
      default() {
        return {
          noFlag: false,
        }
      },
      required: false
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    }
  },
  data() {
    return {
      top: 0,
      state: 0,
      startX: 0,
      startY: 0,
      touching: false,
      infiniteLoading: false,
      downFlag: false //用来显示是否加载中
    };
  },
  methods: {
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
      this.startX = e.targetTouches[0].pageX;
      this.startScroll = this.$el.scrollTop || 0;
      this.touching = true;

      this.dataList.noFlag = false;
    },
    touchMove(e) {
      if (!this.enableRefresh || this.dataList.noFlag || !this.touching) {
        return;
      }
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
      if (diff > 0) e.preventDefault();
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0);
      if (this.state === 2) {
        // in refreshing
        return;
      }
      if (this.top >= this.offset) {
        this.state = 1;
      } else {
        this.state = 0;
      }
    },
    touchEnd(e) {
      if (!this.enableRefresh) {
        return;
      }
      this.touching = false;
      if (this.state === 2) {
        // in refreshing
        this.state = 2;
        this.top = this.offset;
        return;
      }
      if (this.top >= this.offset) {
        // do refresh
        this.refresh();
      } else {
        // cancel refresh
        this.state = 0;
        this.top = 0;
      }

      //用于判断滑动是否在原地 ----begin
      let endX = e.changedTouches[0].pageX,
        endY = e.changedTouches[0].pageY,
        dy = this.startY - endY,
        dx = endX - this.startX;

      //如果滑动距离太短
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        console.log("滑动距离太短");
        return;
      }

      //--------end--------

      if (!this.enableInfinite || this.infiniteLoading) {
        return;
      }

      let outerHeight = this.$el.clientHeight,
        innerHeight = this.$el.querySelector(".inner").clientHeight,
        scrollTop = this.$el.scrollTop,
        ptrHeight = this.onRefresh
          ? this.$el.querySelector(".pull-refresh").clientHeight
          : 0,
        bottom = innerHeight - outerHeight - scrollTop - ptrHeight;

      console.log(bottom + " __ " + this.offset);

      if (bottom <= this.offset && this.state === 0) {
        this.downFlag = true;
        this.infinite();
      } else {
        this.downFlag = false;
      }
    },
    refresh() {
      this.state = 2;
      this.top = this.offset;
      setTimeout(() => {
        this.onRefresh(this.refreshDone);
      }, 1000);
    },
    refreshDone() {
      this.state = 0;
      this.top = 0;
    },

    infinite() {
      this.infiniteLoading = true;

      setTimeout(() => {
        this.onInfinite(this.infiniteDone);
      }, 2000);
    },

    infiniteDone() {
      this.infiniteLoading = false;
    }
  }
};
</script>

<style scoped>
.yo-scroll {
  position: relative;
  overflow: auto;
  z-index: 100;
  height: auto;
  -webkit-overflow-scrolling: touch;
}
.yo-scroll .inner {
  position: absolute;
  top: -3rem;
  width: 100%;
  height: auto;
  transition-duration: 300ms;
}
.yo-scroll .inner .pull-refresh {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.yo-scroll .inner .load-more {
  height: 5rem;
  line-height: 5rem;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: none;
}
.yo-scroll .inner .null-data,
.yo-scroll .inner .more-data, {
  font-size: 26px;
  color: #999999;
  height: 100px;
  line-height: 80px;
  text-align: center;
}
.yo-scroll .inner .down-tip,
.yo-scroll .inner .refresh-tip,
.yo-scroll .inner .up-tip {
  display: none;
}
.yo-scroll.touch .inner {
  transition-duration: 0;
}
.yo-scroll.down .down-tip {
  display: block;
}
.yo-scroll.up .up-tip {
  display: block;
}
.yo-scroll.refresh .refresh-tip {
  display: block;
}
</style>