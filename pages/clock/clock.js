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
  },

  onShow: function () {
    if (this.data.isRuning) return
    let workTime = util.formatTime1(2, 'HH')
    this.setData({
      workTime: '02',
      remainTimeText: workTime + ':00',
      minutesLimit:1,
    })
  },

//设置该目标打卡时间
  goal_of_time: function (e) {
    let workTime = util.formatTime1(e.detail.value, 'HH')
    this.setData({
      workTime: e.detail.value,
      beginMinutes: e.detail.value,
      remainTimeText: workTime+":"+"00"
    })
    if (e.detail.value<15){
      this.setData({
        imageindex:0,
      })
    } else if (e.detail.value<30){
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
    let timerType = e.target.dataset.type
    let showTime = util.formatTime1(this.data.workTime, 'HH')
    let keepTime = showTime * 60 * 1000
    let logName = this.logName || defaultLogName[timerType]
    if (!isRuning) {
      this.timer = setInterval((function () {
        this.updateTimer()
        this.startNameAnimation()
      }).bind(this), 1000)
    } else {
      this.stopTimer()
    }

    this.setData({
      isRuning: !isRuning,
      completed: false,
      timerType: timerType,
      remainTimeText: showTime + ':00',
      taskName: logName
    })
    
    this.data.log = {
      name: logName,
      startTime: Date.now(),
      keepTime: keepTime,
      endTime: keepTime + startTime,
      action: actionName[isRuning ? 'stop' : 'start'],
      type: timerType
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
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right
    })

    // clear timer
    this.timer && clearInterval(this.timer)
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


})
