// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordInfo: [],
    count:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      recordInfo: null,
      count:0,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    var that = this
    that.setData({
      recordInfo: null
    })
    console.log(options)
    var dateStr = options
    if (options != null) {
      wx.request({
        url: 'http://localhost:8080/displayrecord/displayrecordbydate',
        method: 'GET',
        data: {
          userid: wx.getStorageSync('openid'),
          date: dateStr,
        },
        success: function(res) {
          console.log(res.data)
          var recordList = res.data.recordList;
          var goalList = res.data.goalList;
          for (var i = 0; i < recordList.length; i++) {
            var year = 'recordInfo[' + i + '].year'
            var month = 'recordInfo[' + i + '].month'
            var day = 'recordInfo[' + i + '].day'
            var hour = 'recordInfo[' + i + '].hour'
            var timeMinute = 'recordInfo[' + i + '].timeMinute'
            var minutes = 'recordInfo[' + i + '].minutes'
            var goal = 'recordInfo[' + i + '].content'
            var concentrated = 'recordInfo[' + i + '].concentrated'
            var year1 = (recordList[i].dateTime).substr(0, 4)
            var month1 = (recordList[i].dateTime).substr(5, 2)
            var day1 = (recordList[i].dateTime).substr(8, 2)
            var hour1 = (recordList[i].dateTime).substr(11, 2)
            var timeMinute1 = (recordList[i].dateTime).substr(14, 2)
            that.setData({
              [year]: year1,
              [month]: month1,
              [day]: day1,
              [hour]: hour1,
              [timeMinute]: timeMinute1,
              [minutes]: recordList[i].minutes,
              [goal]: goalList[i].content,
              [concentrated]: goalList[i].concentrated,
            })
          }
        }
      })
    }
    else{
      wx.request({
        url: 'http://localhost:8080/displayrecord/displayrecord',
        method: 'GET',
        data: {
          userid: wx.getStorageSync('openid'),
        },
        success: function (res) {
          console.log(res.data)
          var recordList = res.data.recordList;
          var goalList = res.data.goalList;
          for (var i = 0; i < recordList.length; i++) {
            var year = 'recordInfo[' + i + '].year'
            var month = 'recordInfo[' + i + '].month'
            var day = 'recordInfo[' + i + '].day'
            var hour = 'recordInfo[' + i + '].hour'
            var timeMinute = 'recordInfo[' + i + '].timeMinute'
            var minutes = 'recordInfo[' + i + '].minutes'
            var goal = 'recordInfo[' + i + '].content'
            var concentrated = 'recordInfo[' + i + '].concentrated'
            var year1 = (recordList[i].dateTime).substr(0, 4)
            var month1 = (recordList[i].dateTime).substr(5, 2)
            var day1 = (recordList[i].dateTime).substr(8, 2)
            var hour1 = (recordList[i].dateTime).substr(11, 2)
            var timeMinute1 = (recordList[i].dateTime).substr(14, 2)
            that.setData({
              [year]: year1,
              [month]: month1,
              [day]: day1,
              [hour]: hour1,
              [timeMinute]: timeMinute1,
              [minutes]: recordList[i].minutes,
              [goal]: goalList[i].content,
              [concentrated]: goalList[i].concentrated,
            })
          }
        }
      })
    }
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
  bindselect(e) {
    console.log(e.detail.ischeck)
  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    var that = this;
    let time = e.detail;
    console.log(time)
    var dateStr = time.year + "-" + time.month + "-" + time.date + " " + "08:00:00";
    console.log(dateStr)
    if(that.data.count!=0){
      that.onShow(dateStr);
    }
    that.setData({
      count:1,
    })
  }
})