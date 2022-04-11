// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    loginInfo:{
        code:'',
        spread_spid:0,
        spread_code:0
    }
    },
    login()
    {
    let that = this;
      //调用微信小程序的登录接口
     wx.login({
        success(e) {
          that.data.loginInfo.code = e.code; //拿到的code存储在data中
          wx.showModal({
            title: '温馨提示',
            content: '微信授权登录后才能正常使用小程序功能',
            cancelText: '拒绝',
            confirmText: '同意',
            success( sucessInfo ) {
              //调用微信小程序的获取用户信息的接口
              wx.getUserProfile({
                desc: '用于完善会员资料', // 声明获取用户个人信息后的用途
                lang: 'zh_CN',
                success(info) {
                  //把获取到的信息复制到data中的loginInfo中
                  that.data.loginInfo = Object.assign( that.data.loginInfo, info );
                  console.log(info.userInfo.nickName);
                  //在此可以使用云数据库进行存储用户信息
                  //调用后台的接口，把所有整合的个人信息传过去
                 // that.handlerLogin( that.data.loginInfo );
                },
                fail(e) {
                  console.log('获取用户信息失败', e);
                  
                }
              })
            },
            fail() {
              console.log("拒绝");
            },
            complete() {}
          })
   
        },
        fail(e) {
          console.log('fail', e);
          wx.showToast({
            title: '网络异常',
            duration: 2000
          })
          return;
        }
      })
   
  },

//调用后台的登录接口
handlerLogin( loginInfo ) {
    let that = this;
    //login是后台接口封装的方法
    login( loginInfo ).then(( res ) => {
      console.log('登录成功', res);
      let { cache_key, expires_time, token, userInfo } = res.data;
       //把用户信息存储到storage中，方便其它地方使用
      wx.setStorageSync('cache_key', cache_key);
      wx.setStorageSync('expires_time', expires_time);
      wx.setStorageSync('token', token);
      wx.setStorageSync('isLog', true);
      wx.setStorageSync('userInfo', JSON.stringify( userInfo ));
      wx.setStorageSync('loginRecord', new Date().getTime());
    })
    .catch(( res ) => {
      console.log('catch', res);
    })
    .finally(() => {
      console.log('finally');
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