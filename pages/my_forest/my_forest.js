// pages/my_forest/my_forest.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMainChartDisplay: true,
    color_1_1: "#ffffff",
    color_1_2: "#f66a0c",
    color_1_3: "#f66a0c",
    color_2_1: "#f66a0c",
    color_2_2: "#f66a0c",
    color_2_3: "#ffffff",
    color_3_1: "#f66a0c",
    color_3_2: "#f66a0c",
    color_3_3: "#ffffff",
    status: [],
    datastr: [],
    tree: [],
    chartData : {
      main: {
        data: [0, 20, 30, 40, 300, 30, 10, 20, 30, 40, 100, 30, 0, 20, 30, 40, 300, 30, 10, 20, 30, 40, 100, 30],
        categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      }
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
    var that=this
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? ("0" + (nowDate.getMonth() + 1)) : nowDate.getMonth() + 1;
    var day = nowDate.getDate() < 10 ? ("0" + nowDate.getDate()) : nowDate.getDate();
    var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minutes = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var seconds = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    var dateStr = year + "-" + month + "-" + day;
    var userid = wx.getStorageSync('openid')
    console.log(dateStr);
    that.setData({
      'dateStr.year': year,
      'dateStr.month': month,
      'dateStr.day': day,
    })
    wx.request({
      url: 'http://localhost:8080/userinformation/userinformation',
      data: {
        userid: wx.getStorageSync('openid')
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          tree: res.data.treeNumber,
        })
      }
    })
    console.log(userid)
    wx.request({
      url: 'http://localhost:8080/displayuserstastic/displayuserstasticday',
      method: 'GET',
      data: {
        userId: userid,
        date: dateStr,
      },
      success: function (res) {
        that.setData({
          'chartData.main.data': res.data.minutesList
        })
        console.log(res.data)
        console.log(that.data.chartData.main.data)
        try {
          var width = wx.getSystemInfoSync().windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
        columnChart = new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          animation: true,
          categories: that.data.chartData.main.categories,
          legend:false,
          series: [{
            name: "打卡时长",
            color: '#fa9857',
            data: that.data.chartData.main.data,
            format: function (val, name) {
              return val.toFixed(0);
            },
            
          }],
          yAxis: {
            format: function (val) {
              return val + '分钟';
            },
            min: 0,
            disabled:true,
            max:120
          },
          xAxis: {
            disableGrid: false,
            type: 'calibration'
          },
          extra: {
            column: {
              width: 15,
            },
            legendTextColor: '#000000'
          },
          width: width,
          height: 150,
        });
      },
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

  clickDay: function () {
    var that = this;
    that.setData({
      color_1_1: "#ffffff",
      color_1_2: "#f66a0c",
      color_1_3: "#f66a0c",
      color_2_1: "#f66a0c",
      color_2_2: "#f66a0c",
      color_2_3: "#ffffff",
      color_3_1: "#f66a0c",
      color_3_2: "#f66a0c",
      color_3_3: "#ffffff",

      status: 1,
    })

  },
  clickWeek: function () {
    var that = this;
    that.setData({
      color_2_1: "#ffffff",
      color_2_2: "#f66a0c",
      color_2_3: "#f66a0c",
      color_1_1: "#f66a0c",
      color_1_2: "#f66a0c",
      color_1_3: "#ffffff",
      color_3_1: "#f66a0c",
      color_3_2: "#f66a0c",
      color_3_3: "#ffffff",

      status: 2,
    })
  },

  clickMonth: function () {
    var that = this;
    that.setData({
      color_3_1: "#ffffff",
      color_3_2: "#f66a0c",
      color_3_3: "#f66a0c",
      color_1_1: "#f66a0c",
      color_1_2: "#f66a0c",
      color_1_3: "#ffffff",
      color_2_1: "#f66a0c",
      color_2_2: "#f66a0c",
      color_2_3: "#ffffff",
      status: 3,
    })
  }
})