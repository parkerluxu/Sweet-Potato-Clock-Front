const app=getApp();
Page({
  data:{
    text_goal_list_new:["asd","asdas","adasd"]
  },
  change_to_clock_start:function(){
    wx.navigateTo({
    url: '../ClockStart/ClockStart',
})
  }
})