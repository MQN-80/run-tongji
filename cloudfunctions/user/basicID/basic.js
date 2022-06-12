const cloud = require('wx-server-sdk');
const Vdot_table = require('../score_predict/setting');

cloud.init();
let flag=1;
const db = cloud.database();
exports.main= async(event,context)=>{
    switch(event.type){
      case 'get_openid':{
        return user_information(event)
      }
      break;
      case'is_Find':{
        return find(event);
      }
       break;
      case'basicId':{
        return add(event);
      }
        break;
      case'send_distance':{
        return runRecord(event)
      }
        break;
      case'get_runRecord':{
        return get_runRecord(event)
      }
      break;
      case'get_total':{
        return get_total(event)
      }
      break;
      case'get_info':{
        return get_information(event);
      }
      }

     
    }
//返回用户user_id信息
function user_information(){
  const wxContext=cloud.getWXContext();
 
  return db.collection('user').where({
    openid:wxContext.OPENID,
  })
  .get();
}
// 创建集合云函数入口函数
async function add(event){
    await db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: event.openid,
        nickname:event.nickname,
        club_join:false,   //未参加过社团
      }
    }); 
    return {
      success: true,
    };
  };
//查找该用户是否存在，使用openid鉴别
async function find(event){
    let out=await(db.collection('user').where({
    openid:event.openid
  })
  .get({
      success:function(res){
        flag=1;
      },
      fail(err)
      {
        flag=0;
      }
  })
    )
  return out;
}
//runRecord:插入每次的跑步数据，参数为跑步距离，跑步时间，消耗卡路里，步数和平均步频,跑步时间
//每次上传数据的同时更新个人运动总数据
async function runRecord(event) 
{
    const op=db.command;
    await db.collection('run-distance')
    .add({
      data:{
        openid:event.openid,
        distance:event.distance,
        runTime:event.runTime,
        calorie:event.calorie,
        step_number:event.step_number,
        stride:event.stride,
        time:event.time,
      }
    })
    .then(res=>{
      console.log("跑步数据上传成功");
    })
    var storage=
    await db.collection('total_run').where({
         openid:event.openid,
    })
    .get()   //获取上一次的跑步距离
    await db.collection('total_run').where(
      {
        openid:event.openid,
      }
    )
    .update({
    data:{
    total_calorie:op.inc(event.calorie),
    total_distance:op.inc(event.distance),
    total_time:op.inc(event.total_time),
    avaerage_speed:(storage.data[0].total_distance+event.distance)/(storage.data[0].total_time+event.runTime),
    number:op.inc(1),
    }
  })
}
//查询所有跑步记录
async function get_runRecord(event)
{
  const MAX_LIMIT=100; //每次查询最大次数为100
  let result=await db.collection('run-distance')
  .count();//求出总数，防止数量过大引起的查询错误
  const total=result.total;
  const batchTimes=Math.ceil(total/100); //计算查询次数,向上取整
  let task=[];
  for(let i=0;i<batchTimes;i++){
      const promise=db.collection('run-distance').where(
      {
        openid:event.openid
      }
      )
      .get()
      task.push(promise);
  }
  //all操作用于等待异步操作数组全部完成，reduce用于合并，其实就是数组相加
  return (await Promise.all(task)).reduce((acc, cur) => { 
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}
/*获取跑步总数据
*/
 function get_total(event){
return db.collection('total_run').where({
  openid:event.openid,
})
.get()
}
/**
 * 获取用户的所有待处理消息
 */
function get_information(event){
  // 通知类信息
  if(event.type1==1)
 { 
   return db.collection('user_information').where({
    openid:event.openid,
    type:1,
  })
  .get()
}
else if(event.type1==0)
{
  return db.collection('user_information').where({
    openid:event.openid,
    type:0,
  })
  .get()
}
}