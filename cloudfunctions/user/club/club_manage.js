const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const op=db.command;
/**
 * 社团状态：0代表尚未处理，也就是未发出加入社团请求 ;1代表正在请求加入社团，但还未同意
 * 2代表已经是社团的正式成员;  3代表为某跑团的团长
 */
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
    case'add_member':{
        return add_member(event);
    }
    break;
    case'process_queue':{
        return process_queue(event);
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
db.collection('user').where({
    openid:event.openid,
})
.update({
    data:{
        club_join:3,    //表示该人员为团长
    }
})
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
        waiting_queue:[],  //增加消息队列，用于团长确认加入跑团
        }
    })
    /**更新用户社团状态，3代表团长 */
    db.collection('user').where({
        openid:event.openid,
    })
    .update({
        data:{
            club_join:3,    
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
 * 新增成员到等待队列内,后续等待团员确认
 */
function add_member(event){
    db.collection('user').where({
        openid:event.openid,
        club_join:0,   //表示还未加入社团
    })
   .get()
   .then(function(res){
       if(res.data.length!=0)
       add_member1(event);
   })
}
function add_member1(event){
    var today=new Date().toDateString();
    console.log(today);
    db.collection('run_club').where({
        club_name:event.club_name,
    })
    .update({
    data:{
       waiting_queue:op.push({'name':event.nickname,'time':today,'openid':event.openid}),
    }
    })
    /** */
    db.collection('user').where({
        openid:event.openid,
    })
    .update({
    data:{
    club_join:1,    //表示该用户处于处理状态，暂不能加入其他社团
    }
    })
    console.log("ss11");
    /**  加入消息队列*/
    db.collection('run_club').where({
        club_name:event.club_name,
    })
    .get()
    .then(function(res){
        console.log(res);
        send_message(res.data[0].commander_id,event);
    })
}
/**
 * 将等待队列中的事件传送给跑团团长，等待团长处理
 */
 function send_message(user_id,event){
    var today=new Date().toDateString();
    console.log("ss")
    db.collection('user_information').add({
        data:{
        openid:user_id,
        waiting_id:event.openid,
        nickname:event.nickname,
        time:today,
        type:1,  //表示该消息为社团消息
        }
    })
}
/**
 * 该函数用于处理等待队列内的请求，同意或拒绝团员发出的请求
 */
function process_queue(event){
db.collection('user_information').where({
    openid:event.openid,
    type:1,
})
.remove()
db.collection('user').where({
    openid:event.openid,
})
.update({
    data:{
        club_join:event.change_join,   //改变用户社团状态，根据输入决定
    }
})
if(event.change_join==2)
{
    db.collection('run_club').where({
        commander_id:event.commander_id,
    })
    .update({
        data:{
            member_id:op.push(event.openid),
        }
    })
}
}