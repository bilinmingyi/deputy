var config= require("../src/fetch/config");

module.exports = {
  proxy: {
    [config.ROOT]: {    //将www.exaple.com印射为/apis
      target: config.PROXYROOT,  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        [`^${config.ROOT}`]: ''   //需要rewrite的
      }
    }
  }
}
