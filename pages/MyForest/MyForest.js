// pages/MyForest/l.js

Page({
  data: {
    number:null,
    area:null,
    sum:null,
    totalScore:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  success_buy:function(){
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/buytrees/buytrees',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('openid'),
        number: that.data.number
      },
      success:function(res){
        if(res.data.success==1){
          var toastText="购买成功";
          wx.showToast({
            title: toastText,
            icon:"success",
            duration:2000
          })
        }else{
          var toastText = "积分不足，购买失败";
          wx.showToast({
            title: toastText,
            icon: "cancel",
            duration: 2000
          })
        }
      }
    })
  },
  showScore:function(e){
    var that=this;
    that.setData({
      number:e.detail.value,
      totalScore:that.data.number*10
    })
  }


})