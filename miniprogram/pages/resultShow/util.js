  var app=getApp();
  export async function drawPoint(key_position,ctx,j,length){    //画点,j选择展示的关节点，length移动位置
    var i=0;
    var key_position=app.globalData.key_position; //用三维数组存储关键点位置
    var angle_num=app.globalData.angle_num;  
    for(;i<key_position.length-1;i++)
    {
      ctx.beginPath()   //创造路径
      ctx.arc(i, key_position[i][j][0], 4, 0, 2 * Math.PI)
      ctx.setFillStyle('red')
      ctx.fill()  
    }
  }
  export async function coord1(key_position){  //绘制坐标轴
    var i=0;
    for(;i<key_position.length;i++)
      {
          
      }
  }
  export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
  }
  
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
  }