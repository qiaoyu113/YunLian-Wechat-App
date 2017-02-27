//logs.js
var util = require('../../utils/util.js');
Page({
  data: {
    logs: {
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第十三期）视频营销新时代哈哈哈哈哈哈哈',
      time:'01/23/ 17:00',
      time1:'01/23/ 17:00'
    },
    time:{},
    btn:1,
  },
  onLoad: function (options) {
    var $this = this;
    console.log(options.actId)
    // wx.request({
    //   url: 'https://dutao.s1.natapp.cc/open/actDetail.html?id='+options.actId,
    //   data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function success(res) {
	  //                           $this.setData({
	  //                               hiddenLoading: true,
	  //                               logs: res.data.obj,
    //                               time: new Date(res.data.obj.actStartTime)
	  //                           });
	  //                   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(function (log) {
    //     return util.formatTime(new Date(log))
    //   })
    // })
  },
  toast:function(e){
    var actId = e.currentTarget.dataset.id;
    var url = '../index/index';
    console.log(url)
    wx.navigateTo({
      url: url,
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
