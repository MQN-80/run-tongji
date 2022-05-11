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
