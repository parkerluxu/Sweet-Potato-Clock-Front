// pages/my_forest/my_forest.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
var chartData = {
  main: {
    title: '订单统计',
    data: [10, 20, 30, 40, 100,30],
    categories: ['0-4', '4-8', '8-12', '12-16', '16-20','20-24']
  }
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMainChartDisplay: true
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
    try {
      var width = wx.getSystemInfoSync().windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name:"打卡时长",
        color: '#fa9857',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(0) + '分钟';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '分钟';
        },
        min: 0
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