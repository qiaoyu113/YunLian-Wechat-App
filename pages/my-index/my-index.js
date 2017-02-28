var app = getApp()
var vlu = app.globalData.register
console.log()
Page({
  data: {
    imgUrls:[
      '../../images/111.jpg',
      '../../images/111.jpg'
    ],
    json: [{
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
      jia:'35',
      shou:'98'
    },{
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第16期）：自媒体变现的道与术',
      jia:'35',
      shou:'98'
    },{
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
      jia:'35',
      shou:'98'
    },{
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
      jia:'35',
      shou:'98'
    },{
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
      jia:'35',
      shou:'98'
    }],
    register:'vlu',
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
        url: '../my-activities/my-activities?step=1' 
      })
      //发送请求，获取数据
      wx.request({
        url: 'test.php',
        data: {
          x: '' ,
          y: ''
        },
        header:{
            "Content-Type":"application/json"
        },
        success: function(res) {
          var data = res.data;
        }
      });
  },
  allbtn1:function(){
      wx.navigateTo({ 
        url: '../my-activities/my-activities?step=2' 
      })
      //发送请求，获取数据
      wx.request({
        url: 'test.php',
        data: {
          x: '' ,
          y: ''
        },
        header:{
            "Content-Type":"application/json"
        },
        success: function(res) {
          var data = res.data;
        }
      });
  },
  allbtn2:function(){
      wx.navigateTo({ 
        url: '../my-activities/my-activities?step=3' 
      })
      //发送请求，获取数据
      wx.request({
        url: 'test.php',
        data: {
          x: '' ,
          y: ''
        },
        header:{
            "Content-Type":"application/json"
        },
        success: function(res) {
          var data = res.data;
        }
      });
  },
  allbtn3:function(){
      wx.navigateTo({ 
        url: '../my-activities/my-activities?step=4' 
      })
      //发送请求，获取数据
      wx.request({
        url: 'test.php',
        data: {
          x: '' ,
          y: ''
        },
        header:{
            "Content-Type":"application/json"
        },
        success: function(res) {
          var data = res.data;
        }
      });
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
          console.log(res.userInfo)
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
          x: '' ,
          y: ''
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data)
        }
      })
  },
  onShow:function() {
    register = app.globalData.register
    console.log(register)
  },
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
