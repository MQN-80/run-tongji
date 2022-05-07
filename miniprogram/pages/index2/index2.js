// pages/index2/index2.js
var app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    ss(){
        wx.navigateTo({
            url:'../poseDetect/poseDetect'
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    ss1(){
        wx.cloud.callFunction({
            // 云函数名称
            name: 'user',
            // 传给云函数的参数
            data: {
              type:'predict',
              openid:app.globalData.openid,
            },
            success: function(res) {
              console.log("上传成功")
            },
            fail: console.error
          })
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