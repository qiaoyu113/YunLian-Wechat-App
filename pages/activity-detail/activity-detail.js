var utils = require('../../utils/utils.js');
var login = require('../../utils/login.js');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
var xqurl = app.globalData.xqUrl
var actId = ''


function toDate(number) {
  var n = number;
  var date = new Date(n);
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var H = date.getHours();
  var F = date.getMinutes()
  return (M + D + ' ' + H + ':' + F)
}

Page({
  data: {
    time: {},
    btn: 1,
    logs: {},
    latitude: 0,//纬度 
    longitude: 0,//经度 
    speed: 0,//速度 
    accuracy: 16,//位置精准度 
    markers: [],
    covers: [],
  },
  onLoad: function (options) {
    var $this = this;
    var htm = '';
    actId = options.actId
    // console.log(options.actId)
    wx.request({
      url: xqurl + options.actId + '.html?format=json',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function success(res) {
        var logs = res.data.activity
        htm = res.data.activity.activityDetails
        res.data.activity.actStartTime = toDate(res.data.activity.actStartTime)
        res.data.activity.actEndTime = toDate(res.data.activity.actEndTime)
        res.data.activity.signupStartTime = toDate(res.data.activity.signupStartTime)
        res.data.activity.signupEndTime = toDate(res.data.activity.signupEndTime)
        $this.setData({
          hiddenLoading: true,
          logs: logs,
        });
        var article = htm;

        WxParse.wxParse('article', 'html', article, $this, 5);
      },

      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })


  },
  toast: function (e) {
    var url = '../apply/apply?actId=' + actId;
    if (wx.getStorageSync('bindPhone') != '1') {//没绑定手机先执行登录
      login._login(null,url);
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },

  getlocation: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  }

})
