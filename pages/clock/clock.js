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
var areaWidth //滑块移动区域宽度
var viewWidth //滑块宽度
var viewX, viewX0, viewX1 //滑块左边界坐标
var workTime
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
    canMove: true,
    canSet: true,
  },


  move: function (e) {
    var query = wx.createSelectorQuery()
    query.select('#movable-view').boundingClientRect(function (rect) {
      viewX = rect.left
      viewX1 = viewX
      console.log("viewX1------->", viewX1)
    }).exec()

    //时间
    workTime = Math.round((viewX1 - viewX0) / (areaWidth - viewWidth) * (99 - this.data.minutesLimit)) + parseInt(this.data.minutesLimit)
      this.setData({
        workTime: workTime,
      })
      var e = {
        detail:{
          value:workTime
        }
      }
    this.goal_of_time(e)
  },
  moveend: function (e) {
    
  },

  onLoad:function(option){
    console.log(option)
    this.setData({
      clockName: option.clockName,
      minutesLimit: option.minutesLimit,
      goalId: option.id,
    });
    var query = wx.createSelectorQuery()
    //第一次进来应该获取节点信息，用来计算滑块长度
    if ( viewWidth == undefined || viewWidth == null || viewX == undefined || viewX == null) {
      setTimeout(function () { //代码多的情况下需要延时执行，否则可能获取不到节点信息
        //获取movable的宽度，计算改变进度使用
        query.select('#movable-area').boundingClientRect(function (rect) {
          areaWidth = rect.width
          console.log("areaWidth------->", areaWidth)
        }).exec()
        query.select('#movable-view').boundingClientRect(function (rect) {
          viewWidth = rect.width // 节点的宽度
          console.log("viewWidth------->", viewWidth)
        }).exec()
        query.select('#movable-view').boundingClientRect(function (rect) {
          viewX = rect.left
          viewX0 = viewX
          console.log("viewX0------->", viewX0)
        }).exec()
      }, 1000)
    }
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


  getFormID: function (e) {
    var formId = e.detail.formId
    wx.request({
      url: 'https://localhost:8080/addFormId',
      method: 'GET',
      data: {
        userId: wx.getStorageSync('openid'),
        formId: formId,
      },
      success: function (res) {
        console.log(res)
      }
    })
  },

  startTimer: function (e) {
    var formId=e.detail.formId
    let startTime = Date.now()
    let isRuning = this.data.isRuning
    let showTime = util.formatTime1(this.data.workTime, 'HH')
    let keepTime = showTime * 60 * 1000
    if (isRuning==false) {
      this.timer = setInterval((function () {
        this.updateTimer()
        this.startNameAnimation()
      }).bind(this), 1000)
      this.setData({
        buttonText: '取消',
        isRuning:true,
      })
      this.data.log = {
        startTime: Date.now(),
        keepTime: keepTime,
        endTime: keepTime + startTime,
        action: actionName[isRuning ? 'stop' : 'start'],
      }
    } else {
      this.stopTimer()
      this.setData({
        buttonText: '开始'
      })
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
    var that=this
    //completeGoal
    if(that.data.completed==true){
      // reset circle progress
      this.setData({
        leftDeg: initDeg.left,
        rightDeg: initDeg.right
      })
      // clear timer
      this.timer && clearInterval(that.timer)
      wx.request({
        url: 'https://clock.dormassistant.wang:8080/record/goalcomplete',
        method: 'POST',
        data: {
          goalId: that.data.goalId,
          userId: wx.getStorageSync('openid'),
          minutes: that.data.workTime,
        },
        success: function (res) {
          console.log(res.data)
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
    }else{
      wx.showModal({
        title: '取消打卡',
        content: '确认要取消吗？',
        success:function(e){
          if(e.confirm){
            // reset circle progress
            that.setData({
              leftDeg: initDeg.left,
              rightDeg: initDeg.right,
              remainTimeText: that.data.workTime + ":00",
              isRuning:false,
            })
            // clear timer
            that.timer && clearInterval(that.timer)
          }else{
            that.setData({
              buttonText: '取消',
            })
          }
        }
      })
    }
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
    // reset circle progress
    that.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right,
      remainTimeText: that.data.workTime + ":00",
      isRuning: false,
      buttonText: '开始',
    })
    // clear timer
    that.timer && clearInterval(that.timer)
  },

  onHide: function () {

  },

})
