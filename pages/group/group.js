// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    randompic: [],
    showDialog: false,
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
    pbgColor: "#fff",
    newGroup: {},
    marqueePace: 1, //滚动速度
    marqueeDistance: [0], //初始滚动距离
    marqueeDistance2: [0],
    marquee2copy_status: false,
    marquee2_margin: [60],
    size: 14,
    orientation: 'left', //滚动方向
    interval: 20, // 时间间隔b
    hiddenmodalput: true, //掩盖输入框
    selected_num: 0,
    defaultTag: [{
        name: "学习",
        index: "0",
        selected: false
      },
      {
        name: "背英语",
        index: "1",
        selected: false
      },
      {
        name: "休息",
        index: "2",
        selected: false
      },
    ]
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
    this.selectP();
    //清空数据
    var datas_11 = this.data.defaultTag;
    var _length = this.data.defaultTag.length;
    var selected_num1 = this.data.selected_num;
    selected_num1 = 0;
    datas_11.splice(3, 3);
    this.setData({
      defaultTag: datas_11,
      isTagMax: false,
      selected_num: selected_num1
    });
    console.log(this.data.selected_num)
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
          showModalStatus: false,
        });
      }
      console.log(this.data.defaultTag)
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  pDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.utill(currentStatu)
  },
  utill: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var that = this
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
        that.setData({
          showModalStat: false
        });
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      that.setData({
        showModalStat: true
      });
    }
  },

randompic(){
  var randompic1 = this.data.randompic;
  var index = this.data.groupList.length;
  var i =0;
  for( i = 0; i < index ; i++){
    randompic1[i] = Math.floor(Math.random() * 20);
  }
  this.setData({
    randompic:randompic1
  });
  console.log(randompic);
},

  //新建小组标签多选
  selectTag: function(e) {
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.defaultTag;
    let selected_num = this.data.selected_num;
    if (arrs[index].selected == false && selected_num > 2) {
        wx.showToast({
          title: '已达标签上限',
          image: '../images/close.png'
        });
    }
    else if (arrs[index].selected == false && selected_num < 3){
        arrs[index].selected = true;
        selected_num += 1;
      } else if(arrs[index].selected == true) {
        arrs[index].selected = false;
        selected_num -= 1;
      }
    this.setData({
      defaultTag: arrs,
      hiddenDate_1: false,
      selected_num: selected_num
    })
    console.log(this.data.defaultTag)
  },

  //自定义
  tagModal: function() {
    this.setData({
      showDialog: !this.data.showDialog
    })
  },

  //重置按钮
  cancel: function() {
    this.setData({
      tagname: null,
      newTag: null
    });
  },
  //输入自定义标签
  inputTagName: function(e) {
    var _length = this.data.defaultTag.length;
    var tagname = e.detail.value;
    if (tagname != null) {
      if (tagname.length >= 6) {
        wx.showToast({
          title: '不能超过6个字',
          image: '../images/close.png'
        })
      }
      tagname = tagname.slice(0 , 6);
      this.setData({
        newTag: tagname,
      })
    console.log(tagname)
    console.log(this.data.newTag)
    }
  },
  //提交
  confirm: function() {
    var _length = this.data.defaultTag.length;
    let tag1 = this.data.defaultTag;
     if (this.data.newTag == null) {
      wx.showToast({
        title: '输入不能为空',
        image: '../images/close.png'
      });
    } else {
      var tagname = this.data.newTag;
      var obj = {};
      obj.name = tagname;
      obj.index = _length;
      obj.selected = false;
      tag1.push(obj);

      this.setData({
        isTagMax: false,
        defaultTag: tag1,
        tagname: "",
        showDialog: false
      })
      if (_length + 1 >= 6) {
        this.setData({
          isTagMax: true,
          showDialog: false
        })
      }

    }
    console.log(this.data.defaultTag)
    console.log(this.data.newTag)
  },

  //加入小组
  //选择了是
  selectC: function() {
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
      'newGroup.isPrivate': 1,
    })
    console.log(that.data.newGroup.isPrivate)
  },
  //选择了否
  selectP: function() {
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
      'newGroup.isPrivate': 0,
    })
    console.log(that.data.newGroup.isPrivate)
  },

  //获取小组名称
  getGroupName: function(e) {
    console.log(e.detail.value);
    var groupname = e.detail.value;
    if (groupname != null) {
      if (groupname.length >= 6) {
        wx.showToast({
          title: '不能超过6个字',
          image: '../images/close.png'
        })
      }
    }
      groupname = groupname.slice(0, 6);
    var that = this;
    that.setData({
      'newGroup.name': groupname,
    })
  },

  //获取小组简介
  getGroupintro: function(e) {
    console.log(e.detail.value)
    var that = this
    that.setData({
      'newGroup.intro': e.detail.value,
    })
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
    animationcollect.translate(-60, -15).rotateZ(360).opacity(1).step();
    animationTranspond.translate(-15, -60).rotateZ(360).opacity(1).step();
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


  addGroup: function(e) {
    var that = this
    if (that.data.newGroup == null || that.data.newGroup.name == null || that.data.newGroup.intro == null) {
      wx.showToast({
        title: '请输入名称简介',
        image: "../images/close.png",
        duration: 1000
      })
    } else {
      wx.request({
        url: 'http://localhost:8080/creategroup',
        method: 'POST',
        data: {
          captainId: wx.getStorageSync('openid'),
          groupName: that.data.newGroup.name,
          privateGroup: that.data.newGroup.isPrivate,
          description: that.data.newGroup.intro,
        },
        success: function(res) {
          console.log(res.data)
          var toastText = "创建成功";
          wx.showToast({
            title: toastText,
            icon: 'success',
            duration: 1000
          });
          var groupId = res.data.success
          var tagLength = that.data.defaultTag.length
          for (var i = 0; i < tagLength; i++) {
            console.log(that.data.defaultTag[i].selected)
            //从defaultTag中选出被选中的标签
            if (that.data.defaultTag[i].selected == true) {
              var tagName = that.data.defaultTag[i].name
              console.log(tagName)
              wx.request({
                url: 'http://localhost:8080/addGroupTag',
                method: 'GET',
                data: {
                  tagName: tagName,
                  groupId: groupId,
                },
                success: function(res) {
                  console.log(res.data.success)
                  that.powerDrawer(e);
                }
              })
            }
          }
        }
      })
      that.onShow();
    }
    that.setData({
      newGroup: null
    })
  },

  //加入小组
  joinGroup: function(e) {
    var that = this
    console.log(e.currentTarget.dataset)
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/joinGroup',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('openid'),
        groupid: e.currentTarget.dataset.groupid,
      },
      success(res) {
        console.log(res.data)
        if (res.data.success == 1) {
          wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 1000
          })
          that.onShow();
        } else if (res.data.success == 2) {
          wx.showToast({
            title: '您已在该小组',
            image: '../images/close.png',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '系统错误',
            image: '../images/close.png',
            duration: 1000
          })
        }
      }
    })
  },
  //点击加入小组时随机获取部分小组信息
  getShowGroup: function(e) {
    var that = this
    that.pDrawer(e)
    that.setData({
      noData1: false,
    })
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/displaygrouprandom/displaygrouprandom',
      method: 'GET',
      success(res) {
        console.log(res.data)
        var list = res.data.groupList
        for (let i = 0; i < list.length; i++) {
          var k1 = 'groupShowList[' + i + '].groupName';
          var k2 = 'groupShowList[' + i + '].groupId';
          var k3 = 'groupShowList[' + i + '].description';
          var textLength = 'textLength[' + i + ']';
          var marquee2_margin = 'marquee2_margin[' + i + ']';
          var despcription = list[i].description
          if (list[i].description.length > 11) {
            despcription = list[i].description.substr(0, 11) + "..."
          }
          var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
          that.setData({
            [k1]: list[i].groupName,
            [k2]: list[i].groupId,
            [k3]: despcription,
            [textLength]: list[i].description.length,
            windowWidth: windowWidth,
            [marquee2_margin]: list[i].description.length < windowWidth ? windowWidth - list[i].description.length : that.data.marquee2_margin //当文字长度小于屏幕长度时，需要增加补白
          })
          //that.run1();// 水平一行字滚动完了再按照原来的方向滚动
          //that.run2();// 第一个字消失后立即从右边出现
        }
      }
    })

  },

  getSearchName: function(e) {
    this.setData({
      searchName: e.detail.value
    })
  },

  //按名称寻找小组
  serchGroup: function(e) {
    var that = this
    that.setData({
      groupShowList: null,
      noData1: false,
    })
    wx.request({
      url: 'https://clock.dormassistant.wang:8080/search/searchbygroupname',
      method: 'GET',
      data: {
        groupName: that.data.searchName
      },
      success(res) {
        console.log(res.data)
        console.log(e.currentTarget.dataset)
        that.pDrawer(e)
        var list = res.data.groupList
        if (list.length != 0) {
          for (let i = 0; i < list.length; i++) {
            var despcription = list[i].description
            if (list[i].description.length > 11) {
              despcription = list[i].description.substr(0, 11) + "..."
            }
            var k1 = 'groupShowList[' + i + '].groupName';
            var k2 = 'groupShowList[' + i + '].groupId';
            var k3 = 'groupShowList[' + i + '].description';
            that.setData({
              [k1]: list[i].groupName,
              [k2]: list[i].groupId,
              [k3]: despcription,
            })
          }
        } else {
          that.setData({
            noData1: true
          })
        }
      }
    })
  },

  onLoad: function(options) {

    // 生命周期函数--监听页面加载
  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.request({
      url: 'http://localhost:8080/displaygroupbyuserid/displaygroupbyuserid',
      method: "GET",
      data: {
        userid: wx.getStorageSync('openid')
      },
      success: function(res) {
        console.log(res.data)
        var list = res.data.groupList;
        var taglist = res.data.tagList;
        if (res.data.groupList.length == 0) {
          that.setData({
            noData: true
          })
        } else {
          that.setData({
            noData: false
          })
        }
        for (var i = 0; i < res.data.groupList.length; ++i) {
          var k1 = 'groupList[' + i + '].groupName';
          var k2 = 'groupList[' + i + '].groupId';
          var k3 = 'groupList[' + i + '].memberNumber';
          var k4 = 'groupList[' + i + '].groupTag';
          that.setData({
            [k1]: list[i].groupName,
            [k2]: list[i].groupId,
            [k3]: list[i].memberNumber,
            [k4]: taglist[i],
          })
        }
        that.randompic();
      },
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
  },
  run1: function() {
    var vm = this;
    var interval = setInterval(function() {
      for (var i = 0; i < vm.data.textLength.length; i++) {
        var marqueeDistance = 'marqueeDistance[' + i + ']'
        if (-vm.data.marqueeDistance < vm.data.textLength[i]) {
          vm.setData({
            [marqueeDistance]: vm.data.marqueeDistance[i] - vm.data.marqueePace[i],
          });
        } else {
          clearInterval(interval);
          vm.setData({
            [marqueeDistance]: vm.data.windowWidth
          });
          vm.run1();
        }
      }
    }, vm.data.interval);
  },
  run2: function() {
    var vm = this;
    var interval = setInterval(function() {
      for (let i = 0; i < vm.data.textLength.length; i++) {
        var marqueeDistance = 'marqueeDistance2[' + i + ']'
        var marquee2copy_status = 'marquee2copy_status[' + i + ']'
        if (-vm.data.marqueeDistance2[i] < vm.data.textLength[i]) {
          // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
          vm.setData({
            [marqueeDistance]: vm.data.marqueeDistance2[i] - vm.data.marqueePace[i],
            [marquee2copy_status]: vm.data.textLength[i] + vm.data.marqueeDistance2[i] <= vm.data.windowWidth + vm.data.marquee2_margin[i],
          });
        } else {
          if (-vm.data.marqueeDistance2[i] >= vm.data.marquee2_margin[i]) { // 当第二条文字滚动到最左边时
            vm.setData({
              [marqueeDistance]: vm.data.marquee2_margin[i] // 直接重新滚动
            });
            clearInterval(interval);
            vm.run2();
          } else {
            clearInterval(interval);
            vm.setData({
              [marqueeDistance]: -vm.data.windowWidth
            });
            vm.run2();
          }
        }
      }
    }, vm.data.interval);
  }
})