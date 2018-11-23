const treatOrdeType = val => {
  var list = [
    { code: "UNPAID", name: "待支付" },
    { code: "DISPENSING", name: "配药中" },
    { code: "DELIVER", name: "配送中" },
    { code: "WAIT_INSTOCK", name: "待收货" },
    { code: "DONE", name: "完成" },
    { code: "CANCEL", name: "取消" }
  ];
  for (var i = 0; i < list.length; i++) {
    if (list[i].code == val) {
      return list[i].name;
    }
  }
};
const checkOrderType = val => {
  var list = [
    { code: "WAITCONFIRM", name: "待确认" },
    { code: "CHECKING", name: "检验中" },
    { code: "DONE", name: "完成" },
    { code: "CANCEL", name: "取消" }
  ];
  for (var i = 0; i < list.length; i++) {
    if (list[i].code == val) {
      return list[i].name;
    }
  }
};
const fullTime = val => {
  var dateObj = new Date(Number(val));
  var year = dateObj.getFullYear();
  var month =
    dateObj.getMonth() + 1 > 9
      ? (dateObj.getMonth() + 1).toString()
      : "0" + (dateObj.getMonth() + 1).toString();
  var date =
    dateObj.getDate() > 9
      ? dateObj.getDate().toString()
      : "0" + dateObj.getDate().toString();
  var hour =
    dateObj.getHours() > 9
      ? dateObj.getHours().toString()
      : "0" + dateObj.getHours().toString();
  var minutes =
    dateObj.getMinutes() > 9
      ? dateObj.getMinutes().toString()
      : "0" + dateObj.getMinutes().toString();

  return year + "/" + month + "/" + date + "  " + hour + ":" + minutes;
};

const treatOrderType= val => {
  const list=[{code:1,name:"中药"}, {code:2,name:"成药"}, {code:3,name:"产品"}];
  for (var i=0;i<list.length;i++){
    if(list[i].code===val){
      return list[i].name
    }
  }
}
/**
 * @desc： Format price.
 * @param {String} price
 * @param {String} currency
 * @param {Number} decimals
 * @return {String}
 *
 * @example priceFormat('12345.67890', '$', 3) -> '$12,345.679'
 */
const priceFormat = (price, currency, decimals) => {
  price = parseFloat(price);
  if ((!price && price !== 0) || !isFinite(price)) return "";
  currency = currency != null ? currency : "￥";
  decimals = decimals != null ? decimals : 2;
  var sign = price < 0 ? "-" : "";
  var str = Math.abs(price).toFixed(decimals);
  var _int = decimals ? str.slice(0, -1 - decimals) : "";
  var _float = decimals ? str.slice(-1 - decimals) : "";
  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "";
  var mid = _int.slice(i).replace(/(\d{3})(?=\d)/g, "$1,");
  return sign + currency + head + mid + _float;
};

/**
 * @desc Parse Number
 * @param {All} num
 * @return {Number}
 *
 * @example parseNum('abc') -> 0
 */
const parseNum = num => {
  let n = parseFloat(num);
  return n == n ? n : 0;
};

/**
 * @desc: Date format
 * @param {} date
 * @param {string} fmt 目标字符串格式,默认：yyyy-MM-dd hh:mm:ss
 * @returns {string} 返回格式化后的日期字符串
 *
 * @example
 * var date = new Date();
 * date.Format("yyyy年MM月dd日 第q季度")
 *
 * @support:
 * yyyy：年
 * q: 季度
 * MM：月
 * dd：日
 * hh: 时
 * mm：分
 * ss：秒
 * S：毫秒
 */
const dateFormat = function(date, fmt) {
  if (!Date.prototype.Format) {
    Object.defineProperty(Date.prototype, "Format", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function(fmt) {
        var f = fmt != null ? fmt : "yyyy-MM-dd hh:mm:ss";
        var o = {
          "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
          "M+": this.getMonth() + 1, // 月份
          "d+": this.getDate(), // 日
          "h+": this.getHours(), // 时
          "m+": this.getMinutes(), // 分
          "s+": this.getSeconds(), // 秒
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(f)) {
          f = f.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(f)) {
            f = f.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return f;
      }
    });
  }
  let d = Date.prototype.isPrototypeOf(date) ? date : new Date(date);
  return d.getTime() === d.getTime() ? d.Format(fmt) : '';
};

/** 
 * @desc: sex format
*/
const sexFormat = (val) => {
  const dict = ['男', '女', '保密'];
  return dict[val];
}

module.exports = {
  treatOrdeType,
  fullTime,
  checkOrderType,
  priceFormat,
  parseNum,
  dateFormat,
  treatOrderType,
  sexFormat
};
