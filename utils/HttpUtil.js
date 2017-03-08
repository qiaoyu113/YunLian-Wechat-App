var app = getApp()
/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _get(url, success, fail, complete) {

    console.log("------start---_get----");
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

    console.log("----end-----_get----");
}

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post_from(url, data, success, fail, complete) {
    console.log("----_post--start-------");
    wx.request({
        url: url,
        header: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        data: { data: data },
        success: function (res) {
            success(res);
        },
        fail: function (res) {
            fail(res);
        }, complete: function (res) {
            complete(res);
        }
    });
    console.log("----end-----_get----");
}

/**
* url 请求地址
* success 成功的回调
* fail 失败的回调
*/
function _post_json(url, data, success, fail, complete) {
    console.log("----_post--start-------");
    wx.request({
        url: app.globalData.domainUrl + url + "?format=json",
        header: {
            'content-type': 'application/json',
            'sessionId': getSessionId()
        },
        method: 'POST',
        data: data,
        success: function (res) {
            success(res);
        },
        fail: function (res) {
            fail(res);
        },
        complete: function (res) {
            complete(res);
        }
    });

    console.log("----end----_post-----");
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
    _post: _post_from,
    _post_json: _post_json
}