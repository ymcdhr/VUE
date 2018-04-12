let bridge = "undefined" != typeof weex && weex.requireModule('jsbridge');
let h5 = require('./h5/h5.js').h5

/**
 * [jsbridge description]
 * 目前只提供 pageRouter 的 window.location.href = url 能力，拓展方法需业务自行实现，以便更灵活的实现业务需求
 * @return {[type]} [description]
 */
function jsbridge() {

    var b = {
        getClientInfo: function(callback) {
            if (weex.config.env.platform == 'Web') {
                h5.AppReady().then(function(Bridge) {
                    Bridge.api.getClientInfo(function(info) {
                        callback(info)
                    })
                })
            } else {
                bridge.getClientInfo(function(res) {
                    callback(res)
                })
            }
        }
    }
    if (weex.config.env.platform == 'Web') {

        // if (weex.config.env.userAgent.match(/SNEBUY-APP;?/i)) {
            var jsBridge = {
                // 此方法只开放 1002 WAP 页面跳转
                pageRouter: function(url) {
                    window.location.href = url
                },
                api: b
            }
        // }
        
        return jsBridge

    } else {
        var _b = bridge
        _b.api = b
        return _b
    }
}


exports.jsbridge = jsbridge
exports.h5 = h5