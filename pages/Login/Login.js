var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  
  login:function(e){
  wx.login({
    success: function (r) {
      //获取临时凭证
      var code = r.code;
      wx.getUserInfo({
        success: function (res) {
          console.log({
            encryptedData: res.encryptedData,
            iv: res.iv,
            code: code
          })
          //调用后端
          wx.request({
            url: 'http://127.0.0.1:8080/WXLogin',
            data: {
              encryptedData: res.encryptedData,
              iv: res.iv,
              code: code
            },
            method: "POST",
            success: function (result) {
              if (result.data.status == 1) {
                console.log(result.data);
                app.globalData.userInfo = result.data.userInfo;
              } else {
                console.log('解密失败')
              }
            },
            fail: function () {
              console.log("系统错误")
            }
          })
        }
      })
      //用来转跳到第一个界面
      wx.switchTab({
        url: '../ShowYe/ShowYe',
      })
    },
    fail: function () {
      console.log("获取用户信息失败")
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