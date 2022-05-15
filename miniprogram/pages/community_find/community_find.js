// pages/commun_find/community_find.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
Page({

    /**
     * 页面的初始数据
     */
    data: {
    value:'1',
    flag:false,
    club_name:'1',
    },
    /**
     * 查找输入的社团是否存在
     */
    OnSearch(e){
    let that=this;
    console.log(e.detail);
    wx.cloud.callFunction({
    name:'user',
    data:{
        type:'club',
        option:'find_club',
        club_name:e.detail,
    },
    success:function(res){
        console.log(res);
        if(res.result.data.length==0)
            that.setData({
            flag:false
        })
        else
            that.setData({
            flag:true,
            club_name:res.result.data[0].club_name,
        })
        that.show_dialog();  //显示消息框            
    },
    fail:function(err){
        console.log(err);
    }
    })
    },
    OnCancel(e){
    console.log("dq");
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //显示弹出框
    show_dialog(){
    let that=this;
    if(that.data.flag==true)
    {
        Dialog.confirm({
            title:that.data.club_name,
            message:'是否加入该社团'
        })
        .then(function(){
            console.log("dsa");
        })
        .catch(function(){
            console.log("da");
        })
    }
    else{
        Dialog.alert({
            title:'未找到该社团',
            message:'尝试重新输入',
        }).then(()=>{
            console.log("cancel");
        })
    }
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