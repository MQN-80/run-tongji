const { time } = require("@tensorflow/tfjs-core")
var app=getApp();
// pages/predict/predict.js
var time1=0;
var hour='0';   //小时
var minute='0';//分钟
var second='0'; //秒数
Page({

    /**
     * 页面的初始数据
     */
    data: {
    select:false,
    distance:'1500m',
    option1: [
      { text: '1500m', value: 0 },
      { text: '3k', value: 1 },
      { text: '5k', value: 2 },
      { text: '10k', value: 3 },
      { text: '15k', value: 4 },
      { text: 'HM', value: 5 },
      { text: 'M', value: 6 },
    ],
    value1: 0,
    hour:'0',   //小时
    minute:'0',//分钟
    second:'0', //秒数
    },
    onChange(e){
      console.log(this.data.option1[e.detail].text);
      this.setData({
        distance:this.data.option1[e.detail].text
      })
     
    },
    input(e){
     hour=e.detail;
    },
    input1(e){
      minute=e.detail;
    },
    input2(e){
      second=e.detail;
    },
        ss1(){  
        
        time1=parseInt(hour)*3600+parseInt(minute)*60+parseInt(second);
        console.log(time1);
        let that=this;
        wx.cloud.callFunction({
            // 云函数名称
            name: 'user',
            // 传给云函数的参数
            data: {
              type:'predict',
              openid:app.globalData.openid,
              option:1,
              distance:that.data.distance,
              time:time1,
            },
            success: function(res) {
              console.log("上传成功")
              var traingPace=JSON.stringify(res.result.training_pace);
              var predicts=JSON.stringify(res.result.predict_score);
              if(res.result.predict_score.length!=0)  //查询找数据，跳转
              {
                wx.redirectTo({
                  url: '../score_show/score_show?predict_score='+predicts+'&training_pace='+traingPace,
                })
              }
              console.log(res);
            },
            fail: console.error
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})