const { train } = require("@tensorflow/tfjs-core");

// pages/score_show/score_show.js
var score=[]; //格式化输出
Page({

  /**
   * 页面的初始数据
   */
  data: {
  predicting_score:[],
  training_pace:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(JSON.parse(options.training_pace));
  var pace1=JSON.parse(options.training_pace);
  console.log(pace1.easy)
  console.log(options.predict_score);
  var score1=JSON.parse(options.predict_score);
  console.log(score1);
  var i=0;
  for(;i<7;i++){
    var num=score1[i];
    console.log(num);
  var hour=Math.floor(num/3600);
  var minute=Math.floor((num-hour*3600)/60);
  var second=num-hour*3600-minute*60;
  if(hour>0)
  score.push(hour.toString()+':'+minute.toString()+':'+second.toString());
  else
  score.push(minute.toString()+':'+second.toString());
  }
  console.log(score)
  this.setData({
    predicting_score:score,
    training_pace:pace1,
  })
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