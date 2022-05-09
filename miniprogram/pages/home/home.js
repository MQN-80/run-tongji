// pages/home/index.js
var app=getApp();
var plugin=requirePlugin('tfjsPlugin')
var tf=require('@tensorflow/tfjs-core')
var fetchWechat=require('fetch-wechat')
require('@tensorflow/tfjs-backend-webgl')
require('@tensorflow/tfjs-backend-cpu')
Page({

    /**
     * 页面的初始数据
     */
    data: {
    nickname:'',
    man:'男',
    region:'上海',
    avatorUrl:'http://www.28jy10gtt.cn/source/account.png' //用户头像地址
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
        console.log(app.globalData.nickname);
        this.setData({
            nickname:app.globalData.nickname,
            avatorUrl:app.globalData.avatorUrl
        })
    },
    get_runRecord: function(){
        console.log(Math.acos(0.5)*180/Math.PI);
        wx.cloud.callFunction({
            name:'user',
            data:{
                type:'get_runRecord',
                openid:app.globalData.openid,
            },
            success:function(res){
                console.log(res.result.data[0].calorie);
            },
            fail:console.error
        })
    },
    get_(){
       plugin.configPlugin({
           fetchFunc:fetchWechat.fetchFunc(),
           tf,canvas:wx.createOffscreenCanvas()
       })
       tf.tensor([1,2,3,4]);

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