// pages/ClockStart/ClockStart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clockName:"",
    minutesLimit:0,
    intervarID: '', //定时器名字
    minutes: 0,
    seconds: 0,
    countDownNum: 0,
    x:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {

      this.setData({
        clockName:option.clockName,
        minutesLimit:option.minutesLimit
      });
  
      console.log(option.query);


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
  //设置今天打卡时间
  goal_of_time: function (e) {
    this.setData({
      minutes: e.detail.value


    })
  },
  //开始打卡
  clock_start: function () {
    var that = this;
    var sum = that.data.minutes * 60;
    this.data.intervarID = setInterval(function () {
      if (sum == 0) {

        clearInterval(that.data.intervarID);
      }
      let m = Math.floor(sum / 60);
      let s = sum % 60;
      sum--;
      that.setData({
        minutes: m,
        seconds: s
      })
    }, 1000)
  }

})