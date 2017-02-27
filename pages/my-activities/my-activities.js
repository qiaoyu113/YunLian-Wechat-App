//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    json:[{
      tit:'2017创新中国春季峰会',
      img:'../../images/111.jpg',
      time:'2017-04-21 08:00:00',
      add:'北京东城区北京国家会议图书馆',
      peo:'创业邦',
      money:'收费',
      pay:'支付成功',
      math:'1',
      zong:'1'
    },{
      tit:'2017创新中国春季峰会',
      img:'../../images/111.jpg',
      time:'2017-04-21 08:00:00',
      add:'北京东城区北京国家会议图书馆',
      peo:'创业邦',
      money:'收费',
      pay:'支付成功',
      math:'1',
      zong:'1'
    },{
      tit:'2017创新中国春季峰会',
      img:'../../images/111.jpg',
      time:'2017-04-21 08:00:00',
      add:'北京东城区北京国家会议图书馆',
      peo:'创业邦',
      money:'收费',
      pay:'支付成功',
      math:'1',
      zong:'1'
    },{
      tit:'2017创新中国春季峰会',
      img:'../../images/111.jpg',
      time:'2017-04-21 08:00:00',
      add:'北京东城区北京国家会议图书馆',
      peo:'创业邦',
      money:'收费',
      pay:'支付成功',
      math:'1',
      zong:'1'
    }],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('this.json')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  chakan:function(e){
    var actId = e.currentTarget.dataset.id;
    var url = '../piao/piao';
    console.log(url)
    wx.navigateTo({
      url:url
    })
  }
})
