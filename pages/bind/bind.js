var app = getApp()
var phoneNum = null
var hintMsg = null // 提示  
var phoneNum = null
var password = null
var check = require("../../utils/check.js")
var webUtils = require("../../utils/registerWebUtil.js")
var http = require("../../utils/HttpUtil.js")
Page({
    data: {

    },
    onLoad: function (option) {
        // console.log(option.register)
    },
    bangding: function () {
        if (firstStep() && secondStep()) {
            var bindRandom = wx.getStorageSync('bindRandom');
            http._post('open/registAndBand', { 'username': phoneNum, 'password': password, 'type': '4', 'bindRandom': bindRandom }, function (res) {//成功回调
                if (res) {
                    wx.setStorageSync('openId', res.data.resultEntity.obj.openId);
                    wx.setStorageSync('bindPhone', '1');//绑定手机号
                    var userInfoStorage = wx.getStorageSync('userInfo');
                    userInfoStorage.name = res.data.resultEntity.obj.name;
                    userInfoStorage.phone = res.data.resultEntity.obj.phone;
                    wx.setStorageSync('userInfo', userInfoStorage);
                    wx.switchTab({
                        url: '../my-index/my-index',
                    })
                }
            }, function (fail) {

            }, function (complete) { });
            // console.log("后台验证是否密码正确")
        }
        if (hintMsg != null) {
            wx.showToast({
                title: hintMsg,
                icon: 'loading',
                duration: 700
            })
        }
    },
    input_phoneNum: function (e) {
        phoneNum = e.detail.value
    },
    input_password: function (e) {
        password = e.detail.value
    },
})

function firstStep() { // 提交电话号码，获取［验证码］  
    if (!check.checkPhoneNum(phoneNum)) {
        hintMsg = "请输入正确的电话号码!"
        return false
    }
    if (phoneNum.length != 11) {
        hintMsg = "请输入正确的电话号码!"
        return false
    }

    hintMsg = null
    return true
}

function secondStep() { // 提交电话号码，获取［验证码］  
    if (!check.checkPhoneNum(password)) {
        hintMsg = "请输入正确的密码!"
        return false
    }
    if (password.length < 6) {
        hintMsg = "密码长度不能小于6位"
        return false
    }

    hintMsg = null
    return true
} 