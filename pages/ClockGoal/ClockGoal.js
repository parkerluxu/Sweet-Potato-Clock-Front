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
    hours: [0, 1, 2],
    hourIndex: 0,
    minutes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    minuteIndex: 0,
    unit: [3, 7, 30],
    unitIndex: 0,
<<<<<<< HEAD
    groupId: Number,
    isPrivateBool: Boolean
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
        hiddenName: false

      })
    }
    this.setData({
      tagIndex: e.detail.value
    })
  },

  bindMinuteChange: function (e) {
    console.log('picker发生选择改变，携带值为', e.detail.value);

    this.setData({
      minuteIndex: e.detail.value
    })
  },

  bindHourChange: function (e) {
    console.log('picker发生选择改变，携带值为', e.detail.value);

    this.setData({
      hourIndex: e.detail.value
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

  switchChange: function (e) {
    console.log("switch value:", e.detail.value)
    this.setData({
      isPrivateBool: e.detail.value,
    })
    if (e.detail.value = true) {
      this.setData({
        ['groupInfo.isPrivate']: 1,
      })
    } else {
      this.setData({
        ['groupInfo.isPrivate']: 0,
      })
    }
  },

  clock_search: function () {
    var that = this
    var minutesHour = that.data.hourIndex * 60
    var minutes1 = that.data.minuteIndex;
    var minutesSum = Number(minutes1) + Number(minutesHour);
    wx.request({
      url: 'http://127.0.0.1:8080/group/findgroupbyconditions',
      method: 'GET',
      data: {
        tag: that.data.tag[that.data.tagIndex],
        minutes: minutesSum,
        days: that.data.unit[that.data.unitIndex],
      },
      success: function (res) {
        var localGroupList = res.data.groupListByConditions;
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

  group_detail: function () {
<<<<<<< HEAD
    var that = this;
    var minutesHour = that.data.hourIndex * 60
    var minutes1 = that.data.minuteIndex;
    var minutesSum = Number(minutes1) + Number(minutesHour);
    console.log(minutesSum)
=======

    var that=this;
>>>>>>> master
    wx.request({
      url: 'http://127.0.0.1:8080/creategroup',
      method: 'POST',
      data: {
        tag: that.data.tag[that.data.tagIndex],
        minutes: minutesSum,
        days: that.data.unit[that.data.unitIndex],
        captainId: wx.getStorageSync('openid')
      },
      success: function (res) {
        that.setData({
          groupId: res.data.groupId,
        })
        console.log(res.data.groupId)
        wx.navigateTo({
          url: '../GroupDetail/GroupDetail?groupid=' + res.data.groupId,
        })
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