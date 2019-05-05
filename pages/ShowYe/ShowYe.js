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
    list_1:[],
    list_2:[],
    listItem: {
      name: null,
      completion: null,
      is_clock: null,
      
    },
    groupList: [],
    string: null,
    isBindExpert:false,
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
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8080/goalcomplete/displaygoal',
      data: {
        userid: '1'
      },
      method: 'GET',
      success: function(res) {
        var list1 = res.data.groupList;
        var list2 = res.data.goalList;
        that.setData({
          list_1: list1,
          list_2: list2
        })
        var list_3 = [];
        if (list2 == null) {
          that.setData({
            isBindExpert:false,
            string: "您还未加入任何小组"
          })
        } else {
          for (var i = 0; i < list1.length; i++) {
            var _k1 = 'listItem.name';
            var _k3 = 'listItem.isClock';
            var _k4 = 'listItem.completion';
            var _k5 = 'list_1[i].groupName';
            var _k6 = 'list_1[i].minutes';
            var _k7 = 'list_2[i].isClocked';
            var _k8 = 'list_2[i].completion';
            that.setData({
              [_k1]: that.data.list_1[i].groupName,
              [_k3]: that.data.list_2[i].isClocked,
              [_k4]: that.data.list_2[i].completion
            });
            if (that.data.list_2[i].isClocked == 0) {
              var listItem = that.data.listItem;
              list_3.push(listItem);
            } else
              continue;
          }
          that.setData({
            isBindExpert:true,
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
  },
  query:function(){
    wx.navigateTo({
      url:"../GroupDetail/GroupDetail"
    })
  }
})