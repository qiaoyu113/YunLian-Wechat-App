var http = require('../../utils/HttpUtil.js');
var login = require('../../utils/login.js');
var app = getApp()
var vluyes = app.globalData.regyes


Page({
  data: {
    imgUrls: [
      '../../images/111.jpg',
      '../../images/111.jpg'
    ],
    json: [],
    register: '',
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    message: {
      a: '云狮会数字营销论坛（第十三期）视频营销新时代',
      b: '云狮会数字营销论坛（第16期）：自媒体变现的道与术'
    },
    userInfo: {},
    nicname: '',
    avatarUrl: app.globalData.userInfo.avatarUrl
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  allbtn: function () {
    var url = '../my-activities/my-activities?step=1&type=0'
    if (wx.getStorageSync('bindPhone') != '1') {//没绑定手机先执行登录
      login._login(null, url);
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },
  allbtn1: function () {
    var url = '../my-activities/my-activities?step=2&type=1'
    if (wx.getStorageSync('bindPhone') != '1') {//没绑定手机先执行登录
      login._login(null, url);
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },
  allbtn2: function () {
    var url = '../my-activities/my-activities?step=3&type=2'
    if (wx.getStorageSync('bindPhone') != '1') {//没绑定手机先执行登录
      login._login(null, url);
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },
  allbtn3: function () {
    var url = '../my-activities/my-activities?step=4&type=3'
    if (wx.getStorageSync('bindPhone') != '1') {//没绑定手机先执行登录
      login._login(null, url);
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },
  onwxLoad: function () {
    var page = this
    wx.getUserInfo({
      success: function (res) {
        page.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nicname: res.userInfo.nickName
        })
      }
    });
    var url = '../WeChat-login/WeChat-login';
    wx.navigateTo({
      url: url,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onLoad: function () {
    var page = this;
    //1.进入后先进行登录
    login._login(page, null);//执行登录

  },

  //监听是否登录过
  onShow: function () {
    var allowUserInfo = wx.getStorageSync('allowUserInfo');
    if (allowUserInfo == '2') {
      wx.showToast({
        title: '没有允许登录',
        icon: 'loading',
        duration: 2000
      })
    }
    // else {
    //   var bindPhone = wx.getStorageSync('bindPhone');
    //   if (bindPhone == '0') {
    //     wx.navigateTo({
    //       url: '../WeChat-login/WeChat-login'
    //     })
    //   }
    // }
    this.setData({
      register: false
    })
  }
})

