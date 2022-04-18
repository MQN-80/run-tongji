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