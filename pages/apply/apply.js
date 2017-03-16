var http = require('../../utils/HttpUtil.js');
var app = getApp()
var actId = ''
var json = ''
var tickets = ''
var kind = ''
var totalNum = ''
var limitNum = ''
var staffSign = ''
var danx = ''
var duox = ''
var zong = ''
var price = ''
var passId = ''
var userId = ''
var ticketId = ''

var orderDetails = [];//提交报名携带的票种ID和数量
var orderDetail = {};//提交报名携带的票种ID和数量
var infos = [];//携带用户填写的报名信息

//时间戳
function toDate(number) {
    var n = number;
    var date = new Date(n);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var H = date.getHours();
    var F = date.getMinutes()
    return (Y + M + D + ' ')
}


Page({
    data: {
        json: json,
        tickets: tickets,
        carts: '1',
        minusStatuses: '1',
        checked: true,
        checked2: false,
        kind: '',
        totalNum: '',
        num: '1',
        limitNum: limitNum,
        staffSign: staffSign,
        danx: danx,
        duox: duox,
        infoMess: '',
        userName: '',
        userN: '',
        passWd: '',
        passW: '',
        zong: zong,
        price: price,
        inputContent: {},
        userId: '',
        passId: '',
        ticketId: '',
        name: '',
        phone: ''
    },
    userNameInput: function (e) {
        this.setData({
            userN: e.detail.value,
            passId: e.currentTarget.id
        })
    },
    passWdInput: function (e) {
        this.setData({
            passW: e.detail.value,
            passId: e.currentTarget.id
        })
    },
    //确认订单验证
    formSubmit: function (e) {
        var infos = e.detail.value;
        infos.actId = actId;
        infos.openId = app.globalData.openId;
        infos.tradeType = 'JSAPI';


        http._post("open/wx/apply", { 'actId': actId, 'infos': JSON.stringify(infos), 'orderDetail': JSON.stringify(orderDetails) }, function (successRes) {
            if (successRes.data.success) {
                if (successRes.data.status == 1) {//付费订单-待支付
                    wx.setStorageSync('payparam', successRes.data.wx_jsapi_pay);
                    wx.setStorageSync('order', successRes.data.order);
                    wx.navigateTo({
                        url: '../waitapply/waitapply'
                    })
                } else if (successRes.data.status == 2) {//免费订单-待审核
                    wx.showModal({
                        title: '提示',
                        content: successRes.data.msg,
                        success: function (res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '../my-index/my-index'
                                })
                            }
                        }
                    })
                } else if (successRes.data.status == 3) {//免费订单-成功
                    wx.showModal({
                        title: '提示',
                        content: successRes.data.msg,
                        success: function (res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '../piao/piao?orderId=' + successRes.data.orderId
                                })
                            }
                        }
                    })
                }

            } else {
                wx.showToast({
                    title: successRes.data.msg,
                    icon: 'loading',
                    duration: 2000
                });
            }
        }, function (failRes) { }, function (completeRes) { });
        // if (this.data.userN.length == 0 && this.data.passW.length == 0) {
        //     wx.showToast({
        //         title: '必填项不能为空！',
        //         icon: 'loading',
        //         duration: 1000
        //     })
        //     setTimeout(function () {
        //         wx.hideToast()
        //     }, 2000)
        // } else {
        //     wx.navigateTo({
        //         url: '../waitapply/waitapply'
        //     })
        // }
    },
    //单选取值
    totalNum: function (e) {
        totalNum = e.currentTarget.id
        limitNum = e.currentTarget.dataset.limitnum
        zong = e.currentTarget.dataset.zong
        var ticketId = e.currentTarget.dataset.ticketid;
        buildOrderDetails(ticketId, 1);
        this.setData({
            totalNum: totalNum,
            limitNum: limitNum,
            zong: zong
        })
    },
    //单选
    radioChange: function (e) {
        var checked = e.detail.value
        kind = checked
        this.setData({
            kind: kind,
            num: 1
        })
        var changed = {}
        this.setData(changed)
    },
    onLoad: function (options) {
        tickets = []
        staffSign = []
        danx = []
        duox = []
        actId = options.actId
        var that = this
        var url = 'apply/' + actId + '.html'
        http._post(url, null, function (res) {
            json = res.data.activity
            for (var i = 0; i < json.staffSign.length; i++) {
                if (json.staffSign[i].value == null) {

                } else {
                    if (json.staffSign[i].type == "danx") {
                        danx.push(json.staffSign[i].value)
                    } else {
                        duox.push(json.staffSign[i].value)
                    }
                }
                staffSign.push(json.staffSign[i])
            }
            res.data.activity.actStartTime = toDate(res.data.activity.actStartTime)
            res.data.activity.actEndTime = toDate(res.data.activity.actEndTime)
            var length = res.data.activity.tickets.length
            for (var i = 0; i < length; i++) {
                kind = res.data.activity.tickets[i].detail
                limitNum = res.data.activity.tickets[i].limitNum
                price = res.data.activity.tickets[i].price
                totalNum = res.data.activity.tickets[i].totalNum
                zong = price / 100;
                ticketId = res.data.activity.tickets[i].id;
                tickets.push(res.data.activity.tickets[i]);
            }
            buildOrderDetails(ticketId, 1);
            that.setData({
                json: json,
                tickets: tickets,
                kind: kind,
                totalNum: totalNum,
                price: price,
                limitNum: limitNum,
                staffSign: staffSign,
                danx: danx,
                duox: duox,
                zong: zong,
                ticketId: ticketId,
                name: app.globalData.userInfo.name,
                phone: app.globalData.userInfo.phone
            });
        }, function (res) { }, function (res) { })
    },
    //数量减法
    bindMinus: function (e) {
        var num = this.data.num;
        // 如果只有1件了，就不允许再减了
        if (num > 1) {
            num--;
        } else {
            num = 1
        }
        buildOrderDetails(null, num);
        this.setData({
            num: num
        })
    },
    //数量加法
    bindPlus: function (e) {
        var num = this.data.num;
        var limitNum = this.data.limitNum
        if (num >= 1 && num < limitNum) {
            num++;
        } else {
            num = num;
        }
        buildOrderDetails(null, num);
        this.setData({
            num: num
        })
    }
})
//组装orderDetail
function buildOrderDetails(ticketId, num) {
    if (ticketId) {
        orderDetail.ticketId = ticketId;
    }
    if (num) {
        orderDetail.num = num;
    }
    orderDetails = [];
    orderDetails.push(orderDetail);
}