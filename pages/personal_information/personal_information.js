// pages/personal_information/personal_information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: wx.getStorageSync('openid'),
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderItems: [{
        typeId: 0,
        image_url:'../images/rili.svg',
        content: Number,
        contentText: String
      },
      {
        typeId: 1,
        image_url: '../images/naozhong.svg',
        content: Number,
        contentText: String
      },
      {
        typeId: 2,
        image_url: '../images/potato.svg',
        content: Number,
        contentText: String
      },
    ],

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
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/userinformation/userinformation',
      data: {
        userid: wx.getStorageSync('openid'),
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data.userinformation);
        var value = res.data.userinformation; 
        var daysSum = value.daysSum + '天';
        var minutesSum = value.minutesSum + '分钟';
        var numberOfPotato=res.data.numberOfPotato+'个';
        var item0 = 'orderItems[' + 0 + '].contentText';
        var item1 = 'orderItems[' + 1 + '].contentText';
        var item2 = 'orderItems[' + 2 + '].contentText';
        that.setData({
          [item0]: daysSum,
          [item1]: minutesSum,
          [item2]:numberOfPotato
        })
      },
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
  changeToTree: function() {
    wx.navigateTo({
      url: '../album/album',
    })
  },
  changeToRecord: function() {
    wx.navigateTo({
      url: '../record/record',
    })
  }
})