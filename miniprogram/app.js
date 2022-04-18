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

    this.globalData = {};
  }
});
