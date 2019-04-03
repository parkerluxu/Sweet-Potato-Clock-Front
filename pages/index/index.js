/*获取全局变量*/
var initData=app.text_goal_list
Pages({
  data:{
    text_goal_list:initData,
    inputValue:""     //搜索值
  },
  query:function(){   //搜索函数

  },

  clock_start:function(){   //开始打卡切换至目标列表页面
    wx.navigateTo({
      url: 'pages/ClockList/ClockList',
    })
  }

})