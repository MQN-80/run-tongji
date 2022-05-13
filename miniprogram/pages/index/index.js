var QQMapWX = require('../../QQmap/qqmap-wx-jssdk.js');
var countTooGetLocation = 0;
var total_micro_second = 0;
var starRun = 0;
var totalSecond  = 0;
var oriMeters = 0.0;
var point = [];
var that2;
var pause=true;
var qqmapsdk;
var app=getApp();
import Notify from "../../miniprogram_npm/@vant/weapp/notify/notify";

/* 毫秒级倒计时 */
function count_down(that) {
 
    if (starRun == 0) {
      return;
    }
 
    if (countTooGetLocation >= 100) {
      var time = date_format(total_micro_second);
      that.updateTime(time);
    }
 
      if (countTooGetLocation >= 200) { //1000为1s,每间隔一会儿画一条线
        that.getLocation();
        countTooGetLocation = 0;
        /*************** */
        console.log('re');
        point.push({latitude: that.data.latitude, longitude : that.data.longitude});
        //console.log(point);
        drawline();
      }   
 

      setTimeout(function(){
        countTooGetLocation += 10;
    total_micro_second += 10;
        count_down(that);
    }
    ,10
    )
}
 
 
// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
      // 秒数
      var second = Math.floor(micro_second / 1000);
      // 小时位
      var hr = Math.floor(second / 3600);
      // 分钟位
      var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
      // 秒位
    var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
 
 
    return hr + ":" + min + ":" + sec + " ";
}
 
 
function getDistance(lat1, lng1, lat2, lng2) { 
    var dis = 0;
    var radLat1 = toRadians(lat1);
    var radLat2 = toRadians(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = toRadians(lng1) - toRadians(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;
 
    function toRadians(d) {  return d * Math.PI / 180;}
} 
 
function fill_zero_prefix(num) {
    return num < 10 ? "0" + num : num
}
 

//画跑步路线的函数
function drawline() {
  that2.setData({
     polyline : [{
        points : point,
         color : '#99FF00',
         width : 4,
         dottedLine : false
     }]
  });
}
//****************************************************************************************
//****************************************************************************************
 
Page({
  data: {
    clock: '',
    isLocation:false,
    latitude: 0,
    longitude: 0,
    markers: [],
    covers: [],
    meters: 0.00,
    polyline : [],
    time: "0:00:00",
    start_run_disabled:false,
    pause_run_disabled:true,
    stop_run_disabled:true,
    pause_name:"暂停跑步",
    count:0,
    speed:50,
    activeNames: ['1'],
    countTimer:null,
    show: false,
    show1:false,
    total_distance:0,
    gradientColor: {
        '0%': 'violet',
        '100%': 'blue',
      },
  },
  onShow: function () {
  this.get_total();
  },
  /*获取总跑步数据
  */
  get_total(){
  let that=this;
  wx.cloud.callFunction({
  name:'user',
  data:{
  type:'get_total',
  openid:app.globalData.openid,
  },
  success:function(res){
  console.log(res);
 that.setData({
 total_distance:res.result.data[0].total_distance,
 })
  }
  })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onOpen(){
      this.setData({show:true});
  },

  countInterval: function () {
      this.setData({
          speed:50
      })
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.countTimer = setInterval(() => {
      if (this.data.count < 100) {
        this.setData({
            count:this.data.count+5
        });
      } else {
        clearInterval(this.countTimer);
      }
    }, 100)
  },

  countEND:function(){
    clearInterval(this.countTimer);
    if(this.data.count>=100)
    {
        this.stopRun();
        Notify({ type: 'success', message: '已停止跑步！', duration: 1000,});
    }
    this.setData({
        show1:true,
        count:0,
        speed:200
    });
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  
  direct:function(){
  wx.navigateTo({
    url: '/pages/login/index'
  })
},
//****************************
  onLoad:function(options){
    //实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'Z3XBZ-KDSEX-XSC4U-7OYAT-YMKYZ-2SFIF'//密钥
  });
    // 页面初始化 options为页面跳转所带来的参数
    that2=this;
    wx.getLocation({
      isHighAccuracy: true,
      type: 'gcj02',
       success : function (res) {
           that2.setData({
               longitude : res.longitude,
               latitude : res.latitude,
           });
       }
   });
    this.getLocation()
    console.log("onLoad")
    count_down(this);
  },
  //****************************
  openLocation:function (){
    wx.getLocation({
      isHighAccuracy: true,
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
          wx.openLocation({
            latitude: res.latitude, // 纬度，范围为-90~90，负数表示南纬
            longitude: res.longitude, // 经度，范围为-180~180，负数表示西经
            scale: 28, // 缩放比例
          })
      },
    })
  },
 
//****************************
  startRun :function () {
    if (starRun == 1) {
      return;
    }
    this.setData({
      start_run_disabled:true,
    pause_run_disabled:false,
    stop_run_disabled:false
    });
    starRun = 1;
    count_down(this);
    this.getLocation();
  },
 
 
 //****************************
  stopRun:function () {
    this.setData({
      start_run_disabled:false,
    pause_run_disabled:true,
    stop_run_disabled:true
    });
    starRun = 0;
    count_down(this);
    var time="0:00:00";
    this.updateTime(time);
    total_micro_second=0;
    point.splice(0,point.length);
    this.setData({
      polyline:[]
    });
    pause=true;
    this.setData({
      pause_name:"暂停跑步"
     })
  },
 //****************************
  pauseRun:function(){
    if(pause==true)
    {
     starRun=0;
     pause=false;
     this.setData({
      pause_name:"继续跑步"
     })
    }
    else
    {
      starRun = 1;
      count_down(this);
      this.getLocation();
      pause=true;
      this.setData({
        pause_name:"暂停跑步"
       })
    }
   },
 
//****************************
  updateTime:function (time) {
 
    var data = this.data;
    data.time = time;
    this.data = data;
    this.setData ({
      time : time,
    })
 
  },
 
 
//****************************
  getLocation:function () {
    var that = this
    wx.getLocation({
      isHighAccuracy: true,
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        console.log("res----------")
        console.log(res)
 
        //make datas 
        var newCover = {
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '/resources/redPoint.png',
          };
        var oriCovers = that.data.covers;
 
        console.log("oriMeters----------")
        console.log(oriMeters);
        var len = oriCovers.length;
        var lastCover;
        if (len == 0) {
          oriCovers.push(newCover);
        }
        len = oriCovers.length;
        var lastCover = oriCovers[len-1];
 
        console.log("oriCovers----------")
        console.log(oriCovers,len);
 
        var newMeters = getDistance(lastCover.latitude,lastCover.longitude,res.latitude,res.longitude)/1000;
 
        if (newMeters < 0.0015){
            newMeters = 0.0;
        }
 
        oriMeters = oriMeters + newMeters; 
        console.log("newMeters----------")
        console.log(newMeters);
 
 
        var meters = new Number(oriMeters);
        var showMeters = meters.toFixed(2);
 
        oriCovers.push(newCover);
 
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [],
          covers: oriCovers,
          meters:showMeters,
        });
      },
    })
  }
})