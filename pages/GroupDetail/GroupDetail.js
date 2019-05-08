// pages/GroupDetail/GroupDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      groupId: Number,
      group: {
        groupName: String,
        groupCaptain: String,
        groupNumber: Number,
        groupMates: [],
        groupTime: Number,
        groupDays: Number,
      },
      isCaptain:false,
      isMember:false,
      
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: 'http://127.0.0.1:8080/group/getgroupbygroupid',
      method:'GET',
      data:{
        groupid:options.groupid,
        userid:openid,
      },
      success:function(res){
        var groupres=res.data.groupInfo;
        var groupMember=res.data.groupMember;
        var captain=res.data.captain;
        var isMember = res.data.isGroupMember;
        that.setData({
          groupId: groupres.groupId,
          ['group.groupCaptain']: captain,
          ['group.groupDays']: groupres.days,
          ['group.groupName']: groupres.groupName,
          ['group.groupNumber']: groupres.memberNumber,
          ['group.groupTime']: groupres.minutes,
          ['group.groupMates']:groupMember,
        })
        if(groupres.captainId=openid){
          that.setData({
            isCaptain:true,
          })
        }
        if(isMember==1){
          that.setData({
            isMember:true,
          })
        }
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

  changeData: function () {
    var options = { 'groupid': this.data.groupId }
    this.onLoad(options);//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },

  joinGroup:function(){
    var that=this;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: 'http://127.0.0.1:8080/joinGroup',
      method:'GET',
      data:{
        groupid: that.data.groupId,
        userid:openid,
      },
      success:function(res){
        if(res.data.success==1){
        wx.showToast({
          title: '加入成功',
          url: '../GroupDetail/GroupDetail?groupid=' + that.data.groupId,
        })
        }
        else{
          wx.showToast({
            title: '添加失败',
            url: '../GroupDetail/GroupDetail?groupid=' + that.data.groupId,
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '添加失败',
          url: '../GroupDetail/GroupDetail?groupid=' + that.data.groupId,
        })
      }
    })

  },

  toGroupMange:function(e){
    var that=this
    wx.navigateTo({
      url: '../GroupMange/GroupMange?groupid=' + that.data.groupId,
    })
  }
})