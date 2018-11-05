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
module.exports = {treatOrdeType,fullTime};
