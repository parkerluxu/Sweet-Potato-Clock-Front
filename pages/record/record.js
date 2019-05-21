// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    axis: [
      {
        date: '2018-2-15',
        time: '15:28',
        name: '张三',
        event: '垃圾太多'
      },
      {
        date: '2018-2-15',
        time: '15:28',
        name: '王三',
        event: '垃圾太多'
      },
      {
        date: '2018-2-15',
        time: '15:28',
        name: '张三',
        event: '垃圾太多'
      },
      {
        date: '2018-2-15',
        time: '15:28',
        name: '张三',
        event: '垃圾太多'
      },
    ],
     selected: [
      {
        date: '2018-5-21'
      }, {
        date: '2018-5-22'
      },{
        date: '2018-5-24'
      },{
        date: '2018-5-25'
      }
    ]
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
  bindselect(e) {
    console.log(e.detail.ischeck)
  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    let time = e.detail;
    console.log(time)

  }
})