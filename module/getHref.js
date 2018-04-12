function getHref(linkUrl, callback) {
    var url = decodeURIComponent(linkUrl)

    if (url.indexOf('adTypeCode') >= 0) {
        // 客户端路由，直接跳转客户端

        if (url.indexOf('1137') < 0) {
            if (url.indexOf('adId=') >= 0) {
                url = url.split('adId=')[0] + 'adId=' + encodeURIComponent(url.split('adId=')[1])
            } else {
                url = url
            }

        } else {
            url = (linkUrl)
        }
    } else {
        var router = ''
        var ROUTER_STATIC = 'http://m.suning.com/index.html?adTypeCode='
        var linkUrl = [{
            url: 'm.suning.com/search',
            router: '1023'
        }, {
            url: 'my.suning.com/wap',
            router: '1025'
        }, {
            url: 'm.suning.com/product',
            router: '1013'
        }]

        linkUrl.forEach(function(item, idx) {
            if (url.indexOf(item.url) >= 0) {
                router = item.router
                return;
            }
        })
        if (typeof(exports) == 'undefined') {
            router = 'h5'
        }
        switch (router) {
            case '1023':
                var tempUrl = url.split("m.suning.com/search/")[1].replace("/", "")
                url = ROUTER_STATIC + router + '&adId=' + encodeURIComponent(tempUrl);
                break;
            case '1025':
                url = ROUTER_STATIC + router
                break;
            case '1013':
                var tempUrl = url.split("product/")[1].split("/")
                tempUrl = tempUrl[1].split(".")[0] + '_' + tempUrl[0]
                url = ROUTER_STATIC + router + '&adId=' + encodeURIComponent(tempUrl)
                break;
            default:
                if (router == 'h5') {
                    url = getH5Href(url, ROUTER_STATIC, callback)
                } else {
                    // url = ROUTER_STATIC + '1002&adId=' + encodeURIComponent(url);

                    // 4.9 以上的客户端可以支持直接跳转，不用使用 1002 路由

                    url = url
                }
        }

    }

    return url;
}



function getH5Href(linkUrl, WeexRouter, callback) {
    window.__localAppVersion__ = 0
    var url = linkUrl
    var qs = getQueryString('weex', linkUrl)
    var pageCode = getQueryString('pageCode', linkUrl)

    if (qs) {

        if (__localAppVersion__ >= 4900) {
            url = WeexRouter + '1137&adId=' + encodeURIComponent((qs) + '&pageCode=' + pageCode)
            callback( /*encodeURIComponent*/ (url))
            return;
        }

        if (__localAppVersion__ > 1) {
            url = linkUrl
            callback( /*encodeURIComponent*/ (url))
            return;
        }

        // 判断客户端版本号
        $.AppReady(function(bridge) {

            bridge.api.getClientInfo(function(info) {
                // 是否 >= 4.9 版本，安卓我还没测试，呵呵
                var v = parseInt(info.version.split('.').join(''));
                if (v < 1000) {
                    v *= 10
                };
                __localAppVersion__ = v
                if (v >= 4900) {
                    url = WeexRouter + '1137&adId=' + encodeURIComponent((qs) + '&pageCode=' + pageCode)
                } else {
                    url = linkUrl
                }

                callback( /*encodeURIComponent*/ (url))

            })

        })



    } else {
        callback( /*encodeURIComponent*/ (url))
    }

    // return encodeURIComponent(url)
}


function getQueryString(name, url) {
    if (url.indexOf("?") <= 0) {
        return
    }
    var key = {}
    var qArr = url.split("?")[1].split("&")
    qArr.forEach(function(item, idx) {
        var _v_ = item.split("=")
        key[_v_[0]] = _v_[1]
    })
    if (name) {
        return key[name]
    } else {
        return key
    }
}


if (typeof(exports) != 'undefined') {
    exports.getHref = getHref
}
