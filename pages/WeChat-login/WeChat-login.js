var app = getApp()
Page({
    data:{
        avatarUrl:'',
        nicname:''
    },
    onLoad: function () {
      var page = this
      wx.getUserInfo({
        success: function (res) {
          console.log(res.userInfo)
          page.setData({
            avatarUrl: res.userInfo.avatarUrl,
            nicname:res.userInfo.nickName
          })
        }
      })
    },
    phone:function(){
      wx.navigateTo({
        url: '../register/register?register=true',
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  })