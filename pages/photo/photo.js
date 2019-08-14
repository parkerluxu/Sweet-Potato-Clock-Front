// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    xinwen_list: [{
      id : 1,
      images:["../images/back2.png"],
      title:"测试",
      inputtime:2345,
      description:"1234",
      copyfrom:"123"
    }],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    indicatordots: true,
    duration: 1000
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this
    wx.request({
      url: 'http://127.0.0.1:8080/displayUserPhoto',
      method:'GET',
      data:{
        userId:wx.getStorageSync('openid'),
        albumId:options.albumId
      },
      success(res){
        console.log(res.data)
        if (res.data.success.length == 0) {
          that.setData({
            noData: true,
          })
        } else {
          that.setData({
            noData: false,
          })
        }
        that.setData({
          photoList:res.data.success
        })
      }
    })
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

  }
})