// pages/ClockStart/ClockStart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonValue:"开始",
    clockName:"dasdfsafsa",
    minutesLimit:0,
    intervarID: '', //定时器名字
    minutes: "00",
    seconds: "00",
    sum: 0,
    x:null,
    is_disabled:false,
    groupId:Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {

      this.setData({
        clockName:option.clockName,
        minutesLimit:option.minutesLimit,
        groupId:option.id,
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
  button_distinguish:function(){
    var that=this;
    if(that.data.buttonValue=="开始"){
      that.clock_start();
    }else{
      that.clock_cancel();
    }
  },
  //开始打卡
  clock_start: function () {
    var that = this;
    var openid=wx.getStorageSync('openid')
    that.setData({
      buttonValue:"取消",
      sum : that.data.minutes * 60
    })
    
    that.data.intervarID = setInterval(function () {
      if (that.data.sum == 0) {
        var toastText="打卡成功";
        wx.showToast({
          title: toast,
          icon:'success',
          duration:2000
        });
        //打卡成功后发送后台请求
        wx.request({
          url: 'http://127.0.0.1:8080/record/completegoal',
          method:'POST',
          data:{
            userid:that.data.openid,
            minutes: that.data.minutes,
            groupid: that.data.groupId,
          }
        })
        clearInterval(that.data.intervarID);
      }
     that.setData({
       sum:that.data.sum-1
     })
      let m = Math.floor(that.data.sum / 60);
      let s = that.data.sum % 60;
      that.setData({
        minutes: m,
        seconds: s
      })
    }, 1000)
  },
  clock_cancel:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '取消打卡将受到惩罚',
      success:function(sm){
        if(sm.confirm){
            that.setData({
              minutes:'0',
              seconds:'0',
              buttonValue:"开始",
              sum:0,
              is_disabled:true
            })
          clearInterval(that.data.intervarID);
        }
      }
    })
  }

})