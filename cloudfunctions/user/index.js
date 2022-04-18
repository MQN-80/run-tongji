// 云函数入口文件
const basicId = require('./basicID/basic.js');
const cloud = require('wx-server-sdk')
// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
      case 'basicId':
        return await basicId.main(event, context);
        break;
      case 'is_Find':
        return await basicId.main(event,context);
        break;
    }
}