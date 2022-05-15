const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
exports.main=async(event,context)=>{
    switch(event.option){
    case'create_club':
    {
        return create_club(event);
    }
    break;
    case'find_club':
    {
        return find_club(event);
    }
    break;
    }
}
/*创建社团，包括社团号club_number,为社团的唯一标识；以及社团名称club_name,初始化创建人为社团团长club_master
/* 其他用户信息均以openid存储，为唯一标识
*/
async function create_club(event){
 let result1=await db.collection('run_club').where({
    club_name:event.club_name,
})
.get()
let result2=await db.collection('run_club').where({
    commander_id:event.openid,  //一个人只能创建一个跑团
})
.get()
let flag=0;
if(result1.data.length==0)
   create(event);  //当前名称未被使用，可以创建
 if(result2.data.length==0)
   flag=1;
return{
    result:result1,
    flag:flag,
}
}
function create(event){
    console.log("dqedq");
    db.collection('run_club').add({
        data:{
        club_name:event.club_name,
        commander_id:event.openid,
        club_introduction:event.text,
        member_id:[event.openid],
        }
    })
}
/**
 * 查找该社团是否存在
 */
function find_club(event){
return db.collection('run_club').where({
    club_name:event.club_name,
})
.get()
}
/**
 * 新增成员
 */