// pages/clock/clock.js
const util = require('../../utils/util.js')
const defaultLogName = {
  work: '工作',
  rest: '休息'
}
const actionName = {
  stop: '停止',
  start: '开始'
}

const initDeg = {
  left: 45,
  right: -45,
}

Page({

  data: {
    remainTimeText: '',
    timerType: 'work',
    log: {},
    completed: false,
    isRuning: false,
    leftDeg: initDeg.left,
    rightDeg: initDeg.right,
    minutesLimit:Number,
    imageSrc: ['../images/clock-tree1.png', '../images/clock-tree2.png', '../images/clock-tree3.png'],
    imageindex:0,
    buttonText:'开始',
  },

  onLoad:function(option){
    this.setData({
      clockName: option.clockName,
      minutesLimit: option.minutesLimit,
      goalId: option.id,
    });
  },

  onShow: function () {
    if (this.data.isRuning) return
    let workTime = util.formatTime1(this.data.minutesLimit, 'HH')
    this.setData({
      workTime: workTime,
      remainTimeText: workTime + ':00',
    })
  },

//设置该目标打卡时间
  goal_of_time: function (e) {
    let workTime = util.formatTime1(e.detail.value, 'HH')
    this.setData({
      workTime: e.detail.value,
      remainTimeText: workTime+":"+"00"
    })
    if (e.detail.value<30){
      this.setData({
        imageindex:0,
      })
    } else if (e.detail.value<60){
      this.setData({
        imageindex: 1,
      })
    }else{
      this.setData({
        imageindex: 2,
      })
    }
  },

  startTimer: function (e) {
    let startTime = Date.now()
    let isRuning = this.data.isRuning
    let showTime = util.formatTime1(this.data.workTime, 'HH')
    let keepTime = showTime * 60 * 1000
    if (!isRuning) {
      this.timer = setInterval((function () {
        this.updateTimer()
        this.startNameAnimation()
      }).bind(this), 1000)
      this.setData({
        buttonText: '取消'
      })
    } else {
      this.stopTimer()
      this.setData({
        buttonText: '开始'
      })
    }

    this.setData({
      isRuning: !isRuning,
      completed: false,
      remainTimeText: showTime + ':00',
    })
    
    this.data.log = {
      startTime: Date.now(),
      keepTime: keepTime,
      endTime: keepTime + startTime,
      action: actionName[isRuning ? 'stop' : 'start'],
    }
  },

  startNameAnimation: function () {
    let animation = wx.createAnimation({
      duration: 450
    })
    animation.opacity(0.2).step()
    animation.opacity(1).step()
    this.setData({
      nameAnimation: animation.export()
    })
  },

  stopTimer: function () {
    // reset circle progress
    var that=this
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right
    })

    // clear timer
    this.timer && clearInterval(this.timer)

    //completeGoal
    wx.request({
      url: 'http://localhost:8080/record/goalcomplete',
      method:'POST',
      data:{
        goalId:that.data.goalId,
        userId:wx.getStorageSync('openid'),
        minutes:that.data.workTime,
      },
      success:function(res){
        console.log(res.data)
        clearInterval(that.data.intervarID);
        var pages = getCurrentPages(); //当前页面栈
        if (pages.length > 1) {
          var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
          beforePage.onLoad(); //触发父页面中的方法
          var toastText = "打卡成功";
          wx.showToast({
            title: toastText,
            icon: 'success',
            duration: 1000
          });
        }
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
  },

  updateTimer: function () {
    let log = this.data.log
    let now = Date.now()
    let remainingTime = Math.round((log.endTime - now) / 1000)
    let H = util.formatTime1(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
    let M = util.formatTime1(Math.floor(remainingTime / (60)) % 60, 'MM')
    let S = util.formatTime1(Math.floor(remainingTime) % 60, 'SS')
    let halfTime

    // update text
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      this.setData({
        remainTimeText: remainTimeText
      })
    } else if (remainingTime == 0) {
      this.setData({
        completed: true
      })
      this.stopTimer()
      return
    }

    // update circle progress
    halfTime = log.keepTime / 2
    if ((remainingTime * 1000) > halfTime) {
      this.setData({
        leftDeg: initDeg.left - (180 * (now - log.startTime) / halfTime)
      })
    } else {
      this.setData({
        leftDeg: -135
      })
      this.setData({
        rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
      })
    }
  },

  onUnload: function () {
    // clear timer
    this.timer && clearInterval(this.timer)
  },

  onHide: function () {
    // clear timer
    this.timer && clearInterval(this.timer)
  },

})
