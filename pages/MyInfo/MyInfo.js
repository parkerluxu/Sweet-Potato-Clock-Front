// pages/MyInfo/MyInfo.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderItems: [
      {
        typeId: 0,
        name: '打卡天数',
        content:Number
      },
      {
        typeId: 1,
        name: '打卡时长',
        content: Number
      },
      {
        typeId: 2,
        name: '连续天数',
        content: Number
      }
    ],
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
      url: 'http://127.0.0.1:8080/userinformation/getuserinformationbyuserid',
      data: {
        userid: '1'
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.userinformation);
        var value = res.data.userinformation;
        var item0 = 'orderItems[' + 0 + '].content';
        var item1 = 'orderItems[' + 1 + '].content';
        var item2 = 'orderItems[' + 2 + '].content';
          that.setData({
            [item0]:value.daysSum,
            [item1]:value.score,
            [item2]:value.minutesSum
          })
      },
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

  //getUserInfo
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})