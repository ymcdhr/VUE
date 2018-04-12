const bridge = require('./jsbridge.js')
const appAjax = require('./appAjax.js')
const sa = require('./sa.js')
//判断是用weex代码生成的，还是vue代码写的
const isWeex = ("undefined" != typeof weex ? weex : false);

var URL_CONST = {
    IMG_HOST: {
        PRD: '//image?.suning.cn',
        SIT: '//sit1image?.suning.cn',
        PRE: '//uimgpre.cnsuning.com',
        //DEV:'http://uimgpre.cnsuning.com'
        DEV: 'https://image?.suning.cn'
    },
    RES_HOST: {
        PRD: '//res.suning.cn',
        SIT: '//sitres.suning.cn',
        PRE: '//preres.suning.cn',
        DEV: '//res.suning.cn'
    },
    WAP_HOST: {
        PRD: '//m.suning.com',
        SIT: '//msit.cnsuning.com',
        PRE: '//mpre.cnsuning.com',
        DEV: '//m.suning.com'
    },
    CMS_HOST: {
        PRD: '//c.m.suning.com',
        SIT: '//csit.m.cnsuning.com',
        PRE: '//cpre.m.cnsuning.com',
        DEV: '//c.m.suning.com',
    },
    CMS_API: {
        PRD: '//lib.suning.com',
        SIT: '//libsit.cnsuning.com',
        PRE: '//libpre.cnsuning.com',
        DEV: '//lib.suning.com'
    },
    ICPS_HOST: {
        PRD: '//icps.suning.com',
        SIT: '//icpssit.cnsuning.com',
        PRE: '//icpspre.cnsuning.com',
        //DEV:'http://icpspre.cnsuning.com'
        DEV: '//icps.suning.com'
    },
    CART_HOST: {
        PRD: '//shopping.suning.com',
        SIT: '//shoppingsit.cnsuning.com',
        PRE: '//shoppingpre.cnsuning.com',
        DEV: '//shopping.suning.com'
    },
    F_HOST: {
        PRD: '//f.m.suning.com',
        SIT: '//f.msit.cnsuning.com',
        PRE: '//f.msit.cnsuning.com',
        DEV: '//f.m.suning.com',
        // DEV: '//f.msit.cnsuning.com',
    },
    SHOW_HOST: {
        PRD: '//show.m.suning.com',
        SIT: '//show.msit.cnsuning.com',
        PRE: '//show.mpre.cnsuning.com',
        DEV: '//show.m.suning.com',
    },
    pgsProductUrl: {
        PRD: '//pin.m.suning.com/pgs/product/?.html',
        SIT: '//pinpre.m.cnsuning.com/pgs/product/?.html',
        PRE: '//pinpre.m.cnsuning.com/pgs/product/?.html',
        DEV: '//pinpre.m.cnsuning.com/pgs/product/?.html'
    }
};
/**
 * [getEnvUrl description]
 * 获取域名环境，这个方法先不删，暂时留着
 * @return {[Object]} [description]
 */
function getEnvUrl() {
    return URL_CONST
}
/**
 * [getImageHost description]
 * 获取图片域名地址
 * @param  {[type]} oneDomain [是否域名收敛使用单域名]
 * @return {[String]}           [图片域名 url]
 */
function getImageHost(oneDomain) {
    if (oneDomain) {
        return URL_CONST.IMG_HOST[getEnvName()].replace('?', 1)
    } else {
        return URL_CONST.IMG_HOST[getEnvName()].replace('?', parseInt(Math.floor(Math.random() * 10) % 3 + 1))
    }
}

function extend(src) {
    var objs = [].slice.call(arguments, 1),
        obj;

    for (var i = 0, len = objs.length; i < len; i++) {
        obj = objs[i];
        for (var prop in obj) {
            src[prop] = obj[prop];
        }
    }

    return src;
}
/**
 * [getHost 自定义环境域名变量]
 * @param  {[type]} hostName [自定义的域名格式]
 * @return {[type]}          [description]
 *
 * var host = {
 *
 *      JUA_HOST: {
            PRD: 'http://jua.suning.com',
            SIT: 'http://juasit.cnsuning.com',
            PRE: 'http://juapre.cnsuning.com',
            // DEV: '//jua.suning.com'
            DEV: 'http://juapre.cnsuning.com'
        }
 *
 * }
 */
function getHost(hostName) {
    return hostName[getEnvName()]
}
/**
 * [protocol description]
 * 动态协议转换
 * @param  {[String]} url [需要转化的地址]
 * @return {[String]}     [转换后的链接]
 */
function protocol(url, http) {
    // encodeURIComponent 方式需要先转下
    var ptcol = isWeex ? weex.config.bundleUrl : window.location.protocol
    var _url = ''

    if (url.indexOf("http:") >= 0) {
        _url = http ? url : url.replace("http:", "")
    } else if (url.indexOf("https:") >= 0) {
        _url = http ? url : url.replace("https:", "")
    } else {
        _url = ptcol.split(':')[0] + ":" + url
    }
    return _url
}
/**
 * [getEnvName description]
 * 获取对应的环境域名
 * @return {[String]}    [对应的环境]
 */
function getEnvName() {
    var _hostName = isWeex ? weex.config.bundleUrl : window.location.hostname,
        envName;
    if (dectect().Web) {
        _hostName = window.location.hostname
        // 一般生产环境的域名
        var _prd_reg = /(\W)*.suning.com$/;
        // 一般pre环境的域名
        var _pre_reg = /(\W)*pre(.*)*.cnsuning.com$/;
        // 一般sit环境的域名
        var _sit_reg = /(\W)*sit(.*)*.cnsuning.com$/;
    } else {
        // 一般生产环境的域名
        var _prd_reg = /(res.suning.cn)/;
        // 一般pre环境的域名
        var _pre_reg = /(preres.suning.cn)/;
        // 一般sit环境的域名
        var _sit_reg = /(sitres.suning.cn)/;
    }

    if (_pre_reg.test(_hostName)) {
        envName = 'PRE';
    } else if (_sit_reg.test(_hostName)) {
        envName = 'SIT';
    } else if (_prd_reg.test(_hostName)) {
        envName = 'PRD';
    } else {
        envName = 'DEV';
    }
    return envName;
}
/**
 * [getProductUrl description]
 * 获取对应四级页面的地址
 * @param  {[type]} procode    [商品编码]
 * @param  {[type]} vendorcode [商家编码]
 * @return {[type]} shopCode   [供应商编码]
 */
function getProductUrl(proCode, vendorCode, shopCode) {
    var url = '';
    if (vendorCode === '0' || vendorCode === 0) {
        vendorCode = '0000000000';
    } else if (!vendorCode) {
        vendorCode = '';
    }

    if (shopCode === '0' || shopCode === 0) {
        shopCode = '0000000000';
    }

    if (isApp()) {
        url = 'http://product.suning.com?adTypeCode=';
        //device.isAndroid && (url = 'javascript:goodsApi.goToProductDetail('')');
        //device.isIOS && (url = 'http://product.suning.com?adTypeCode=1013&adId='+proCode+(vendorCode ? '_'+vendorCode :'')+'&store=');
        if (shopCode) {
            url += '1180&adId=' + proCode + (vendorCode ? '_' + vendorCode : '') + '_' + shopCode;
        } else {
            url += '1013&adId=' + proCode + (vendorCode ? '_' + vendorCode : '') + '';
        }

    } else {
        url = URL_CONST.WAP_HOST[getEnvName()] + '/product/';
        if (shopCode) {
            url += shopCode + '/' + proCode + '.html'
        } else {
            url += ((vendorCode === '') ? '' : vendorCode + '/') + proCode + '.html';
        }

    }
    return url;

}

function formatProCode(procode) {
    procode = procode.toString();
    var zeros = "";
    if (procode) {
        if (procode.length <= 18) //补0
        {
            var x = 18 - procode.length;
            for (var i = 0; i < x; i++) {
                zeros += "0";
            }
        }
    }
    return zeros + procode;
}
/*
 * 格式化供应商编码
 * @param  {[type]} vendorCode          [商品编码]
 */
function formatVendorCode(vendorCode) {
    if (!vendorCode || vendorCode == '0') {
        vendorCode = '0000000000'
    }
    return vendorCode;
}
/**
 * [getProductImg description]
 * 获取商品图片地址
 * @param  {[type]} proCode    [商品编码]
 * @param  {[type]} vendorCode [供应商编码]
 * @param  {[type]} size       [图片大小 400x400]
 * @param  {[type]} oneDomain  [是否域名收敛]
 * @return {[type]}            [description]
 */
function getProductImg(proCode, vendorCode, size, oneDomain) {
    var host = getImageHost(oneDomain),
        sizeStr;
    switch (size) {
        case 120:
            sizeStr = '120x120';
            break;
        case 200:
            sizeStr = '200x200';
            break;
        case 400:
            sizeStr = '400x400';
            break;
        case 800:
            sizeStr = '800x800';
            break;
        default:
            sizeStr = '400x400';
    }
    ////image4.suning.cn/uimg/b2c/newcatentries/{vendor}-{18位商品编码}_1_尺寸x尺寸.jpg
    return host + "/uimg/b2c/newcatentries/" + formatVendorCode(vendorCode) + '-' + formatProCode(proCode) + "_1_" + sizeStr + ".jpg?" + /*(new Date()).getDay() + "" + */ (new Date()).getHours();
}

/**
 * [getNewProductImg description]
 * @param  {[type]} opt [description]
 * @param  {[type]} opt.proCode [商品编码]
 * @param  {[type]} opt.vendorCode [供应商编码]
 * @param  {[type]} opt.size [图片尺寸]
 * @param  {[type]} opt.setSize [自定义图片尺寸]
 * @param  {[type]} opt.e [等比缩放方式，默认 4]
 * @param  {[type]} opt.sh [锐化度，默认 100]
 * @param  {[type]} opt.q [图片压缩质量，默认 80]
 * @param  {[type]} opt.env [自定义环境，默认 //image?.suning.cn]
 * @param  {[type]} opt.imageHost [是否自定义域名，非普通商品，例子 '/uimg/cms/img/148914927194341794.png']
 * @param  {[type]} opt.original [是否原图，默认 false]
 * @return {[type]}     [description]
 */
function getNewProductImg(opt) {

    var defaultOpt = {
        proCode: '',
        vendorCode: '',
        size: '400',
        setSize: false,
        e: '4', // 等比缩放
        // sh: '100', // 锐化
        Q: '80', // 绝对质量
        q: '80', // 原图质量
        webp: '',
        env: '//image?.suning.cn',
        imageHost: false,
        index: '1',
        original: false // 原始图片
    }

    var imageSrc = ''
    var imageSize = {}

    var _opt = extend(defaultOpt, opt)

    if (_opt.setSize) {
        imageSize.height = _opt.setSize.height
        imageSize.width = _opt.setSize.width
    } else {
        imageSize.height = _opt.size
        imageSize.width = _opt.size
    }

    if (dectect().Web) {
        if (window._isWebp_) {
            _opt.webp = '.webp'
        }
    }

    // if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())) {
    //     _opt.webp = '.webp'
    // }

    // 自定义域名
    var host = _opt.env.replace('?', parseInt(Math.floor(Math.random() * 10) % 3 + 1))

    var para = '?format=' + imageSize.height + 'h_' + imageSize.width + 'w_' + _opt.e + 'e_' + _opt.q + 'q' + _opt.webp;

    // http://image2.suning.cn/uimg/b2c/newcatentries/70079092-000000000190458938_1.jpg

    // http://image.suning.cn/uimg/b2c/newcatentries/0070151928-000000000186378720_1.jpg?format=500h_500w_4e_80q_90sh

    ////image4.suning.cn/uimg/b2c/newcatentries/{vendor}-{18位商品编码}_1_尺寸x尺寸.jpg
    imageSrc = host + '/uimg/b2c/newcatentries/' + formatVendorCode(_opt.vendorCode) + '-' + formatProCode(_opt.proCode) + '_' + _opt.index + '.jpg' + para + '&' + parseInt(new Date().getTime() / 1000 / 1800)

    if (_opt.imageHost) {
        imageSrc = host + _opt.imageHost + para
    }
    if (_opt.original) {
        imageSrc = imageSrc.split('?')[0]
    }
    return imageSrc
}
/**
 * [getQueryString description]
 * 获取地址 QueryString
 * @param  {[type]} name [对应的 key ]
 * @return {[type]}      [description]
 */
function getQueryString(name, url) {
    var key = {}
    var la = url ? decodeURIComponent(url) : (isWeex ? weex.config.bundleUrl : location.href)
    if (la.indexOf('?') <= -1) {
        return ''
    }
    var qArr = la.split("?")[1].split("&")
    qArr.forEach(function (item, idx) {
        var _v_ = item.split("=")
        key[_v_[0]] = _v_[1]
    })
    if (name) {
        return key[name]
    } else {
        return key
    }
    // var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    // var r = window.location.search.substr(1).match(reg);
    // console.log(r)
    // if(r!=null)return  decodeURIComponent(r[2]); return null;
}
/**
 * [serialize description]
 * 在 stream post请求中将用作对象值编译成 URL编码的 字符串。
 * @param  {[type]} data [纯数据对象]
 * @return {[type]}      [description]
 */
function serialize(data) {
    var serializeArray = []
    for (var keys in data) {
        serializeArray.push({
            "name": keys,
            "value": data[keys]
        })
    }
    var result = []
    serializeArray.forEach(function (item) {
        result.push(encodeURIComponent(item.name) + '=' + encodeURIComponent(item.value))
    })
    return result.join("&")
}
/**
 * [getPgsProductUrl description]
 * 获取拼购四级页地址
 * @param  {[type]} businessId [description]
 * @return {[type]}            [description]
 */
function getPgsProductUrl(businessId) {
    return getEnvUrl().pgsProductUrl[getEnvName()].replace('?', businessId)
}

// var jsbridge = __weex_require__('@weex-module/jsbridge');
// var console = require('./console');
/**
 * [promise 简易语法糖]
 * @param  {[type]} Constructor_Promise [description]
 * @return {[type]}                     [description]
 */
function promise(Constructor_Promise) {
    var p = null
    var q = {}
    if (!Constructor_Promise) {
        p = new Promise(function (resolve, reject) {
            q.resolve = resolve
            q.reject = reject
        })
        p.resolve = q.resolve
        p.reject = q.reject
        return p
    } else {
        return Promise
    }
}
var lock = false;

function toast(vm, show, callback) {
    if (!lock) {
        lock = true
        vm[show] = true
        setTimeout(function () {
            vm[show] = false
            lock = false
            callback()
        }, 1500)
    }
}

function isApp() {

    var userAgent = isWeex ? weex.config.env.userAgent : navigator.userAgent

    if (typeof (userAgent) == 'string') {
        if (userAgent.match(/SNEBUY-APP;?/i)) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

function dectect() {
    var is = {
        iOS: false,
        Android: false,
        Webview: false,
        Web: false
    }
    if (isWeex) {
        if (weex.config.env.platform == 'android') {
            is.Android = true
        }
        if (weex.config.env.platform == 'iOS') {
            is.iOS = true
        }
        if (weex.config.env.platform == 'Web') {
            if (weex.config.env.userAgent.match(/android/i)) {
                is.Android = true
            }
            if (weex.config.env.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                is.iOS = true
            }
            if (weex.config.env.userAgent.match(/SNEBUY-APP;?/i)) {
                is.Webview = true
            }
            is.Web = true
        }
        return is
    }
    else {
        if (navigator.userAgent.match(/android/i)) {
            is.Android = true
        }
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            is.iOS = true
        }
        if (navigator.userAgent.match(/SNEBUY-APP;?/i)) {
            is.Webview = true
        }
        is.Web = true
        return is
    }


}

/**
 * [重复参数 h5 兼容 jsonp 方法
 * http://th.suning.com/cpm/getMCltCpmCuxiaoDatas?pid=100003977&pid=100003978&pid=100003979&clt=wap]
 * 
 * @param  {[type]}   url  [description]
 * @param  {[type]}   opts [这里用回调即可]
 * @param  {Function} fn   [description]
 * @return {[type]}        [description]
 */
function jsonp(url, opts, fn) {

    var count = 0;
    function noop() { }

    function _jsonp(url, opts, fn) {
        if ('function' == typeof opts) {
            fn = opts;
            opts = {};
        }
        if (!opts) opts = {};

        var prefix = opts.prefix || '__jp';
        var id = opts.name || (prefix + (count++));

        var param = opts.param || 'callback';
        var timeout = null != opts.timeout ? opts.timeout : 60000;
        var enc = encodeURIComponent;
        var target = document.getElementsByTagName('script')[0] || document.head;
        var script;
        var timer;

        if (timeout) {
            timer = setTimeout(function () {
                cleanup();
                if (fn) fn(new Error('Timeout'));
            }, timeout);
        }

        function cleanup() {
            if (script.parentNode) script.parentNode.removeChild(script);
            window[id] = noop;
            if (timer) clearTimeout(timer);
        }

        function cancel() {
            if (window[id]) {
                cleanup();
            }
        }

        window[id] = function (data) {
            cleanup();
            if (fn) fn(data);
        };

        url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
        url = url.replace('?&', '?');

        script = document.createElement('script');
        script.src = url;
        target.parentNode.insertBefore(script, target);

        return cancel;
    }
    return _jsonp(url, opts, fn)
}



// 
exports.getEnvName = getEnvName
exports.getEnvUrl = getEnvUrl
exports.getImageHost = getImageHost
exports.getProductUrl = getProductUrl
exports.protocol = protocol
exports.getProductImg = getProductImg
exports.getNewProductImg = getNewProductImg
exports.getQueryString = getQueryString
exports.URL_CONST = URL_CONST
exports.serialize = serialize
exports.getPgsProductUrl = getPgsProductUrl
exports.toast = toast
exports.promise = promise
exports.getHost = getHost
exports.jsbridge = bridge.jsbridge
exports.h5 = bridge.h5
exports.isApp = isApp
exports.env = dectect()
exports.extend = extend
exports.appAjax = appAjax.appAjax
exports.sa = sa
exports.jsonp = jsonp
    // exports.isAndroid = dectect().Android
    // exports.isWebview = dectect().webview
    // 
    // 
    // 