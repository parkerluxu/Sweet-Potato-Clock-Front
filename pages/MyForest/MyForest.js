// pages/MyForest/l.js

Page({
  data: {
    number:0,
    area:0,
    sum:0,
    
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
      url: 'http://127.0.0.1:8080/buytrees/buytrees',
      method: 'GET',
      data: {
        userId: wx.getStorageSync('openid'),
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
          var toastText = "积分不足";
          wx.showToast({
            title: toastText,
            image: '../images/关闭.png',
            icon:'loading',
            duration: 2000
          })
        }
      }
    })
  },
  showScore:function(e){
    
    this.setData({
      number:e.detail.value,
     
  })
  }

})