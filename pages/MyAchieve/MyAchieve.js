// pages/MyAchieve/MyAchieve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '1',
    achieveList: [],
    row: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    this.setData({
      userId: option.userId
    });
    console.log(option.query);
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
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/achievelist/getachievelistbyuserid',
      data: {
        userid: that.data.userId
      },
      method: 'GET',
      success: function(res) {
        var list = res.data.achieveList;
        if (list == null) {} else {
          that.setData({
            achieveList: list,
            row: list.length / 3
          });
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

  }
})