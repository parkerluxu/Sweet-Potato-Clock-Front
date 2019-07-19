// pages/home-page/home-page.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    /**
     * 以_1结尾的数组表示那些今天不需要打卡的目标
     */

    /**
     * 特别说明，变量以_1结尾的是服务于添加目标的，不加是服务于修改目标的
     */



    clock: [],
    plan: [],
    clock_1: [],

    plan_1: [],

    dates: [{
        name: "Sun",
        index: "0",
        selected: false
      },
      {
        name: "Mon",
        index: "1",
        selected: false
      },
      {
        name: "Tue",
        index: "2",
        selected: false
      },
      {
        name: "Wed",
        index: "3",
        selected: false
      },
      {
        name: "Thu",
        index: "4",
        selected: false
      },
      {
        name: "Fri",
        index: "5",
        selected: false
      },
      {
        name: "Sat",
        index: "6",
        selected: false
      },
    ],
    hiddenbtn: true,
    showModalStatus: false,
    ptColor: "#ffae49",
    pbgColor: "#fff",
    ctColor: "#ffae49",
    cbgColor: "#fff",
    distime: true,
    textColor: "#000",
    tborder: "2rpx dashed #ffae49",
    input: "",
    ibColor: "#e9833e",
    selectIndex: 0,
    hiddenDate: true,
    goal: {
      minutes: Number,
      isConcentrate: Boolean,
    },
    disposable: false,
    inputValue: "请输入目标名称",
    timeValue: "时长(10~120)",
    disposable_1: false,
    inputValue_1: "请输入目标名称",
    timeValue_1: "时长(10~120)",
    selectIndex_1: 0,
    hiddenbtn_1: true,
    showModalStatus_1: false,
    ptColor_1: "#ffae49",
    pbgColor_1: "#fff",
    ctColor_1: "#ffae49",
    cbgColor_1: "#fff",
    distime_1: true,
    textColor_1: "#000",
    tborder_1: "2rpx dashed #ffae49",
    input_1: "",
    ibColor_1: "#e9833e",
    hiddenDate_1: true,
    dates_1: [{
        name: "Sun",
        index: "0",
        selected: false
      },
      {
        name: "Mon",
        index: "1",
        selected: false
      },
      {
        name: "Tue",
        index: "2",
        selected: false
      },
      {
        name: "Wed",
        index: "3",
        selected: false
      },
      {
        name: "Thu",
        index: "4",
        selected: false
      },
      {
        name: "Fri",
        index: "5",
        selected: false
      },
      {
        name: "Sat",
        index: "6",
        selected: false
      },
    ],
    goalId: Number,
    startX: 0, //开始坐标

    startY: 0,
    //储存目标的原始信息，用来判断用户是否对目标进行了修改
    cbgColor_0: String,
    goalName: String,
    selectIndex_0: 0,
    timeValue_0: 0,
    periodList_0: [],
    canModify: true,
    color_0: "#979797",
    goalName_0: String,
    chooseWhichGoal: String,

  },

  //选择“一次”、“每天”、“自定义”
  selectOnce: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    if (index == that.data.selectIndex_0) {
      that.setData({
        canModify: true,
        color_0: "#979797",
      })
    } else {
      that.setData({
        canModify: false,
        color_0: "#ffae49",
      })
    }
    //如果自定义就打开星期选项
    if (index == 3) {
      this.setData({
        hiddenDate: false,
        disposable: false,
        'chooseWhichGoal.selectIndex': 3,
      })
      var periodList = that.data.chooseWhichGoal.period;
      var dateList = that.data.dates;
      for (var i = 0; i < 7; ++i) {
        if (periodList[i] == 1) {
          dateList[i].selected = true;
        } else dateList[i].selected = false;
      }
      that.setData({
        dates: dateList
      })
    } else {
      this.setData({
        hiddenDate: true,
        disposable: false
      })
      //如果选择一次性，则把goalDate中的dispasable设为true
      if (index == 1) {
        that.setData({
          disposable: true,
          'chooseWhichGoal.selectIndex': 1,
        })
        console.log(that.data.disposable)
      }
      //如果选择每天，则把周一到周日都设为true
      if (index == 2) {
        for (var i = 0; i < that.data.dates.length; i++) {
          var dateSel = 'dates[' + i + '].selected'
          var item = 'chooseWhichGoal.period[' + i + ']'
          that.setData({
            [dateSel]: true,
            'chooseWhichGoal.selectIndex': 2,
            [item]: 1,
            'chooseWhichGoal.period[7]': 0,
          })
        }
        console.log(that.data.dates)
      }
    }
    this.setData({
      selectIndex: e.currentTarget.dataset.index
    })

  },
  //设置打卡周期
  selectDate: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.dates;
    var item = 'chooseWhichGoal.period[' + index + ']';
    if (arrs[index].selected == false) {
      arrs[index].selected = true;
      that.setData({
        [item]: 1,
      })
    } else {
      arrs[index].selected = false;
      that.setData({
        [item]: 0,
      })
    }
    this.setData({
      dates: arrs,
      hiddenDate: false
    })
    for (var i = 0; i < 7; ++i) {
      if (that.data.periodList_0[i].selected != arrs[i].selected) {
        that.setData({
          canModify: false,
          color_0: "#ffae49",
        })
        break;
      }
      if (i == 6) {
        that.setData({
          canModify: true,
          color_0: "#979797",
        })
      }
    }
    console.log(this.data.dates)
  },

  drawer: function(e) {
    var that = this;

    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },

  //确认，发送请求添加数据
  addGoal: function(e) {
    var that = this;
    that.setData({
      goalId: null,
    })
    if (that.data.goal.minutes < 10 && that.data.goal.isConcentrate == true) {
      wx.showToast({
        title: '时长过短',
        image: '../images/close.png',
        duration: 1000
      })
    } else if (that.data.goal.name == undefined || that.data.goal.name == "") {
      wx.showToast({
        title: '请输入目标',
        image: '../images/close.png',
        duration: 1000
      })
    } else if (that.data.goal.isConcentrate == undefined || that.data.goal.name == "") {

    } else {
      wx.request({
        url: 'https://clock.dormassistant.wang:8080/usergoal/addgoal',
        method: 'POST',
        data: {
          userId: wx.getStorageSync('openid'),
          content: that.data.goal.name,
          concentrated: that.data.goal.isConcentrate,
          minutes: that.data.goal.minutes,
        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            goalId: res.data.goalId,
          })
          wx.request({
            url: 'https://clock.dormassistant.wang:8080/goaldate/addgoaldate',
            method: 'POST',
            data: {
              goalId: that.data.goalId,
              sunday: that.data.dates_1[0].selected,
              monday: that.data.dates_1[1].selected,
              tuesday: that.data.dates_1[2].selected,
              wednesday: that.data.dates_1[3].selected,
              thursday: that.data.dates_1[4].selected,
              friday: that.data.dates_1[5].selected,
              saturday: that.data.dates_1[6].selected,
              disposable: that.data.disposable_1,
            },
            success: function(res) {
              that.onShow()
              that.setData({
                goal: null,
              })
              that.drawer_1(e);
            }
          })
        }
      })
    }

  },

  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function() {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 100)

    // 显示 
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  //选择了专注模式
  selectC: function() {
    var that = this;
    if (that.data.chooseWhichGoal.clockTime == 0) {
      that.setData({
        'chooseWhichGoal.clockTime': that.data.timeValue
      })
    }
    that.setData({
      'chooseWhichGoal.clockTime': that.data.chooseWhichGoal.clockTime,
      'chooseWhichGoal.clockName': that.data.chooseWhichGoal.planName,
      ctColor: "#fff",
      cbgColor: "#ffae49",
      ptColor: "#ffae49",
      pbgColor: "#fff",
      distime: false,
      textColor: "#000",
      tborder: "2rpx dashed #ffae49",
      ibColor: "#e9833e",
      'goal.isConcentrate': true,
    })

    if (that.data.cbgColor_0 == that.data.cbgColor) {
      that.setData({
        canModify: true,
        color_0: "#979797"
      })
    } else {
      that.setData({
        canModify: false,
        color_0: "#ffae49"
      })
    }
    console.log(that.data.goal.isConcentrate)
  },
  //选择了计划模式
  selectP: function() {
    var that = this;
    that.setData({
      'chooseWhichGoal.planName': that.data.chooseWhichGoal.clockName,
      'chooseWhichGoal.clockTime': 0,
      ptColor: "#fff",
      pbgColor: "#ffae49",
      ctColor: "#ffae49",
      cbgColor: "#fff",
      distime: true,
      textColor: "#979797",
      tborder: "2rpx dashed #979797",
      input: "",
      ibColor: "#979797",
      'goal.isConcentrate': false,
    })
    if (that.data.cbgColor_0 == that.data.cbgColor) {
      that.setData({
        canModify: true,
        color_0: "#979797"
      })
    } else {
      that.setData({
        canModify: false,
        color_0: "#ffae49"
      })
    }
    console.log(that.data.goal.isConcentrate)
  },

  //设置目标名称
  setGoalName: function(e) {
    console.log(e.detail.value)
    var that = this
    that.setData({
      'goal.name': e.detail.value,
    })
    if (e.detail.value.length == 0) {
      that.setData({
        'goal.name': that.data.goalName,
      })
    }
    if (that.data.chooseWhichGoal.clockTime == 0) {
      that.setData({
        'chooseWhichGoal.planName': that.data.goal.name,
      })
    } else {
      that.setData({
        'chooseWhichGoal.clockName': that.data.goal.name,
      })
    }
    if (that.data.goalName == that.data.goal.name) {
      that.setData({
        canModify: true,
        color_0: "#979797"
      })
    } else {
      that.setData({
        canModify: false,
        color_0: "#ffae49"
      })
    }
  },

  //设置目标时间
  setGoalMinutes: function(e) {
    var that = this
    console.log(e.detail.value)
    var minutes = parseInt(e.detail.value)
    that.setData({
      'goal.minutes': minutes,
      'chooseWhichGoal.clockTime': minutes,
    })
    if (that.data.timeValue_0 == that.data.timeValue) {
      that.setData({
        canModify: true,
        color_0: "#979797"
      })
    } else {
      that.setData({
        canModify: false,
        color_0: "#ffae49"
      })
    }
  },

  hidebtn: function() {
    var that = this;
    that.setData({
      hiddenbtn: (!that.data.hiddenbtn)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    options.hiddenbtn == "true" ? true : false
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var date = new Date()
    let showTime = util.formatTime(date)
    let showDate = showTime.substr(0, 10)
    that.setData({
      date: showDate,
      clock: null,
      clock_1: null,
      plan: null,
      plan_1: null,
    })
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/displaygoal/displaygoal',
      method: 'GET',
      data: {
        userId: wx.getStorageSync('openid')
      },
      success: function(res) {
        console.log(res.data.goalList)
        var goalList = res.data.goalList;
        var periodOfGoalList = res.data.periodOfGoalList;
        var goalNoTodayList = res.data.goalNoTodayList;
        var periodOfGoalNoTodayList = res.data.periodOfGoalNoTodayList;
        if (goalList.length == 0 && goalNoTodayList.length == 0) {
          that.setData({
            noData: true,
          })
        } else {
          that.setData({
            noData: false,
          })
        }
        var clockNum = 0
        var planNum = 0;
        var clockNum_1 = 0;
        var planNum_1 = 0;
        for (var i = 0; i < goalList.length; i++) {
          var clockName = 'clock[' + clockNum + '].clockName'
          var clockId = 'clock[' + clockNum + '].goalId'
          var clockTime = 'clock[' + clockNum + '].clockTime'
          var clockComplete = 'clock[' + clockNum + '].isComplete'
          var periodOfClock = 'clock[' + clockNum + '].period'
          var planName = 'plan[' + planNum + '].planName'
          var planComplete = 'plan[' + planNum + '].isComplete'
          var planId = 'plan[' + planNum + '].goalId'
          var periodOfPlan = 'plan[' + planNum + '].period'
          var planTime = 'plan[' + planNum + '].clockTime'
          if (goalList[i].concentrated == true) {
            that.setData({
              [clockName]: goalList[i].content,
              [clockTime]: goalList[i].minutes,
              [clockComplete]: goalList[i].complete,
              [clockId]: goalList[i].goalId,
              [periodOfClock]: periodOfGoalList[i],
            })
            clockNum += 1
          } else {
            that.setData({
              [planName]: goalList[i].content,
              [planComplete]: goalList[i].complete,
              [planId]: goalList[i].goalId,
              [periodOfPlan]: periodOfGoalList[i],
              [planTime]: goalList[i].minutes,
            })
            planNum += 1
          }
        }
        for (var i = 0; i < goalNoTodayList.length; i++) {
          var clockName = 'clock_1[' + clockNum_1 + '].clockName'
          var clockId = 'clock_1[' + clockNum_1 + '].goalId'
          var clockTime = 'clock_1[' + clockNum_1 + '].clockTime'
          var clockComplete = 'clock_1[' + clockNum_1 + '].isComplete'
          var periodOfCLock = 'clock_1[' + clockNum_1 + '].period'
          var planName = 'plan_1[' + planNum_1 + '].planName'
          var planComplete = 'plan_1[' + planNum_1 + '].isComplete'
          var planId = 'plan_1[' + planNum_1 + '].goalId'
          var periodOfPlan = 'plan_1[' + planNum_1 + '].period'
          var planTime = 'plan_1[' + planNum_1 + '].clockTime'
          if (goalNoTodayList[i].concentrated == true) {
            that.setData({
              [clockName]: goalNoTodayList[i].content,
              [clockTime]: goalNoTodayList[i].minutes,
              [clockComplete]: goalNoTodayList[i].complete,
              [clockId]: goalNoTodayList[i].goalId,
              [periodOfCLock]: periodOfGoalNoTodayList[i],
            })
            clockNum_1 += 1
          } else {
            that.setData({
              [planName]: goalNoTodayList[i].content,
              [planComplete]: goalNoTodayList[i].complete,
              [planId]: goalNoTodayList[i].goalId,
              [periodOfPlan]: periodOfGoalNoTodayList[i],
              [planTime]: goalNoTodayList[i].minutes,
            })
            planNum_1 += 1
          }
        }
      }
    })
  },

  finishControll: function(e) {
    console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset['iscomplete'] == true) {
      this.unFinishPlan(e);
    } else {
      this.finishPlan(e);
    }
  },

  finishPlan: function(e) {
    var that = this;
    console.log(e.currentTarget.dataset['goalid'])
    var goalId = e.currentTarget.dataset['goalid']
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/record/planComplete',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('openid'),
        goalId: goalId,
      },
      success: function(res) {
        console.log(res.data)
        that.onShow()
      }
    })
  },

  unFinishPlan: function(e) {
    var that = this;
    console.log(e.currentTarget.dataset['goalid'])
    var goalId = e.currentTarget.dataset['goalid']
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/record/planUnComplete',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('openid'),
        goalId: goalId,
      },
      success: function(res) {
        console.log(res.data)
        that.onShow()
      }
    })
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

  clockStart: function(event) {
    console.log(event.currentTarget.dataset)
    if (event.currentTarget.dataset.complete == false) {
      wx.navigateTo({
        url: '../clock/clock?clockName=' + event.currentTarget.dataset.clockname + '&minutesLimit=' + event.currentTarget.dataset.clocktime + '&id=' + event.currentTarget.dataset.goalid,
      })
    } else {
      wx.showToast({
        title: '今日已完成该目标',
        image: '../images/close.png',
        duration: 1000
      })
    }

  },
  //手指触摸动作开始 记录起点X坐标

  touchstart_1: function(e) {
    var that = this;


    //开始触摸时 重置所有删除

    this.data.clock.forEach(function(v, i) {

      if (v.isTouchMove) //只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      clock: this.data.clock

    })


  },

  //滑动事件处理

  touchmove_1: function(e) {
    var that = this;

    var that = this,

      index = e.currentTarget.dataset.index, //当前索引

      startX = that.data.startX, //开始X坐标

      startY = that.data.startY, //开始Y坐标

      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标

      //获取滑动角度

      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });

    that.data.clock.forEach(function(v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else { //左滑

          v.isTouchMove = true

        }

      }

    })

    //更新数据

    that.setData({

      clock: that.data.clock

    })

  },

  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */

  angle: function(start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },

  del_1: function(e) {
    var that = this;

    console.log(e.currentTarget.dataset.index)
    console.log(that.data.clock[e.currentTarget.dataset.index].goalId)
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/usergoal/deleteusergoal',

      method: 'GET',
      data: {

        goalId: that.data.clock[e.currentTarget.dataset.index].goalId
      },
      success: function(res) {
        if (res.data.success == 1) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
    this.data.clock.splice(e.currentTarget.dataset.index, 1)
    this.setData({

      clock: this.data.clock

    })
  },
  //手指触摸动作开始 记录起点X坐标

  touchstart_2: function(e) {
    var that = this;


    //开始触摸时 重置所有删除

    this.data.plan.forEach(function(v, i) {

      if (v.isTouchMove) //只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      plan: this.data.plan

    })


  },

  //滑动事件处理

  touchmove_2: function(e) {
    var that = this;

    var that = this,

      index = e.currentTarget.dataset.index, //当前索引

      startX = that.data.startX, //开始X坐标

      startY = that.data.startY, //开始Y坐标

      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标

      //获取滑动角度

      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });

    that.data.plan.forEach(function(v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else { //左滑

          v.isTouchMove = true

        }

      }

    })

    //更新数据

    that.setData({

      plan: that.data.plan

    })

  },

  del_2: function(e) {
    var that = this;
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/usergoal/deleteusergoal',
      method: 'GET',
      data: {
        goalId: that.data.plan[e.currentTarget.dataset.index].goalId
      },
      success: function(res) {
        if (res.data.success == 1) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
    this.data.plan.splice(e.currentTarget.dataset.index, 1)
    this.setData({

      plan: this.data.plan

    })
  },
  //手指触摸动作开始 记录起点X坐标

  touchstart_3: function(e) {
    var that = this;


    //开始触摸时 重置所有删除

    this.data.clock_1.forEach(function(v, i) {

      if (v.isTouchMove) //只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      clock_1: this.data.clock_1

    })


  },

  //滑动事件处理

  touchmove_3: function(e) {
    var that = this;

    var that = this,

      index = e.currentTarget.dataset.index, //当前索引

      startX = that.data.startX, //开始X坐标

      startY = that.data.startY, //开始Y坐标

      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标

      //获取滑动角度

      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });

    that.data.clock_1.forEach(function(v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else { //左滑

          v.isTouchMove = true

        }

      }

    })

    //更新数据

    that.setData({

      clock_1: that.data.clock_1

    })

  },

  del_3: function(e) {
    var that = this;
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/usergoal/deleteusergoal',
      method: 'GET',
      data: {
        goalId: that.data.clock_1[e.currentTarget.dataset.index].goalId
      },
      success: function(res) {
        if (res.data.success == 1) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
    this.data.clock_1.splice(e.currentTarget.dataset.index, 1)
    this.setData({

      clock_1: this.data.clock_1

    })
  },
  //手指触摸动作开始 记录起点X坐标

  touchstart_4: function(e) {
    var that = this;


    //开始触摸时 重置所有删除

    this.data.plan_1.forEach(function(v, i) {

      if (v.isTouchMove) //只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      plan_1: this.data.plan_1

    })


  },

  //滑动事件处理

  touchmove_4: function(e) {
    var that = this;

    var that = this,

      index = e.currentTarget.dataset.index, //当前索引

      startX = that.data.startX, //开始X坐标

      startY = that.data.startY, //开始Y坐标

      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标

      //获取滑动角度

      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });

    that.data.plan_1.forEach(function(v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else { //左滑

          v.isTouchMove = true

        }

      }

    })

    //更新数据

    that.setData({

      plan_1: that.data.plan_1

    })

  },

  del_4: function(e) {
    var that = this;
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/usergoal/deleteusergoal',
      method: 'GET',
      data: {
        goalId: that.data.plan_1[e.currentTarget.dataset.index].goalId
      },
      success: function(res) {
        if (res.data.success == 1) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
    this.data.plan_1.splice(e.currentTarget.dataset.index, 1)
    this.setData({

      plan_1: this.data.plan_1

    })
  },

  showMessage_1: function(e) {
    var that = this;
    var dateList = that.data.dates;
    var item = that.data.clock[e.currentTarget.dataset.index];
    var periodList = item.period;
    var goalid = item.goalId;
    var name = item.clockName;
    var time = item.clockTime;
    that.setData({
      cbgColor_0: "#ffae49",
      goalName: name,
      timeValue_0: time,
      inputValue: name,
      chooseWhichGoal: item,
      timeValue: time,
      ctColor: "#fff",
      cbgColor: "#ffae49",
      ptColor: "#ffae49",
      pbgColor: "#fff",
      distime: false,
      canModify: true,
      color_0: "#979797",
      textColor: "#000",
      ibColor: "#e9833e",
      tborder: "2rpx dashed #ffae49",
    })
    if (periodList[7] == 1) {
      that.setData({
        selectIndex: 1,
        hiddenDate: true,
      })
    } else if (periodList[0] == 1 && periodList[1] == 1 && periodList[2] == 1 && periodList[3] == 1 && periodList[4] == 1 && periodList[5] == 1 && periodList[6] == 1) {
      that.setData({
        selectIndex: 2,
        hiddenDate: true,
      })
    } else {
      that.setData({
        selectIndex: 3,
        hiddenDate: false,
      })
      if (periodList[0] == 1) {
        dateList[0].selected = true;

      } else dateList[0].selected = false;
      if (periodList[1] == 1) {
        dateList[1].selected = true;
      } else dateList[1].selected = false;
      if (periodList[2] == 1) {
        dateList[2].selected = true;
      } else dateList[2].selected = false;
      if (periodList[3] == 1) {
        dateList[3].selected = true;
      } else dateList[3].selected = false;
      if (periodList[4] == 1) {
        dateList[4].selected = true;
      } else dateList[4].selected = false;
      if (periodList[5] == 1) {
        dateList[5].selected = true;
      } else dateList[5].selected = false;
      if (periodList[6] == 1) {
        dateList[6].selected = true;
      } else dateList[6].selected = false;
    }
    that.setData({
      dates: dateList,
      selectIndex_0: that.data.selectIndex,
      periodList_0: dateList,
    })
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  showMessage_2: function(e) {
    var that = this;
    var dateList = that.data.dates;
    var item = that.data.plan[e.currentTarget.dataset.index];
    var periodList = item.period;
    var goalid = item.goalId;
    var name = item.planName;
    that.setData({
      cbgColor_0: "#fff",
      chooseWhichGoal: item,
      goalName: name,
      timeValue_0: "时长(10~120)",
      inputValue: name,
      timeValue: "时长（10~120）",
      cbgColor: "#fff",
      ctColor: "#ffae49",
      ptColor: "#fff",
      canModify: true,
      color_0: "#979797",
      pbgColor: "#ffae49",
      distime: true,
      textColor: "#979797",
      ibColor: "#979797",
      tborder: "2rpx dashed #979797",
    })
    if (periodList[7] == 1) {
      that.setData({
        selectIndex: 1,
        hiddenDate: true,
      })
    } else if (periodList[0] == 1 && periodList[1] == 1 && periodList[2] == 1 && periodList[3] == 1 && periodList[4] == 1 && periodList[5] == 1 && periodList[6] == 1) {
      that.setData({
        selectIndex: 2,
        hiddenDate: true,
      })
    } else {
      that.setData({
        selectIndex: 3,
        hiddenDate: false,
      })
      if (periodList[0] == 1) {
        dateList[0].selected = true;

      } else dateList[0].selected = false;
      if (periodList[1] == 1) {
        dateList[1].selected = true;
      } else dateList[1].selected = false;
      if (periodList[2] == 1) {
        dateList[2].selected = true;
      } else dateList[2].selected = false;
      if (periodList[3] == 1) {
        dateList[3].selected = true;
      } else dateList[3].selected = false;
      if (periodList[4] == 1) {
        dateList[4].selected = true;
      } else dateList[4].selected = false;
      if (periodList[5] == 1) {
        dateList[5].selected = true;
      } else dateList[5].selected = false;
      if (periodList[6] == 1) {
        dateList[6].selected = true;
      } else dateList[6].selected = false;
    }
    that.setData({
      dates: dateList,
      selectIndex_0: that.data.selectIndex,
      periodList_0: dateList,
    })
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  showMessage_3: function(e) {
    var that = this;
    var dateList = that.data.dates;
    var item = that.data.clock_1[e.currentTarget.dataset.index];
    var periodList = item.period;
    var goalid = item.goalId;
    var name = item.clockName;
    var time = item.clockTime;
    that.setData({
      cbgColor_0: "#ffae49",
      chooseWhichGoal: item,
      goalName: name,
      timeValue_0: time,
      inputValue: name,
      timeValue: time,
      ctColor: "#fff",
      cbgColor: "#ffae49",
      ptColor: "#ffae49",
      pbgColor: "#fff",
      canModify: true,
      color_0: "#979797",
      distime: false,
      textColor: "#000",
      ibColor: "#e9833e",
      tborder: "2rpx dashed #ffae49",
    })
    if (periodList[7] == 1) {
      that.setData({
        selectIndex: 1,
        hiddenDate: true,
      })
    } else if (periodList[0] == 1 && periodList[1] == 1 && periodList[2] == 1 && periodList[3] == 1 && periodList[4] == 1 && periodList[5] == 1 && periodList[6] == 1) {
      that.setData({
        selectIndex: 2,
        hiddenDate: true,
      })
    } else {
      that.setData({
        selectIndex: 3,
        hiddenDate: false,
      })
      if (periodList[0] == 1) {
        dateList[0].selected = true;

      } else dateList[0].selected = false;
      if (periodList[1] == 1) {
        dateList[1].selected = true;
      } else dateList[1].selected = false;
      if (periodList[2] == 1) {
        dateList[2].selected = true;
      } else dateList[2].selected = false;
      if (periodList[3] == 1) {
        dateList[3].selected = true;
      } else dateList[3].selected = false;
      if (periodList[4] == 1) {
        dateList[4].selected = true;
      } else dateList[4].selected = false;
      if (periodList[5] == 1) {
        dateList[5].selected = true;
      } else dateList[5].selected = false;
      if (periodList[6] == 1) {
        dateList[6].selected = true;
      } else dateList[6].selected = false;
    }
    that.setData({
      dates: dateList,
      selectIndex_0: that.data.selectIndex,
      periodList_0: dateList,
    })
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  showMessage_4: function(e) {
    var that = this;
    var dateList = that.data.dates;
    var item = that.data.plan_1[e.currentTarget.dataset.index];
    var periodList = item.period;
    var goalid = item.goalId;
    var name = item.planName;
    that.setData({
      cbgColor_0: "#fff",
      chooseWhichGoal: item,
      canModify: true,
      color_0: "#979797",
      goalName: name,
      timeValue_0: "时长(10~120)",
      inputValue: name,
      timeValue: "时长（10~120）",
      cbgColor: "#fff",
      ctColor: "#ffae49",
      ptColor: "#fff",
      pbgColor: "#ffae49",
      distime: true,
      textColor: "#979797",
      ibColor: "#979797",
      tborder: "2rpx dashed #979797",
    })
    if (periodList[7] == 1) {
      that.setData({
        selectIndex: 1,
        hiddenDate: true,
      })
    } else if (periodList[0] == 1 && periodList[1] == 1 && periodList[2] == 1 && periodList[3] == 1 && periodList[4] == 1 && periodList[5] == 1 && periodList[6] == 1) {
      that.setData({
        selectIndex: 2,
        hiddenDate: true,
      })
    } else {
      that.setData({
        selectIndex: 3,
        hiddenDate: false,
      })
      if (periodList[0] == 1) {
        dateList[0].selected = true;

      } else dateList[0].selected = false;
      if (periodList[1] == 1) {
        dateList[1].selected = true;
      } else dateList[1].selected = false;
      if (periodList[2] == 1) {
        dateList[2].selected = true;
      } else dateList[2].selected = false;
      if (periodList[3] == 1) {
        dateList[3].selected = true;
      } else dateList[3].selected = false;
      if (periodList[4] == 1) {
        dateList[4].selected = true;
      } else dateList[4].selected = false;
      if (periodList[5] == 1) {
        dateList[5].selected = true;
      } else dateList[5].selected = false;
      if (periodList[6] == 1) {
        dateList[6].selected = true;
      } else dateList[6].selected = false;
    }
    that.setData({
      dates: dateList,
      selectIndex_0: that.data.selectIndex,
      periodList_0: dateList,

    })
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  //选择“一次”、“每天”、“自定义”
  selectOnce_1: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    //如果自定义就打开星期选项
    if (index == 3) {
      this.setData({
        hiddenDate_1: false,
        disposable_1: false
      })
    } else {
      this.setData({
        hiddenDate_1: true,
        disposable_1: false
      })
      //如果选择一次性，则把goalDate中的dispasable设为true
      if (index == 1) {
        that.setData({
          disposable_1: true
        })
        console.log(that.data.disposable_1)
      }
      //如果选择每天，则把周一到周日都设为true
      if (index == 2) {
        for (var i = 0; i < that.data.dates_1.length; i++) {
          var dateSel = 'dates_1[' + i + '].selected'
          that.setData({
            [dateSel]: true,
          })
        }
        console.log(that.data.dates_1)
      }
    }
    this.setData({
      selectIndex_1: e.currentTarget.dataset.index
    })

  },
  //设置打卡周期
  selectDate_1: function(e) {
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.dates_1;
    if (arrs[index].selected == false) {
      arrs[index].selected = true;
    } else {
      arrs[index].selected = false;
    }
    this.setData({
      dates_1: arrs,
      hiddenDate_1: false
    })
    console.log(this.data.dates_1)
  },

  drawer_1: function(e) {
    var that = this;
    var currentStatu_1 = e.currentTarget.dataset.statu;
    this.util_1(currentStatu_1)
    var e = {

    }
    that.selectOnce_1()
  },
  util_1: function(currentStatu_1) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation_1 = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation_1 = animation_1;

    // 第3步：执行第一组动画 
    animation_1.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData_1: animation_1.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function() {
      // 执行第二组动画 
      animation_1.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData_1: animation_1
      })

      //关闭 
      if (currentStatu_1 == "close") {
        this.setData({
          showModalStatus_1: false
        });
      }
    }.bind(this), 100)

    // 显示 
    if (currentStatu_1 == "open") {
      this.setData({
        showModalStatus_1: true
      });
    }
  },
  //选择了专注模式
  selectC_1: function() {
    var that = this;
    that.setData({
      ctColor_1: "#fff",
      cbgColor_1: "#ffae49",
      ptColor_1: "#ffae49",
      pbgColor_1: "#fff",
      distime_1: false,
      textColor_1: "#000",
      tborder_1: "2rpx dashed #ffae49",
      ibColor_1: "#e9833e",
      'goal.isConcentrate': true,
    })
    console.log(that.data.goal.isConcentrate_1)
  },
  //选择了计划模式
  selectP_1: function() {
    var that = this;
    that.setData({
      ptColor_1: "#fff",
      pbgColor_1: "#ffae49",
      ctColor_1: "#ffae49",
      cbgColor_1: "#fff",
      distime_1: true,
      textColor_1: "#979797",
      tborder_1: "2rpx dashed #979797",
      input_1: "",
      ibColor_1: "#979797",
      'goal.isConcentrate': false,
    })
    console.log(that.data.goal.isConcentrate_1)
  },

  //设置目标名称
  setGoalName_1: function(e) {
    console.log(e.detail.value)
    var that = this
    that.setData({
      'goal.name': e.detail.value,
    })
  },

  //设置目标时间
  setGoalMinutes_1: function(e) {
    var that = this
    console.log(e.detail.value)
    var minutes = parseInt(e.detail.value)
    that.setData({
      'goal.minutes': minutes,
    })
  },

  hidebtn_1: function() {
    var that = this;
    that.setData({
      hiddenbtn_1: (!that.data.hiddenbtn_1)
    })
  },

  //修改目标
  modifyGoal: function(e) {
    var that = this;
    var newGoal = that.data.chooseWhichGoal
    for (var i = 0; i < 8; ++i) {
      if (newGoal.period[i] == 1) {
        newGoal.period[i] = true
      } else {
        newGoal.period[i] = false
      }
    }
    console.log(newGoal.planName)
      if (newGoal.clockTime == 0 || newGoal.clockName == "时长（10~120）") {
        wx.request({
          url: 'https://clock.dormassistant.wang:8080/usergoal/modifyusergoal',
          method: 'POST',
          data: {
            userId: wx.getStorageSync('openid'),
            goalId: newGoal.goalId,
            content: newGoal.planName,
            complete: newGoal.isComplete,
            concentrated: false,
            minutes: 0,
          },
          success: function(res) {
            console.log(res.data)
            wx.request({
              url: 'https://clock.dormassistant.wang:8080/goaldate/modifygoaldate',
              method: 'POST',
              data: {
                goalId: newGoal.goalId,
                sunday: newGoal.period[0],
                monday: newGoal.period[1],
                tuesday: newGoal.period[2],
                wednesday: newGoal.period[3],
                thursday: newGoal.period[4],
                friday: newGoal.period[5],
                saturday: newGoal.period[6],
                disposable: that.data.disposable,
              },
              success: function(res) {
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 1000
                })
                that.onShow()
                that.setData({
                  goal: null,
                })
              }
            })
          }
        })
        that.drawer(e);
      }else {
      if (newGoal.clockTime < 10 || newGoal.clockTime > 120) {
        wx.showToast({
          title: '时长不符',
          image: '../images/close.png',
          duration: 1000
        })
      } else {
        wx.request({
          url: 'https://clock.dormassistant.wang:8080/usergoal/modifyusergoal',
          method: 'POST',
          data: {
            userId: wx.getStorageSync('openid'),
            goalId: newGoal.goalId,
            content: newGoal.clockName,
            complete: newGoal.isComplete,
            concentrated: true,
            minutes: newGoal.clockTime,
          },
          success: function(res) {
            console.log(res.data)
            wx.request({
              url: 'https://clock.dormassistant.wang:8080/goaldate/modifygoaldate',
              method: 'POST',
              data: {
                goalId: newGoal.goalId,
                sunday: newGoal.period[0],
                monday: newGoal.period[1],
                tuesday: newGoal.period[2],
                wednesday: newGoal.period[3],
                thursday: newGoal.period[4],
                friday: newGoal.period[5],
                saturday: newGoal.period[6],
                disposable: that.data.disposable,
              },
              success: function(res) {
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 1000
                })
                that.onShow()
              }
            })
          }
        })
      }
      that.drawer(e);
    }

  }
})