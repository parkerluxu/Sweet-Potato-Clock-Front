/*获取全局变量*/
const app=getApp();
Page({
  data:{
    text_goal_list_new:['sad','sda','sadc','scsw','sdas','eewr','fgfg','fd','zcxzc','cvdfv','yrty'],
    inputValue:"" ,
    src_route:'../images/search.png'  //搜索值
  },

  

  clock_start:function(){   //开始打卡切换至目标列表页面
    wx.navigateTo({
      url: '../ClockList/ClockList',
    })
  }

})