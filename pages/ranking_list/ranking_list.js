// pages/ranking_list/ranking_list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    color_1_1: "#ffffff",
    color_1_2: "#f66a0c",
    color_1_3: "#f66a0c",
    color_2_1: "#f66a0c",
    color_2_2: "#f66a0c",
    color_2_3: "#ffffff",
    memberList: [],
    isMember:false,
    timeList: [],
    groupId: 1,
    list_1: [],
    showList: [], //展示列表
    isCapatain: true,
    captainId: null,
    groupName: String,
    text: String,
    showModalStatus: false,
    userId: wx.getStorageSync('openid'),
    isAbled: true,
    group: null,
    isPrivate:false,
    startX: 0, //开始坐标

    startY: 0


  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.setData({
      groupId: options.groupId
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
    var that = this;
    wx.request({
      url: 'http://localhost:8080/displaygroupinformation/displaygroup',
      method: "GET",
      data: {
        groupId: that.data.groupId
      },
      success: function(res) {
        var value = res.data.groupInformation;
        that.setData({
          captainId: value.captainId,
          groupName: value.groupName,
          text: value.description,
          isPrivate: value.privateGroup,
          'group.groupName': value.groupName,
          'group.text': value.description,
          'group.isPrivate': value.privateGroup,
        });
        if (that.data.captainId == that.data.userId) {
          that.setData({
            isCapatain: true,
            isAbled: false,
            buttonText:'保存更改',
          })
        } else {
          that.setData({
            isCapatain: false,
            isAbled: true,
            buttonText: '退出小组',
          })
          
        }

      }
    });
    wx.request({
      url: 'http://localhost:8080/displayuserlist/displayuserlist',
      method: "GET",
      data: {
        groupId: that.data.groupId
      },
      success: function(res) {
        that.setData({
          memberList: res.data.userList,
          timeList: res.data.timeList,
        })
        for (var i = 0; i < that.data.memberList.length; ++i) {
          var k1 = 'showList[' + i + '].avatar';
          var k2 = 'showList[' + i + '].name';
          var k3 = 'showList[' + i + '].minutesSum';
          var k4 = 'showList[' + i + '].minutes';
          var k5 = 'showList[' + i +'].isTouchMove';
          var userId=wx.getStorageSync('openid')
          if (userId == res.data.userList[i].userId){
            that.setData({
              isMember:true,
            })
          }
          that.setData({
            [k1]: that.data.memberList[i].avatar,
            [k2]: that.data.memberList[i].userNickname,
            [k3]: that.data.memberList[i].minutesSum,
            [k4]: that.data.timeList[i],
            [k5]:false,
          })
        }

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
    title:this.data.groupName
  },
  //加入小组
  joinGroup: function (e) {
    var that = this
    console.log(e.currentTarget.dataset)
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/joinGroup',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('openid'),
        groupid: that.data.groupId,
      },
      success(res) {
        console.log(res.data)
        if (res.data.success == 1) {
          wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '您已在该小组',
            image: '../images/close.png',
            duration: 1000
          })
        }
        that.onShow();
      }
    })
  },
  click_on_1: function() {
    wx.navigateTo({
      url: '../world_ranking_list/world_ranking_list',
    })
  },
  getInput_1:function(e) {
    var that = this;
    that.setData({
      'group.groupName': e.detail.value
    })
    console.log(that.data.group.groupName)
  },

  getInput_2:function(e) {
    var that = this;
    that.setData({
      'group.text': e.detail.value
    })
  },
  switchChange:function(e){
    var that=this;
    if(e.detail.value==false){
      that.setData({
        'group.isPrivate': 0
      })
    }else{
      that.setData({
        'group.isPrivate': 0
      })
    }
   
  },
  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
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
    }.bind(this), 100)
    // 显示 
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  drawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },

  confirmAndQuit:function(e){
    var that = this;
    if(that.data.isCapatain==true){
      wx.request({
        url: 'https://clock.dormassistant.wang:8080/group/modifyname',
        method: "POST",
        data: {
          groupId: that.data.groupId,
          groupName: that.data.group.groupName,
          privateGroup: that.data.group.isPrivate,
          description: that.data.group.text
        },
        success: function (res) {
          if (res.data.success == 1) {
            wx.showToast({
              title: '修改成功',
              duration: 1500,
            })
          }
          that.onShow()
        },
      })

    }else{
      wx.showModal({
        title: '退出小组',
        content: '确认退出吗？',
        success(e){
          if(e.confirm==true){
            wx.request({
              url: 'https://clock.dormassistant.wang:8080/deletegroupmember/deletegroupmember',
              method: 'GET',
              data: {
                userId: wx.getStorageSync('openid'),
                groupId: that.data.groupId
              }, success: function (res) {
                if (res.data.success == 1) {
                  that.onShow()
                  wx.navigateBack({
                    delta: 1
                  })
                  wx.showToast({
                    title: '退出成功',
                    icon: 'success',
                    duration: 1000
                  })
                }
              }
            })
          }
        }
      })
    }
    that.drawer(e)
    that.onShow();
  },
  //手指触摸动作开始 记录起点X坐标

  touchstart: function (e) {
    var that = this;
    if (that.data.userId == that.data.captainId) {

    //开始触摸时 重置所有删除

    this.data.showList.forEach(function (v, i) {

      if (v.isTouchMove)//只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      showList: this.data.showList

    })
    }

  },

  //滑动事件处理

  touchmove: function (e) {
    var that=this;
    if(that.data.userId==that.data.captainId){
    var that = this,

      index = e.currentTarget.dataset.index,//当前索引

      startX = that.data.startX,//开始X坐标

      startY = that.data.startY,//开始Y坐标

      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标

      //获取滑动角度

      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    that.data.showList.forEach(function (v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else {//左滑

          v.isTouchMove = true
          
        }

      }

    })

    //更新数据

    that.setData({

      showList: that.data.showList

    })
    }
  },

  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */

  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },

  //删除事件

  del: function (e) {
    var that=this;
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/deletegroupmember/deletegroupmember',
      method:'GET',
      data:{
        userId: that.data.memberList[e.currentTarget.dataset.index].userId,
        groupId:that.data.groupId
      },success:function(res){
        if(res.data.success==1){
          wx.showToast({
            title: '删除成功',
            icon:'success',
            duration:1000
          })
        }
      }
    })

    this.data.showList.splice(e.currentTarget.dataset.index, 1)

    this.setData({
      showList: this.data.showList
    })

  }

})