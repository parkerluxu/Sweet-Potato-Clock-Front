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
    that.setData({

    })
    this.data.intervarID = setInterval(function () {
      if (countDownNum == 0) {    //时间结束
        clearInterval(that.data.intervarID);
      }
      countDownNum--;
      let m = Math.floor(countDownNum / 60);
      let s = countDownNum % 60;
      that.setData({
        minutes: m,
        seconds: s,
      })
    }, 1000)
  }

})