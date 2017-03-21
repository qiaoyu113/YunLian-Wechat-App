var app = getApp();
var http = require("HttpUtil.js");
//封装登录接口
function login(page, url) {
    wx.checkSession({
        success: function () {
            //session 未过期，并且在本生命周期一直有效
            console.log('没过期');
            if (!wx.getStorageSync('3rdSessionId')) {
                get3rdSession();
                getUserInfo(page, url);
            } else if (!wx.getStorageSync('allowUserInfo')) {
                getUserInfo(page, url);
            } else if (wx.getStorageSync('bindPhone') != '1') {
                wx.navigateTo({
                    url: '../WeChat-login/WeChat-login'
                })
            } else {
                if (page != null) {
                    page.setData({
                        userInfo: wx.getStorageSync('userInfo')
                    })
                }
            }
            console.log(wx.getStorageSync('3rdSessionId'));
        },
        fail: function () {
            //登录态过期
            get3rdSession();
            getUserInfo(page, url);
        }
    })

}

//获取3rdSessionId并存储到本地缓存
function get3rdSession() {
    wx.login({
        success: function (loginRes) {
            var code = loginRes.code;
            if (code) {
                //2.code换取openid+session_key
                var sessionParam = new Object();
                sessionParam.code = code;
                http._post('open/getSession', { 'code': code }, function (sessionRes) {//成功回调
                    if (sessionRes) {
                        wx.setStorage({//3.缓存系统sessionId到本地缓存
                            key: '3rdSessionId',
                            data: sessionRes.data.string,
                            success: function (res) {
                                console.log('第三方sessionId保存成功');
                            },
                            fail: function () {
                                console.log('第三方sessionId保存失败');
                            },
                            complete: function () {
                                // complete
                            }
                        })
                    }
                }, function (fail) {

                }, function (complete) { });
            }
        }
    });
}

//获取用户信息
function getUserInfo(page, url) {
    wx.getUserInfo({//4.获取用户信息
        success: function (result) {
            wx.setStorageSync('allowUserInfo', '1');//允许获取用户信息
            wx.setStorageSync('userInfo', result.userInfo)
            // app.globalData.userInfo = result.userInfo;//用户信息放到gloableData中
            if (page != null) {
                page.setData({
                    userInfo: result.userInfo
                })
            }
            http._post('open/decodeUserInfo', { 'encryptedData': result.encryptedData, 'iv': result.iv }, function (userInfoRes) {
                wx.setStorageSync('openId', userInfoRes.data.result.obj.openId);
                // app.globalData.openId = userInfoRes.data.result.obj.openId;
                var bindPhone = userInfoRes.data.result.obj.bindPhone;
                if (!bindPhone) {
                    wx.setStorageSync('bindPhone', '0');//标识下没有绑定手机号
                    wx.setStorageSync('bindRandom', userInfoRes.data.result.obj.thirdSessionKey);//绑定标识
                    wx.navigateTo({
                        url: '../WeChat-login/WeChat-login'
                    })
                } else {
                    wx.setStorageSync('bindPhone', '1');//绑定手机号
                    var userInfoStorage = wx.getStorageSync('userInfo');
                    userInfoStorage.name = userInfoRes.data.result.obj.name;
                    userInfoStorage.phone = userInfoRes.data.result.obj.phone;
                    wx.setStorageSync('userInfo', userInfoStorage);
                    if (url != null) {
                        wx.navigateTo({
                            url: url
                        })
                    }
                }
            }, function (fail) { }, function (complete) { })
        }, fail: function (fail) {
            wx.setStorageSync('allowUserInfo', '2');//拒绝获取用户信息

            console.log("没有允许获取用户信息");
        }
    })
}

module.exports = {
    _login: login
}