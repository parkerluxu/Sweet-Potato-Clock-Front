//app.js

App({
  globalData:{
    // 'url':app.globalData.url+'',
    'url':'http://localhost:8080',
    isGetPotato:false,
    numberOfGetPotato:Number,
    isGetNewPhoto:Boolean,
  },

  onLaunch: function () {
    // 展示本地存储能力
    var that=this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var logged=wx.getStorageSync('logged')
    // 登录
    if (logged==true){
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
                url: that.globalData.url+'/WXLogin',
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: code,
                },
                method: "POST",
                success: function (result) {
                  if (result.data.status == 1) {
                    console.log(result.data.userInfo.openId);
                  } else {
                    console.log(result.data.status)
                  }
                },
                fail: function () {
                  console.log("系统错误")
                }
              })
            }
          })
        }
      })
    }else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
})