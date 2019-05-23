// pages/home-page/home-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clock: [{
      clockMode: "专注",
      clockName: "考研加油还有一年",
      clockTime: "30min"
    }],
    plan: [{
      planMode: "计划",
      planName: "按钮？"
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
    hiddenDate: true
  },

  selectOnce: function (e) {
    var thst = this;
    let index = e.currentTarget.dataset.index;
    if (index == 3) {
      this.setData({
        hiddenDate: false
      })
    } else {
      this.setData({
        hiddenDate: true
      })
    }
    this.setData({
      selectIndex: e.currentTarget.dataset.index
    })
  },

  selectDate: function (e) {
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
  },

  drawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
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
    setTimeout(function () {
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

  selectC: function () {
    var that = this;
    that.setData({
      ctColor: "#fff",
      cbgColor: "#ffae49",
      ptColor: "#ffae49",
      pbgColor: "#fff",
      distime: false,
      textColor: "#000",
      tborder: "2rpx dashed #ffae49",
      ibColor: "#e9833e"
    })
  },

  selectP: function () {
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
      ibColor: "#979797"
    })
  },

  hidebtn: function () {
    var that = this;
    that.setData({
      hiddenbtn: (!that.data.hiddenbtn)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.hiddenbtn == "true" ? true : false
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

  clockStart: function () {
    wx.navigateTo({
      url: '../clock/clock'
    })
  }
})