var app=getApp();
var draw=require('./util')
var wxchart=require('../../utils/wxchart')
Page({
    canvasIdErrorCallback: function(e) {
     console.error(e);
    },
    /**
    * 页面的初始数据
    */
    data: {
     canvasWidth: 0,
     canvasHeight: 568,
     canvasDefaultVal: {
       maxVal: 0,
       totalData: 0,
       data: []
     },
     option1: [
      { text: '右肘', value: 0 },
      { text: '左肘', value: 1 },
      { text: '右膝', value: 2 },
      { text: '左膝', value: 3 },
    ],
     value1:0,
     key_position:'',
     angle_num:'', 
     rightScore:'',
     right1Score:'',
     leftScore:'',
     left1Score:'',
    headScore:'',
    },
    onChange(e){
      //根据用户选择绘制运动关键点图
      this.drawPic(app.globalData.angle_num,this.data.option1[e.detail].value,this.data.option1[e.detail].text);
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function(options) {
        console.log(options.angle_num)
     this.setData({
           canvasWidth: app.globalData.appWidth-2,
           key_position:options.key_position,
           angle_num:options.angle_num,
           canvasHeight:app.globalData.appHeight,
     });
     console.log(app.globalData.head);

    },
    drawPic(angle,j,angle_name){   //根据传入角度数据，显示折线图,j代表显示哪个关节角度
      let that=this;
      let len=angle.length;
      let sto=[];
      let num=[];
      let i=0;
      for(i=1;i<angle.length;i++)
      sto.push(String(i));
      for(i=1;i<angle.length;i++)
      num.push(angle[i][j]);
      var yuelineChart = new wxchart({ 
        canvasId: 'curve-img',
        type: 'line',
        categories: sto, //categories X轴
        animation: true,
        series: [{
         name:angle_name,
         data:num,
         format: function (val, name) {
          return val + '';
         }
        },
        ],
        xAxis: {
         disableGrid: true
        },
        yAxis: {
         title: '夹角',
         format: function (val) {
          return val;
         },
         max: 180,
         min: 0
        },
        width: 300,
        height: 300,
        dataLabel: false,
        dataPointShape: true,
        extra: {
         lineStyle: 'curve'
        }
       });
    },
    /**
    * 生命周期函数--监听页面初次渲染完成
    */
    onReady: function() {
     var ctx = wx.createCanvasContext("curve-img");
     var key_position=app.globalData.key_position; //用三维数组存储关键点位置
     var angle_num=app.globalData.angle_num;  
     //draw.drawPoint(key_position,ctx,0,0);
     //ctx.draw();
     this.drawPic(angle_num,0,"右肘");
    },

    onInit:function(){

    },
    
    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function() {
      let that=this;
      console.log("dada1");
      wx.cloud.callFunction({
        name:'user',
        data:{
          type:'bodydata',
          option:'gesture_analyse',
          angle:app.globalData.angle_num,
          head:app.globalData.head,
        },
        success:function(res){
        console.log(res);
        that.setData({
          rightScore:res.result.data.right,
          leftScore:res.result.data.left,
          right1Score:res.result.data.right1,
          left1Score:res.result.data.left1,
          headScore:res.result.data.head,
        })
        },
      })
    },
    
    /**
    * 生命周期函数--监听页面隐藏
    */
    onHide: function() {
    
    },
    
    /**
    * 生命周期函数--监听页面卸载
    */
    onUnload: function() {
    
    },
    
    /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
    onPullDownRefresh: function() {
    
    },
    
    /**
    * 页面上拉触底事件的处理函数
    */
    onReachBottom: function() {
    
    },
    
    /**
    * 用户点击右上角分享
    */
    onShareAppMessage: function() {
    
    }
    })
    /**
     * <canvas
 style="width: 300px; height: 600px; position: relative; left: 0rpx; top: 347rpx"
 canvas-id="yueEle"
 binderror="canvasIdErrorCallback"
></canvas>
<canvas canvas-id='curve-img' style='width:{{canvasWidth}}px;height:{{canvasHeight}}px;'></canvas>
<text style="font-size:80rpx;">跑姿成绩判定</text>
     */