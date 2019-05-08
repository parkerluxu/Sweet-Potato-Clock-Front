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
    list_1: [],
    list_2: [],
    groupList: [],
    string: null,
    isBindExpert: false,
    
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
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/goalcomplete/displaygoal',
      data: {
        userid: wx.getStorageSync('openid')
      },
      method: 'GET',
      success: function (res) {
        var list1 = res.data.groupList;
        var list2 = res.data.goalList;
        that.setData({
          list_1: list1,
          list_2: list2,
        })
        if (list2 == null) {
          that.setData({
            isBindExpert: false,
            string: "您还未加入任何小组"
          })
        } else {
          for (var i = 0; i < that.data.list_2.length; i++) {
            var _k1 = 'groupList[' + i + '].name';
            var _k3 = 'groupList[' + i + '].isClock';
            var _k4 = 'groupList[' + i + '].completion';
            var _k5='groupList['+i+'].showCompletion';
            var _k6 = 'groupList[' + i + '].color';
            var _k7 = 'groupList[' + i + '].groupId'
            var completeRate = that.data.list_2[i].completion * 100
            that.setData({
              [_k1]: that.data.list_1[i].groupName,
              [_k3]: that.data.list_2[i].isClocked,
              [_k4]: that.data.list_2[i].completion,
              [_k5]:completeRate.toFixed(2),
              [_k7]: that.data.list_1[i].groupId,
            });
            if (that.data.list_2[i].isClocked == 1) {
              that.setData({
                [_k3]: '已打卡',
                [_k6]:"#beedff"
              });
            } else {
              that.setData({
                [_k3]: '未打卡',
                [_k6]:"000000"
              });
            }
          }
          that.setData({
            isBindExpert: true,
          })
        }
      }
    })
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

  query: function () { //搜索函数

  },
  clock_start: function () { //开始打卡切换至目标列表页面
    wx.navigateTo({
      url: "../ClockList/ClockList",
    })
  },

  toGroupDetail:function(e){
    wx.navigateTo({
      url: '../GroupDetail/GroupDetail?groupid=' + e.currentTarget.dataset.groupid,
    })
  },

  query: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/search/searchbygroupname',
      method: 'GET',
      data: {
        groupName: that.data.inputValue
      },
      success: function (res) {
        var localGroupList = res.data.groupList;
        if (localGroupList == null) {
          var tosatText = "搜索结果不存在";
          wx.showToast({
            title: 'toastText',
            icon: '',
            duration: 2000
          });
        } else {
          wx.navigateTo({
            url: '../GroupList/GroupList?groupList=localGroupList',
          })
        }
      }
    })
  }
})