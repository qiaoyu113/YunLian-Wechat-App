var utils = require('../../utils/utils.js');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
var xqurl = app.globalData.xqUrl


function toDate(number) {
  var n = number;
  var date = new Date(n);
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var H = date.getHours();
  var F = date.getMinutes()
  return (M + D +' '+ H + ':' + F )
}

Page({
  data: {
    // logs: {
    //   img:'../../images/111.jpg',
    //   tit:'云狮会数字营销论坛（第十三期）视频营销新时代哈哈哈哈哈哈哈',
    //   time:'01/23/ 17:00',
    //   time1:'01/23/ 17:00'
    // },
    time:{},
    btn:1,
    logs:{}
  },
  onLoad: function (options) {
    var $this = this;
    var htm = '';
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
                      
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    
    
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
