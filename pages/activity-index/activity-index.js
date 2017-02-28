var app = getApp()
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
      shou:'98',
      time:'2017-09-27'
    },{
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第16期）：自媒体变现的道与术',
      jia:'35',
      shou:'98',
      time:'2017-09-27'
    },{
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
      jia:'35',
      shou:'98',
      time:'2017-09-27'
    },{
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
      jia:'35',
      shou:'98',
      time:'2017-09-27'
    },{
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
      jia:'35',
      shou:'98',
      time:'2017-09-27'
    },{
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
      jia:'35',
      shou:'98',
      time:'2017-09-27'
    },{
      img:'../../images/111.jpg',
      tit:'云狮会数字营销论坛（第十三期）视频营销新时代',
      jia:'35',
      shou:'98',
      time:'2017-09-27'
    }],
	  showView:true,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    type: 2,
    shijian:2,
    message:{
      a:'云狮会数字营销论坛（第十三期）视频营销新时代',
      b:'云狮会数字营销论坛（第16期）：自媒体变现的道与术'
    },
    map:['北京','222','333','444','555','666','777'],
    zhuti:['所有主题','美妆','食品','汽车','物流','旅游','3C','教育'],
    time:['不限','今天','明天','本周','本周末','本月']
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
  tapName: function(e) {
    var that = this;
    var type = that.data.type === '1' ? '2' : '1';
    that.setData({
        type: type,
        shijian:2,
        fanwei:2
    });
  },
  taptime:function(e){
    var that = this;
    var shijian = that.data.shijian === '1' ? '2' : '1';
    that.setData({
        shijian: shijian,
        type:2,
        fanwei:2
    });
  },
  tapfan:function(e){
    var that = this;
    var fanwei = that.data.fanwei === '1' ? '2' : '1';
    that.setData({
        fanwei: fanwei,
        type:2,
        shijian:2
    });
  },
  clicked:function(e){
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    console.log("index" + index);
    that.setData({
      type:2
    })
    wx.connectSocket({
      url: 'test.php?index ='+index,
      data:{
        x: '',
        y: ''
      },
      header:{ 
        'content-type': 'application/json'
      },
      method:"GET"
    })
  },
  clickedmap:function(e){
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    console.log("map" + index);
    that.setData({
      shijian:2
    })
    wx.connectSocket({
      url: 'test.php?map ='+index,
      data:{
        x: '',
        y: ''
      },
      header:{ 
        'content-type': 'application/json'
      },
      method:"GET"
    })
  },
  clickedtime:function(e){
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    console.log("time" + index);
    that.setData({
      fanwei:2
    })
    wx.connectSocket({
      url: 'test.php?time ='+index,
      data:{
        x: '',
        y: ''
      },
      header:{ 
        'content-type': 'application/json'
      },
      method:"GET"
    })
  },
  toast:function(e){
        var actId = e.currentTarget.dataset.id;
        var url = '../activity-detail/activity-detail';
        console.log(actId)
        wx.navigateTo({
          url: url,
          success: function(res){
            wx.request({
              url: 'test.php?actId='+actId,
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
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      }
})

// Page({
// 	    data: {
// 			zhuti:['所有主题','美妆','食品','汽车','物流','旅游','3C','教育'],
// 	    hiddenLoading: true,
// 			type: '图片',
// 	    json: {
        
//       },
// 			showView:true,
//       indicatorDots: true,
//       autoplay: false,
//       interval: 5000,
//       duration: 1000,
//       type: 2,
//       shijian:2,
//       message:{
//         a:'云狮会数字营销论坛（第十三期）视频营销新时代',
//         b:'云狮会数字营销论坛（第16期）：自媒体变现的道与术'
//       },
//       map:['北京','222','333','444','555','666','777'],
//       zhuti:['所有主题','美妆','食品','汽车','物流','旅游','3C','教育'],
//       time:['不限','今天','明天','本周','本周末','本月'],
// 	    },
// 	    onLoad: function onLoad() {
// 	        var $this = this;
// 	        $this.setData({
// 	            hiddenLoading: false
// 	        });
// 	        wx.setStorage({
// 	            key: 'JSESSIONID',
// 	            success: function success(res) {
// 	                wx.request({
// 	                    url: 'https://dutao.s1.natapp.cc/open/acts.html',
// 	                    success: function success(res) {
// 	                            $this.setData({
// 	                                hiddenLoading: true,
// 	                                json: res.data.obj.datas
// 	                            });
// 	                    }
// 	                });
// 	            },
// 	            fail: function fail() {
// 	                wx.redirectTo({ url: '../index/index' });
// 	            }
// 	        })
//       },
//       tapName: function(e) {
//         var that = this;
//         var type = that.data.type === '1' ? '2' : '1';
//         that.setData({
//             type: type,
//             shijian:2,
//             fanwei:2
//         });
//       },
//       taptime:function(e){
//         var that = this;
//         var shijian = that.data.shijian === '1' ? '2' : '1';
//         that.setData({
//             shijian: shijian,
//             type:2,
//             fanwei:2
//         });
//       },
//       tapfan:function(e){
//         var that = this;
//         var fanwei = that.data.fanwei === '1' ? '2' : '1';
//         that.setData({
//             fanwei: fanwei,
//             type:2,
//             shijian:2
//         });
//       },
//       toast:function(e){
//         var actId = e.currentTarget.dataset.id;
//         var url = '../logs/logs?actId='+actId;
//         console.log(url)
//         wx.navigateTo({
//           url: url,
//           success: function(res){
//             // success
//           },
//           fail: function() {
//             // fail
//           },
//           complete: function() {
//             // complete
//           }
//         })
//       }
//   })