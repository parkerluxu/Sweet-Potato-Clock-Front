// pages/GroupDetail/GroupDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
      group: {
        groupId:Number,
        groupName: String,
        groupCaptain: String,
        groupNumber: Number,
        groupMates: [],
        groupTime: Number,
        groupDays: Number,
      }
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.groupid)
    wx.request({
      url: 'http://127.0.0.1:8080/group/getgroupbygroupid',
      method:'GET',
      data:{
        groupid:options.groupid,
      },
      success:function(res){
        console.log(res.data);
        var group=res.data.groupInfo;
        var groupMember=res.data.groupMember;
        var captain=res.data.captain;
        that.setData({
          ['group.groupCaptain']: captain,
          ['group.groupDays']: group.days,
          ['group.groupName']: group.groupName,
          ['group.groupNumber']:group.memberNumber,
          ['group.groupTime']:group.minutes,
          ['group.groupMates']:groupMember,
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

  },
    groupRank: function () {
      wx.navigateTo({
        url: '',
      })
    }
})