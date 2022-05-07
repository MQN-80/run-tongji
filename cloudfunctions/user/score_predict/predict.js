const cloud = require('wx-server-sdk');
const vdot = require('./setting.js');
cloud.init();
var i=30;
var mid="";
const db = cloud.database();
exports.main=async(event,context)=>{
   let run_data=await db.collection('run-distance').where({
       openid:event.openid,
   })
   .get()
   console.log(vdot.table["32"]);
   //if(event.option==1)  //表示为自己输入的相关数据
      //predict_1(event);
   console.log(run_data.data.length);
   console.log("dqdd");
}
async function predict_1(event){
     if(event.distance==1.5)
     {
       vdot.table[1][2][3];
    }
}