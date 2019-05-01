/*获取全局变量*/
var app = getApp()
var initData = app.text_goal_list
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    src_route: '../images/search.png', //搜索值
    groupItem: {
      name: null,
      completion: null,
      is_clock: null,
    },
    groupList: [],
    string: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.request({
      url: 'http://127.0.0.1:8080/goalcomplete/displaygoal',
      data: {
        userid: '1'
      },
      method: 'GET',
      success: function(res) {
        var list_1 = res.data.groupList;
        var list_2 = res.data.goalList;
        var list_3 = [];
        if (list_2 == null) {
          that.setData({
            string: "您还未加入任何小组"
          })
        } else {
          for (var i = 0; i < list_1.length; i++) {
            that.setData({
              [groupItem.name]: list_1[i].groupName,
              [groupItem.completion]: list_2[i].completion,
              [groupItem.is_clock]: list_2[i].isClocked
            })
            var groupItem = that.data.groupItem;
            list_3.push(groupItem);
          }
          that.setData({
            groupList: list_3
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  query: function() { //搜索函数

  },
  clock_start: function() { //开始打卡切换至目标列表页面
    wx.navigateTo({
      url: "../ClockList/ClockList",
    })
  }
})