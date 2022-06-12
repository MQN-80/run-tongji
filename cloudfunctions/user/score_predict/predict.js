const cloud = require('wx-server-sdk');
const vdot = require('./setting.js');
cloud.init();
var result=[];   //成绩预测
var pace;  //推荐配速
const db = cloud.database();
exports.main=async(event,context)=>{
   let run_data=await db.collection('run-distance').where({
       openid:event.openid,
   })
   .get()
   console.log(vdot.table["32"]);
   if(event.option==1)  //表示为自己输入的相关数据
     return predict_1(event);
}
 function predict_1(event){
     result=[];
     console.log(event);
     var i=31;
     var flag=1;
       for(;i<=85;i++)
       {
          var mid=i.toString();
          if(event.time==vdot.table[mid][event.distance])
            {
               result.push(vdot.table[mid]["1500m"]);
               result.push(vdot.table[mid]["3k"]);
               result.push(vdot.table[mid]["5k"]);
               result.push(vdot.table[mid]["10k"]);
               result.push(vdot.table[mid]["15k"]);
               result.push(vdot.table[mid]["HM"]);
               result.push(vdot.table[mid]["M"]);
               pace=vdot.table1[mid];
               break;
            }
         else if(event.time>vdot.table[mid][event.distance])
           {
              var mid1=(i-1).toString();
              result.push((vdot.table[mid]["1500m"]+vdot.table[mid1]["1500m"])/2);
              result.push((vdot.table[mid]["3k"]+vdot.table[mid1]["3k"])/2);
              result.push((vdot.table[mid]["5k"]+vdot.table[mid1]["5k"])/2);
              result.push((vdot.table[mid]["10k"]+vdot.table[mid1]["10k"])/2);
              result.push((vdot.table[mid]["15k"]+vdot.table[mid1]["15k"])/2);
              result.push((vdot.table[mid]["HM"]+vdot.table[mid1]["HM"])/2);
              result.push((vdot.table[mid]["M"]+vdot.table[mid1]["M"])/2);
              pace=vdot.table1[mid];
              console.log(i);
              break;
           }
       }
      if(i==31)
      flag=0;  //表示配速太慢
      if(i==86)   //表示成绩过高
      flag=2;
       console.log(result);
       return{
          predict_score:result,
          training_pace:pace,
          flag:flag,
       }
}