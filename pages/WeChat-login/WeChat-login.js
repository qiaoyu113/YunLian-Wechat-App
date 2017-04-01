var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    var page = this
    page.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  regiest: function () {
    wx.navigateTo({
      url: '../register/register?register=true'
    })
  },
  bind: function () {
    wx.navigateTo({
      url: '../bind/bind?register=true'
    })
  }
})