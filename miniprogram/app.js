// app.js
var fetchWechat = require('fetch-wechat');
var tf = require('@tensorflow/tfjs-core');
var webgl = require('@tensorflow/tfjs-backend-webgl');
var cpu = require('@tensorflow/tfjs-backend-cpu');
var plugin = requirePlugin('tfjsPlugin');
App({
  onLaunch: function () {
    this.getDeviceInfo();
    tf.ENV.flagRegistry.WEBGL_VERSION.evaluationFn = () => { return 1 };
    plugin.configPlugin({
      // polyfill fetch function
      fetchFunc: fetchWechat.fetchFunc(),
      // inject tfjs runtime
      tf,
      // inject webgl backend
      webgl,
      // inject cpu backend
      cpu,
      // provide webgl canvas
      canvas: wx.createOffscreenCanvas()
    });
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env:'cloud1-6gnuhn9p12e5fa11'  //云开发环境id
      })
    }
    this.getOpenid();   //获取openid
  },
  getOpenid()
  {
     let that=this;
     wx.cloud.callFunction({
       name:'user',
       data:{
       type:'get_openid',
       },
       success:function(res){

        that.globalData.openid=res.result.data[0].openid;
        that.globalData.is_join=res.result.data[0].club_join;
       }
     })
  },
  getDeviceInfo() {  //获取手机屏幕尺寸信息
    try {
      const res = wx.getSystemInfoSync();
      this.globalData.appWidth = typeof res.screenWidth === 'number' ? res.screenWidth : 320;
      this.globalData.appHeight = typeof res.screenHeight === 'number' ? res.screenHeight : 500;
      this.globalData.benchmarkLevel = typeof res.benchmarkLevel === 'number' ? res.benchmarkLevel : -1;
      wx.reportAnalytics('get_device_info', {
        device_info: JSON.stringify(res)
      });
    } catch (e) {
      console.log(e);
    }
  },
  globalData:{
    nickname:'ss1',
    openid:'', //用户openid为用户唯一标识
    is_join:0,
    avatorUrl:'s', //用户头像url地址
    appWidth: 320,
    appHeight: 500,
    benchmarkLevel: -1,
    key_position:'', //用三维数组存储关键点位置
    angle_num:'',
    head:[],
  }
});
