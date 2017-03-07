//logs.js
var utils = require('../../utils/utils.js');
var QR = require("../../utils/qrcode.js");
var placeadd=[]//默认二维码生成文本;
var app = getApp()
var piaoUrl = app.globalData.piaoUrl

Page({
  data:{
    json:[{
      name:'乔宇',
      num:'1231412413',
      zt:'待支付',
      money:'288',
      tit:'2017创新中国春季峰会',
      time:'2017.04.21-2017.04.22',
      address:'北京东城区北京国家会议中心绿卡就等放假垃圾啊水力发电垃圾啊收代理费',
      number:'9847586021',
      placeadd:'http://qizhigo.com'
    },{
      name:'乔宇',
      num:'1231412413',
      zt:'待支付',
      money:'288',
      tit:'2017创新中国春季峰会',
      time:'2017.04.21-2017.04.22',
      address:'北京东城区北京国家会议中心绿卡就等放假垃圾啊水力发电垃圾啊收代理费',
      number:'9847586021',
      placeadd:'http://qizhigo.com'
    }],
    maskHidden:true,
    imagePath:'',
    placeholder:'',//默认二维码生成文本,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad:function(options){
    console.log(options)
    var actId = options.actId
    // placeadd:
     wx.request({
        url: piaoUrl + actId + '.html?format=json',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          console.log(res)
          
        },
        fail: function() {
          // fail
        },
      })
    

  },
  onReady:function(){
  	var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.placeholder;
    this.createQrCode(initUrl,"mycanvas",size.w,size.h);
  },
  onShow:function(){
    
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },

  onUnload:function(){
    // 页面关闭

  },
  //适配不同屏幕大小的canvas
  setCanvasSize:function(){
    var size={};
    try {
        var res = wx.getSystemInfoSync();
        console.log(res)
        var scale = 750/686;//不同屏幕下canvas的适配比例；设计稿是750宽
        var width = res.windowWidth/scale/2.65;
        var height = width;//canvas画布为正方形
        size.w = width;
        size.h = height;
      } catch (e) {
        // Do something when catch error
        console.log("获取设备信息失败"+e);
      } 
    return size;
  } ,
  createQrCode:function(url,canvasId,cavW,cavH){
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url,canvasId,cavW,cavH);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage:function(){
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log("********"+tempFilePath);
          that.setData({
              imagePath:tempFilePath,
          });
      },
      fail: function (res) {
          console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg:function(e){
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
					wx.previewImage({
      			current: tempFilePath, // 当前显示图片的http链接
      			urls: [tempFilePath] // 需要预览的图片http链接列表
    			})
      },
      fail: function (res) {
          console.log(res);
      }
    });
    
  },
  formSubmit: function(e) {
    var that = this;
    var url = e.detail.value.url;
    that.setData({
      maskHidden:false,
    });
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration:2000
    });
    var st = setTimeout(function(){
      wx.hideToast()
      var size = that.setCanvasSize();
      //绘制二维码
      that.createQrCode(url,"mycanvas",size.w,size.h);
      that.setData({
        maskHidden:true
      });
      clearTimeout(st);
    },2000)
    
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
  }

})
