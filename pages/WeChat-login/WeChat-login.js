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
  onUnload: function () {
    wx.navigateTo({
      url: '../activity-index/activity-index'
    })
  },
  phone: function () {
    wx.navigateTo({
      url: '../register/register?register=true',
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
  phone1: function () {
    wx.navigateTo({
      url: '../registered/registered?register=true',
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
  }
})