var app = getApp()
var phoneNum = null
var hintMsg = null // 提示  
var phoneNum = null
var password = null
var check = require("../../utils/check.js") 
var webUtils = require("../../utils/registerWebUtil.js") 
Page({
    data:{

    },
    onLoad: function(option){  
        // console.log(option.register)
    },  
    bangding:function(){
        if(firstStep()&&secondStep()){
            console.log("后台验证是否密码正确")
        }
        if(hintMsg != null){  
            wx.showToast({  
                    title: hintMsg,  
                    icon: 'loading',  
                    duration: 700  
            })  
        } 
    },
    input_phoneNum: function(e){ 
        phoneNum = e.detail.value
    }, 
    input_password: function(e){  
        password = e.detail.value  
    }, 
})

function firstStep(){ // 提交电话号码，获取［验证码］  
    if(!check.checkPhoneNum(phoneNum)){  
        hintMsg = "请输入正确的电话号码!"  
        return false  
    }
    if(phoneNum.length != 11){
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

function secondStep(){ // 提交电话号码，获取［验证码］  
    if(!check.checkPhoneNum(password)){  
        hintMsg = "请输入正确的密码!"  
        return false  
    }
    if(password.length<6){
        hintMsg = "密码长度不能小于6位"  
        return false
    }
    if(webUtils.submitPhoneNum(password)){  
        hintMsg = null  
        return true  
    }  
    hintMsg = "提交错误，请稍后重试!"  
    return false  
} 