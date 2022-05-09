// pages/posenet/index.js
var app=getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import { Classifier } from './models';
const { appWidth, appHeight, benchmarkLevel } = getApp().globalData;
var key_position=[[[]]]; //用三维数组存储关键点位置
var angle_num=[[]];   //用二维数组存储各关节角度，分别代表右肘，左肘，右膝，左膝
var pause=false; //暂停标志
Page({
  classifier: null,
  ctx: null,
  /**
   * 页面的初始数据
   */
  data: {
    devicePosition: 'front',
    predicting: false,

  },
  handleSwitchCamera() {
    let devicePosition = this.data.devicePosition === 'front' ? 'back' : 'front';
    this.setData({ devicePosition });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('benchmarkLevel', benchmarkLevel);
  },
  onCameraError(err) {
    console.log('onCameraError>>', err);
  },
  back(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  Show1(){
    wx.redirectTo({
      url: '../resultShow/resultShow',   //展示结果页面
    })
  },
   Show(){
    console.log("ss")
    pause=true;
    this.angle_count();
    app.globalData.key_position=key_position;
    app.globalData.angle_num=angle_num; 
    //console.log(app.globalData.angle_num);
    wx.navigateTo({
      url: '../resultShow/resultShow',   //展示结果页面
    })
    ;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const context = wx.createCameraContext(this);
    this.ctx = wx.createCanvasContext('pose', this); //创造canvas画布
    this.initClassifier();
    let count = 0;
    const listener = context.onCameraFrame(frame => {
      count++;
      if (count === 10&&pause==false) { // 控制帧数
        if (this.classifier && this.classifier.isReady()) {
          this.executeClassify(frame);
        }
        count = 0;
      }
    });
    listener.start();
  },

  initClassifier() {
    wx.showLoading({ title: '模型正在加载...' });
    this.classifier = new Classifier({ width: appWidth, height: appHeight });
    this.classifier.load().then(() => {
      wx.hideLoading();
    }).catch(err => {
      console.log('模型加载报错：', err);
      Toast.loading({
        message: '网络连接异常',
        forbidClick: true,
        loadingType: 'spinner',
      });
    })
  },
  positionRecord(pose){ //记录各关节的位置，来判断跑步姿势
  //console.log(key_position)
  //<app-nav />
  key_position.push([
    [pose.keypoints[5].position.x,pose.keypoints[5].position.y],
    [pose.keypoints[6].position.x,pose.keypoints[6].position.y],
    [pose.keypoints[7].position.x,pose.keypoints[7].position.y],
    [pose.keypoints[8].position.x,pose.keypoints[8].position.y],
    [pose.keypoints[9].position.x,pose.keypoints[9].position.y],
    [pose.keypoints[10].position.x,pose.keypoints[10].position.y],
    [pose.keypoints[11].position.x,pose.keypoints[11].position.y],
    [pose.keypoints[12].position.x,pose.keypoints[12].position.y],
    [pose.keypoints[13].position.x,pose.keypoints[13].position.y],
    [pose.keypoints[14].position.x,pose.keypoints[14].position.y],
    [pose.keypoints[15].position.x,pose.keypoints[15].position.y],
    [pose.keypoints[16].position.x,pose.keypoints[16].position.y],])    //存储关键点信息
  },
 /*
 *@method 统计跑步时各关节角度  
 */
  cos(x1,y1,x2,y2,x3,y3){ //余弦定理计算(x1,y1)的角度
  if(x1<=0||y1<=0||x2<=0||y2<=0||x3<=0||y3<=0)
  return -1;    //表示此处并未采集到可靠的识别点
  var angle=Math.acos(((x2-x1)*(x3-x1)+(y2-y1)*(y3-y1))/(Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))*Math.sqrt(Math.pow(x3-x1,2)+Math.pow(y3-y1,2))))*180/Math.PI;
  return angle;
  },
  cosine(i){
  var leftElbow,rightElbow,leftKnee,rightKnee;//四个关键角度，标识跑步姿势是否正确
  //console.log(key_position)
  rightElbow=this.cos(key_position[i][3][0],key_position[i][3][1],key_position[i][1][0],key_position[i][1][1],key_position[i][5][0],key_position[i][5][1]);
  leftElbow=this.cos(key_position[i][2][0],key_position[i][2][1],key_position[i][0][0],key_position[i][0][1],key_position[i][4][0],key_position[i][4][1]);
  rightKnee=this.cos(key_position[i][9][0],key_position[i][9][1],key_position[i][7][0],key_position[i][7][1],key_position[i][11][0],key_position[i][11][1]);
  leftKnee=this.cos(key_position[i][8][0],key_position[i][8][1],key_position[i][6][0],key_position[i][6][1],key_position[i][10][0],key_position[i][10][1]);
  angle_num.push([rightElbow,leftElbow,rightKnee,leftKnee]);  //将角度push进去
  },   //余弦定理计算夹角
   angle_count(){
       var i=1;
       for(;i<key_position.length;i++){
       this.cosine(i);    //计算各时段的所有角度
       }
  }, 
  executeClassify(frame) {
    let that=this;
    if (this.classifier && this.classifier.isReady() && !this.data.predicting) {
      this.setData({
        predicting: true
      }, () => {
        this.classifier.detectSinglePose(frame).then((pose) => {
          const nosePosition = pose.keypoints[0].position;
          that.positionRecord(pose);
          this.classifier.drawSinglePose(this.ctx, pose);
          this.setData({
            predicting: false,
            nosePosition: Math.round(nosePosition.x) + ', ' + Math.round(nosePosition.y)
          })
        }).catch((err) => {
          console.log(err, err.stack);
        });
      });
    }
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
    if (this.classifier && this.classifier.isReady()) {
      this.classifier.dispose();
    }
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
    return {
      title: '微信小程序 × PoseNet',
      path: '/pages/posenet/index',
      imageUrl: '/static/img/share-img.png'
    }
  },
  onAddToFavorites() {
    return {
      title: '微信小程序 × PoseNet',
      imageUrl: '/static/img/app-avatar.png'
    }
  }
})