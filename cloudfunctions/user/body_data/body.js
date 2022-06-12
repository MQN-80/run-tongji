const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
exports.main=async(event,context)=>{
    switch(event.option){
        case'push_bodydata':{
        return push_bodydata(event);
        }
        break;
        case'get_bodydata':{
        return get_bodydata(event);
        }
        break;
        case'gesture_analyse':{
            return gesture_analyse(event);
        }
    }
}
/*获取身体数据信息
*/
function get_bodydata(event){
return db.collection('user_body').where({
    openid:event.openid,
})
.get();
}
/*上传身体数据信息，假如存在则更新
*/
function push_bodydata(event){
console.log("ss2");
db.collection('user_body').where({
    openid:event.openid,
})
.get()
.then(function(res){
    if(res.data.length==0)
    push_data(event);
    else
    update_data(event);
})
} 
function push_data(event){
    console.log("22")
    db.collection('user_body').add({
    data:{
        height:event.height,
        chest_length:event.chest_length,  //胸围
        waistline:event.waistline, //腰围
        weight:event.weight,
        BMI:event.BMI,   //计算bmi
        openid:event.openid, 
    }    
    })
}
function update_data(event){
    db.collection('user_body').where(
        {
            openid:event.openid,
        }
    )
    .update({
    data:{
    height:event.height,
    chest_length:event.chest_length,  //胸围
    waistline:event.wwaistline, //腰围
    weight:event.weight,
    BMI:event.BMI,   //计算bmi
    },
    success:function(res){
        console.log(res.data);
    }
    })
}
/**
 * 用户上传跑步姿态数据，在云端进行分析
 */
function gesture_analyse(event){
    var i=1;
    var left=0;   //左肘
    var right=0;  //右肘 
    var left1=0;  //左膝
    var right1=0; //右膝
    var mid=0;   //用于计算中间值
    console.log(event);
    //首先计算摆臂角度得分，角度在70-120度之内为合理区间,满分为100分
    for(;i<event.angle.length;i++){
    if(event.angle[i][0]<60||event.angle[i][0]>120)
    right+=0;
    else{
        right+=(100/(event.angle.length))*(1-Math.abs(event.angle[i][0]-90)/30);
    }
    if(event.angle[i][1]<60||event.angle[i][1]>120)
    left+=0;
    else{
        left+=(100/(event.angle.length))*(1-Math.abs(event.angle[i][1]-90)/30);
    }
    if(event.angle[i][2]<60||event.angle[i][2]>120)
    right1+=0;
    else{
        right1+=(100/(event.angle.length))*(1-Math.abs(event.angle[i][2]-90)/30);
    }
    if(event.angle[i][3]<60||event.angle[i][3]>120)
    left1+=0;
    else{
        left1+=(100/(event.angle.length))*(1-Math.abs(event.angle[i][3]-90)/30);
    }
    }
    i=0;
    var sum=0;
    //计算头部稳定性，用y轴数据标准差来表示稳定程度
    for(;i<event.head.length;i++){
    sum+=event.head[i][1];
    }
    var avg=sum/event.head.length;
    sum=0;
    i=0;
    for(;i<event.head.length;i++){
    sum+=Math.pow(avg-event.head[i][1],2);
    }
    var sum1=0;
    sum1=100-Math.sqrt((sum/event.head.length),2)/event.head.length;
    console.log("dada");
    
    return{
        data:{
            right:right.toFixed(2),
            left:left.toFixed(2),
            right1:right1.toFixed(2),
            left1:left1.toFixed(2),
            head:sum1.toFixed(2),
        }
    }
}