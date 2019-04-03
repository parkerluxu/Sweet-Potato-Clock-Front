Page({
  data: {
    intervarID: '',//定时器名字
    minutes: 0,
    seconds: 0,
    countDownNum: 0
  },
  //设置今天打卡时间
  goal_of_time: function (e) {
    this.setData({
      minutes: e.detail.value,

    })
  },
  //开始打卡
  clock_start: function () {
    this.countDown();
  },

  countDown: function () {
    var that = this;
    var countdownnum = that.data.minutes * 60 + that.data.seconds;

    this.data.intervarID = setInterval(function () {
      if (countdownnum == 0) {    //时间结束,打卡完成
        clearInterval(that.data.intervarID);
        wx.showToast({
          title: '打卡成功',
          content: '../images/clock_success.png',
          
        })
        return null;
      }
      countdownnum--;
      var m = Math.floor(countdownnum / 60);
      var s = countdownnum % 60;
      that.setData({
        minutes: m,
        seconds: s,
      });
    }, 1000)
  }

})