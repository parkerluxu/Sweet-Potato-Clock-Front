// pages/record/record.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    axis: [{
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
    recordInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? ("0" + (nowDate.getMonth() + 1)) : nowDate.getMonth() + 1;
    var day = nowDate.getDate() < 10 ? ("0" + nowDate.getDate()) : nowDate.getDate();
    var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minutes = nowDate.getMinutes() < 10? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var seconds = nowDate.getSeconds() < 10? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    var dateStr = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    console.log(dateStr);
    wx.request({
      url: 'http://localhost:8080/displayrecord',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('openid'),
        date: dateStr,
      },
      success: function (res) {
        console.log(res.data)
        var recordList = res.data.recordList;
        var goalList = res.data.goalList;
        for (var i = 0; i < recordList.length; i++) {
          var dateTime = 'recordInfo[' + i + '].dateTime'
          var minutes = 'recordInfo[' + i + '].minutes'
          var goal = 'recordInfo[' + i + '].content'
          that.setData({
            [dateTime]: recordList[i].dateTime,
            [minutes]: recordList[i].minutes,
            [goal]: goalList[i].content,
          })
        }
      }
    })
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