//app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 已经授权，可以直接调用getUserInfo 获取头像昵称，不会弹框          
        } else { //未授权, 跳转登录页面          
          wx.redirectTo({
            url: '../../pages/Login/Login',
          })
        }
      }
    })
  },
  getUserInfo: function(cb) {
    var that = this
    typeof cb == "function" && cb(this.globalData.userInfo)
  }
})