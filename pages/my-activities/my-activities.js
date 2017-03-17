//index.js
//获取应用实例
var app = getApp()
var http = require('../../utils/HttpUtil.js');

var myUrl = app.globalData.myUrl
var json = [];
var type1 = '';
var status = '';

//时间戳
function toDate(number) {
  var n = number;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var H = date.getHours();
  var F = date.getMinutes()
  return (Y + M + D + ' ' + H + ':' + F)
}



Page({
  data: {
    userInfo: {},
    step: '',
    status: '',
    json: json,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    json = []
    console.log(options)
    type1 = options.type
    this.setData({
      step: options.step,
    })
    var that = this

    http._post('open/wx/myact.html', { 'type': type1, 'pageNo': 1 }, function (sessionRes) {//成功回调
      status = sessionRes.data.status
      var len = sessionRes.data.page
      if (status == 'OK') {
        for (var i = 0; i < len.length; i++) {
          sessionRes.data.page[i].actStartTime = toDate(sessionRes.data.page[i].actStartTime)
          json.push(sessionRes.data.page[i]);
        }
        that.setData({
          json: json,
          status: status
        })
      } else {
        that.setData({
          status: status
        })
      }
    }, function (fail) {
    }, function (complete) {
    })
  },
  chakan: function (e) {
    var orderId = e.currentTarget.dataset.id;
    var url = '../piao/piao?orderId=' + orderId;
    wx.navigateTo({
      url: url
    })
  }
})
