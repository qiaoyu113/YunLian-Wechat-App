//index.js
//获取应用实例
var app = getApp()
var myUrl = app.globalData.myUrl
var json = [];
var type1 = '';
var status = '';

//时间戳
function toDate(number) {
  var n = number;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var H = date.getHours();
  var F = date.getMinutes()
  return (Y + M + D +' '+ H + ':' + F )
}



Page({
  data: {
    userInfo: {},
    step:'',
    status:'',
    // json:[{
    //   tit:'2017创新中国春季峰会',
    //   img:'../../images/111.jpg',
    //   time:'2017-04-21 08:00:00',
    //   add:'北京东城区北京国家会议图书馆',
    //   peo:'创业邦',
    //   money:'收费',
    //   pay:'支付成功',
    //   math:'1',
    //   zong:'1'
    // },{
    //   tit:'2017创新中国春季峰会',
    //   img:'../../images/111.jpg',
    //   time:'2017-04-21 08:00:00',
    //   add:'北京东城区北京国家会议图书馆',
    //   peo:'创业邦',
    //   money:'收费',
    //   pay:'支付成功',
    //   math:'1',
    //   zong:'1'
    // },{
    //   tit:'2017创新中国春季峰会',
    //   img:'../../images/111.jpg',
    //   time:'2017-04-21 08:00:00',
    //   add:'北京东城区北京国家会议图书馆',
    //   peo:'创业邦',
    //   money:'收费',
    //   pay:'支付成功',
    //   math:'1',
    //   zong:'1'
    // },{
    //   tit:'2017创新中国春季峰会',
    //   img:'../../images/111.jpg',
    //   time:'2017-04-21 08:00:00',
    //   add:'北京东城区北京国家会议图书馆',
    //   peo:'创业邦',
    //   money:'收费',
    //   pay:'支付成功',
    //   math:'1',
    //   zong:'1'
    // }],
    json:json,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    json = []
    console.log(options)
    type1 = options.type
    this.setData({
      step:options.step,
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    //写入参数
      wx.request({
        url: myUrl + '&type=' + type1 + '&phone=17773812402&pageNo=1',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          status = res.data.status
          var len = res.data.page
          if(status == 'OK'){
            for(var i = 0;i<len.length;i++){
              res.data.page[i].actStartTime = toDate(res.data.page[i].actStartTime)
              json.push(res.data.page[i]);
            }
            that.setData({
              json:json,
              status:status
            })
          }else{
            that.setData({
              status:status
            })
          }
        },
        fail: function() {
          // fail
        },
      })
     
  },
  chakan:function(e){
    var actId = e.currentTarget.dataset.id;
    var url = '../piao/piao?actId='+ actId;
    console.log(url)
    wx.navigateTo({
      url:url
    })
  }
})
