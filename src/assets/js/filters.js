const treatOrdeType = (val) => {
  var list = [
    {code: 'UNPAID', name: '待支付'},
    {code: 'DISPENSING', name: '配药中'},
    {code: 'DELIVER', name: '配送中'},
    {code: 'WAIT_INSTOCK', name: '待收货'},
    {code: 'DONE', name: '完成'},
    {code: 'CANCEL', name: '取消'}
  ];
  for(var i=0;i<list.length;i++){
    if(list[i].code==val){
      return list[i].name;
    }
  }
};
const fullTime =(val) =>{
  var dateObj=new Date(Number(val));
  var year=dateObj.getFullYear();
  var month=(dateObj.getMonth()+1)>9?(dateObj.getMonth()+1).toString():"0"+(dateObj.getMonth()+1).toString();
  var date=(dateObj.getDate())>9?(dateObj.getDate()).toString():"0"+(dateObj.getDate()).toString();
  var hour=(dateObj.getHours())>9?(dateObj.getHours()).toString():"0"+(dateObj.getHours()).toString();
  var minutes=(dateObj.getMinutes())>9?(dateObj.getMinutes()).toString():"0"+(dateObj.getMinutes()).toString();

  return year+"/"+month+"/"+date+"  "+hour+":"+minutes;
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
  if (!price && price !== 0 || !isFinite(price)) return '';
  currency = currency != null ? currency : '￥';
  decimals = decimals != null ? decimals : 2;
  var sign = price < 0 ? '-' : '';
  var str = Math.abs(price).toFixed(decimals);
  var _int = decimals ? str.slice(0, -1 - decimals) : '';
  var _float = decimals ? str.slice(-1 - decimals) : '';
  var i = _int.length % 3;
  var head = i > 0 
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) 
    : ''; 
  var mid = _int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,');
  return sign + currency + head + mid + _float;
}


module.exports = {treatOrdeType,fullTime,priceFormat};
