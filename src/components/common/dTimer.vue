<template>
  <div :class="['d-timer', {'border': !noBorder}]">
    <div class="fast_block">
      <button :class="{'cur': myFastDate == 1}" @click="setQueryDate(1)">今日</button>
      <button :class="{'cur': myFastDate == 2}" @click="setQueryDate(2)">昨日</button>
      <button :class="{'cur': myFastDate == 3}" @click="setQueryDate(3)">本月</button>
      <button :class="{'cur': myFastDate == 4}" @click="setQueryDate(4)">上月</button>
    </div>
    <div class="input_block">
      <input placeholder="起始日期" type="date" v-model="startDate">
      <input placeholder="结束日期" type="date" v-model="endDate">
      <div v-if="!showSearch">
        <button @click="setQueryDate">查询</button>
      </div>
    </div>
    <hr class="full-screen-hr" v-if="showSearch">
    <d-search v-if="showSearch" @on-search="emitSearch" :placeholder="searchPlaceHolder"></d-search>
  </div>
</template>

<script>
import dSearch from "@/components/common/dSearch";
export default {
  components: {
    dSearch
  },
  props: {
    fastDate: {
      type: Number,
      default: 1
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    searchPlaceHolder: {
      type: String,
      default: "患者姓名、电话"
    }
  },
  data() {
    return {
      myFastDate: this.fastDate,
      startDate: "",
      endDate: "",
      today: "",
      yesterday: "",
      thisMonthStart: "",
      thisMonthEnd: "",
      lastMonthStart: "",
      lastMonthEnd: "",
      searchData: ""
    };
  },
  created() {
    this.setFast();
    this.setQueryDate(this.myFastDate);
  },
  computed: {
    startTime() {
      let date = new Date(this.startDate);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date.getTime();
    },
    endTime() {
      let date = new Date(this.endDate);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date.getTime() + 86399999;
    }
  },
  methods: {
    emitSearch(val) {
      this.searchData = val;
      this.setQueryDate();
    },
    setQueryDate(type) {
      switch (type) {
        case 1:
          this.startDate = this.today;
          this.endDate = this.today;
          break;
        case 2:
          this.startDate = this.yesterday;
          this.endDate = this.yesterday;
          break;
        case 3:
          this.startDate = this.thisMonthStart;
          this.endDate = this.thisMonthEnd;
          break;
        case 4:
          this.startDate = this.lastMonthStart;
          this.endDate = this.lastMonthEnd;
          break;
        default:
          break;
      }
      this.myFastDate = type ? type : -1;
      let params = {
        start_time: this.startTime,
        end_time: this.endTime
      };
      this.showSearch && Object.assign(params, { searchData: this.searchData });
      this.$emit("input", params);
    },
    dateToString(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month > 9 ? month : "0" + month;
      let day = date.getDate();
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    setFast() {
      const date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      let dateYear = date.getFullYear();
      let dateMonth = date.getMonth();
      let dateDay = date.getDate();

      // 今天
      this.today = this.dateToString(date);

      // 昨天
      this.yesterday = this.dateToString(new Date(date.getTime() - 86400000));

      // 本月
      this.thisMonthStart = this.dateToString(new Date(date.setDate(1)));
      this.thisMonthEnd = this.dateToString(
        new Date(new Date(date.getTime()).setMonth(dateMonth + 1) - 1)
      );

      // 上月
      this.lastMonthStart = this.dateToString(
        new Date(date.setMonth(dateMonth - 1))
      );
      this.lastMonthEnd = this.dateToString(
        new Date(new Date(date.getTime()).setMonth(dateMonth) - 1)
      );
    }
  }
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
  min-height: 3rem;
  padding: 0.5rem 0.94rem;
}
.input_block input {
  border: 0.0625rem solid #08bac6;
  border-radius: 0.25rem;
  width: calc(50vw - 3.38rem);
  margin-right: 0.565rem;
  text-align: center;
  font-size: 0.75rem;
  flex: 1;
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
.input_block :nth-last-child(1) {
  margin-right: 0;
}
.d-timer input:focus {
  outline-color: #08bac6;
}
.d-timer .cur {
  border: 1px solid #08bac6;
  background: #08bac6;
  color: #fff;
}
.d-timer >>> .block-fix {
  position: relative;
}
</style>
