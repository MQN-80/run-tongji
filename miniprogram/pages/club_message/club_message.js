// pages/club_message/club_message.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
    message0:'',   //通知类信息
    message1:'',   //团长确认信息用
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    this.get_message();
    console.log(app.globalData.is_join)
    if(app.globalData.is_join==3)
    this.get_message1(); //用于团长确认
    },
    get_message:function(){
        let that=this;
        wx.cloud.callFunction({
          name:'user',
          data:{
              type:'get_info',
              openid:app.globalData.openid,
              type1:0,
          },
          success:function(res){
              that.setData({
                  message0:res.result.data,
              })
          }  
        })
},
    get_message1(){
        let that=this;
        wx.cloud.callFunction({
            name:'user',
            data:{
                type:'get_info',
                openid:app.globalData.openid,
                type1:1,
            },
            success:function(res){
                console.log(res);
                that.setData({
                    message1:res.result.data,
                })
            }  
          })
    },
    club_agree(e){
    let that=this;
    console.log(e);
    wx.cloud.callFunction({
        name:'user',
        data:{
            type:'club',
            option:'process_queue',
            change_join:2,
            openid:that.data.message1[e.currentTarget.dataset.index].openid,
            commander_id:app.globalData.openid,
        },
        success:function(res){
            that.get_message1(); //操作后更新界面
            Dialog.alert({
                title:'消息已确认',
                message:'该用户已加入跑团',
            }).then(()=>{
                console.log("cancel");
            })
        }
    })
    },
    club_disagree(e){
        wx.cloud.callFunction({
            name:'user',
            data:{
                type:'club',
                option:'process_queue',
                club_join:0,
            },
            success:function(res){
                that.get_message1(); //操作后更新界面
                Dialog.alert({
                    title:'消息已确认',
                    message:'拒绝该用户加入跑团',
                    context:this,
                })
            }
        })
        },
        ss(){
            Dialog.alert({
                title:'消息已确认',
                message:'拒绝该用户加入跑团',
                context:this,
            })
        },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    update_page(){  //更新视图
    this.get_message1();
    this.get_message();
    },
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