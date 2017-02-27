//index.js
//获取应用实例
var app = getApp()  
// var step = 1 // 当前操作的step  
var maxTime = 60  
var currentTime = maxTime //倒计时的事件（单位：s）  
var interval = null  
var hintMsg = null // 提示  
  
var check = require("../../utils/check.js")  
var webUtils = require("../../utils/registerWebUtil.js")  
var step_g = 1  
var repetition = true;//验证电话号是否绑定过微信号
var phoneNum = null, identifyCode = null, password = null, rePassword = null;  
  
Page({  
    data: {  
        windowWidth : 0,  
        windoeHeight : 0,  
        icon_phone: "../../img/icon_phone.png",  
        input_icon: "../../img/input_icon.png",  
        icon_password : "../../img/icon_password.png",  
        location : "中国",  
        nextButtonWidth: 0,  
        step: step_g,  
        time: currentTime  
    },  
    onLoad: function(option){  
        console.log(option.register)
        step_g = 1  
        var that = this  
        wx.getSystemInfo({  
          success: function(res) {  
            that.setData({  
                windowWidth : res.windowWidth,  
                windowHeight : res.windowHeight,  
                nextButtonWidth: res.windowWidth - 20  
            })  
          }  
        }),
        wx.onAccelerometerChange(function(res) {
            console.log(res.x)
            console.log(res.y)
            console.log(res.z)
        })
    },  
    onUnload: function(){  
        currentTime = maxTime  
        if(interval != null){  
            clearInterval(interval)  
        }  
    },  
    nextStep :function(){  
        var that = this
        if(repetition == false){
            if(step_g == 1){  
                if(firstStep()){  
                    step_g = 2  
                    interval = setInterval(function(){  
                        currentTime--;  
                        that.setData({  
                            time : currentTime  
                        })  
    
                        if(currentTime <= 0){  
                            clearInterval(interval)  
                            currentTime = -1  
                        }  
                    }, 1000)  
                }  
            }else if(step_g == 2){  
                if(secondStep()){  
                    step_g = 3  
                    clearInterval(interval)  
                }  
            }else{  
                if(thirdStep()){  
                    // 完成注册  
                    wx.navigateBack({  
                    delta: 2 
                    })
                }  
            }  
        }else{
            wx.makePhoneCall({
  phoneNumber: '1340000' //仅为示例，并非真实的电话号码
})
            setTimeout(function(){
                wx.hideToast()
            },2000)
        }  
  
        if(hintMsg != null){  
            wx.showToast({  
                  title: hintMsg,  
                  icon: 'loading',  
                  duration: 700  
            })  
        }  
  
        this.setData({  
            step: step_g  
        })  
    },  
    input_phoneNum: function(e){  
        phoneNum = e.detail.value  
    },  
    input_identifyCode: function(e){  
        identifyCode = e.detail.value  
    },  
    input_password: function(e){  
        password = e.detail.value  
    },  
    input_rePassword: function(e){  
        rePassword = e.detail.value  
    },  
    reSendPhoneNum: function(){  
        if(currentTime < 0){  
            var that = this  
            currentTime = maxTime  
            interval = setInterval(function(){  
                currentTime--  
                that.setData({  
                    time : currentTime  
                })  
  
                if(currentTime <= 0){  
                    currentTime = -1  
                    clearInterval(interval)  
                }  
            }, 1000)  
        }else{  
            wx.showToast({  
                title: '短信已发到您的手机，请稍后重试!',  
                icon : 'loading',  
                duration : 700  
            })  
        }  
    }  
})  
  
function firstStep(){ // 提交电话号码，获取［验证码］  
    if(!check.checkPhoneNum(phoneNum)){  
        hintMsg = "请输入正确的电话号码!"  
        return false  
    }  
  
    if(webUtils.submitPhoneNum(phoneNum)){  
        hintMsg = null  
        return true  
    }  
    hintMsg = "提交错误，请稍后重试!"  
    return false  
}  
  
function secondStep(){ // 提交［验证码］  
    if(!check.checkIsNotNull(identifyCode)){  
        hintMsg = "请输入验证码!"  
        return false  
    }  
  
    if(webUtils.submitIdentifyCode(identifyCode)){  
        hintMsg = null  
        return true  
    }  
    hintMsg = "提交错误，请稍后重试!"  
    return false  
}  
  
function thirdStep(){ // 提交［密码］和［重新密码］  
  
    console.log(password + "===" + rePassword)  
  
    if(!check.isContentEqual(password, rePassword)){  
        hintMsg = "两次密码不一致！"  
        return false  
    }  
  
    if(webUtils.submitPassword(password)){  
        hintMsg = "注册成功"  
        return true  
    }
    hintMsg = "提交错误，请稍后重试!"  
    return false  
}  