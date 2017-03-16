var http = require('../../utils/HttpUtil.js');
var app = getApp()
var num = 1000//计时  
var strH = ''
var strM = ''
var strS = ''
var timer = ''

Page({
    data: {
        timeText: '',//展示  
        price: 100,
        math: 1,
        category: '票种2',
        order: {}
    },
    onLoad: function (options) {
        var order = wx.getStorageSync('order');
        this.setData({
            order: order.details[0]
        })

        this.move()
        //计时开始 后面的1000是毫秒 每1000毫秒跳一次  
        timer = setInterval(this.move, 1000);

        requestWxPay();
    },
    move() {
        //时  
        strH = this.zeroFill('' + parseInt(num / 3600 % 24), 2)

        //分  
        strM = this.zeroFill('' + parseInt(num / 60 % 24), 2)

        //秒  
        strS = this.zeroFill('' + parseInt(num % 60), 2)

        //赋值给text内容  
        this.setData({
            timeText: strH + ':' + strM + ':' + strS
        })

        //当时间归零停止计时器  
        if (num == 0) {
            clearInterval(timer)
            return
        }

        //每秒递减  
        num--
    },
    zeroFill(str, n) {
        //补零方法，str为数字字符串 n为需要的位数，不够补零  
        if (str.length < n) {
            str = '0' + str
        }
        return str
    },
    //立即购买
    payNow: function () {
        requestWxPay();
    }
})

//呼起微信支付窗口，回调支付成功
function requestWxPay() {
    var payparam = wx.getStorageSync('payparam');
    var order = wx.getStorageSync('order');
    if (payparam) {
        wx.requestPayment({
            "timeStamp": payparam.timeStamp,
            "nonceStr": payparam.nonceStr,
            "package": payparam.package,
            "signType": "MD5",
            "paySign": payparam.paySign,
            "success": function (res) {
                wx.showModal({
                    title: '支付通知',
                    content: '支付成功，查看票信息',
                    success: function (res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '../piao/piao?orderId=' + order.id
                            })
                        }
                    }
                })
            },
            "fail": function (res) {
                wx.redirectTo({
                    url: '../my-index/my-index'
                })
            }
        })
    }
}