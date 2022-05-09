const { time } = require("@tensorflow/tfjs-core")
var app=getApp()
// pages/predict/predict.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    select:false,
    distance:'1500m',
    time:'387',
    },
    distance_input(e){
    this.setData({
        distance:e.detail.value,
    })
    },
    time_input(e){
        this.setData({
            time:e.detail.value,
        })
    },
    ss1(){  
        console.log(parseInt(this.data.time));
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
              time:parseInt(that.data.time),
            },
            success: function(res) {
              console.log("上传成功")
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