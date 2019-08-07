// pages/photo.js

var ARR_NEWS_DATA = []

Page({
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

  onLoad: function () {
    var that = this;
      that.setData({
        hidden: true,
      })
  },

  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../video/video-listdetails?id=" + postId
    })
  },

  onShareAppMessage: function () {
    return {
      title: '柳州1号+ 视听页面',
      path: 'pages/video/video'
    }
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

  getSelectItem: function (e) {
    var that = this;
    var itemWidth = e.detail.scrollWidth / that.data.proList.length;//每个商品的宽度
    var scrollLeft = e.detail.scrollLeft;//滚动宽度
    var curIndex = Math.round(scrollLeft / itemWidth);//通过Math.round方法对滚动大于一半的位置进行进位
    for (var i = 0, len = that.data.proList.length; i < len; ++i) {
      that.data.proList[i].selected = false;
    }
    that.data.proList[curIndex].selected = true;
    that.setData({
      proList: that.data.proList,
      giftNo: this.data.proList[curIndex].id
    });
  },
})