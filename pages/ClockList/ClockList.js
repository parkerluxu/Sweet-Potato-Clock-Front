// pages/ClockList/ClockList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x:"a",
    y:10,
    string: null,
    isBindExpert: false,
    clockList: [],
    list_1: [],
    list_2: [],
    listItem: {
      name: null,
      isClock: null,
      minutes: null,
      completion: null
    }
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
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/goalcomplete/displaygoal',
      method: 'GET',
      data: {
        userid: '1'
      },
      success: function (res) {
        var list1 = res.data.groupList;
        var list2 = res.data.goalList;
        that.setData({
          list_1: list1,
          list_2: list2
        })
        var x = 0;
        if (list2 == null) {
          that.setData({
            isBindExpert: false,
            string: "您还没有任何的打卡目标"
          })
        } else {
          for (var i = 0; i < list1.length; i++) {
            if (that.data.list_2[i].isClocked == 0) {
              var _k1 = 'clockList[' + x + '].name';
              var _k2 = 'clockList[' + x + '].minutes';
              var _k3 = 'clockList[' + x + '].isClock';
              var _k4 = 'clockList[' + x + '].completion';
              var _k5 = 'clockList[' + x + '].showCompletion';
              that.setData({
                [_k1]: that.data.list_1[i].groupName,
                [_k2]: that.data.list_1[i].minutes,
                [_k3]: that.data.list_2[i].isClocked,
                [_k4]: that.data.list_2[i].completion,
                [_k5]: that.data.list_2[i].completion*100
              });
              x++;
            }
            else
              continue;
          }
          that.setData({
            isBindExpert: true

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
  changeToClockStart:function(event){
    var that=this;
 
    wx.navigateTo({
      url: '../ClockStart/ClockStart?clockName=' + event.currentTarget.dataset.clockName + '&minutesLimit=' + event.currentTarget.dataset.minutesLimit ,
    })
  }
})