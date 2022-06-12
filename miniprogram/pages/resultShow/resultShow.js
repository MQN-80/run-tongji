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
     key_position:'',
     angle_num:'', 
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
    },
    drawPic(angle,j,angle_name){   //根据传入角度数据，显示折线图,j代表显示哪个关节角度
      let that=this;
      let len=angle.length;
      let sto=[];
      let num=[];
      let i=0;
      console.log(angle);
      for(i=1;i<angle.length;i++)
      sto.push(String(i));
      for(i=1;i<angle.length;i++)
      num.push(angle[i][j]);
      console.log(num);
      console.log(sto);
      var yuelineChart = new wxchart({ 
        canvasId: 'yueEle',
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
    