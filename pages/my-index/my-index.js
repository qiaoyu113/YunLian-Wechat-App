var app = getApp()
var vlu = app.globalData.register
var vluyes = app.globalData.regyes
// var request = require('../../utils/requestService.js')





Page({
  data: {
    imgUrls:[
      '../../images/111.jpg',
      '../../images/111.jpg'
    ],
    // json: [{
    //   img:'../../images/111.jpg',
    //   tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
    //   jia:'35',
    //   shou:'98'
    // },{
    //   img:'../../images/111.jpg',
    //   tit:'云狮会数字营销论坛（第16期）：自媒体变现的道与术',
    //   jia:'35',
    //   shou:'98'
    // },{
    //   img:'../../images/111.jpg',
    //   tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
    //   jia:'35',
    //   shou:'98'
    // },{
    //   img:'../../images/111.jpg',
    //   tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
    //   jia:'35',
    //   shou:'98'
    // },{
    //   img:'../../images/111.jpg',
    //   tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
    //   jia:'35',
    //   shou:'98'
    // }],
    json:[],
    register:'',
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    message:{
      a:'云狮会数字营销论坛（第十三期）视频营销新时代',
      b:'云狮会数字营销论坛（第16期）：自媒体变现的道与术'
    },
    nicname:'',
    avatarUrl:''
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  allbtn:function(){
      wx.navigateTo({ 
        url: '../my-activities/my-activities?step=1&type=0' 
      })
      //写入参数
      // wx.request({
      //   url: xqUrl + '&type=0&phone=18518757835',
      //   data: {},
      //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //   // header: {}, // 设置请求的 header
      //   success: function(res){
      //     for(var i = 0;i<res.data.page.datas.length;i++){
      //       json.push(res.data.pages.datas[i]);
      //     }
      //     console.log(res.data.page.datas)
      //   },
      //   fail: function() {
      //     // fail
      //   },
      // })
  },
  allbtn1:function(){
      wx.navigateTo({ 
        url: '../my-activities/my-activities?step=2&type=1' 
      })
  },
  allbtn2:function(){
      wx.navigateTo({ 
        url: '../my-activities/my-activities?step=3&type=2' 
      })
  },
  allbtn3:function(){
      wx.navigateTo({ 
        url: '../my-activities/my-activities?step=4&type=3' 
      })
  },
  onwxLoad: function () {
		var page = this
		wx.getUserInfo({
			success: function (res) {
				page.setData({
					avatarUrl: res.userInfo.avatarUrl,
					nicname:res.userInfo.nickName
				})
			}
		});
    var url = '../WeChat-login/WeChat-login';
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
  },
  onLoad: function () {
      var page = this
      wx.getUserInfo({
        success: function (res) {
          page.setData({
            avatarUrl: res.userInfo.avatarUrl,
            nicname:res.userInfo.nickName
          })
        }
      }),
      //请求判断该用户是否登录过
      wx.request({
        url: 'test.php', //仅为示例，并非真实的接口地址
        data: {
          yes: '1' ,
          no: '2'
        },
        success: function(res) {
          
        },
        
      })
  },
  //监听是否登录过
  onShow:function(){
    this.setData({
      register:true
    })
    // console.log('重新加载了')
  }
})

// Page({
// 	    data: {
// 	        hiddenLoading: true,
// 	        json: {}
// 	    },
// 	    onLoad: function onLoad() {
// 	        var $this = this;
// 	        $this.setData({
// 	            hiddenLoading: false
// 	        });
// 	        wx.getStorage({
// 	            key: 'JSESSIONID',
// 	            success: function success(res) {
// 	                wx.request({
// 	                    url: 'http://10.10.10.204/jgb-web/v1/wealth/taAcctDetail',
// 	                    success: function success(res) {
// 	                        var resData = res.data;
// 	                        if (resData.errCode == '-1004') {
// 	                            wx.redirectTo({ url: '../index/index' });
// 	                        } else {
// 	                            var newData = resData.data.orgTaAcctlist;
// 	                            $this.setData({
// 	                                hiddenLoading: true,
// 	                                json: newData
// 	                            });
// 	                        }
// 	                    }
// 	                });
// 	            },
// 	            fail: function fail() {
// 	                // wx.switchTab({ url: '../wealth/wealth' });
// 	                wx.redirectTo({ url: '../index/index' });
// 	            }
// 	        })
//       }
//   })
