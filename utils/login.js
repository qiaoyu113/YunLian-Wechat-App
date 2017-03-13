var app = getApp();
var http = require("HttpUtil.js");
//封装登录接口
function login() {
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

                    wx.getUserInfo({//4.获取用户信息
                        success: function (result) {
                            app.globalData.userInfo = result.userInfo;//用户信息放到gloableData中
                            http._post('open/decodeUserInfo', { 'encryptedData': result.encryptedData, 'iv': result.iv }, function (userInfoRes) {
                                app.globalData.openId = userInfoRes.data.openId;
                                console.log(userInfoRes);
                            }, function (fail) { }, function (complete) { })
                        }, fail: function (fail) {
                            console.log("没有允许获取用户信息");
                        }
                    })
                }, function (fail) {

                }, function (complete) { });
            }
        }
    });
}



module.exports = {
    _login: login
}