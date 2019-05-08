// pages/GroupMange/GroupMange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: Number,
    groupInfo: [],
    isPrivateBool:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      groupId: options.groupid,
    })
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
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/group/getgroupbygroupid',
      method: 'GET',
      data: {
        groupid: that.data.groupId,
        userid: wx.getStorageSync('openid'),
      },
      success: function(res) {
        that.setData({
          ['groupInfo.name']: res.data.groupInfo.groupName,
          ['groupInfo.isPrivate']: res.data.groupInfo.isPrivate,
        })
        if(that.data.groupInfo.isPrivate==1){
          that.setData({
            isPrivateBool:true,
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '进入失败',
          duration: 2000,
        })
        wx.navigateBack({
          delta: 1,
        })
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
  /**
   * 开关切换值
   */
  switchChange: function(e) {
    console.log("switch value:", e.detail.value)
    this.setData({
      isPrivateBool:e.detail.value,
    })
    if(e.detail.value=true){
      this.setData({
        ['groupInfo.isPrivate']:1,
      })
    }else{
      this.setData({
        ['groupInfo.isPrivate']: 0,
      })
    }
  },

  getName:function(e){
    this.setData({
      ['groupInfo.name']:e.detail.value,
    })
  },

  saveChange:function(){
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8080/group/updateGroupInfo',
      method:'GET',
      data:{
        groupid:that.data.groupId,
        groupname:that.data.groupInfo.name,
        isprivate:that.data.groupInfo.isPrivate,
      },
      success:function(){
        wx.navigateBack({
          delta:1,
        })
      }
    })
  },

  deleteGroup: function(e) {
    var that=this;
    wx.showModal({
      title: '确认删除',
      content: '是否确认删除小组',
      success(res){
        if(res.confirm==true){
          wx.request({
            url: 'http://127.0.0.1:8080/deletegroup',
            method: 'GET',
            data: {
              groupid: that.data.groupId
            },
            success: function (res) {
              if (res.data.success == '1') {
                wx.showToast({
                  title: '删除成功',
                  duration: 2000,
                })
                wx.navigateBack({
                  delta: 2,
                })
              }else{
                wx.showToast({
                  title: '删除失败',
                  duration: 2000,
                })
                wx.navigateBack({
                  delta: 1,
                })
              }
            }
          })
        }
      }
    })
    
  }
})