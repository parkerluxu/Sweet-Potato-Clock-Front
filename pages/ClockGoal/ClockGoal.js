var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    tag: ["学习", "运动", "工作", "自定义"],
    tagIndex: 0,
    hiddenName: false,
    reply: false,
    duration: "00:10",
    unit: ["3天", "7天", "30天"],
    unitIndex: 0,
<<<<<<< HEAD
=======


>>>>>>> master
  },

  inputBind: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  query: function () {

  },
  bindTagChange: function (e) {
    console.log('选择', this.data.tag[e.detail.value])
    if (e.detail.value == 3) {
      this.setData({
        reply: true,
        hiddenName: true
      })
    } else {
      this.setData({
        reply: false,

      })
    }
    this.setData({
      tagIndex: e.detail.value
    })
  },

  bindDurationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  bindUnitChange: function (e) {
    console.log('picker发生选择改变，携带值为', e.detail.value);
    this.setData({
      unitIndex: e.detail.value
    })
   
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


  clock_search: function () {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/group/getgroupbygroupid',
      method: 'GET',
      data: {
        tag: tag[tagIndex],
        minutes: duration,
        days: unit
      },
      success: function (res) {
      }
    })
    wx.navigateTo({
      url: '../ClockSearch/ClockSearch',
    })
  },

  group_detail: function () {
<<<<<<< HEAD
=======

>>>>>>> master
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8080/creategroup',
      method: 'POST',
      data: {
        captainId: wx.getStorageSync('openid'),
        tag: that.data.tag[that.data.tagIndex],
        days: that.data.duration,
        minutes: that.data.unit[that.data.unitIndex],
      },
      success:function(res){
        console.log(res.data);
      }
<<<<<<< HEAD
=======

>>>>>>> master
    })
  },
  query: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/search/searchbygroupname',
      method: 'GET',
      data: {
        groupName: that.data.inputValue
      },
      success: function (res) {
        var localGroupList = res.data.groupList;
        if (localGroupList == null) {
          var tosatText = "搜索结果不存在";
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            localGroupList: localGroupList
          });
          var arrays = JSON.stringify(that.data.localGroupList);
          wx.navigateTo({
            url: '../ClockSearch/ClockSearch?groupList=' + arrays,
          })
        }
      }
    })
  },
  inputBind: function (e) {
    var value = e.detail.value;
    this.setData({
      inputValue: value
    })
  }
})