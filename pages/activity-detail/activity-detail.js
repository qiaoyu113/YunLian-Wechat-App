var utils = require('../../utils/utils.js');
var login = require('../../utils/login.js');
var http = require('../../utils/HttpUtil.js');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
var actId = ''
var latitude = ''
var longitude = ''
var lat = '' //精度
var lng = '' //纬度


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
    lat: '',
    lng: '',
  },
  onLoad: function (options) {
    var $this = this;
    var htm = '';
    actId = options.actId

    http._post('activity/' + actId + '.html', null, function (successRes) {
      lat = successRes.data.lat
      lng = successRes.data.lng
      var logs = successRes.data.activity
      htm = successRes.data.activity.activityDetails
      successRes.data.activity.actStartTime = toDate(successRes.data.activity.actStartTime)
      successRes.data.activity.actEndTime = toDate(successRes.data.activity.actEndTime)
      successRes.data.activity.signupStartTime = toDate(successRes.data.activity.signupStartTime)
      successRes.data.activity.signupEndTime = toDate(successRes.data.activity.signupEndTime)
      $this.setData({
        hiddenLoading: true,
        logs: logs,
        lat: lat,
        lng: lng
      });
      var article = htm;

      WxParse.wxParse('article', 'html', article, $this, 5);
    }, function () { }, function () { });
  },
  toast: function (e) {
    var url = '../apply/apply?actId=' + actId;
    if (wx.getStorageSync('bindPhone') != '1') {//没绑定手机先执行登录
      login._login(null, url);
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },
  getlocation: function () {
    wx.navigateTo({
      url: '../map/map?lat=' + lat + '&&lng=' + lng
    })

  }

})
