var app = getApp()
/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _get(url, success, fail, complete) {
    wx.request({
        url: app.globalData.domainUrl + url + "?format=json",
        header: {
            'Content-Type': 'application/json',
            'sessionId': getSessionId()
        },
        success: function (res) {
            success(res);
        },
        fail: function (res) {
            fail(res);
        }, complete: function (res) {
            complete(res);
        }
    });
}

/**
* url 请求地址
* success 成功的回调
* fail 失败的回调
*/
function _post_form(targetUrl, targetData, cbSuccess, cbFail, cbComplete) {
    if(!targetData){
        targetData = {};
    }
    targetData.sessionId = getSessionId();
    wx.request({
        url: app.globalData.domainUrl + targetUrl + "?format=json",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        data: targetData,
        success: function (res) {
            cbSuccess(res);
        },
        fail: function (res) {
            cbFail(res);
        },
        complete: function (res) {
            cbComplete(res);
        }
    });
}

/**
* url 请求地址
* success 成功的回调
* fail 失败的回调
*/
function _post_json(targetUrl, targetData, cbSuccess, cbFail, cbComplete) {
    wx.request({
        url: app.globalData.domainUrl + targetUrl + "?format=json",
        header: {
            'content-type': 'application/json;charset=utf-8',
            'sessionId': getSessionId()
        },
        method: 'POST',
        data: targetData,
        success: function (res) {
            cbSuccess(res);
        },
        fail: function (res) {
            cbFail(res);
        },
        complete: function (res) {
            cbComplete(res);
        }
    });
}

/**
* 获取sessionId
*/
function getSessionId() {
    var sessionId = wx.getStorageSync('3rdSessionId');
    if (null == sessionId) {
        wx.showToast({
            title: '您还没有登录',
            icon: 'success',
            duration: 2000
        })
        return;
    } else {
        return sessionId;
    }
}


module.exports = {
    _get: _get,
    _post: _post_form,
    _post_json: _post_json
}