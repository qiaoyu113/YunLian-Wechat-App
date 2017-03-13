//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    register:false, //没有登录登录
    regyes:true,
    userInfo:{},//缓存用户信息
    openId:'',
    domainUrl:'https://dutao.s1.natapp.cc/',//服务器地址信息
    contextUrl:'https://dutao.s1.natapp.cc/activity.html?format=json',
    resourceUrl:'http://test.resource.vjuzhen.com/',
    xqUrl:'https://dutao.s1.natapp.cc/activity/',
    piaoUrl:'https://dutao.s1.natapp.cc/open/wx/mt/'
  },
  onshow:function(){
    console.log('程序从后台进入前台时启动');
  },
  onHide:function(){
    console.log('程序从前台进入后台时启动');
  }
})