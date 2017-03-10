var app = getApp();
var http = require('../../utils/HttpUtil.js');
var login = require('../../utils/login.js');

var urlapp = app.globalData.contextUrl;
var page = 0;
var pages = 1;
var pages2 = 1;
var pages3 = 1;
var more = true;
var nomore = false;
var zhezhao1 = 2;
var subjectUrl = '';
var checked = 1;//监听是否点击过活动事件
var map = ['所有地点', '北京', '上海', '广州', '深圳', '杭州', '成都', '南京', '苏州', '武汉', '天津', '重庆', '西安', '厦门', '宁波', '郑州', '青岛'];
var time = ['不限', '今天', '明天', '本周', '本周末', '本月']
var timevalue = ['all', 'today', 'tomorrow', 'week', 'weekend', 'month']
var Newurl = '';
var timeurl = '';
var mapindex = ''
var timeindex = ''
var add = true;//控制进入是否是第一页
var thispages2 = 1;
var subjectUrl2 = '';//监听点击事件之后的流加载路径
var zhuti = [];
var json = [];
var thispages3 = 1;




//时间戳转换时间  
function toDate(number) {
  var n = number;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
}


// 获取数据的方法，具体怎么获取列表数据大家自行发挥  
var loadMore = function (that) {
  var zhuti = [];
  that.setData({
    hidden: 1,
  });
  wx.request({
    url: urlapp + '&pageNo=' + pages,
    data: {
      page: page,
      zhuti: zhuti
    },
    success: function (res) {
      var json = that.data.json;
      // console.log(res.data.pages.datas)
      var length = res.data.pages.datas.length
      var zong = res.data.pages.totalPage
      var pp = pages
      var zleng = res.data.aList
      for (var i = 0; i < zleng.length; i++) {
        zhuti.push(zleng[i])
      }
      if (pp <= zong) {
        for (var i = 0; i < length; i++) {
          res.data.pages.datas[i].publishTime = toDate(res.data.pages.datas[i].publishTime)

          json.push(res.data.pages.datas[i]);
        }

        if (zong == 1 || length == 0) {
          that.setData({
            nomore: true,
            more: false,
          });
        } else {
          that.setData({
            nomore: false,
            more: true,
          });
        }
        pages++;
        more = true;
        nomore = false;
      } else {
        that.setData({
          nomore: true,
          more: false,
        });

      }

      that.setData({
        json: json,
        zhuti: zhuti
      });

      that.setData({
        hidden: true
      });
    }
  });
}

var checkMore = function (that) {
  if (add == true) {
    zhuti = [];
    json = [];
    thispages2 = pages2;
    subjectUrl2 = subjectUrl
  } else {
    zhuti = [];
    subjectUrl2 = subjectUrl2
  }
  wx.request({
    url: subjectUrl2,
    success: function (res) {
      // console.log(res.data.pages.datas[i]) 
      // console.log(url);
      var totalCount = res.data.pages.datas.length
      var totalPage = res.data.pages.totalPage
      var zongpage = thispages2
      var zleng = res.data.aList
      for (var i = 0; i < zleng.length; i++) {
        zhuti.push(zleng[i])
      }
      // console.log(zhuti)
      if (zongpage <= totalPage) {
        for (var i = 0; i < totalCount; i++) {
          res.data.pages.datas[i].publishTime = toDate(res.data.pages.datas[i].publishTime)
          json.push(res.data.pages.datas[i]);
        }
        if (totalPage == 1 || totalCount == 0) {
          that.setData({
            nomore: true,
            more: false,
          });
        } else {
          that.setData({
            nomore: false,
            more: true,
          });
        }
        thispages2++;
        add = false;
      } else {
        that.setData({
          nomore: true,
          more: false,
        });

      }

      that.setData({
        json: json,
        zhuti: zhuti,
        hidden: true
      });
    }
  })
}

var mapMore = function (that) {
  if (mapindex == 0) {
    Newurl = urlapp
    if (add == true) {
      zhuti = [];
      json = [];
      thispages3 = pages3;
    } else {
      zhuti = [];
    }
  } else {
    if (add == true) {
      zhuti = [];
      json = [];
      thispages3 = pages3;
    } else {
      zhuti = [];
    }
    Newurl = urlapp + '&address=' + map[mapindex] + '&pageNo=' + thispages3
  }
  Newurl = encodeURI(Newurl)
  console.log(Newurl)
  console.log('thispages3' + thispages3)
  wx.request({
    url: Newurl,
    success: function (res) {
      // console.log(res.data.pages.datas[i]) 
      // console.log(url);
      var totalCount = res.data.pages.datas.length
      var totalPage = res.data.pages.totalPage
      var zongpage = thispages3
      var zleng = map
      for (var i = 0; i < zleng.length; i++) {
        zhuti.push(zleng[i])
      }
      // console.log(zhuti)
      if (zongpage <= totalPage) {
        for (var i = 0; i < totalCount; i++) {
          res.data.pages.datas[i].publishTime = toDate(res.data.pages.datas[i].publishTime)
          json.push(res.data.pages.datas[i]);
        }
        if (totalPage == 1 || totalCount == 0) {
          that.setData({
            nomore: true,
            more: false,
          });
        } else {
          that.setData({
            nomore: false,
            more: true,
          });
        }
        thispages3++;
        add = false
      } else {
        that.setData({
          nomore: true,
          more: false,
        });

      }

      that.setData({
        json: json,
        zhuti: zhuti,
        hidden: true
      });
    }
  })
}

var timeMore = function (that) {
  if (timeindex == 0) {
    timeurl = urlapp
    if (add == true) {
      zhuti = [];
      json = [];
      thispages3 = pages3;
    } else {
      zhuti = [];
    }
  } else {
    if (add == true) {
      zhuti = [];
      json = [];
      thispages3 = pages3;
    } else {
      zhuti = [];
    }
    timeurl = urlapp + '&time=' + timevalue[timeindex] + '&pageNo=' + thispages3
  }
  // timeurl = encodeURI(timeurl)
  console.log(timeurl)
  console.log('thispages3' + thispages3)
  wx.request({
    url: timeurl,
    success: function (res) {
      // console.log(res.data.pages.datas[i]) 
      // console.log(url);
      var totalCount = res.data.pages.datas.length
      var totalPage = res.data.pages.totalPage
      var zongpage = thispages3
      var zleng = time
      for (var i = 0; i < zleng.length; i++) {
        zhuti.push(zleng[i])
      }
      // console.log(zhuti)
      if (zongpage <= totalPage) {
        for (var i = 0; i < totalCount; i++) {
          res.data.pages.datas[i].publishTime = toDate(res.data.pages.datas[i].publishTime)
          json.push(res.data.pages.datas[i]);
        }
        if (totalPage == 1 || totalCount == 0) {
          that.setData({
            nomore: true,
            more: false,
          });
        } else {
          that.setData({
            nomore: false,
            more: true,
          });
        }
        thispages3++;
        add = false
      } else {
        that.setData({
          nomore: true,
          more: false,
        });

      }

      that.setData({
        json: json,
        zhuti: zhuti,
        hidden: true
      });
    }
  })
}

Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    json: [],
    showView: true,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    type: 2,
    shijian: 2,
    nomore: nomore,
    more: more,
    zhezhao: zhezhao1,
    contextUrl: app.globalData.contextUrl,
    resourceUrl: app.globalData.resourceUrl,
    message: {
      a: '云狮会数字营销论坛（第十三期）视频营销新时代',
      b: '云狮会数字营销论坛（第16期）：自媒体变现的道与术'
    },
    map: map,
    zhuti: [],
    time: time,
  },

  //AJAX加载
  onLoad: function onLoad() {
    //1.进入后先进行登录
    login._login();//执行登录

    // wx.checkSession({
    //   success: function () {
    //     console.log("嘿嘿嘿")
    //     //session 未过期，并且在本生命周期一直有效
    //   },
    //   fail: function () {
    //     //登录态过期
    //     login.login();//执行登录
    //   }
    // })

    var $this = this;
    $this.setData({
      hasRefesh: true,
      more: true,
    });
    wx.getSystemInfo({//获取高度
      success: function (res) {
        $this.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    loadMore($this);
  },

  //主题选择（按钮）
  tapName: function (e) {
    var that = this;
    var type = that.data.type === '1' ? '2' : '1';
    if (zhezhao1 == 2 || type == 1) {
      zhezhao1 = 1
    } else {
      zhezhao1 = 2
    }
    that.setData({
      type: type,
      shijian: 2,
      fanwei: 2,
      zhezhao: 2,
      zhezhao: zhezhao1
    });
  },
  //时间地点选择（按钮）
  taptime: function (e) {
    var that = this;
    var shijian = that.data.shijian === '1' ? '2' : '1';
    if (zhezhao1 == 2 || shijian == 1) {
      zhezhao1 = 1
    } else {
      zhezhao1 = 2
    }
    that.setData({
      shijian: shijian,
      type: 2,
      fanwei: 2,
      zhezhao: 2,
      zhezhao: zhezhao1
    });
  },
  //时间范围选择（按钮）
  tapfan: function (e) {
    var that = this;
    var fanwei = that.data.fanwei === '1' ? '2' : '1';
    if (zhezhao1 == 2 || fanwei == 1) {
      zhezhao1 = 1
    } else {
      zhezhao1 = 2
    }
    that.setData({
      fanwei: fanwei,
      type: 2,
      shijian: 2,
      zhezhao: zhezhao1
    });
  },


  //点击查看详情页
  toast: function (e) {
    var actId = e.currentTarget.dataset.id;
    var url = '../activity-detail/activity-detail?actId=' + actId;
    wx.navigateTo({
      url: url,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  //点击选择主题选项
  clicked: function (e) {
    thispages2 = 1
    add = true;
    checked = 2;
    console.log(checked)
    var that = this;
    var index = e.currentTarget.dataset.id;
    subjectUrl = urlapp + '&subject=' + index;
    console.log(subjectUrl)
    that.setData({
      type: 2,
      zhezhao: 2,
      scrollTop: 0
    })
    checkMore(that)
  },

  //点击选择地点选项
  clickedmap: function (e) {
    checked = 3;
    add = true;
    var that = this;
    that.setData({
      shijian: 2,
      zhezhao: 2,
      scrollTop: 0
    })
    var index = parseInt(e.currentTarget.dataset.index);
    mapindex = index
    console.log(mapindex)
    mapMore(that)

  },

  //点击时间范围选项
  clickedtime: function (e) {
    var that = this;
    checked = 4;
    add = true;
    that.setData({
      fanwei: 2,
      zhezhao: 2,
      scrollTop: 0
    })
    var index = parseInt(e.currentTarget.dataset.index);
    timeindex = index
    console.log('哈哈' + timeindex);
    timeMore(that)
  },


  //点击遮罩层
  nozhezhao: function (e) {
    var that = this;
    that.setData({
      fanwei: 2,
      zhezhao: 2,
      type: 2,
      shijian: 2,
    })
  },

  //点击所有主题
  alltheme: function () {
    this.setData({
      json: [],
      fanwei: 2,
      zhezhao: 2,
      type: 2,
      shijian: 2,
    })
    checked = 1
    pages = 1
    loadMore(this);
    this.setData({
      scrollTop: 0
    })
  },


  //页面滑动到底部
  bindDownLoad: function () {
    subjectUrl2 = ''
    subjectUrl2 = subjectUrl + '&pageNo=' + thispages2
    var that = this;
    if (checked == 2) {
      checkMore(that)
    } else if (checked == 1) {
      loadMore(that);
    } else if (checked == 3) {
      mapMore(that)
    } else {
      timeMore(that)
      console.log('shanchuwo')
    }
  },

  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },


})