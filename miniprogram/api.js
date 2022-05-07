const ApiRootUrl = 'http://www.28jy10gtt.cn/api/'; //调用后端api
var app=getApp();
async function judge(appid)
{
    let a;
    wx.cloud.callFunction({
        // 云函数名称
        name: 'user',
        // 传给云函数的参数
        data: {
          type:'is_Find',
          openid:appid,
        },
        success: function(res) {
          console.log(res.result.data.length,"ddd");
          a=res.result.data.length;
        
          return Promise.resolve(a);
        },
        fail: console.error
      })
}
module.exports.judge=judge;
