// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: wx.getStorageSync('openid'),
    focus: false,
    inputValue: '',
    groupList: [],
    isPopping: false, //是否已经弹出
    animPlus: {}, //旋转动画
    animCollect: {}, //item位移,透明度
    animTranspond: {}, //item位移,透明度
    animInput: {}, //item位移,透明度
    ctColor: "#ffae49",
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  plus: function() {
    if (this.data.isPopping) {
      //缩回动画
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },

  //弹窗
  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function() {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  //新建小组
  transpond: function() {
    console.log("transpond")
  },
  //加入小组
   //选择了是
  selectC: function () {
    var that = this;
    that.setData({
      ctColor: "#fff",
      cbgColor: "#ffae49",
      ptColor: "#ffae49",
      pbgColor: "#fff",
      distime: false,
      textColor: "#000",
      tborder: "2rpx dashed #ffae49",
      ibColor: "#e9833e",
      'goal.isConcentrate': true,
    })
    console.log(that.data.goal.isConcentrate)
  },
  //选择了否
  selectP: function () {
    var that = this;
    that.setData({
      ptColor: "#fff",
      pbgColor: "#ffae49",
      ctColor: "#ffae49",
      cbgColor: "#fff",
      distime: true,
      textColor: "#979797",
      tborder: "2rpx dashed #979797",
      input: "",
      ibColor: "#979797",
      'goal.isConcentrate': false,
    })
    console.log(that.data.goal.isConcentrate)
  },

  //弹出动画
  popp: function() {
    //plus顺时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(180).step();
    animationcollect.translate(0, -150).rotateZ(360).opacity(1).step();
    animationTranspond.translate(0, -75).rotateZ(360).opacity(1).step();
    animationInput.translate(-100, 100).rotateZ(180).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
  //收回动画
  takeback: function() {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },


  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/displaygroupbyuserid/displaygroupbyuserid',
      method: "GET",
      data: {
        userid: that.data.userId
      },
      success: function(res) {
        var list = res.data.groupList;
        for (var i = 0; i < res.data.groupList.length; ++i) {
          var k1 = 'groupList[' + i + '].groupName';
          var k2 = 'groupList[' + i + '].groupId';
          that.setData({
            [k1]: list[i].groupName,
            [k2]: list[i].groupId,
          })
        }
      }
    })
    // 生命周期函数--监听页面加载
  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function() {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/displaygroupbyuserid/displaygroupbyuserid',
      method: "GET",
      data: {
        userid: that.data.userId
      },
      success: function(res) {
        var list = res.data.groupList;
        for (var i = 0; i < res.data.groupList.length; ++i) {
          var k1 = 'groupList[' + i + '].groupName';
          var k2 = 'groupList[' + i + '].groupId';
          that.setData({
            [k1]: list[i].groupName,
            [k2]: list[i].groupId,
          })
        }
      }
    })
    // 生命周期函数--监听页面显示
  },
  onHide: function() {
    var that = this;
    that.setData({
      groupList: null
    })
  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }

})