// pages/community/community.js
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    /**
     * 创建新社团
     */
    create_club(){
    wx.cloud.callFunction({
    name:'user',
    data:{
        type:'club',
        option:'create_club',
        club_name:'同济跑男',
        openid:app.globalData.openid,
        text:'欢迎大家一起加入',
    },
    success(res){
        console.log(res);
    }   
    })
    },
    /**
     * 加入跑团,找不到跑团提示未找到；找到后要经过跑团团长同意才可
     */
    join_club(){
    wx.navigateTo({
      url: '../community_find/community_find',
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