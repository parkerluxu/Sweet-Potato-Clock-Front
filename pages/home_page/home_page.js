// pages/home-page/home-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      /**
   * 以_1结尾的数组表示那些今天不需要打卡的目标
   */
    clock: [{
      clockName: "考研加油还有一年",
      clockTime: "30min",
      isComplete:Boolean,
      goalId: Number,
    }],
    plan: [{
      isComplete: Boolean,
      planName: "按钮？",
      goalId:Number,
    }],
    clock_1: [{

      clockName: "考研加油还有一年",
      clockTime: "30min",
      isComplete: Boolean,
      goalId: Number,
    }],
    plan_1: [{
      isComplete: Boolean,
      planName: "按钮？",
      goalId: Number,
    }],
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
    goalId: Number,
    startX: 0, //开始坐标

    startY: 0
  },

  //选择“一次”、“每天”、“自定义”
  selectOnce: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    //如果自定义就打开星期选项
    if (index == 3) {
      this.setData({
        hiddenDate: false,
        disposable: false
      })
    } else {
      this.setData({
        hiddenDate: true,
        disposable: false
      })
      //如果选择一次性，则把goalDate中的dispasable设为true
      if (index == 1) {
        that.setData({
          disposable: true
        })
        console.log(that.data.disposable)
      }
      //如果选择每天，则把周一到周日都设为true
      if (index == 2) {
        for (var i = 0; i < that.data.dates.length; i++) {
          var dateSel = 'dates[' + i + '].selected'
          that.setData({
            [dateSel]: true,
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
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.dates;
    if (arrs[index].selected == false) {
      arrs[index].selected = true;
    } else {
      arrs[index].selected = false;
    }
    this.setData({
      dates: arrs,
      hiddenDate: false
    })
    console.log(this.data.dates)
  },

  drawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },

  //确认，发送请求添加数据
  addGoal: function(e) {
    var that = this;
    that.setData({
      goalId: null,
    })
    console.log(that.data.goal.isConcentrate)
    wx.request({
      url: 'http://localhost:8080/usergoal/addgoal',
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
          url: 'http://localhost:8080/goaldate/addgoaldate',
          method: 'POST',
          data: {
            goalId: that.data.goalId,
            sunday: that.data.dates[0].selected,
            monday: that.data.dates[1].selected,
            tuesday: that.data.dates[2].selected,
            wednesday: that.data.dates[3].selected,
            thursday: that.data.dates[4].selected,
            friday: that.data.dates[5].selected,
            saturday: that.data.dates[6].selected,
            disposable: that.data.disposable,
          },
          success: function (res) {
            that.onShow()
          }
        })
        
      },
    })
    that.drawer(e);


  },
  //选择了计划模式
  selectP: function() {

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
    that.setData({
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
    console.log(that.data.goal.isConcentrate)
  },
  //选择了计划模式
  selectP: function() {
    var that = this;
    that.setData({
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
    console.log(that.data.goal.isConcentrate)
  },

  //设置目标名称
  setGoalName: function(e) {
    console.log(e.detail.value)
    var that = this
    that.setData({
      'goal.name': e.detail.value,
    })
  },

  //设置目标时间
  setGoalMinutes: function(e) {
    var that = this
    console.log(e.detail.value)
    var minutes = parseInt(e.detail.value)
    that.setData({
      'goal.minutes': minutes,
    })
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
    wx.request({
      url: 'http://localhost:8080/displaygoal/displaygoal',
      method: 'GET',
      data: {
        userId: wx.getStorageSync('openid')
      },
      success: function(res) {
        console.log(res.data.goalList)
        var goalList = res.data.goalList;
        var goalNoTodayList=res.data.goalNoTodayList;
        var clockNum = 0
        var planNum = 0;
        var clockNum_1=0;
        var planNum_1=0;
        for (var i = 0; i < goalList.length; i++) {
          var clockName = 'clock[' + clockNum + '].clockName'
          var clockId = 'clock[' + clockNum + '].goalId'
          var clockTime = 'clock[' + clockNum + '].clockTime'
          var clockComplete = 'clock[' + clockNum + '].isComplete'
          var planName = 'plan[' + planNum + '].planName'
          var planComplete = 'plan[' + planNum + '].isComplete'
          var planId = 'plan[' + planNum + '].goalId'
          if (goalList[i].concentrated == true) {
            that.setData({
              [clockName]: goalList[i].content,
              [clockTime]: goalList[i].minutes,
              [clockComplete]: goalList[i].complete,
              [clockId]: goalList[i].goalId,
            })
            clockNum+=1
          }else{
            that.setData({
              [planName]: goalList[i].content,
              [planComplete]: goalList[i].complete,
              [planId]: goalList[i].goalId,
            })
            planNum+=1
          }
        }
        for (var i = 0; i < goalNoTodayList.length; i++) {
          var clockName = 'clock_1[' + clockNum_1 + '].clockName'
          var clockId = 'clock_1[' + clockNum_1 + '].goalId'
          var clockTime = 'clock_1[' + clockNum_1 + '].clockTime'
          var clockComplete = 'clock_1[' + clockNum_1 + '].isComplete'
          var planName = 'plan_1[' + planNum_1 + '].planName'
          var planComplete = 'plan_1[' + planNum_1 + '].isComplete'
          var planId = 'plan_1[' + planNum_1 + '].goalId'
          if (goalNoTodayList[i].concentrated == true) {
            that.setData({
              [clockName]: goalNoTodayList[i].content,
              [clockTime]: goalNoTodayList[i].minutes,
              [clockComplete]: goalNoTodayList[i].complete,
              [clockId]: goalNoTodayList[i].goalId,
            })
            clockNum_1 += 1
          } else {
            that.setData({
              [planName]: goalNoTodayList[i].content,
              [planComplete]: goalNoTodayList[i].complete,
              [planId]: goalNoTodayList[i].goalId,
            })
            planNum_1 += 1
          }
        }
      }
    })
  },


  finishPlan:function(e){
    var that=this;
    console.log(e.currentTarget.dataset['goalid'])
    var goalId = e.currentTarget.dataset['goalid']
    wx.request({
      url: 'http://localhost:8080/record/planComplete',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('openid'),
        goalId: goalId,
      },
      success: function (res) {
        console.log(res.data)
        that.onShow()
      }
    })
  },

  unFinishPlan:function(e){
    var that = this;
    console.log(e.currentTarget.dataset['goalid'])
    var goalId = e.currentTarget.dataset['goalid']
    wx.request({
      url: 'http://localhost:8080/record/planUnComplete',

      method: 'POST',
      data: {
        userId: wx.getStorageSync('openid'),
        goalId: goalId,
      },
      success: function (res) {
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

  clockStart: function() {
    wx.navigateTo({
      url: '../clock/clock'
    })
  },
  //手指触摸动作开始 记录起点X坐标

  touchstart: function (e) {
    var that = this;
    if (that.data.userId == that.data.captainId) {

      //开始触摸时 重置所有删除

      this.data.clock_1.forEach(function (v, i) {

        if (v.isTouchMove)//只操作为true的

          v.isTouchMove = false;

      })

      this.setData({

        startX: e.changedTouches[0].clientX,

        startY: e.changedTouches[0].clientY,

        clock_1: this.data.clock_1

      })
    }

  },

  //滑动事件处理

  touchmove: function (e) {
    var that = this;
    if (that.data.userId == that.data.captainId) {
      var that = this,

        index = e.currentTarget.dataset.index,//当前索引

        startX = that.data.startX,//开始X坐标

        startY = that.data.startY,//开始Y坐标

        touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

        touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标

        //获取滑动角度

        angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

      that.data.clock_1.forEach(function (v, i) {

        v.isTouchMove = false

        //滑动超过30度角 return

        if (Math.abs(angle) > 30) return;

        if (i == index) {

          if (touchMoveX > startX) //右滑

            v.isTouchMove = false

          else {//左滑

            v.isTouchMove = true

          }

        }

      })

      //更新数据

      that.setData({

        clock_1: that.data.clock_1

      })
    }
  },

  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */

  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },
  del: function (e) {
    this.data.clock_1.splice(e.currentTarget.dataset.index, 1)

    this.setData({

      clock_1: this.data.clock_1

    })
  }
})