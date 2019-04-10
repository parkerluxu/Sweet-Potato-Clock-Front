/*获取全局变量*/
var app=getApp()
var initData=app.text_goal_list
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text_goal_list: initData,
    inputValue: ""     //搜索值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  query: function () {   //搜索函数

  },

  clock_start: function () {   //开始打卡切换至目标列表页面
    wx.navigateTo({
      url: "../GroupList/GroupList",
    })
  }
})