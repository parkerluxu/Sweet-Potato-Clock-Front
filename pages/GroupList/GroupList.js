// pages/GroupList/GroupList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   userId:'1',
   groupList:[]
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
      var that=this;
      wx.request({
        url: 'http://127.0.0.1:8080/goalcomplete/displaygoal',
        method:"GET",
        data: {
          userid: that.data.userId
        },
        success:function(res){
          var groupList=res.data.groupList;
          if(groupList==null){
            var toastText='获取小组列表失败';
            wx.showToast({
              title: toastText,
              icon:'cancel',
              duration:2000
            })
          }
          else{
            that.setData({
              groupList:groupList
            });
          }
        }
      })
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