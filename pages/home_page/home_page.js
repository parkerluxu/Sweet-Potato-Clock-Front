// pages/home-page/home-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  },

  //选择“一次”、“每天”、“自定义”
  selectOnce: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    //如果自定义就打开星期选项
    if (index == 3) {
      this.setData({
        hiddenDate: false
      })
    } else {
      this.setData({
        hiddenDate: true
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
        var clockNum = 0
        var planNum = 0;
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
  }
})