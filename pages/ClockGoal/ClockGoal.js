var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    tag: ["学习", "运动", "工作", "自定义"],
    tagIndex: 0,
    hiddenName: false,
    reply: false,
    duration: "00:10",
    unit: ["天", "周", "月"],
    unitIndex: 0
  },

  inputBind: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  query: function () {

  },
  bindTagChange: function (e) {
    console.log('选择', this.data.tag[e.detail.value])
    if (e.detail.value == 3) {
      this.setData({
        reply: true,
        hiddenName: true
      })
    } else {
      this.setData({
        reply: false,

      })
    }
    this.setData({
      tagIndex: e.detail.value
    })
  },

  bindDurationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  bindUnitChange: function (e) {
    console.log('picker发生选择改变，携带值为', e.detail.value);

    this.setData({
      unitIndex: e.detail.value
    })
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


  clock_search: function () {
    wx.navigateTo({
      url: '../ClockSearch/ClockSearch',
    })
  },

  group_detail: function () {
    wx.navigateTo({
      url: '../GroupDetail/GroupDetail',
    })
  }
})