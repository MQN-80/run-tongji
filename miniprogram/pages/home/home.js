// pages/home/index.js
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
    nickname:'',
    man:'男',
    region:'上海',
    avatorUrl:'http://www.28jy10gtt.cn/source/account.png', //用户头像地址
    run_data:[{
        calorie:[],
        distance:[],
        location:[],
        runtime:[],
        step_number:[],
        stride:[],
        time:[]
    }],
    running_data:''
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.get_runRecord();
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
        var that=this;
        wx.cloud.callFunction({
            name:'user',
            data:{
                type:'get_runRecord',
                openid:app.globalData.openid,
            },
            success:function(res){
                console.log(res.result.data[0]);
                that.setData({
                    /*run_data:{
                    calorie:res.result.data[0].calorie,
                    distance:res.result.data[0].distance,
                    location:res.result.data[0].location,
                    runtime:res.result.data[0].runtime,
                    step_number:res.result.data[0].step_number,
                    stride:res.result.data[0].stride,
                    time:res.result.data[0].time
                    },*/
                    running_data:res.result.data
                })
            },
            fail:console.error
        })
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

    },
    get_bodydata(){
        wx.navigateTo({
            url:'../bodydata/bodydata',
        })
    }
})