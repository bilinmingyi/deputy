import wx from 'weixin-js-sdk'

export default function getWXSign() {
  return new Promise((resolve, reject) => {
    this.axios.post('/weixin/sales/wxConfig').then(respone => {
      const res = respone.data;
      if (res.code === 1000) {

        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: ['scanQRCode','previewImage']
        })
        wx.ready(()=>{
          resolve(wx)
        })
        wx.error((res)=>{
          console.log(res)
        })

      } else {
        this.$Message.infor("微信初始化失败")
      }
    }).catch(error => {
      reject(error)
    })
  })
}
