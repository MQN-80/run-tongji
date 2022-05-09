const cloud = require('wx-server-sdk');

cloud.init();
let flag=1;
const db = cloud.database();
exports.main= async(event,context)=>{
    switch(event.type){
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
      }
    }
// 创建集合云函数入口函数
async function add(event){
    await db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: event.openid,
        nickname:event.nickname
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
async function runRecord(event) 
{
    await db.collection('run-distance').add({
      data:{
        distance:event.distance,
        runTime:event.runTime,
        calorie:event.calorie,
        step_number:event.step_number,
        stride:event.stride,
        time:event.time,
        location:event.location, //经纬度数组，用于存放路径
      }
    })
    .then(res=>{
      console.log("跑步数据上传成功");
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
