var app=getApp();
Page({
    data: {
        BMI:0,
        chest_length:0,
        height:0,
        high:0,
        waistline:0
    },
    pushData:function(){
        wx.cloud.callFunction({
        name:'user',
        data:{
        type:"bodydata",
        option:"push_bodydata",
        openid:app.globalData.openid,
        height:192,
        chest_length:50,  //胸围
        waistline:60, //腰围
        weight:62,
        BMI:25.9,   //计算bmi,这里根据身高体重算一下
        },
        success:function(res){
            console.log("上传成功");
        }
        })
    },
    getData:function(){
        var that=this;
        wx.cloud.callFunction({
        name:'user',
        data:{
        type:"bodydata",
        option:"get_bodydata",
        openid:app.globalData.openid,
        },
        success:function(res){
        console.log(res);
        if(res.result.data.length!=0){
            var result=res.result.data[0];
            that.setData({
            BMI:result.BMI,
            chest_length:result.chest_length,
            height:result.height,
            weight:result.weight,
            waistline:result.waistline,
            })
        }
        }
    })
    }
})
