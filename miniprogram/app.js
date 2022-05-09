// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env:'cloud1-6gnuhn9p12e5fa11'  //云开发环境id
      })
    }
  },
  globalData:{
    nickname:'User',
    openid:'o62_v5dEv6YS1pGfpxisQAW3YsjQ', //用户openid为用户唯一标识
    avatorUrl:'http://www.28jy10gtt.cn/source/account.png' //用户头像url地址
  }
});
