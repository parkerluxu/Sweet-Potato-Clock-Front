// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCapatain:true,
    groupId:1,
    captainId:null,
    groupName:null,
    text:null,
    userId:"1",
    inputValue:String,
    showModalStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
  groupId:options.groupId
    });
  
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
      url: 'http://127.0.0.1:8080/displaygroupinformation/displaygroup',
      method:"GET",
      data:{
        groupId:that.data.groupId
      },
      success:function(res){
        var value = res.data.groupInformation;
        that.setData({
          captainId: value.captainId,
          groupName:value.groupName,
          text: value.description
        });
        if(that.data.captainId==that.data.userId){
          that.setData({
            isCapatain:true
          })
        }else{
          that.setData({
            isCapatain: false
          })
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

  },
  changeToMemberManagement:function(){
    wx.navigateTo({
      url: '../member_anagement/member_anagement',
    })
  },
  confirmInput:function(){
    var that=this;
    wx.showModal({
      title:'提示',
      content:'确定修改吗？',
      success:function(sm){
        if(sm.confirm==true){
          wx.request({
            url: 'http://127.0.0.1:8080/group/modifyname',
            method:"GET",
            data:{
              groupId:that.data.groupId,
              groupName:that.data.inputValue
            },
            success:function(res){
              if(res.data.success==1){
                wx.showToast({
                  title: '修改成功',
                  duration: 1500,
                })
              }
            }
          })
        }
      }
      
    })
  },
  showText:function(){
    var that=this;
if(that.data.isCapatain==true){
that.setData({
  showModalStatus:true
})
}

  },
  getInput:function(e){
    var that =this;
    that.setData({
      inputValue:e.detail.value
    })
  }
})