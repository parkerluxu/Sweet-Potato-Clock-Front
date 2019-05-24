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
    timeList:[],
    groupId: 1,
    list_1: [],
    showList: [],//展示列表
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    hasMore: true,
    page: 1,
    size: 20,
    movies: ["dasdas", "ascsacsc"],
    isCapatain: true,
    captainId: null,
    groupName:String,
    text:String,
    showModalStatus: false,
    userId:"1",
    isAbled:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        groupId:options.groupId
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
      var that=this;
    wx.request({
      url: 'http://127.0.0.1:8080/displaygroupinformation/displaygroup',
      method: "GET",
      data: {
        groupId: that.data.groupId
      },
      success: function (res) {
        var value = res.data.groupInformation;
        that.setData({
          captainId: value.captainId,
          groupName: value.groupName,
          text: value.description
        });
        if (that.data.captainId == that.data.userId) {
          that.setData({
            isCapatain: true,
            isAbled:false
          })
        } else {
          that.setData({
            isCapatain: false,
            isAbled:true
          })
        }

      }
    });
      wx.request({
        url: 'http://127.0.0.1:8080/displayuserlist/displayuserlist',
        method:"GET",
       data:{
         groupId:that.data.groupId
       },
       success:function(res){
          that.setData({
            memberList:res.data.userList,
            timeList:res.data.timeList,
          })
          for(var i=0;i<that.data.memberList.length;++i){
            var k1='showList['+i+'].avatar';
            var k2='showList['+i+'].name';
            var k3='showList['+i+'].minutesSum';
            var k4='showList['+i+'].minutes';
            that.setData({
              [k1]:that.data.memberList[i].avatar,
              [k2]:that.data.memberList[i].userNickname,
              [k3]:that.data.memberList[i].minutesSum,
              [k4]:that.data.timeList[i]
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
  click_on_1: function () {
    wx.navigateTo({
      url: '../world_ranking_list/world_ranking_list',
    })

  },
  click_on_2:function(){
   var that=this;
   if(that.data.isCapatain==true){
      that.setData({
        showModalStatus:true
      })
   }
  },
  drawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
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
    setTimeout(function () {
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

})