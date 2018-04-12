webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const bridge = __webpack_require__(14)
const appAjax = __webpack_require__(9)
const sa = __webpack_require__(15)
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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_iscroll_lite_5_1_3_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_iscroll_lite_5_1_3_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__module_iscroll_lite_5_1_3_js__);
/**
 * @file vue iscroll指令，用指令封装iscroll进行dom操作
 * @author MarxJiao
 * @date 2016/12/03
 */

//var IScroll =  require('http://res.suning.cn/public/v5/mod/iscroll-lite/5.1.3/iscroll-lite.js');


var VIScroll = {
    install: function install(Vue, options) {
        Vue.directive('iscroll', {
            bind: function bind(el, binding, vnode, oldVnode) {
                // 判断输入参数
                var vtype = binding.value ? [].toString.call(binding.value) : undefined;
                // 设置iscorll属性的参数
                var iscrollOptions = vtype === '[object Object]' ? binding.value : options;
                // 阻止touchmove默认事件
                el.addEventListener('touchmove', function (event) {
                    event.preventDefault();
                });
                // 建立新的iscroll
                // 为什么要加上setTimeout？https://segmentfault.com/q/1010000005353311
                // iscroll 需要获取到父元素的高度在初始化，需要监听到menu值变化后再初始化即可
                setTimeout(function () {
                    vnode.scroll = new __WEBPACK_IMPORTED_MODULE_0__module_iscroll_lite_5_1_3_js___default.a(el, iscrollOptions);
                    el.scroll = vnode.scroll;
                }, 0);
            },
            update: function update(el, binding, vnode, oldVnode) {
                // 判断输入参数
                var vtype = binding.value ? [].toString.call(binding.value) : undefined;
                // 设置iscorll属性的参数
                var iscrollOptions = vtype === '[object Object]' ? binding.value : options;
                // 阻止touchmove默认事件
                el.addEventListener('touchmove', function (event) {
                    event.preventDefault();
                });
                // 建立新的iscroll，不需要这个？
                // vnode.scroll = new IScroll(el, iscrollOptions);
                // el.scroll = vnode.scroll;
            },
            unbind: function unbind(el, binding, vnode, oldVnode) {
                /**
                 * 解除绑定时要把iscroll销毁
                 */
                try {
                    //vnode.scroll = oldVnode.scroll;
                    vnode.scroll.destroy();
                    vnode.scroll = null;
                } catch (e) {
                    console.log("ERROR:", e.message);
                }
            }
        });
    }
};
/* harmony default export */ __webpack_exports__["a"] = (VIScroll);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(59)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(28),
  /* template */
  __webpack_require__(104),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCookie", function() { return setCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookie", function() { return getCookie; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_resource__ = __webpack_require__(110);



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_resource__["a" /* default */]);

let common = {
	
	/**
	 * 数据请求
	 * cb: callback传参
	 */
	
	fetch(config,cb) {
		let url = config.url,
			method = config.method || 'get',
			type = config.type || 'json',
			index = config.index,
			jsonpCallback = config.jsonpCallback || 'jsonpCallback',
			callback = config.callback || cb || (() =>{});

		__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].http({
			url: url,
			method: type,
			jsonpCallback: jsonpCallback
		}).then(function(response) {

			if(response.ok){
				if (index) {
					callback(index, response.body)
				} else {
					callback(response.body)
				}
			}
			else{
				console.log("network error~",response);
			}

		},function(error) {
			
		})
		//虽然可用，但不太好用
		// jsonp(url,{
		// 	jsonpCallback:jsonpCallback,
		// 	jsonpCallbackFunction:jsonpCallback
		// }).then(function(res){

		// 	"undefined" != callback && callback(res);

		// });
	},
	
	/**
	 * 获取用户信息，包括cityId
	 * @param {Object} callback
	 */
	getUserInfo: function(callback){
		
		//web页面且没有在客户端里面
		if(base.env.Web && !base.env.Webview){
			service.getH5user(callback);
		}
		else{
			base.jsbridge().api.getClientInfo(function(res){
				let uData={
					uId: res.custNum,
					cId: "",
					cityId: res.cityCode
				}
			  "undefined" !== typeof callback && callback(uData);
			});
		}
	
		
	},
	getH5user: function(callback){
        let self = this;
        let uData={
			uId: service.getCookie("custno") || "",
			cId: service.getCookie("_snma") || "",
			cityId: service.getCookie("cityCode")
		}
        try {
            uData.cId = uData.cId && uData.cId.split("|")[1];
        } catch (D) {
            uData.cId = "";
        }
        
        if (uData.uId || typeof base.h5.probeAuthStatus == "undefined") {
            uData.uId = uId;
            "undefined" !== typeof callback && callback(uData);
            return;
        } else {
            base.h5.probeAuthStatus(function(userId) {
                uData.uId = userId;
                "undefined" !== typeof callback && callback(uData)
            }, function() {
                self.uId = uId;
                "undefined" !== typeof callback && callback(uData)
            })
        }
	},
    setCookie: function (A, B) {
        document.cookie = A + "=" + escape(B) + ";path=/;domain=" + SN.cookieDomain
    },
    getCookie: function (B) {
        var A = document.cookie.match(new RegExp("(^| )" + B + "=([^;]*)(;|$)"));
        if (A != null) {
            return unescape(A[2])
        }
        return ""
    }
};

// exports.getUserInfo = service.getUserInfo;
var fetch = common.fetch;
var setCookie = common.setCookie;
var getCookie = common.getCookie;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(42)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(29),
  /* template */
  __webpack_require__(87),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_base__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_mods__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_mods___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_mods__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_mods_tab__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_mods_tab___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_mods_tab__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_mods_scroll__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_mods_scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_mods_scroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_mods_swipe__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_mods_swipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_mods_swipe__);








__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/mods',
    name: 'mods',
    component: __WEBPACK_IMPORTED_MODULE_3__components_mods___default.a
  }, {
    path: '/base',
    name: 'base',
    component: __WEBPACK_IMPORTED_MODULE_2__components_base___default.a
  }, {
    path: '/tab',
    name: 'tab',
    component: __WEBPACK_IMPORTED_MODULE_4__components_mods_tab___default.a
  }, {
    path: '/scroll',
    name: 'scroll',
    component: __WEBPACK_IMPORTED_MODULE_5__components_mods_scroll___default.a
  }, {
    path: '/swipe',
    name: 'swipe',
    component: __WEBPACK_IMPORTED_MODULE_6__components_mods_swipe___default.a
  }]
}));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(44)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(89),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * [appAjax]
 * @param  {[type]} businessId [description]
 * @return {[type]}            [description]
 */
let base = __webpack_require__(2)

function appAjax(opts) {
    var opt = opts || {}
    opt.pageCode = opts.pageCode || ""
    opt.cache = opts.cache || true
    opt.env = opts.env || base.URL_CONST.CMS_API[base.getEnvName()]
    var host = base.URL_CONST.CMS_API[base.getEnvName()]
    var previewTime = base.getQueryString('sendTimes')
    var cmsUrl = ''
    var promise = base.promise()
    var index = 0
    if(!opt.cache){
        index = (new Date().getTime())
    }
    if (previewTime) {
        cmsUrl = 'http://cms.admin.cnsuning.com/cms-admin-web/page/previewApi/' + opt.pageCode + '_' + previewTime + '_cmsJsonpApi' + index + '.htm';
    } else {
        cmsUrl = opt.env + "/api/jsonp/cb/" + opt.pageCode + "-cmsJsonpApi" + index + ".jsonp";
    }
    

    if (typeof(weex.requireModule) != 'undefined') {
        var stream = weex.requireModule('stream');
        stream.fetch({
            method: 'GET',
            type: 'jsonp',
            url: cmsUrl,
            jsonpCallback: 'cmsJsonpApi' + index
        }, function(res) {
            if (previewTime) {
                promise.resolve(res.data)
            } else {
                promise.resolve(res)
            }
        }, function() {
            promise.reject(err, xhr)
        })
    }
    index++
    return promise

}


exports.appAjax = appAjax

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/* 
* @Author: 12050231
* @Date:   2015-11-01 16:32:28
* @Last Modified by:   12050231
*/



function bridge(Bridge){

	var api = {}
	// 
	// window.alert = Bridge.showTip
	
	if(weex.config.env.userAgent.match(/(iPhone|iPod|iPad);?/i)){
		/**
		 * [toast description]
		 * @type {[string]}
		 * return api.toast(string)
		 // */
		api.toast = Bridge.showTip
		/**
		 * [httpGet 获取请求方式]
		 * @type {[type]}
		 * @return api.httpGet(url, function(data){
		 *       
		 * })
		 */
		api.httpGet = Bridge.httpGet
		/**
		 * [获取客户端信息]
		 * @type {[type]}
		 * @return api.getClientInfo(function(info){
		 *         // ios info
		 *      {
					"version": ＂2.4.3＂, // 客户端版本号
					"identifier": ＂E345A6…..＂,// 客户端唯一标示
					"cityCode": ＂9173＂, // 客户端默认城市编码
					"cityName": ＂南京市＂, // 客户端里的城市名称
					"shopCartQuantity": ＂6＂// 客户端购物车中商品数量
				}
				// android info
				{
					＂versionCode＂: ＂客户端版本号＂,
					＂version＂: ＂客户端内版本号，例如98,110等＂,
					“cityCode＂: ＂客户端默认城市编码＂,
					＂cityName＂: ＂客户端购物车中商品数量＂,
					＂ shopCartQuantity＂: ＂shopCartQuantity＂,
					＂imei＂: ＂客户端唯一标示＂,
					＂channelId＂: ＂渠道号＂,
					＂custNum＂: ＂会员编号，如果未登录返回“”＂,
					＂density＂: ＂当前设备分辨率，例如1920*1080＂
				}
		 * })
		 */
		api.getClientInfo = Bridge.getClientInfo
		/**
		 * 获取客户端的唯一信息
		 * @type {[object]}
		 * return api.getIdentifier(function(info){
		 *   // {data:""}
		 * })
		 */
		api.getIdentifier = Bridge.getIdentifier

		/**
	     * 跳转客户端路由方式
	     * @param  {[type]} adTypeCode [description]
	     * @param  {[type]} adId       [description]
	     * @return {[type]}            [http://m.suning.com/index.html?adTypeCode='+adTypeCode+'&adId='+ (adId))]
	     */
		api.pageRouter = Bridge.routeToClientPage
		/**
		 * 调用二维码扫描组件
		 * @type a.api.scan(0)
		 */
		api.scan = Bridge.gotoScan
		/**
		 * H5 页面上传图片
		 * @param  {[type]}   url      [图片服务器接口]
		 * @param  {Function} callback [回调方法，返回图片地址]
		 * @return {[type]}   a.api.uploadImages('http://mfs.suning.com/mfs-web/file/private/jsonp/pic/upload.do', function(imagesUrl) {
	            $("body").html(imagesUrl)
	        })
		 */
		api.uploadImage = function(url, callback){
			Bridge.openImageChooser({
				pictureUrl: url
			})
			window.uploadSuccess = callback
		}
		
		/**
		 * 打开通讯录
		 * @type {[type]}
		 */
		api.openContact = Bridge.addressBook
		/**
		 * 隐藏客户端 header
		 * @type a.api.hideTitle(0)
		 */
		api.hideTitle = Bridge.setNavigationHiden
		/**
		 * 采集页面标题
		 * @type api.setSNSATitle (店铺-促销页面-xxx旗舰店_100100010)
		 */
		api.setSNSATitle = /*Bridge.setSNSATitle =*/ Bridge.setPageTitle
		/**
		 * 拍照上传
		 * @param  {[type]}   url      [图片服务器笛之爱]
		 * @param  {[type]}   title    [拍照界面标题]
		 * @param  {[type]}   size     [生成的图片最大值]
		 * @param  {Function} callback [回调方法，参数是图片地址]
		 * @return {[type]}           api.takePhoto(url, title, size, function(imagesUrl){
		 * // imagesUrl
		 * })
		 */
		api.takePhoto = function(url, title, size, callback){
			Bridge.takePhoto(url, title, size, callback)
			window.uploadSuccess = callback
		} 
		/**
		 * 跳转搜索结果页
		 * @type {[type]}
		 */
		api.searchKeyword = Bridge.goToSearchResultWithKeyword
		/**
		 * 调用客户端分享组件
		 * @type title
			参数位	参数	说明
			1	title	分享的标题
			2	content	分享的内容
			3	targetUrl	目标跳转url
			4	iconUrl	分享图片url，为空则默认使用易购图标，请使用正确的图片链接
			5	shareWays	分享方式：1：微信好友；2：微信朋友圈；3：qq好友；4：qzone；5：短信分享；6：新浪微博；7：二维码分享；8：复制内容；9* ：分享有礼（需开关配置，建议不要使用）
			可多选，多选时以逗号分隔，如 4,5
			6	callBack	分享的回调，目前仅有微信（微信好友和微信朋友圈）和QQ（QQ好友和Qzone）支持回调。
			Function(shareResult){
			// to do
			}
			shareResult为string类型，1代表分享成功0代表分享失败

			api.callNativeShare("手机","分享的内容","目标跳转url","分享图片url","1,2,3,4,5,6,7,8", function(shareResult){
            	alert(shareResult)
       		 })
	 */
		api.callNativeShare = Bridge.callNativeShare 
		/**
		 * 获取城市信息，cityCode 是 9173，已经废弃，后面使用 025
		 * @type api.getCityInfo(function(info){
            alert(info.cityCode) // 9173 
        })
		 */
		api.getCityInfo = Bridge.getCityInfo 
		/**
		 * 调用城市控件
		 * @param  {[type]}   type     [city-选择城市，district-选择区县，street-选择街道（门店）]
		 * @param  {Function} callback [
		 * iOS 返回 “江苏省南京市玄武区”字符串
		 * Android 返回{
				  "districtName": "永城市",
				  "districtCode": "10801",
				  "cityName": "商丘市",
				  "provinceCode": "180",
				  "cityCode": "9105",
				  "streetName": "酂阳乡",
				  "provinceName": "河南",
				  "streetCode": "11552"
				}
		 * 两端返回数据格式不一样，这个功能也就没什么卵用
		 * ]
		 * @param  {Number} isStore [0-选择街道 1-选择门店（该参数仅在选择街道页面有用）]
		 * @return {[type]} api.callAddress("street",function(cityInfo){
            // (cityInfo)
        },1)
		 */
		api.callAddress = function(type, callback){
			var _type_ = 8
			if(type == "city"){
				_type_ = 5
			}
			if(type == "district"){
				_type_ = 8
			}
			if(type == "street"){
				_type_ = 10
			}
			Bridge.selectAddress(_type_)
			window.addressInfo = callback 
		}
		/**
		 * 获取当前网络类型和运营商
		 * @param  {Function} callback [description]
		 * @return {[type]}            
		 *
		 * api.getNetworkInfo(function(info){
            {
		 *         opratorName: 运营商名称
		 *         networkType: 网络类型（2G,3G,4G,WIFI）
		 * }
        })
		 */
		api.getNetworkInfo = function(callback){
			Bridge.getNetworkInfo(function(objData){
				callback(JSON.parse(objData))
			})
		}
		/**
		 * 保存图片到本地
		 * @type api.saveImage("http://image5.suning.cn/uimg/cms/img/147185891509033165.jpg")
		 */
		api.saveImage = Bridge.saveImage
		/**
		 * MD5 加密
		 * @type api.MD5("111111", function(value){
		 * {"destStr": "423lk4jkl1234h2135j1235j2"}
            $("#a1").html(JSON.stringify(value))
        })
		 */
		api.MD5 = Bridge.couponMD5Encrypt

		api.getMemberInfo = Bridge.getMemberInfo
		api.calendarRemind = Bridge.addEKEvent
		/**
		 * 更改客户端标题文案
		 * @type api.updateTitle("woshi客户端")
		 */
		api.updateTitle = Bridge.updateTitle
		/**
		 * 关闭 webview页面
		 * @type {[type]}
		 */
		api.closeWapPage = Bridge.closeWapPage

		/**
        var objData = [{
            "title":   "理财首页",
            "callBack":   "callBackLicai",
            "params":   "https://imgssl.suning.com/images/advertise/001/khd/licai.jpg"
        }, {
            "title":   "我的理财",
            "callBack":   "callBackMyLicai",
            "params":   "https://imgssl.suning.com/images/advertise/001/khd/mylicai.jpg"
        }]

        有3个字段，
        title为按钮的文字（建议4个汉字），
        params为按钮左侧的小图标(尺寸建议为44*44)， callBack为点击此按钮之后，客户端需要调用的 wap 端的 js 方法名字

		 * @param  {[type]} objData [description]
		 * @return {[type]} api.showRightButtons(objData)
		 */
		api.showRightButtons = function(objData){
			Bridge.showRightButtons((JSON.stringify(objData)))
		}

		/**
		 * webview下拉刷新，是否默认开启？
		 *
		 * api.enablePullRefresh()
		 */

		api.enablePullRefresh = Bridge.enablePullRefresh

		/**
		 * 设置页面埋点
		 * @type {[type]}
		 * api.setPageTitle(string)
		 */
		api.setPageTitle = Bridge.setPageTitle

		/**
		 * 点击埋点
		 * @type api.setClickId(string)
		 */
		api.setClickId = Bridge.setClickId

		api.getDeviceToken = Bridge.getDeviceToken
		api.getHumanMachine = Bridge.getHumanMachine



		/**
		 * 获取地理位置信息，需要连接外网使用
		 * @param  {Function} callback [description]
		 * @return {[type]}   api.getLesPosition(function(info){
		 * info = {
		 * 		code: 1, // 无网络或者获取不到信息 code = 0
		 * 		lng: 32.000,
		 * 		lat: 118.000,
		 * 		provinceName: 江苏省,
		 * 		cityName: 南京市,
		 * 		districtName: 玄武区,
		 * 		streetName: 环园西路,
		 * 		cityCode: 025
		 * }
		 * })
		 */
		
		api.getLesPosition = function(callback){
			Bridge.getLesPosition(function(string){
				var geo = {}, arr = string.split(",")
					geo.code = arr[0]
					geo.lat = arr[1]
					geo.lng = arr[2]
					geo.provinceName = arr[3]
					geo.cityName = arr[4]
					geo.districtName = arr[5]
					geo.streetName = arr[6]
					geo.cityCode = arr[7]
				callback(geo)
			})
		}

		/**
		 * 获取 cityCode，目前只支持 iOS
		 * 
		 * @type api.getCityCode(function(info){
		 *    info = {
		 *    	lesCityCode: "025",
		 *    	b2cCityCode: "9173"
		 *    }
		 * })
		 */
		api.getCityCode = Bridge.getCityCode

		// memberinfo, cookie






	} else if(weex.config.env.userAgent.match(/android/i)){
		api.toast = Bridge.showTip
		api.httpGet = networkApi.httpGet
		api.getClientInfo = function(callback){
			// 统一处理成 Object 格式
			Bridge.getClientInfo(function(objData){
				callback(JSON.parse(objData))
			})
		}
		api.getIdentifier = function(callback){
			// 统一处理成 Object 格式
			Bridge.getIdentifier(function(objData){
				callback(JSON.parse(objData))
			})
		}

		api.pageRouter = function(adTypeCode, adId){
			baseApi.pageRouter('http://m.suning.com/index.html?adTypeCode='+adTypeCode+'&adId='+ (adId))
		}
		api.scan = Bridge.scanCode
		api.uploadImage = Bridge.optPictures
		api.openContact = Bridge.openContact
		api.setSNSATitle = Bridge.setSNSATitle
		api.takePhoto = Bridge.takePhoto
		api.searchKeyword = searchApi.goToSearchResultWithKeyword 
		api.callNativeShare = shareApi.callNativeShare
		api.getCityInfo = cityApi.getCityInfo 
		api.callAddress = function(type, callback, isStore){
			cityApi.selectCity(type, isStore, callback)
		}

		api.getNetworkInfo = networkApi.getNetworkInfo
		api.saveImage = Bridge.savePicture
		api.MD5 = function(string, callback){
			Bridge.ticketEncrypt(string, function(objData){
				callback(JSON.parse(objData))
			})
		}
		api.getMemberInfo = Bridge.memberInfo
		api.calendarRemind = Bridge.calendarRemind
		api.updateTitle = function(text){
			Bridge.setTitle('{"txt":{"text":"' + text + '","fontSize":"","fontColor":""},"img":"","background":""}')
		}

		// update 2016-12-20

		api.closeWapPage = Bridge.closeWapPage

		api.showRightButtons = Bridge.showRightButtons

		api.enablePullRefresh = function(){
			Bridge.enablePullRefresh(true)
		}

		api.setPageTitle = Bridge.setPageTitle

		api.setNativeClickNo = Bridge.setNativeClickNo

		api.getHumanMachine = Bridge.getHumanMachine
		api.getDeviceToken = Bridge.getDeviceToken
		api.getLesPosition = function(callback){
			locationApi.getLesPosition(function(string){
				var geo = {}, arr = string.split(",")
					geo.code = arr[0]
					geo.lat = arr[1]
					geo.lng = arr[2]
					geo.provinceName = arr[3]
					geo.cityName = arr[4]
					geo.districtName = arr[5]
					geo.streetName = arr[6]
					geo.cityCode = arr[7]
				callback(geo)
			})
		}








		
	}

	return api
}

exports.bridge = bridge


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

let base = __webpack_require__(2)
let b = __webpack_require__(10)
let com = __webpack_require__(5)
let isWeex = ("undefined" != typeof weex ? weex : false);

let H5 = {
    loadScript(url) {
        var promise = base.promise()
        var script = document.createElement("script")
        script.type = "text/javascript";
        script.onload = function() {
            promise.resolve()
        };
        script.onerror = function() {
            promise.reject()
        };
        script.src = url;
        document.body.appendChild(script);
        return promise
    },
    loadGa(callback) {
        if (base.env.Web) {
            if (!document.querySelector('#resourceType') && typeof sa == 'undefined') {
                if (navigator.userAgent.match(/SNEBUY-APP/i)) {
                    document.body.insertAdjacentHTML('beforeend', '<input type="hidden" id="resourceType" value="inapp">');
                } else {
                    document.body.insertAdjacentHTML('beforeend', '<input type="hidden" id="resourceType" value="wap">');
                }

                H5.loadScript(base.getEnvUrl().RES_HOST[base.getEnvName()] + "/javascript/sn_da/??sa_simple.js,sa_click.js?loadGa").then(function() {
                    if (typeof callback == 'function') {
                        callback()
                    }

                })
            }else{
                if (typeof callback == 'function') {
                    callback()
                }
            }

            if (base.getQueryString("debug") == "prd" && typeof vConsole == 'undefined') {
                H5.f12()
            }
        }
    },
    rAF: function(callback) {

        var check = null
        var device = null

        if (base.env.iOS) {
            device = window.SNNativeClient
        } else if (base.env.Android) {
            device = window.baseApi
        }

        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
        if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };


        function wait() {
            if (!device) {
                check = window.requestAnimationFrame(wait)
            } else {
                window.cancelAnimationFrame(check)
                callback(device)
            }
        }
        window.requestAnimationFrame(wait)
    },
    _appReady_: 0,
    AppReady: function(ua) {
        var UA = ua
        if (UA === undefined) {
            UA = base.isApp()
        } else {
            UA = UA || false
        }
        var dfd = base.promise();
        H5._appReady_++
        if (UA && base.env.Android && base.env.Web) {

            if (typeof baseApi == "undefined" && H5._appReady_ <= 1) {
                H5.loadScript('//' + base.getEnvUrl().RES_HOST[base.getEnvName()] + '/project/mvs/RES/common/script/android/sneapp.js').then(function() {
                    document.addEventListener("deviceready", function() {
                        H5.rAF(function(androidApi) {
                            baseApi.api = b.bridge(baseApi)
                            resolve(baseApi)
                        })
                    }, false);
                })
            } else {
                document.addEventListener("deviceready", function() {
                    H5.rAF(function(androidApi) {
                        baseApi.api = b.bridge(baseApi)
                        resolve(baseApi)
                    })
                }, false);
            }

        }
        if (UA && base.env.iOS && base.env.Web) {

            if (typeof SNNativeClient == "undefined" && H5._appReady_ <= 1) {
                document.addEventListener("SNNativeClientReady", function() {
                    H5.rAF(function(iOSApi) {
                        iOSApi.api = b.bridge(iOSApi)
                        resolve(iOSApi)
                    })
                }, false);
            } else {
                H5.rAF(function(iOSApi) {
                    iOSApi.api = b.bridge(iOSApi)
                    resolve(iOSApi)
                })
            }
        }

        function resolve(bridge, done) {
            
            if (typeof done == 'function') {
                done(bridge);
                return;
            }
            dfd.resolve(bridge);
        }
        return dfd
    },
    probeAuthStatus: function(hasLoginCallback, unLoginCallback, config, errorFn) {
        var passport_config = passport_config || {
            base: "//" + "m.suning.com" + "/mts-web/",
            loginTheme: "wap_new"
        };
        if (typeof config == 'undefined') {
            if (typeof passport_config != 'undefined') {
                config = passport_config;
            }
        };

        var stream = isWeex?weex.requireModule('stream'):com;
        stream.fetch({
            method: 'get',
            type: 'jsonp',
            url: config.base + 'authStatus'
        }, function(res) {
            let data = isWeex?res.data:res;
            if (data.hasLogin) {
                var principal =  data.principal;
                hasLoginCallback(principal);
            } else {
                unLoginCallback();
            }
        }, function(xhr, errorCode) {
            typeof errorFn == "function" && errorFn(xhr, errorCode)
        })

    },
    cookie(key, value, attributes) {
        // [js-cookie/js-cookie: A simple, lightweight JavaScript API for handling browser cookies](https://github.com/js-cookie/js-cookie)
        if (base.env.Web) {
            function extend() {
                var i = 0;
                var result = {};
                for (; i < arguments.length; i++) {
                    var attributes = arguments[i];
                    for (var key in attributes) {
                        result[key] = attributes[key];
                    }
                }
                return result;
            }


            function api(key, value, attributes) {
                var result;
                if (typeof document === 'undefined') {
                    return;
                }

                // Write

                if (arguments.length > 1) {
                    attributes = extend({
                        path: '/'
                    }, api.defaults, attributes);

                    if (typeof attributes.expires === 'number') {
                        var expires = new Date();
                        expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                        attributes.expires = expires;
                    }

                    attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                    try {
                        result = JSON.stringify(value);
                        if (/^[\{\[]/.test(result)) {
                            value = result;
                        }
                    } catch (e) {}


                    key = encodeURIComponent(String(key));
                    key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                    key = key.replace(/[\(\)]/g, escape);

                    var stringifiedAttributes = '';

                    for (var attributeName in attributes) {
                        if (!attributes[attributeName]) {
                            continue;
                        }
                        stringifiedAttributes += '; ' + attributeName;
                        if (attributes[attributeName] === true) {
                            continue;
                        }
                        stringifiedAttributes += '=' + attributes[attributeName];
                    }
                    return (document.cookie = key + '=' + value + stringifiedAttributes);
                }

                // Read

                if (!key) {
                    result = {};
                }

                var cookies = document.cookie ? document.cookie.split('; ') : [];
                var rdecode = /(%[0-9A-Z]{2})+/g;
                var i = 0;

                for (; i < cookies.length; i++) {
                    var parts = cookies[i].split('=');
                    var cookie = parts.slice(1).join('=');

                    if (cookie.charAt(0) === '"') {
                        cookie = cookie.slice(1, -1);
                    }
                    try {
                        var name = parts[0].replace(rdecode, decodeURIComponent);
                        cookie = cookie.replace(rdecode, decodeURIComponent);

                        if (this.json) {
                            try {
                                cookie = JSON.parse(cookie);
                            } catch (e) {}
                        }

                        if (key === name) {
                            result = cookie;
                            break;
                        }

                        if (!key) {
                            result[name] = cookie;
                        }
                    } catch (e) {}
                }

                return result;
            }

            api.set = api;
            api.get = function(key) {
                return api.call(api, key);
            };
            api.getJSON = function() {
                return api.apply({
                    json: true
                }, [].slice.call(arguments));
            };
            api.defaults = {};

            api.remove = function(key, attributes) {
                api(key, '', extend(attributes, {
                    expires: -1
                }));
            };

            return api;


        }
    },
    f12 (callback) {
        var mUrl = "https://res.suning.cn/public/v5/js/m/"
        H5.loadScript(mUrl + "console.js").then(function() {
            H5.loadScript('https://res.suning.cn/public/v5/js/m/??resources.min.js,sources.min.js').then(callback)
        })
    },
    appShare (title, content, image, url) {
        var $shareEl = document.querySelector("#isshareurl");

        if (!$shareEl) {
            var $shareEl = '<input type="hidden" value="1" title ="' + title + '" isshareurl="' + window.location.href + '" sharecontent="' + content + '" shareimg="' + image + '"  alt="' + image + '" id="isshareurl">';
            document.body.insertAdjacentHTML( 'beforeend', $shareEl );
            // $('body').append($shareEl);
        }
        if (base.env.Android) {
            var result = "1," + title + "," + content + "," + image + "," + window.location.href + ",0";
            //开启分享
            H5.AppReady().then(function() {
                //客户端获取wap分享信息
                window.doShareURL = function() {
                    //iOS中是直接读取isshareurl的数据  安卓上是调用这个方法
                    //之前ftl中有些把sharecontent字段写成了text字段 导致iOS中失效
                    // var appType = $shareEl.attr('value');
                    // var title = $shareEl.attr('title');
                    // var context = $shareEl.attr('sharecontent');
                    // var shareimg = $shareEl.attr('alt');
                    
                    window.shareApi && window.shareApi.saveShareInfo(result);
                }
            })


        }

    },
    isWebp () {
        var webp = false;
    
        var image = new Image();
        window._isWebp_ = ''
        image.src = 'data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==';

        var onload = function(callback){
            image.onerror = image.onload = function() {  
                if(image.width === 1 && image.height === 1){
                    webp = true;
                    window._isWebp_ = webp;
                }
            };
        }

        onload()
    }

}



exports.h5 = H5

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * [AlertBox 弹框]
 * @param {[type]} type  弹框类型 doubleBtn/onceCancel/onceConfirm/mini
 * @param {[type]} alertType  弹框固定fixed /''滚动样式类型 
 * @param {[type]} alertCls  弹框class 可继承修改样式
 * @param {[type]} title 弹框标题
 * @param {[type]} msg 弹框内容
 * @param {[type]} cancelText 取消按钮文本
 * @param {[type]} confirmText 确认按钮文本
 * @param {[type]} cancel 取消按钮回调事件
 * @param {[type]} confirm 确认按钮回调事件
 * @param {[type]} callback 弹框回调事件
 * @return {[Function]}    [AlertBox({type:'doubleBtn',title:'温馨提示',...})]
 */
;
(function(M, W) {
    var _uuid = 0;
    M.AlertBox = function(opts){
        var w = window, d = document;

    	   'use strict';

            

           
            function alertBox(opts){
                
                if(!(this instanceof alertBox)){
                    return  new alertBox(opts).init();
                }

                this.opts = opts || {};
                this.uuid = _uuid;
                this.type = this.opts.type || "doubleBtn";
                this.alertType = this.opts.alertType || "";
                this.alertCls = this.opts.alertCls || "";
                this.title = this.opts.title || "";
                this.msg = this.opts.msg || "";
                this.cancelText = this.opts.cancelText || "取消";
                this.confirmText = this.opts.confirmText || "确定";
                this.cancel = this.opts.cancel || "";
                this.confirm = this.opts.confirm || "";
                this.callback = this.opts.callback || "";
                this.delay = this.opts.delay || 2600;
            }

            alertBox.prototype = {
                getEl: function(supEl, el){
                    return supEl.querySelector(el);
                },
                init: function(){
                    var self = this ;
                    _uuid++;
                    self.setStyle();
                    self.addAlertBox();
                    self.type == "mini" ? self.minEvent() : self.alertEvent();

                    return self;
                },
                addAlertBox: function(){
                    var self = this,
                        pos = self.getPos();
                     self.alertType == "fixed" ?  self.getFixedMask() : self.getMask() ;
                     self.alertType == "fixed" ?  self.getEl(d, "#alertMask_"+self.uuid).insertAdjacentHTML('beforeend', self.getHtml()) :  self.getEl(d, "body").insertAdjacentHTML('beforeend', self.getHtml());
                    self.alertBox = self.getEl(d, "#alertBox_"+self.uuid);
                    if(self.alertType == "fixed"){
                        self.alertBox.style.cssText = "width:"+ parseInt(pos.width - (2 * 25)) +"px;left:25px;top:50%;-webkit-transform:translate3d(0,-50%,0);";
                    }else{
                        self.alertBox.style.cssText = "width:"+ parseInt(pos.width - (2 * 25)) +"px;left:25px;top:"+ parseInt(pos.sTop + w.innerHeight/2 -self.alertBox.offsetHeight/2)+"px;";
                    }
                 
                    self.callback && typeof self.callback == "function" && self.type != "mini" && self.callback();
                },
                setStyle: function(){
                    var self = this,
                   style = d.createElement("style"),
                   cssStr = ".alert-box{position:absolute;left:0;top:0;border-radius:0.1333rem;background:#FFF;-webkit-box-sizing:border-box;z-index:100;font-size:0.5rem;}" +
                            ".alert-msg{padding:0.2666rem 0.4rem 0.4rem;text-align:center;line-height:1.8;word-break:break-all;}" +
                            ".alert-title{padding:0.4rem 0.4rem 0;text-align:center;}" +
                            ".alert-btn{display:-webkit-flex !important;display:-webkit-box;border-top:1px solid #DCDCDC;}" +
                            ".alert-btn a{display:block;-webkit-flex:1 !important;-webkit-box-flex:1;height:1.12rem;line-height:1.12rem;text-align:center;}" +
                            ".alert-btn a.alert-confirm{border-left:1px solid #DCDCDC;color:#EDA200;}" +
                             ".alert-btn a.alert-confirm.single{border-left:none;}" +
                            ".alert-mini-box{border-radius:0.1333rem;background:rgba(0,0,0,.7);color:#fff;}";
                    style.type= "text/css";
                    style.innerText = cssStr;
                    self.getEl(d, "head").appendChild(style);
                },
                getPos: function(){
                    var wn = d.documentElement.offsetWidth || d.body.offsetWidth,
                        h = d.documentElement.offsetHeight || d.body.offsetHeight,
                        s = d.documentElement.scrollTop || d.body.scrollTop;
                    if(w.innerHeight > h){
                        h = w.innerHeight;
                    }
                    return {
                        width: wn,
                        height: h,
                        sTop: s
                    };
                },
                getHtml: function(){
                    var self = this,
                        html = '';
                    if(self.type != "mini"){
                        html += '<div class=\"alert-box ' + self.alertCls + '\" id="alertBox_' + self.uuid + '">' +
                                '<div class="alert-title">'+self.title+'</div>' +
                                '<div class="alert-msg">'+self.msg+'</div>' +
                                '<div class="alert-btn">';
                        switch(self.type){
                            case "doubleBtn" :
                                html += '<a href="javascript:;" class="alert-cancel mr10">'+self.cancelText+'</a>' +
                                    '<a href="javascript:;" class="alert-confirm">'+self.confirmText+'</a>';
                                break;
                            case "onceCancel" :
                                html += '<a href="javascript:;" class="alert-cancel">'+self.cancelText+'</a>';
                                break;
                            case "onceConfirm" :
                                html += '<a href="javascript:;" class="alert-confirm single">'+self.confirmText+'</a>';
                                break;
                        }
                        html += '</div></div>';
                    } else{
                        html += '<div class=\"alert-box alert-mini-box ' + self.alertCls + '\"  id="alertBox_'+self.uuid+'"><div class="alert-msg">'+self.msg+'</div></div>';
                    }
                    return  html;
                },
                getMask: function(){
                    var self = this,
                        pos = self.getPos(),
                        mask = d.createElement("div");
                    mask.id = "alertMask_"+self.uuid;
                    self.getEl(d, "body").appendChild(mask);
                    mask.style.cssText = "position:absolute;left:0;top:0;width:"+ pos.width +"px;height:" + pos.height + "px;background:rgba(0,0,0,0.3);z-index:99";
                    self.type == "mini" && (mask.style.backgroundColor = "rgba(255, 255, 255, 0)");
                },
                 getFixedMask: function(){
                    var self = this,
                        mask = d.createElement("div");
                        mask.id = "alertMask_"+self.uuid;
                        self.getEl(d, "body").appendChild(mask);
                        mask.style.cssText = "position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.3);z-index:99;";
                },
                minEvent: function(){
                    var self = this;
                    setTimeout(function(){

                            self.remove(self.alertBox);
                            self.callback && typeof self.callback == "function" && self.callback();
                        self.remove(self.getEl(d, "#alertMask_"+self.uuid));

                    },self.delay);
                },
                alertEvent: function(){
                    var self = this;
                    if(self.alertBox){
                        var cancelBtn = self.getEl(self.alertBox, ".alert-cancel"),
                            confirmBtn = self.getEl(self.alertBox, ".alert-confirm");
                        cancelBtn && self.reset(cancelBtn, self.cancel);
                        confirmBtn && self.reset(confirmBtn, self.confirm);
                    }
                },
                reset: function(el,type){
                    var self = this;
                    el.onclick = function(){
                        var result = type && typeof type == "function" && type(this);
                        // 不隐藏
                        if(result === false) return;

                        self.alertType != "fixed" && self.remove(self.alertBox);
                        self.remove(self.getEl(d, "#alertMask_"+self.uuid));
                    };
                },
                remove:function(el){
                    this.getEl(d, "body").removeChild(el);
                },
                destroy:function(){
                    this.remove(this.alertBox);
                    this.remove(this.getEl(d, "#alertMask_"+this.uuid));
                }
            }
           
            return alertBox(opts);

    }

}(window.Wap = window.Wap || {}, window));

if(typeof window == 'undefined'){
    exports.AlertBox = AlertBox
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!function(t,i,e){function s(e,s){this.wrapper="string"==typeof e?i.querySelector(e):e,this.scroller=this.wrapper.children[0],this.scrollerStyle=this.scroller.style,this.options={disablePointer:!o.hasPointer,disableTouch:o.hasPointer||!o.hasTouch,disableMouse:o.hasPointer||o.hasTouch,startX:0,startY:0,scrollY:!0,directionLockThreshold:5,momentum:!0,bounce:!0,bounceTime:600,bounceEasing:"",preventDefault:!0,preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/},HWCompositing:!0,useTransition:!0,useTransform:!0,bindToWrapper:"undefined"==typeof t.onmousedown};for(var n in s)this.options[n]=s[n];this.translateZ=this.options.HWCompositing&&o.hasPerspective?" translateZ(0)":"",this.options.useTransition=o.hasTransition&&this.options.useTransition,this.options.useTransform=o.hasTransform&&this.options.useTransform,this.options.eventPassthrough=this.options.eventPassthrough===!0?"vertical":this.options.eventPassthrough,this.options.preventDefault=!this.options.eventPassthrough&&this.options.preventDefault,this.options.scrollY="vertical"==this.options.eventPassthrough?!1:this.options.scrollY,this.options.scrollX="horizontal"==this.options.eventPassthrough?!1:this.options.scrollX,this.options.freeScroll=this.options.freeScroll&&!this.options.eventPassthrough,this.options.directionLockThreshold=this.options.eventPassthrough?0:this.options.directionLockThreshold,this.options.bounceEasing="string"==typeof this.options.bounceEasing?o.ease[this.options.bounceEasing]||o.ease.circular:this.options.bounceEasing,this.options.resizePolling=void 0===this.options.resizePolling?60:this.options.resizePolling,this.options.tap===!0&&(this.options.tap="tap"),this.options.useTransition||this.options.useTransform||/relative|absolute/i.test(this.scrollerStyle.position)||(this.scrollerStyle.position="relative"),this.x=0,this.y=0,this.directionX=0,this.directionY=0,this._events={},this._init(),this.refresh(),this.scrollTo(this.options.startX,this.options.startY),this.enable()}var n=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame||function(i){t.setTimeout(i,1e3/60)},o=function(){function s(t){return r===!1?!1:""===r?t:r+t.charAt(0).toUpperCase()+t.substr(1)}var n={},o=i.createElement("div").style,r=function(){for(var t,i=["t","webkitT","MozT","msT","OT"],e=0,s=i.length;s>e;e++)if(t=i[e]+"ransform",t in o)return i[e].substr(0,i[e].length-1);return!1}();n.getTime=Date.now||function(){return(new Date).getTime()},n.extend=function(t,i){for(var e in i)t[e]=i[e]},n.addEvent=function(t,i,e,s){t.addEventListener(i,e,!!s)},n.removeEvent=function(t,i,e,s){t.removeEventListener(i,e,!!s)},n.prefixPointerEvent=function(i){return t.MSPointerEvent?"MSPointer"+i.charAt(7).toUpperCase()+i.substr(8):i},n.momentum=function(t,i,s,n,o,r){var h,a,c=t-i,l=e.abs(c)/s;return r=void 0===r?6e-4:r,h=t+l*l/(2*r)*(0>c?-1:1),a=l/r,n>h?(h=o?n-o/2.5*(l/8):n,c=e.abs(h-t),a=c/l):h>0&&(h=o?o/2.5*(l/8):0,c=e.abs(t)+h,a=c/l),{destination:e.round(h),duration:a}};var h=s("transform");return n.extend(n,{hasTransform:h!==!1,hasPerspective:s("perspective")in o,hasTouch:"ontouchstart"in t,hasPointer:!(!t.PointerEvent&&!t.MSPointerEvent),hasTransition:s("transition")in o}),n.isBadAndroid=function(){var i=t.navigator.appVersion;if(!/Android /.test(t.navigator.appVersion)||/Chrome\/\d/.test(t.navigator.appVersion)||t.navigator.userAgent.match(/SNLITE-WAP/i))return!1;var e=i.match(/Safari\/(\d+.\d)/);return e&&"object"==typeof e&&e.length>=2?parseFloat(e[1])<535.19:!0}(),n.extend(n.style={},{transform:h,transitionTimingFunction:s("transitionTimingFunction"),transitionDuration:s("transitionDuration"),transitionDelay:s("transitionDelay"),transformOrigin:s("transformOrigin"),touchAction:s("touchAction")}),n.hasClass=function(t,i){var e=new RegExp("(^|\\s)"+i+"(\\s|$)");return e.test(t.className)},n.addClass=function(t,i){if(!n.hasClass(t,i)){var e=t.className.split(" ");e.push(i),t.className=e.join(" ")}},n.removeClass=function(t,i){if(n.hasClass(t,i)){var e=new RegExp("(^|\\s)"+i+"(\\s|$)","g");t.className=t.className.replace(e," ")}},n.offset=function(t){for(var i=-t.offsetLeft,e=-t.offsetTop;t=t.offsetParent;)i-=t.offsetLeft,e-=t.offsetTop;return{left:i,top:e}},n.preventDefaultException=function(t,i){for(var e in i)if(i[e].test(t[e]))return!0;return!1},n.extend(n.eventType={},{touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2,pointerdown:3,pointermove:3,pointerup:3,MSPointerDown:3,MSPointerMove:3,MSPointerUp:3}),n.extend(n.ease={},{quadratic:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(t){return t*(2-t)}},circular:{style:"cubic-bezier(0.1, 0.57, 0.1, 1)",fn:function(t){return e.sqrt(1- --t*t)}},back:{style:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",fn:function(t){var i=4;return(t-=1)*t*((i+1)*t+i)+1}},bounce:{style:"",fn:function(t){return(t/=1)<1/2.75?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}},elastic:{style:"",fn:function(t){var i=.22,s=.4;return 0===t?0:1==t?1:s*e.pow(2,-10*t)*e.sin(2*(t-i/4)*e.PI/i)+1}}}),n.tap=function(t,e){var s=i.createEvent("Event");s.initEvent(e,!0,!0),s.pageX=t.pageX,s.pageY=t.pageY,t.target.dispatchEvent(s)},n.click=function(e){var s,n=e.target;/(SELECT|INPUT|TEXTAREA)/i.test(n.tagName)||(s=i.createEvent(t.MouseEvent?"MouseEvents":"Event"),s.initEvent("click",!0,!0),s.view=e.view||t,s.detail=1,s.screenX=n.screenX||0,s.screenY=n.screenY||0,s.clientX=n.clientX||0,s.clientY=n.clientY||0,s.ctrlKey=!!e.ctrlKey,s.altKey=!!e.altKey,s.shiftKey=!!e.shiftKey,s.metaKey=!!e.metaKey,s.button=0,s.relatedTarget=null,s._constructed=!0,n.dispatchEvent(s))},n.getTouchAction=function(t,i){var e="none";return"vertical"===t?e="pan-y":"horizontal"===t&&(e="pan-x"),i&&"none"!=e&&(e+=" pinch-zoom"),e},n.getRect=function(t){if(t instanceof SVGElement){var i=t.getBoundingClientRect();return{top:i.top,left:i.left,width:i.width,height:i.height}}return{top:t.offsetTop,left:t.offsetLeft,width:t.offsetWidth,height:t.offsetHeight}},n}();s.prototype={version:"5.2.0-snapshot",_init:function(){this._initEvents()},destroy:function(){this._initEvents(!0),clearTimeout(this.resizeTimeout),this.resizeTimeout=null,this._execEvent("destroy")},_transitionEnd:function(t){t.target==this.scroller&&this.isInTransition&&(this._transitionTime(),this.resetPosition(this.options.bounceTime)||(this.isInTransition=!1,this._execEvent("scrollEnd")))},_start:function(t){if(1!=o.eventType[t.type]){var i;if(i=t.which?t.button:t.button<2?0:4==t.button?1:2,0!==i)return}if(this.enabled&&(!this.initiated||o.eventType[t.type]===this.initiated)){!this.options.preventDefault||o.isBadAndroid||o.preventDefaultException(t.target,this.options.preventDefaultException)||t.preventDefault();var s,n=t.touches?t.touches[0]:t;this.initiated=o.eventType[t.type],this.moved=!1,this.distX=0,this.distY=0,this.directionX=0,this.directionY=0,this.directionLocked=0,this.startTime=o.getTime(),this.options.useTransition&&this.isInTransition?(this._transitionTime(),this.isInTransition=!1,s=this.getComputedPosition(),this._translate(e.round(s.x),e.round(s.y)),this._execEvent("scrollEnd")):!this.options.useTransition&&this.isAnimating&&(this.isAnimating=!1,this._execEvent("scrollEnd")),this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=n.pageX,this.pointY=n.pageY,this._execEvent("beforeScrollStart")}},_move:function(t){if(this.enabled&&o.eventType[t.type]===this.initiated){this.options.preventDefault&&t.preventDefault();var i,s,n,r,h=t.touches?t.touches[0]:t,a=h.pageX-this.pointX,c=h.pageY-this.pointY,l=o.getTime();if(this.pointX=h.pageX,this.pointY=h.pageY,this.distX+=a,this.distY+=c,n=e.abs(this.distX),r=e.abs(this.distY),!(l-this.endTime>300&&10>n&&10>r)){if(this.directionLocked||this.options.freeScroll||(this.directionLocked=n>r+this.options.directionLockThreshold?"h":r>=n+this.options.directionLockThreshold?"v":"n"),"h"==this.directionLocked){if("vertical"==this.options.eventPassthrough)t.preventDefault();else if("horizontal"==this.options.eventPassthrough)return void(this.initiated=!1);c=0}else if("v"==this.directionLocked){if("horizontal"==this.options.eventPassthrough)t.preventDefault();else if("vertical"==this.options.eventPassthrough)return void(this.initiated=!1);a=0}a=this.hasHorizontalScroll?a:0,c=this.hasVerticalScroll?c:0,i=this.x+a,s=this.y+c,(i>0||i<this.maxScrollX)&&(i=this.options.bounce?this.x+a/3:i>0?0:this.maxScrollX),(s>0||s<this.maxScrollY)&&(s=this.options.bounce?this.y+c/3:s>0?0:this.maxScrollY),this.directionX=a>0?-1:0>a?1:0,this.directionY=c>0?-1:0>c?1:0,this.moved||this._execEvent("scrollStart"),this.moved=!0,this._translate(i,s),l-this.startTime>300&&(this.startTime=l,this.startX=this.x,this.startY=this.y)}}},_end:function(t){if(this.enabled&&o.eventType[t.type]===this.initiated){this.options.preventDefault&&!o.preventDefaultException(t.target,this.options.preventDefaultException)&&t.preventDefault();var i,s,n=(t.changedTouches?t.changedTouches[0]:t,o.getTime()-this.startTime),r=e.round(this.x),h=e.round(this.y),a=e.abs(r-this.startX),c=e.abs(h-this.startY),l=0,p="";if(this.isInTransition=0,this.initiated=0,this.endTime=o.getTime(),!this.resetPosition(this.options.bounceTime))return this.scrollTo(r,h),this.moved?this._events.flick&&200>n&&100>a&&100>c?void this._execEvent("flick"):(this.options.momentum&&300>n&&(i=this.hasHorizontalScroll?o.momentum(this.x,this.startX,n,this.maxScrollX,this.options.bounce?this.wrapperWidth:0,this.options.deceleration):{destination:r,duration:0},s=this.hasVerticalScroll?o.momentum(this.y,this.startY,n,this.maxScrollY,this.options.bounce?this.wrapperHeight:0,this.options.deceleration):{destination:h,duration:0},r=i.destination,h=s.destination,l=e.max(i.duration,s.duration),this.isInTransition=1),r!=this.x||h!=this.y?((r>0||r<this.maxScrollX||h>0||h<this.maxScrollY)&&(p=o.ease.quadratic),void this.scrollTo(r,h,l,p)):void this._execEvent("scrollEnd")):(this.options.tap&&o.tap(t,this.options.tap),this.options.click&&o.click(t),void this._execEvent("scrollCancel"))}},_resize:function(){var t=this;clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){t.refresh()},this.options.resizePolling)},resetPosition:function(t){var i=this.x,e=this.y;return t=t||0,!this.hasHorizontalScroll||this.x>0?i=0:this.x<this.maxScrollX&&(i=this.maxScrollX),!this.hasVerticalScroll||this.y>0?e=0:this.y<this.maxScrollY&&(e=this.maxScrollY),i==this.x&&e==this.y?!1:(this.scrollTo(i,e,t,this.options.bounceEasing),!0)},disable:function(){this.enabled=!1},enable:function(){this.enabled=!0},refresh:function(){o.getRect(this.wrapper),this.wrapperWidth=this.wrapper.clientWidth,this.wrapperHeight=this.wrapper.clientHeight;var t=o.getRect(this.scroller);this.scrollerWidth=t.width,this.scrollerHeight=t.height,this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.maxScrollY=this.wrapperHeight-this.scrollerHeight,this.hasHorizontalScroll=this.options.scrollX&&this.maxScrollX<0,this.hasVerticalScroll=this.options.scrollY&&this.maxScrollY<0,this.hasHorizontalScroll||(this.maxScrollX=0,this.scrollerWidth=this.wrapperWidth),this.hasVerticalScroll||(this.maxScrollY=0,this.scrollerHeight=this.wrapperHeight),this.endTime=0,this.directionX=0,this.directionY=0,o.hasPointer&&!this.options.disablePointer&&(this.wrapper.style[o.style.touchAction]=o.getTouchAction(this.options.eventPassthrough,!0),this.wrapper.style[o.style.touchAction]||(this.wrapper.style[o.style.touchAction]=o.getTouchAction(this.options.eventPassthrough,!1))),this.wrapperOffset=o.offset(this.wrapper),this._execEvent("refresh"),this.resetPosition()},on:function(t,i){this._events[t]||(this._events[t]=[]),this._events[t].push(i)},off:function(t,i){if(this._events[t]){var e=this._events[t].indexOf(i);e>-1&&this._events[t].splice(e,1)}},_execEvent:function(t){if(this._events[t]){var i=0,e=this._events[t].length;if(e)for(;e>i;i++)this._events[t][i].apply(this,[].slice.call(arguments,1))}},scrollBy:function(t,i,e,s){t=this.x+t,i=this.y+i,e=e||0,this.scrollTo(t,i,e,s)},scrollTo:function(t,i,e,s){s=s||o.ease.circular,this.isInTransition=this.options.useTransition&&e>0;var n=this.options.useTransition&&s.style;!e||n?(n&&(this._transitionTimingFunction(s.style),this._transitionTime(e)),this._translate(t,i)):this._animate(t,i,e,s.fn)},scrollToElement:function(t,i,s,n,r){if(t=t.nodeType?t:this.scroller.querySelector(t)){var h=o.offset(t);h.left-=this.wrapperOffset.left,h.top-=this.wrapperOffset.top;var a=o.getRect(t),c=o.getRect(this.wrapper);s===!0&&(s=e.round(a.width/2-c.width/2)),n===!0&&(n=e.round(a.height/2-c.height/2)),h.left-=s||0,h.top-=n||0,h.left=h.left>0?0:h.left<this.maxScrollX?this.maxScrollX:h.left,h.top=h.top>0?0:h.top<this.maxScrollY?this.maxScrollY:h.top,i=void 0===i||null===i||"auto"===i?e.max(e.abs(this.x-h.left),e.abs(this.y-h.top)):i,this.scrollTo(h.left,h.top,i,r)}},_transitionTime:function(t){if(this.options.useTransition){t=t||0;var i=o.style.transitionDuration;if(i&&(this.scrollerStyle[i]=t+"ms",!t&&o.isBadAndroid)){this.scrollerStyle[i]="0.0001ms";var e=this;n(function(){"0.0001ms"===e.scrollerStyle[i]&&(e.scrollerStyle[i]="0s")})}}},_transitionTimingFunction:function(t){this.scrollerStyle[o.style.transitionTimingFunction]=t},_translate:function(t,i){this.options.useTransform?this.scrollerStyle[o.style.transform]="translate("+t+"px,"+i+"px)"+this.translateZ:(t=e.round(t),i=e.round(i),this.scrollerStyle.left=t+"px",this.scrollerStyle.top=i+"px"),this.x=t,this.y=i},_initEvents:function(i){var e=i?o.removeEvent:o.addEvent,s=this.options.bindToWrapper?this.wrapper:t;e(t,"orientationchange",this),e(t,"resize",this),this.options.click&&e(this.wrapper,"click",this,!0),this.options.disableMouse||(e(this.wrapper,"mousedown",this),e(s,"mousemove",this),e(s,"mousecancel",this),e(s,"mouseup",this)),o.hasPointer&&!this.options.disablePointer&&(e(this.wrapper,o.prefixPointerEvent("pointerdown"),this),e(s,o.prefixPointerEvent("pointermove"),this),e(s,o.prefixPointerEvent("pointercancel"),this),e(s,o.prefixPointerEvent("pointerup"),this)),o.hasTouch&&!this.options.disableTouch&&(e(this.wrapper,"touchstart",this),e(s,"touchmove",this),e(s,"touchcancel",this),e(s,"touchend",this)),e(this.scroller,"transitionend",this),e(this.scroller,"webkitTransitionEnd",this),e(this.scroller,"oTransitionEnd",this),e(this.scroller,"MSTransitionEnd",this)},getComputedPosition:function(){var i,e,s=t.getComputedStyle(this.scroller,null);return this.options.useTransform?(s=s[o.style.transform].split(")")[0].split(", "),i=+(s[12]||s[4]),e=+(s[13]||s[5])):(i=+s.left.replace(/[^-\d.]/g,""),e=+s.top.replace(/[^-\d.]/g,"")),{x:i,y:e}},_animate:function(t,i,e,s){function r(){var u,f,d,v=o.getTime();return v>=p?(h.isAnimating=!1,h._translate(t,i),void(h.resetPosition(h.options.bounceTime)||h._execEvent("scrollEnd"))):(v=(v-l)/e,d=s(v),u=(t-a)*d+a,f=(i-c)*d+c,h._translate(u,f),void(h.isAnimating&&n(r)))}var h=this,a=this.x,c=this.y,l=o.getTime(),p=l+e;this.isAnimating=!0,r()},handleEvent:function(t){switch(t.type){case"touchstart":case"pointerdown":case"MSPointerDown":case"mousedown":this._start(t);break;case"touchmove":case"pointermove":case"MSPointerMove":case"mousemove":this._move(t);break;case"touchend":case"pointerup":case"MSPointerUp":case"mouseup":case"touchcancel":case"pointercancel":case"MSPointerCancel":case"mousecancel":this._end(t);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(t);break;case"wheel":case"DOMMouseScroll":case"mousewheel":this._wheel(t);break;case"keydown":this._key(t);break;case"click":this.enabled&&!t._constructed&&(t.preventDefault(),t.stopPropagation())}}},s.utils=o,"undefined"!=typeof module&&module.exports?module.exports=s: true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return s}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):t.IScroll=s}(window,document,Math);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

let bridge = "undefined" != typeof weex && weex.requireModule('jsbridge');
let h5 = __webpack_require__(11).h5

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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * [saClick]
 * @param  {[type]} businessId [description]
 * @return {[type]}            [description]
 */
let base = __webpack_require__(2)
let jsbridge = "undefined" != typeof weex && weex.requireModule('jsbridge');
function saClick(trickPoint) {

    // let trickPoint = 'gshop_none_recgshop_' + (this.index + 1) + '-' + (idx + 1) + '_p_' + shop.shopId + '_none_' + shop.skus[0].handwork

    if (base.env.Web) {
        base.h5.loadGa(() => {
            let $a = document.createElement('a')
            $a.setAttribute('name', trickPoint)
            sa.click.sendDatasIndex($a)
        })
    } else {
        // trickPoint && jsbridge.customEventCollection('recommendation', ['recvalue'], [trickPoint])
        trickPoint && jsbridge.saClick(trickPoint);
    }
}

function sendExpoDatas(expList) {
    // 曝光埋点
    // let expList = []

    // newData.forEach((item, i) => {
    //     expList.push((base.env.Web ? 'baoguang' : 'gshop') + '_recgshop_' + (self.index + 1) + '-' + (self.renderData.length + i + 1) + '_' + item.shopId + '_none_' + item.skus[0].handwork)
    // })


    if (base.env.Web) {

        base.h5.loadGa(() => {
            let expoList = []
            expList.forEach((item, i) => {
                expoList.push(item.substring(9))
            })
            let str = expoList.join('#@#')
            str = str.replace(/\|/g, " ")
            _sendExpoDatas((str != '') ? str : '-', 1)
        })


    } else {
        jsbridge.customEventCollection('exposure', ['expvalue'], expList);
    }
}


exports.saClick = saClick
exports.ExpoDatas = sendExpoDatas

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_base_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_base_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__module_base_js__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {};
	},
	mounted: function mounted() {
		this.getLoginStatus();
	},

	methods: {
		//点击埋点
		saClick: function saClick() {
			__WEBPACK_IMPORTED_MODULE_0__module_base_js___default.a.sa.saClick("djmd_djmd_djmd_djmd");
		},

		//获取登陆信息
		getLoginStatus: function getLoginStatus() {
			__WEBPACK_IMPORTED_MODULE_0__module_base_js___default.a.h5.probeAuthStatus(function (username) {
				console.log(username, "已登录");
			}, function (err) {
				console.log(err, "未登录");
			});
		}
	}
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// 生命周期示例：
/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            mod1Txt: "1、生命周期子组件"
        };
    },

    beforeCreate: function beforeCreate() {
        console.group('beforeCreate 创建前状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
        console.log("%c%s", "color:red", "data   : " + this.$data); //undefined 
        console.log("%c%s", "color:red", "message: " + this.message);
    },
    created: function created() {
        console.group('created 创建完毕状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
        console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化 
        console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
    },
    beforeMount: function beforeMount() {
        console.group('beforeMount 挂载前状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化  
        console.log("%c%s", "color:red", "message: " + this.message); //已被初始化  
    },
    mounted: function mounted() {
        console.group('mounted 挂载结束状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
        console.log("%c%s", "color:red", "message: " + this.message); //已被初始化 
    },
    beforeUpdate: function beforeUpdate() {
        console.group('beforeUpdate 更新前状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el);
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data);
        console.log("%c%s", "color:red", "message: " + this.message);
    },
    updated: function updated() {
        console.group('updated 更新完成状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el);
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data);
        console.log("%c%s", "color:red", "message: " + this.message);
    },
    beforeDestroy: function beforeDestroy() {
        console.group('beforeDestroy 销毁前状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el);
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data);
        console.log("%c%s", "color:red", "message: " + this.message);
    },
    destroyed: function destroyed() {
        console.group('destroyed 销毁完成状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el);
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data);
        console.log("%c%s", "color:red", "message: " + this.message);
    }
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    // props:['modData'],
    props: {
        modData: {
            type: String,
            default: "2、父子组件通信默认值" //这样可以指定默认的值
        }
    },
    data: function data() {
        return {
            mod2Txt: '2、这是子组件2的文字'
        };
    }
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			modData: '2、父组件传给子组件的值',
			scrolling: false,
			//滑动数据
			tabIndex: 0,
			tabHeight: 0,
			tabList: [{ id: "id1", name: "畅销排行", trickPoint: "name1" }, { id: "id2", name: "手机", trickPoint: "name2" }, { id: "id3", name: "电脑", trickPoint: "name3" }, { id: "id4", name: "数码", trickPoint: "name4" }, { id: "id5", name: "手机配件", trickPoint: "name5" }, { id: "id6", name: "电脑外设", trickPoint: "name6" }],
			tabOpts: {
				scrollX: true,
				scrollY: false,
				click: false,
				useTransform: true,
				preventDefaultException: {
					tagName: /.*/
				},
				eventpassthrough: true
			}

		};
	},

	// 初始化引入子组件,两种引入方式，写法二:
	components: {
		'scroll-tab': __webpack_require__(73),
		'scroll-item': __webpack_require__(72),
		'sn-list': __webpack_require__(4)
	},

	mounted: function mounted() {
		var self = this;

		//为什么要加上setTimeout？	
		//因为viscroll有setTimeout——此问题已解决

		//但是外部引用css可能会加载慢？从而获取不到正确的tab高度，不要用import，用link
		//所以还是有问题，不加setTimeout tab高度计算不对 

		// setTimeout(()=>{
		//tab栏的高度
		self.tabHeight = self.$refs["scrollTab"].$el.clientHeight;

		self.getOffsetTop();
		self.changeToTab(0);
		self.pageScroll();
		// },200);

	},


	methods: {
		/**
   * tab切换回调方法，传值obj:{index,id}
   */
		scrollChange: function scrollChange(obj) {
			this.tabIndex = obj.index;

			var index = obj.index;

			//标记是手动触发的滚动
			this.scrolling = true;
			// 滑动到对应cate位置
			this.scrollToPos(this.tabList[index].offsetTop - this.tabHeight);
		},


		/**
   * 滑动到tab对应的数据列表
   */
		scrollToPos: function scrollToPos(domTop) {
			//console.log("domTop",domTop);

			if (document.body.scrollTop) {
				document.body.scrollTop = domTop;
			} else {
				document.documentElement.scrollTop = domTop;
			}
		},


		/**
   * 获取并存储每个cate的顶部位置
   */
		getOffsetTop: function getOffsetTop() {

			for (var i = 0; i < this.tabList.length; i++) {
				var cateDom = this.$refs['cate' + i][0];

				//cate顶部的标准线，在页面的绝对位置
				var domTop = cateDom.offsetTop;

				this.tabList[i].offsetTop = domTop - this.tabHeight;
			}

			this.$set(this.tabList, this.tabList);
			console.log(this.tabList);
		},
		changeToTab: function changeToTab(index) {

			this.tabIndex = index;
			this.$refs["scrollTab"].clickTab(index);
		},


		/**
   * 页面的滑动事件监听
   */
		pageScroll: function pageScroll() {
			var self = this;
			//页面的高度
			var bodyH = document.body.clientHeight;

			//tab栏的高度
			// let tabHeight = this.$refs["scrollTab"].$el.clientHeight;

			//list顶部的标准线，在页面的绝对位置
			// let topLine = this.$refs['cate0'][0].offsetTop - tabHeight;


			window.addEventListener("scroll", myScroll);
			window.addEventListener("touchmove", myScroll);
			window.addEventListener("mousewheel", myScroll, false);

			function myScroll() {

				// 被标记是手动触发的滚动，不再重复执行事件
				if (!self.scrolling) {
					var scrollTop = document.documentElement.scrollTop;
					// console.log("这一块儿有问题待解决------------------------");

					console.log("scrollTop", scrollTop); //页面顶部偏移量
					// console.log("topLine",topLine);//list顶部标准线
					// console.log("bodyH",bodyH);//body的高度

					// 如果跟当前类别不同就切换
					var index = self.getCateIndex(scrollTop);
					if (index != self.tabIndex) {
						self.changeToTab(index);
					}
				} else {
					self.scrolling = false;
				}
			}
		},


		/**
   * 根据当前位置，获取当前cate的索引
   */
		getCateIndex: function getCateIndex(scrollTop) {
			var list = this.tabList,
			    cateIdx = 0;

			for (var i = 0; i < list.length; i++) {
				if (scrollTop >= list[i].offsetTop) {
					cateIdx = i;
				}
			}
			return cateIdx;
		}
	}
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			modData: '2、父组件传给子组件的值',

			//联版数据
			swipeList: [{ url: "//image4.suning.cn/uimg/MFS/show/150097189354276844.jpg" }, { url: "//image4.suning.cn/uimg/MFS/show/150097325360958549.jpg" }, { url: "//image4.suning.cn/uimg/MFS/show/150097376771784636.jpg" }],

			//滑动广告数据
			slipList: [{ url: "//image4.suning.cn/uimg/MFS/show/150097189354276844.jpg" }, { url: "//image4.suning.cn/uimg/MFS/show/150097325360958549.jpg" }, { url: "//image4.suning.cn/uimg/MFS/show/150097376771784636.jpg" }]
		};
	},

	// 初始化引入子组件,两种引入方式，写法二:
	components: {
		'sn-swipe': __webpack_require__(79),
		'sn-banner': __webpack_require__(74),
		'sn-slip': __webpack_require__(78)

	},

	methods: {
		beforeStart: function beforeStart() {
			console.log("beforeStart，开始前");
		}
	}
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			modData: '2、父组件传给子组件的值',

			//滑动数据
			tabIndex: 0,
			tabList: [{ id: "id1", name: "畅销排行", trickPoint: "name1" }, { id: "id2", name: "手机", trickPoint: "name2" }, { id: "id3", name: "电脑", trickPoint: "name3" }, { id: "id4", name: "数码", trickPoint: "name4" }, { id: "id5", name: "手机配件", trickPoint: "name5" }, { id: "id6", name: "电脑外设", trickPoint: "name6" }],
			tabOpts: {
				scrollX: true,
				scrollY: false,
				click: false,
				useTransform: true,
				preventDefaultException: {
					tagName: /.*/
				},
				eventpassthrough: true
			},

			//项目中直接设置变量值改变sn-loading的展示效果
			loadStatus: "loading"

		};
	},

	// 初始化引入子组件,两种引入方式，写法二:
	components: {

		'sn-list': __webpack_require__(4),
		'sn-lists': __webpack_require__(6),
		'tab': __webpack_require__(85),
		'tab-item': __webpack_require__(84)

	},

	methods: {
		/**
   * tab切换回调方法
   */
		tabChange: function tabChange(obj) {
			// obj:{index: 1, id: "id2"}
			console.log("tabChange:", obj);
			this.tabIndex = obj.index;
		}
	}
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_h5_mod_alertBox_1_0_0_alertBox_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_h5_mod_alertBox_1_0_0_alertBox_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__module_h5_mod_alertBox_1_0_0_alertBox_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mod1_vue__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mod1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__mod1_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 引入外部js的方法,此处暂不引入


// 引入子组件，写法一


/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			modData: '2、父组件传给子组件的值',

			//滑动数据
			tabIndex: 0,
			tabList: [{ id: "id1", name: "畅销排行", trickPoint: "name1" }, { id: "id2", name: "手机", trickPoint: "name2" }, { id: "id3", name: "电脑", trickPoint: "name3" }, { id: "id4", name: "数码", trickPoint: "name4" }, { id: "id5", name: "手机配件", trickPoint: "name5" }, { id: "id6", name: "电脑外设", trickPoint: "name6" }],
			tabOpts: {
				scrollX: true,
				scrollY: false,
				click: false,
				useTransform: true,
				preventDefaultException: {
					tagName: /.*/
				},
				eventpassthrough: true
			},

			//项目中直接设置变量值改变sn-loading的展示效果
			loadStatus: "loading"

		};
	},

	// 初始化引入子组件,两种引入方式，写法二:
	components: {
		'mod1': __WEBPACK_IMPORTED_MODULE_1__mod1_vue___default.a,
		'mod2': __webpack_require__(67),
		'sn-nav': __webpack_require__(77),
		'sn-tab': __webpack_require__(80),
		'sn-list': __webpack_require__(4),
		'sn-lists': __webpack_require__(6),
		'sn-top': __webpack_require__(81),
		'sn-count': __webpack_require__(75)
		// 'sn-loading': require('./sn-loading.vue')

	},

	methods: {
		/**
   * tab切换回调方法
   */
		tabChange: function tabChange(obj) {
			// obj:{index: 1, id: "id2"}
			console.log("tabChange:", obj);
			this.tabIndex = obj.index;
		},
		alertMini: function alertMini() {

			Wap.AlertBox({
				type: 'mini',
				msg: "小弹窗 toast 示例"
			});
		},
		alertBtns: function alertBtns() {
			Wap.AlertBox({
				type: 'doubleBtn',
				title: "双按钮弹窗",
				msg: "双按钮弹窗内容",
				cancel: function cancel() {
					alert("cancel");
				},
				confirm: function confirm() {
					alert("confirm");
				}
			});
		},
		alertCancel: function alertCancel() {
			Wap.AlertBox({
				type: 'onceCancel',
				msg: "只有取消按钮",
				cancel: function cancel() {
					alert("cancel");
				},
				cancelText: "取消按钮文本"
			});
		},
		alertConfirm: function alertConfirm() {
			Wap.AlertBox({
				type: 'onceConfirm',
				msg: "只有确定按钮",
				confirm: function confirm() {
					alert("confirm");
				}
			});
		},
		alertFixed: function alertFixed() {
			Wap.AlertBox({
				type: 'onceConfirm',
				alertType: "fixed",
				msg: "只有确定按钮",
				confirm: function confirm() {
					alert("confirm");
				}
			});
		},
		beforeStart: function beforeStart() {
			console.log("beforeStart，开始前");
		}
	}
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import Vue from 'vue';

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		idx: { default: ""
			// text: {
			// 	default: ""
			// }
		} },
	data: function data() {
		return {
			cur: false,
			fixed: ''
		};
	},

	components: {},
	mounted: function mounted() {},

	methods: {}

});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slide_VIscroll_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


//	import slide from "http://res.suning.cn/public/v5/mod/iscroll-lite/5.1.3/iscroll-lite.js";

//	引入插件，已经安装或者本地文件都行

//	import VIscroll from "viscroll";
//	引入外部插件时,需要使用use注册插件，默认参数
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1__slide_VIscroll_js__["a" /* default */], {
	mouseWheel: true,
	scrollX: true,
	scrollY: false,
	click: false,
	preventDefault: true,
	tap: false,
	bounce: false,
	disableTouch: true
});

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		tablist: {
			type: Array,
			default: function _default() {
				return [];
			}
		},
		opts: {
			type: Object,
			default: function _default() {
				return {
					scrollX: true,
					scrollY: false,
					click: false,
					useTransform: true,
					preventDefaultException: {
						tagName: /.*/
					},
					eventpassthrough: true
				};
			}
		}
	},
	data: function data() {
		return {
			oldIndex: 0,
			newIndex: 0,
			fixed: ''
		};
	},

	components: {
		// 'sn-list': require('./sn-list.vue')
	},
	mounted: function mounted() {
		this.eventsListen();
		this.pageScroll();
	},

	methods: {
		/**
   * 切换tab
   */
		eventsListen: function eventsListen() {
			var self = this,
			    ele = this.$el;

			//监听选中事件
			ele.addEventListener("click", function (event) {
				var newIndex = event.target.getAttribute("idx"),
				    newDom = self.$children[newIndex];

				//切换tab
				self.clickTab(newIndex);

				//向父组件传递数据，更新cate位置
				self.$emit('scrollChange', {
					'index': newIndex,
					'id': newDom.$el.getAttribute("idx")
				});
			});
		},


		/**
   * 点击切换tab
   */
		clickTab: function clickTab(newIndex) {
			var self = this;

			var oldDom = self.$children[self.oldIndex],
			    newDom = self.$children[newIndex];

			oldDom.cur = false;
			newDom.cur = true;
			self.oldIndex = newIndex;

			//横向滑动tab
			self.scrollToTab(newDom);
		},


		/**
   * 滑动tab效果
   */
		scrollToTab: function scrollToTab(vueDom) {
			var self = this;
			//滚动效果
			var tab_w = this.$refs.tab.getBoundingClientRect().width,
			    //获取元素的宽度
			half_w = tab_w / 2 - 15;
			var scroll = this.$refs.tab.scroll;
			var max_x = scroll ? scroll.maxScrollX : 0;

			try {
				//点击滚动距离
				if (scroll && "undefined" != typeof scroll.scrollTo) {
					var left = vueDom.$el.offsetLeft;
					var _moveX = 0;

					if (max_x + left - half_w < 0) {
						if (left > half_w) {
							_moveX = half_w - left;
						}
					} else {
						_moveX = max_x;
					}

					setTimeout(function () {
						scroll.scrollTo(_moveX, 0, 400);
					}, 180);
				}
			} catch (e) {
				console.log(e.message);
			}
		},


		/**
   * 安卓和浏览器sticky效果
   */
		pageScroll: function pageScroll() {

			var self = this;
			var clipTab = self.$refs.clipTab;

			window.addEventListener("scroll", myScroll);
			window.addEventListener("touchmove", myScroll);
			window.addEventListener("mousewheel", myScroll, false);

			function myScroll() {
				if ("undefied" != typeof clipTab) {
					var top = clipTab.getBoundingClientRect().top;
					self.fixed = top <= 0 ? 'fixed' : '';
				}
			}
		}
	}

});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		timer: {
			default: "5000"
		}
	},
	data: function data() {
		return {
			curIndex: 0,
			cssStr: '',
			list: [{
				title: "日本网红饼干",
				bgImg: "http://image.suning.cn/uimg/aps/material/150459934019195143.jpg",
				imgUrl: "//image.suning.cn/uimg/MZMS/show/150416758866488282.jpg",
				txt: "日本进口日光猫舌饼干抹茶味",
				bgColor: "rgb(153, 182, 0)"
			}, {
				title: "七夕限量礼盒",
				bgImg: "http://image1.suning.cn/uimg/cms/img/150466102154716146.jpg",
				imgUrl: "//image.suning.cn/uimg/MZMS/show/150416758866488282.jpg",
				txt: "韩国进口LG倍瑞傲按压式派缤牙膏285g",
				bgColor: "rgb(244, 105, 127)"
			}, {
				title: "46cm拥有清新口气",
				bgImg: "http://image1.suning.cn/uimg/cms/img/150459607206261521.jpg",
				imgUrl: "//image.suning.cn/uimg/MZMS/show/150416758866488282.jpg",
				txt: "意大利马尔维斯进口牙膏75ml",
				bgColor: "rgb(0, 113, 191)"
			}]
		};
	},
	mounted: function mounted() {
		this.init();
	},

	components: {},
	methods: {
		init: function init() {
			this.obj = document.querySelector('.banner-slider');

			// this.itemBox = $('.slider-wrapper a');
			this.maxLen = this.list.length - 1;
			this.startX;
			this.autoTimer = null;

			this.move(0);
			this.autoMove();

			this.touchEvent();
		},
		touchEvent: function touchEvent() {
			var self = this;
			this.$refs['bannerSlider'].addEventListener('touchstart', function (evt) {
				self.startX = evt.changedTouches[0].pageX;
				clearTimeout(self.autoTimer);
			});
			this.$refs['bannerSlider'].addEventListener('touchend', function (evt) {
				var dis = evt.changedTouches[0].pageX;
				if (Math.abs(dis - self.startX) > 50) {
					if (dis - self.startX > 0) {
						self.goNext();
					} else {
						self.goPrev();
					}
				}
				self.autoMove();
			});
		},
		// touchStart: function(evt){
		// 	console.log(evt);
		// 	this.startX = evt.changedTouches[0].pageX;
		// 	clearTimeout(this.autoTimer);
		// },

		// touchEnd: function(evt){
		// 	var dis = evt.changedTouches[0].pageX
		// 	if(Math.abs(dis-this.startX)>50){
		// 		if(dis-this.startX>0){
		// 			this.goPrev()
		// 		}else{
		// 			this.goNext()
		// 		}
		// 	}
		// 	this.autoMove();
		// },
		autoMove: function autoMove() {
			var self = this;
			clearTimeout(self.autoTimer);
			self.autoTimer = setTimeout(function () {
				self.goNext();
				self.autoMove();
			}, self.timer);
		},
		goNext: function goNext() {
			var index = this.curIndex === this.maxLen ? 0 : this.curIndex + 1;
			this.move(index);
			this.autoMove();
		},
		goPrev: function goPrev() {
			var index = 0 === this.curIndex ? this.maxLen : this.curIndex - 1;
			this.move(index);
			this.autoMove();
		},
		move: function move(index) {
			var self = this,
			    curIndex = index;
			var preIdx = 0 === curIndex ? this.maxLen : curIndex - 1,
			    //上一页
			nexIdx = curIndex === this.maxLen ? 0 : curIndex + 1; //下一页

			this.curIndex = index;

			for (var idx = 0; idx < this.list.length; idx++) {
				var cssStr = void 0;
				var value = this.list[idx],
				    bgColor = value.bgColor;
				if (idx === curIndex) {
					cssStr = this.changeStyle(0, 0, false, bgColor);
				} else {
					if (idx === preIdx) {
						//下一页
						cssStr = this.changeStyle("120%", "-130px", false, bgColor);
					} else {
						//上一页
						cssStr = idx === nexIdx ? this.changeStyle("-120%", "-130px", false, bgColor) : changeStyle(0, "-100px", true, bgColor);
					}
				}

				value.cssStr = cssStr;
			}

			this.$set(this.list, this.list);
		},

		changeStyle: function changeStyle(i, t, a, b) {
			var r = "translateX(" + i + ") translateZ(" + t + ") translate3d(0,0,0)";

			var cssStr = "opacity: " + (a ? 0 : 0 === i ? 1 : .6) + ";" + ("visibility: " + (a ? "hidden" : "visible") + ";") + ("-webkit-transform: " + r + ";") + ("-moz-transform: " + r + ";") + ("-ms-transform: " + r + ";") + ("-o-transform: " + r + ";") + ("transform: " + r + ";") + ("z-index: " + (0 === i ? 200 : 100) + ";");;

			return cssStr + (b ? "background-color: " + b : '');
		}
	}
});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_base_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_base_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__module_base_js__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        now: {
            default: new Date().getTime()
        },
        start: {
            default: new Date().getTime()
        },
        end: {
            default: new Date().getTime()
        },
        beforeStart: {
            default: function _default() {}
        },
        isStart: {
            default: function _default() {}
        },
        callback: {
            default: function _default() {
                console.log("倒计时结束～");
            }
        }
    },
    data: function data() {
        return {
            dayStr: '',
            hourStr: '',
            minuteStr: '',
            secStr: ''
        };
    },
    mounted: function mounted() {
        this.initCount();
        this.startCount();
    },

    methods: {
        // 开始执行倒计时
        startCount: function startCount() {
            this.CountDown({
                // obj: $("#count-down"),
                startTime: this.start,
                endTime: this.end,
                nowTime: this.now,
                beforeStart: this.beforeStart,
                isStart: this.isStart,
                callback: this.callback
            });
        },


        // 初始化倒计时方法
        initCount: function initCount() {
            var Vue = this;

            // Vue.CountDown = CountDown || {};
            Vue.CountDown = function (t) {
                function e(t) {
                    this.opts = t || {},
                    // this.obj = this.opts.obj,
                    this.nowTime = this.opts.nowTime, this.startTime = this.opts.startTime, this.endTime = this.opts.endTime, this.dayNode = this.opts.dayNode || ".day-node", this.hourNode = this.opts.hourNode || ".hour-node", this.minuteNode = this.opts.minuteNode || ".minute-node", this.secondNode = this.opts.secondNode || ".second-node", this.beforeStart = this.opts.beforeStart || function () {}, this.isStart = this.opts.isStart || function () {}, this.callback = this.opts.callback || function () {}, this.speed = this.opts.speed || 1e3, this.timeOffset = 0, this.gap = [], this.auto = null;
                }
                e.prototype = {
                    init: function init() {
                        var t = this;
                        t.timeOffset = t.nowTime - new Date().getTime(), t.timer(), t.run();
                    },
                    timer: function timer() {
                        var t = this,
                            e = this.nowTime;

                        if (t.startTime && parseInt(t.startTime) > parseInt(e)) {
                            t.gap = t.parse(t.startTime - e), t.html(), this.beforeStart();
                        } else {
                            t.endTime && parseInt(t.endTime) > parseInt(e) && (t.gap = t.parse(t.endTime - e), t.html(), this.isStart());
                        }

                        parseInt(t.endTime) < parseInt(this.nowTime) && (clearTimeout(t.auto), this.callback()), this.nowTime = new Date().getTime() + this.timeOffset;
                    },
                    parse: function parse(t) {
                        var e = this,
                            i = t / e.speed;
                        return e.second = Math.round(i % 60), e.minute = Math.floor(i / 60 % 60), e.hour = Math.floor(i / 60 / 60 % 24), e.day = Math.floor(i / 60 / 60 / 24), e.second < 10 && (e.second = "0" + e.second), e.minute < 10 && (e.minute = "0" + e.minute), e.hour < 10 && (e.hour = "0" + e.hour), e.day < 10 && (e.day = "0" + e.day), [e.second, e.minute, e.hour, e.day];
                    },
                    html: function html() {
                        var t = this;
                        // t.obj.find(this.dayNode).html(t.gap[3]),
                        // t.obj.find(this.hourNode).html(t.gap[2]),
                        // t.obj.find(this.minuteNode).html(t.gap[1]),
                        // t.obj.find(this.secondNode).html(t.gap[0])

                        Vue.dayStr = this.gap[3];
                        Vue.hourStr = this.gap[2];
                        Vue.minuteStr = this.gap[1];
                        Vue.secStr = this.gap[0];
                    },
                    run: function run() {
                        var t = this;
                        t.auto = setInterval(function () {
                            t.timer();
                        }, 500);
                    }
                }, new e(t).init();
            };
        }
    }
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		listid: {
			type: Array,
			default: function _default() {
				return [];
			}
		}
	},
	data: function data() {
		return {
			pageNum: 0,
			list: [{
				elementName: "测试数据1",
				elementDesc: "测试数据描述1",
				imgUrl: "//image4.suning.cn/uimg/MFS/show/150097189354276844.jpg"
			}, {
				elementName: "测试数据2",
				elementDesc: "测试数据描述2",
				imgUrl: "//image1.suning.cn/uimg/MFS/show/150303762848888336_340x340.jpg"
			}]
		};
	},
	mounted: function mounted() {},

	methods: {}
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Common = __webpack_require__(5);

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		listid: {
			type: Array,
			default: function _default() {
				return [];
			}
		}
	},
	data: function data() {
		return {
			pageNum: 1,
			pageSize: 10,
			// url: `//show.m.suning.com/higou/hotContent/jsonpNew/listPageNew_HG_BQ_001_{pageNum}_{pageSize}_{callback}.html`,
			url: '//show.m.suning.com/higou/enroll/jsonp/listEnroll_100413_{pageNum}_{pageSize}_{callback}.do',
			list: [],
			loadStatus: '' //默认值为空
		};
	},

	components: {
		'sn-loading': __webpack_require__(76)
	},
	mounted: function mounted() {
		this.getData();
		//   this.pageScroll();
	},

	methods: {
		getData: function getData() {
			var _this = this;

			var callback = "cntCallback",
			    url = this.url.replace("{pageNum}", this.pageNum).replace("{pageSize}", this.pageSize).replace("{callback}", callback);

			this.loadStatus = 'loading';

			Common.fetch({
				url: url,
				type: "jsonp",
				jsonpCallback: callback,
				callback: function callback(res) {
					if (!res.data.data.content.length || res.data.data.content.length < _this.pageSize) {
						_this.loadStatus = 'done';
					} else {
						_this.list = _this.list.concat(res.data.data.content);
						_this.pageNum++;
						_this.loadStatus = '';
					}
				}
			});
		},
		onScroll: function onScroll(callback) {
			var _this2 = this;

			callback(function (loadmore) {

				//分页加载更多
				if (loadmore) {
					_this2.getData();
				}
			});
		}
	}
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		status: {
			default: "done"
		}
	},
	data: function data() {
		return {};
	},
	mounted: function mounted() {
		this.pageScroll();
	},

	methods: {
		pageScroll: function pageScroll() {

			var self = this;

			window.addEventListener("scroll", myScroll);
			window.addEventListener("mousewheel", myScroll, false);

			function myScroll() {

				try {
					var loadmore = false;
					var top = self.$refs.dom.getBoundingClientRect().top;

					var winHeight = window.innerHeight || window.screen.height; //窗口/文档显示区域的高度

					// if (window.pageYOffset > top + winHeight || window.pageYOffset < top - winHeight && "done" != self.status) {
					// } else {
					//     if (window.pageYOffset > top - winHeight - 30 && "done" != self.status) {
					// 		loadmore = true;
					//     }
					// }

					//loadmore组件的位置出来时，就开始请求分页加载
					if (top - winHeight < 0 && "done" != self.status && "loading" != self.status) {
						loadmore = true;
					}

					var callback = function callback(cb) {
						"undefined" != typeof cb && cb(loadmore);
					};
					self.$emit('onscroll', callback);
				} catch (e) {
					console.log(e.message);
				}
			}
		}
	}
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['title'],
	data: function data() {
		return {
			navTitle: "",
			showUlList: false
		};
	},
	mounted: function mounted() {
		this.navTitle = this.title;
	},


	methods: {
		showList: function showList() {
			console.log(this.showUlList);
			this.showUlList = !this.showUlList;
		}
	}
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slide_VIscroll_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


//	import slide from "http://res.suning.cn/public/v5/mod/iscroll-lite/5.1.3/iscroll-lite.js";

//	引入插件，已经安装或者本地文件都行

//	import VIscroll from "viscroll";
//	引入外部插件时,需要使用use注册插件，默认参数
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1__slide_VIscroll_js__["a" /* default */], {
	mouseWheel: true,
	scrollX: true,
	scrollY: false,
	click: false,
	preventDefault: true,
	tap: false,
	bounce: false,
	disableTouch: true
});

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		list: {
			type: Array,
			default: function _default() {
				return [];
			}
		},
		opts: {
			type: Object,
			default: function _default() {
				return {
					scrollX: true,
					scrollY: false,
					click: false,
					useTransform: true,
					preventDefaultException: {
						tagName: /.*/
					},
					eventpassthrough: true
				};
			}
		}
	},
	data: function data() {
		return {
			tabIndex: 0
		};
	},
	mounted: function mounted() {},

	methods: {}

});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		list: {
			type: Array,
			default: function _default() {
				return [];
			}
		},
		opts: {
			type: Object,
			default: function _default() {
				//默认配置
				return {
					speed: 300,
					auto: 5000,
					continuous: true,
					showIndicators: true,
					noDragWhenSingle: true,
					prevent: false
				};
			}
		}
	},
	data: function data() {
		return {
			tabIndex: 0
		};
	},
	mounted: function mounted() {},

	components: {
		'swipe': __webpack_require__(83),
		'swipe-item': __webpack_require__(82)
	},
	methods: {}
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slide_VIscroll_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


//	import slide from "http://res.suning.cn/public/v5/mod/iscroll-lite/5.1.3/iscroll-lite.js";

//	引入插件，已经安装或者本地文件都行

//	import VIscroll from "viscroll";
//	引入外部插件时,需要使用use注册插件，默认参数
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1__slide_VIscroll_js__["a" /* default */], {
	mouseWheel: true,
	scrollX: true,
	scrollY: false,
	click: false,
	preventDefault: true,
	tap: false,
	bounce: false,
	disableTouch: true
});

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		tablist: {
			type: Array,
			default: function _default() {
				return [];
			}
		},
		opts: {
			type: Object,
			default: function _default() {
				return {
					scrollX: true,
					scrollY: false,
					click: false,
					useTransform: true,
					preventDefaultException: {
						tagName: /.*/
					},
					eventpassthrough: true
				};
			}
		}
	},
	data: function data() {
		return {
			tabIndex: 0,
			fixed: ''
		};
	},

	components: {
		'sn-list': __webpack_require__(4)
	},
	mounted: function mounted() {
		this.pageScroll();
	},

	methods: {
		/**
   * 滑动tab效果
   */
		scrollToTab: function scrollToTab(index, id) {

			//向父组件传递数据
			this.$emit('tabChange', {
				'index': index,
				'id': id
			});

			//滚动效果
			var tab_w = this.$refs.tab.getBoundingClientRect().width,
			    //获取元素的宽度
			half_w = tab_w / 2 - 15;
			var scroll = this.$refs.tab.scroll;
			var max_x = scroll ? scroll.maxScrollX : 0;

			this.tabIndex = index;

			//点击滚动距离
			if (scroll) {
				var left = this.$refs['tab' + index][0].offsetLeft;

				var _moveX = 0;
				if (max_x + left - half_w < 0) {
					if (left > half_w) {
						_moveX = half_w - left;
					}
				} else {
					_moveX = max_x;
				}

				setTimeout(function () {
					scroll.scrollTo(_moveX, 0, 400);
				}, 180);
			}
		},


		/**
   * 安卓和浏览器sticky效果
   */
		pageScroll: function pageScroll() {

			var self = this;
			var clipTab = self.$refs.clip;

			window.addEventListener("scroll", myScroll);
			window.addEventListener("touchmove", myScroll);
			window.addEventListener("mousewheel", myScroll, false);

			function myScroll() {
				if ("undefied" != typeof clipTab) {
					var top = clipTab.getBoundingClientRect().top;
					self.fixed = top <= 0 ? 'fixed' : '';
				}
			}
		}
	}

});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			hide: "hide"
		};
	},
	mounted: function mounted() {
		this.setTop();
	},

	methods: {
		setTop: function setTop() {
			var self = this;
			var winHeight = window.innerHeight || window.screen.height;
			window.addEventListener("scroll", myScroll);
			window.addEventListener("touchmove", myScroll);
			window.addEventListener("mousewheel", myScroll);

			function myScroll() {
				window.scrollY < 1.5 * winHeight ? self.hide = 'hide' : self.hide = '';
			}
		},
		scrollToTop: function scrollToTop() {
			if (document.body.scrollTop) {
				document.body.scrollTop = 0;
			} else {
				document.documentElement.scrollTop = 0;
			}
		}
	}
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'mt-swipe-item',

  mounted: function mounted() {
    this.$parent && this.$parent.swipeItemCreated(this);
  },
  destroyed: function destroyed() {
    this.$parent && this.$parent.swipeItemDestroyed(this);
  }
});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//npm install wind-dom


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'mt-swipe',
  created: function created() {
    this.dragState = {};
  },
  data: function data() {
    return {
      ready: false,
      dragging: false,
      userScrolling: false,
      animating: false,
      index: 0,
      pages: [],
      timer: null,
      reInitTimer: null,
      noDrag: false
    };
  },

  props: {
    speed: {
      type: Number,
      default: 300
    },
    auto: {
      type: Number,
      default: 5000
    },
    continuous: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    noDragWhenSingle: {
      type: Boolean,
      default: true
    },
    prevent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    swipeItemCreated: function swipeItemCreated() {
      var _this = this;

      if (!this.ready) return;
      clearTimeout(this.reInitTimer);
      this.reInitTimer = setTimeout(function () {
        _this.reInitPages();
      }, 100);
    },
    swipeItemDestroyed: function swipeItemDestroyed() {
      var _this2 = this;

      if (!this.ready) return;
      clearTimeout(this.reInitTimer);
      this.reInitTimer = setTimeout(function () {
        _this2.reInitPages();
      }, 100);
    },
    translate: function translate(element, offset, speed, callback) {
      var _this3 = this,
          _arguments = arguments;

      if (speed) {
        this.animating = true;
        element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out';
        setTimeout(function () {
          element.style.webkitTransform = 'translate3d(' + offset + 'px, 0, 0)';
        }, 50);
        var called = false;
        var transitionEndCallback = function transitionEndCallback() {
          if (called) return;
          called = true;
          _this3.animating = false;
          element.style.webkitTransition = '';
          element.style.webkitTransform = '';
          if (callback) {
            callback.apply(_this3, _arguments);
          }
        };
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event__["once"])(element, 'webkitTransitionEnd', transitionEndCallback);
        setTimeout(transitionEndCallback, speed + 100); // webkitTransitionEnd maybe not fire on lower version android.
      } else {
        element.style.webkitTransition = '';
        element.style.webkitTransform = 'translate3d(' + offset + 'px, 0, 0)';
      }
    },
    reInitPages: function reInitPages() {
      var children = this.$children;
      this.noDrag = children.length === 1 && this.noDragWhenSingle;
      var pages = [];
      this.index = 0;
      children.forEach(function (child, index) {
        pages.push(child.$el);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__["removeClass"])(child.$el, 'is-active');
        if (index === 0) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__["addClass"])(child.$el, 'is-active');
        }
      });
      this.pages = pages;
    },
    doAnimate: function doAnimate(towards, options) {
      var _this4 = this;

      if (this.$children.length === 0) return;
      if (!options && this.$children.length < 2) return;
      var prevPage, nextPage, currentPage, pageWidth, offsetLeft;
      var speed = this.speed || 300;
      var index = this.index;
      var pages = this.pages;
      var pageCount = pages.length;
      if (!options) {
        pageWidth = this.$el.clientWidth;
        currentPage = pages[index];
        prevPage = pages[index - 1];
        nextPage = pages[index + 1];
        if (this.continuous && pages.length > 1) {
          if (!prevPage) {
            prevPage = pages[pages.length - 1];
          }
          if (!nextPage) {
            nextPage = pages[0];
          }
        }
        if (prevPage) {
          prevPage.style.display = 'block';
          this.translate(prevPage, -pageWidth);
        }
        if (nextPage) {
          nextPage.style.display = 'block';
          this.translate(nextPage, pageWidth);
        }
      } else {
        prevPage = options.prevPage;
        currentPage = options.currentPage;
        nextPage = options.nextPage;
        pageWidth = options.pageWidth;
        offsetLeft = options.offsetLeft;
      }
      var newIndex;
      var oldPage = this.$children[index].$el;
      if (towards === 'prev') {
        if (index > 0) {
          newIndex = index - 1;
        }
        if (this.continuous && index === 0) {
          newIndex = pageCount - 1;
        }
      } else if (towards === 'next') {
        if (index < pageCount - 1) {
          newIndex = index + 1;
        }
        if (this.continuous && index === pageCount - 1) {
          newIndex = 0;
        }
      }
      var callback = function callback() {
        if (newIndex !== undefined) {
          var newPage = _this4.$children[newIndex].$el;
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__["removeClass"])(oldPage, 'is-active');
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__["addClass"])(newPage, 'is-active');
          _this4.index = newIndex;
        }
        if (prevPage) {
          prevPage.style.display = '';
        }
        if (nextPage) {
          nextPage.style.display = '';
        }
      };
      setTimeout(function () {
        if (towards === 'next') {
          _this4.translate(currentPage, -pageWidth, speed, callback);
          if (nextPage) {
            _this4.translate(nextPage, 0, speed);
          }
        } else if (towards === 'prev') {
          _this4.translate(currentPage, pageWidth, speed, callback);
          if (prevPage) {
            _this4.translate(prevPage, 0, speed);
          }
        } else {
          _this4.translate(currentPage, 0, speed, callback);
          if (typeof offsetLeft !== 'undefined') {
            if (prevPage && offsetLeft > 0) {
              _this4.translate(prevPage, pageWidth * -1, speed);
            }
            if (nextPage && offsetLeft < 0) {
              _this4.translate(nextPage, pageWidth, speed);
            }
          } else {
            if (prevPage) {
              _this4.translate(prevPage, pageWidth * -1, speed);
            }
            if (nextPage) {
              _this4.translate(nextPage, pageWidth, speed);
            }
          }
        }
      }, 10);
    },
    next: function next() {
      this.doAnimate('next');
    },
    prev: function prev() {
      this.doAnimate('prev');
    },
    doOnTouchStart: function doOnTouchStart(event) {
      if (this.noDrag) return;
      var element = this.$el;
      var dragState = this.dragState;
      var touch = event.touches[0];
      dragState.startTime = new Date();
      dragState.startLeft = touch.pageX;
      dragState.startTop = touch.pageY;
      dragState.startTopAbsolute = touch.clientY;
      dragState.pageWidth = element.offsetWidth;
      dragState.pageHeight = element.offsetHeight;
      var prevPage = this.$children[this.index - 1];
      var dragPage = this.$children[this.index];
      var nextPage = this.$children[this.index + 1];
      if (this.continuous && this.pages.length > 1) {
        if (!prevPage) {
          prevPage = this.$children[this.$children.length - 1];
        }
        if (!nextPage) {
          nextPage = this.$children[0];
        }
      }
      dragState.prevPage = prevPage ? prevPage.$el : null;
      dragState.dragPage = dragPage ? dragPage.$el : null;
      dragState.nextPage = nextPage ? nextPage.$el : null;
      if (dragState.prevPage) {
        dragState.prevPage.style.display = 'block';
      }
      if (dragState.nextPage) {
        dragState.nextPage.style.display = 'block';
      }
    },
    doOnTouchMove: function doOnTouchMove(event) {
      if (this.noDrag) return;
      var dragState = this.dragState;
      var touch = event.touches[0];
      dragState.currentLeft = touch.pageX;
      dragState.currentTop = touch.pageY;
      dragState.currentTopAbsolute = touch.clientY;
      var offsetLeft = dragState.currentLeft - dragState.startLeft;
      var offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;
      var distanceX = Math.abs(offsetLeft);
      var distanceY = Math.abs(offsetTop);
      if (distanceX < 5 || distanceX >= 5 && distanceY >= 1.73 * distanceX) {
        this.userScrolling = true;
        return;
      } else {
        this.userScrolling = false;
        event.preventDefault();
      }
      offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1);
      var towards = offsetLeft < 0 ? 'next' : 'prev';
      if (dragState.prevPage && towards === 'prev') {
        this.translate(dragState.prevPage, offsetLeft - dragState.pageWidth);
      }
      this.translate(dragState.dragPage, offsetLeft);
      if (dragState.nextPage && towards === 'next') {
        this.translate(dragState.nextPage, offsetLeft + dragState.pageWidth);
      }
    },
    doOnTouchEnd: function doOnTouchEnd() {
      if (this.noDrag) return;
      var dragState = this.dragState;
      var dragDuration = new Date() - dragState.startTime;
      var towards = null;
      var offsetLeft = dragState.currentLeft - dragState.startLeft;
      var offsetTop = dragState.currentTop - dragState.startTop;
      var pageWidth = dragState.pageWidth;
      var index = this.index;
      var pageCount = this.pages.length;
      if (dragDuration < 300) {
        var fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5;
        if (isNaN(offsetLeft) || isNaN(offsetTop)) {
          fireTap = true;
        }
        if (fireTap) {
          this.$children[this.index].$emit('tap');
        }
      }
      if (dragDuration < 300 && dragState.currentLeft === undefined) return;
      if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
        towards = offsetLeft < 0 ? 'next' : 'prev';
      }
      if (!this.continuous) {
        if (index === 0 && towards === 'prev' || index === pageCount - 1 && towards === 'next') {
          towards = null;
        }
      }
      if (this.$children.length < 2) {
        towards = null;
      }
      this.doAnimate(towards, {
        offsetLeft: offsetLeft,
        pageWidth: dragState.pageWidth,
        prevPage: dragState.prevPage,
        currentPage: dragState.dragPage,
        nextPage: dragState.nextPage
      });
      this.dragState = {};
    }
  },
  destroyed: function destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.reInitTimer) {
      clearTimeout(this.reInitTimer);
      this.reInitTimer = null;
    }
  },
  mounted: function mounted() {
    var _this5 = this;

    this.ready = true;
    if (this.auto > 0) {
      this.timer = setInterval(function () {
        if (!_this5.dragging && !_this5.animating) {
          _this5.next();
        }
      }, this.auto);
    }
    this.reInitPages();
    var element = this.$el;
    element.addEventListener('touchstart', function (event) {
      if (_this5.prevent) {
        event.preventDefault();
      }
      if (_this5.animating) return;
      _this5.dragging = true;
      _this5.userScrolling = false;
      _this5.doOnTouchStart(event);
    });
    element.addEventListener('touchmove', function (event) {
      if (!_this5.dragging) return;
      _this5.doOnTouchMove(event);
    });
    element.addEventListener('touchend', function (event) {
      if (_this5.userScrolling) {
        _this5.dragging = false;
        _this5.dragState = {};
        return;
      }
      if (!_this5.dragging) return;
      _this5.doOnTouchEnd(event);
      _this5.dragging = false;
    });
  }
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		idx: { default: ""
			// text: {
			// 	default: ""
			// }
		} },
	data: function data() {
		return {
			cur: false,
			fixed: ''
		};
	},

	components: {},
	mounted: function mounted() {},

	methods: {}

});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slide_VIscroll_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


//	import slide from "http://res.suning.cn/public/v5/mod/iscroll-lite/5.1.3/iscroll-lite.js";

//	引入插件，已经安装或者本地文件都行

//	import VIscroll from "viscroll";
//	引入外部插件时,需要使用use注册插件，默认参数
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1__slide_VIscroll_js__["a" /* default */], {
	mouseWheel: true,
	scrollX: true,
	scrollY: false,
	click: false,
	preventDefault: true,
	tap: false,
	bounce: false,
	disableTouch: true
});

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		tablist: {
			type: Array,
			default: function _default() {
				return [];
			}
		},
		opts: {
			type: Object,
			default: function _default() {
				return {
					scrollX: true,
					scrollY: false,
					click: false,
					useTransform: true,
					preventDefaultException: {
						tagName: /.*/
					},
					eventpassthrough: true
				};
			}
		}
	},
	data: function data() {
		return {
			oldIndex: 0,
			newIndex: 0,
			fixed: ''
		};
	},

	components: {
		// 'sn-list': require('./sn-list.vue')
	},
	mounted: function mounted() {
		this.initTab();
		this.eventsListen();
		this.pageScroll();
	},

	methods: {
		/**
   * 初始化选中第一个tab
   */
		initTab: function initTab() {
			var self = this,
			    ele = this.$el;

			//初始化选中
			var index = self.oldIndex,
			    vueDom = self.$children[index];

			//为什么要加上setTimeout？	
			//因为viscroll有setTimeout
			setTimeout(function () {
				vueDom.cur = true;
				self.scrollToTab(index, vueDom);

				//向父组件传递数据
				self.$emit('tabChange', {
					'index': index,
					'id': vueDom.$el.getAttribute("idx")
				});
			}, 150);
		},


		/**
   * 切换tab
   */
		eventsListen: function eventsListen() {
			var self = this,
			    ele = this.$el;

			//监听选中事件
			ele.addEventListener("click", function (event) {
				var newIndex = event.target.getAttribute("idx"),
				    newDom = self.$children[newIndex];

				self.$children[self.oldIndex].cur = false;
				newDom.cur = true;

				self.oldIndex = newIndex;

				//滑动tab
				self.scrollToTab(newIndex, newDom);

				//向父组件传递数据
				self.$emit('tabChange', {
					'index': newIndex,
					'id': newDom.$el.getAttribute("idx")
				});
			});
		},


		/**
   * 滑动tab效果
   */
		scrollToTab: function scrollToTab(index, vueDom) {

			//滚动效果
			var tab_w = this.$refs.tab.getBoundingClientRect().width,
			    //获取元素的宽度
			half_w = tab_w / 2 - 15;
			var scroll = this.$refs.tab.scroll;
			var max_x = scroll ? scroll.maxScrollX : 0;

			//点击滚动距离
			if (scroll) {
				var left = vueDom.$el.offsetLeft;

				var _moveX = 0;
				if (max_x + left - half_w < 0) {
					if (left > half_w) {
						_moveX = half_w - left;
					}
				} else {
					_moveX = max_x;
				}

				setTimeout(function () {
					scroll.scrollTo(_moveX, 0, 400);
				}, 180);
			}
		},


		/**
   * 安卓和浏览器sticky效果
   */
		pageScroll: function pageScroll() {

			var self = this;
			var clipTab = self.$refs.clipTab;

			window.addEventListener("scroll", myScroll);
			window.addEventListener("touchmove", myScroll);
			window.addEventListener("mousewheel", myScroll, false);

			function myScroll() {
				if ("undefied" != typeof clipTab) {
					var top = clipTab.getBoundingClientRect().top;
					self.fixed = top <= 0 ? 'fixed' : '';
				}
			}
		}
	}

});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(7);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 44 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 46 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 47 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 48 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 49 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 50 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 51 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 52 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 53 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 54 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 55 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 56 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 57 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 58 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 59 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 60 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 61 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 62 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 63 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 64 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(64)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(109),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(55)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(100),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(54)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(99),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(49)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(94),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(56)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(101),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(60)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(105),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(53)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(98),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(57)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(102),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(47)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(92),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(48)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(93),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(63)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(108),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(46)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(30),
  /* template */
  __webpack_require__(91),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(50)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(95),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(43)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(32),
  /* template */
  __webpack_require__(88),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(62)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(33),
  /* template */
  __webpack_require__(107),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(41)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(86),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(45)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(90),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(51)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(96),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(52)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(97),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(61)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(106),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(58)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(39),
  /* template */
  __webpack_require__(103),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "clip"
  }, [_c('div', {
    class: [_vm.fixed, 'tab', 'scroller-box', 'sticky'],
    staticStyle: {
      "position": "static"
    }
  }, [_c('div', {
    directives: [{
      name: "iscroll",
      rawName: "v-iscroll",
      value: (_vm.opts),
      expression: "opts"
    }],
    ref: "tab",
    staticClass: "app-scroller"
  }, [_c('div', {
    staticClass: "scroller-items hor-view"
  }, _vm._l((_vm.tablist), function(tab, idx) {
    return _c('a', {
      key: idx,
      ref: 'tab' + idx,
      refInFor: true,
      class: ['item', _vm.tabIndex == idx ? 'cur' : ''],
      attrs: {
        "id": tab.id,
        "name": "tab.trickPoint"
      },
      on: {
        "click": function($event) {
          _vm.scrollToTab(idx, tab.id)
        }
      }
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(tab.name) + "\n\t\t\t\t")])
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "cate"
  }, _vm._l((_vm.tablist), function(tab, idx) {
    return _c('div', {
      key: idx,
      class: ['cate-box', _vm.tabIndex == idx ? '' : 'hide'],
      attrs: {
        "cate-id": tab.id
      }
    }, [_c('sn-list')], 1)
  }))])
},staticRenderFns: []}

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('ul', {
    staticClass: "sn-list-common"
  }, _vm._l((_vm.list), function(content, idx) {
    return _c('li', {
      key: idx
    }, [_c('div', {
      staticClass: "wbox-flex"
    }, [_c('div', {
      staticClass: "wbox pro-list"
    }, [_c('div', {
      staticClass: "pro-img"
    }, [_c('img', {
      attrs: {
        "src": content.hgContent.smallImageUrl,
        "alt": ""
      }
    })]), _vm._v(" "), _vm._m(0, true)])])])
  })), _vm._v(" "), _c('sn-loading', {
    attrs: {
      "status": _vm.loadStatus
    },
    on: {
      "onscroll": _vm.onScroll
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pro-info wbox-flex"
  }, [_c('div', {
    staticClass: "pro-name"
  }, [_vm._v("苹果 手机 iPhone5S (16GB) (金)移动版苹果首款 4G移动版手机，支持TD-LTE 4G网络，带你全速进入4G时代！完美机身，引领潮流！苏宁同步首发！！！")]), _vm._v(" "), _c('div', {
    staticClass: "snPrice"
  }, [_vm._v("¥4899.00")]), _vm._v(" "), _c('div', {
    staticClass: "list-opra sn-txt-muted"
  }, [_vm._v("数量：12")])])
}]}

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "scroller-box sticky",
    staticStyle: {
      "position": "static"
    }
  }, [_c('div', {
    directives: [{
      name: "iscroll",
      rawName: "v-iscroll",
      value: (_vm.opts),
      expression: "opts"
    }],
    ref: "tab",
    staticClass: "app-scroller"
  }, [_c('div', {
    staticClass: "scroller-items hor-view"
  }, _vm._l((_vm.list), function(item, idx) {
    return _c('a', {
      key: idx,
      ref: 'item' + idx,
      refInFor: true,
      staticClass: "scroller-item",
      attrs: {
        "name": "item.trickPoint"
      }
    }, [_c('img', {
      attrs: {
        "src": item.url
      }
    })])
  }))])])
},staticRenderFns: []}

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('ul', {
    staticClass: "router"
  }, [_c('li', [_c('router-link', {
    attrs: {
      "to": "/mods"
    }
  }, [_vm._v("跳转到基础组件示例")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/base"
    }
  }, [_vm._v("跳转到基础功能示例")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/swipe"
    }
  }, [_vm._v("跳转到联版/滑动广告")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/tab"
    }
  }, [_vm._v("跳转到tab组件示例（点击切换）")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/scroll"
    }
  }, [_vm._v("跳转到scroll-tab示例（滑动切换）")])], 1)]), _vm._v(" "), _c('p', {
    staticStyle: {
      "margin": ".4rem"
    }
  }, [_vm._v("----------------这里是分割线，下面是路由视图----------------")]), _vm._v(" "), _c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['top', _vm.hide],
    attrs: {
      "id": "Top"
    },
    on: {
      "click": _vm.scrollToTop
    }
  })
},staticRenderFns: []}

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "dom",
    class: ['loadmore', 'sn-loading-type', _vm.status],
    staticStyle: {
      "display": "block",
      "transform-origin": "0px 0px 0px",
      "opacity": "1",
      "transform": "scale(1, 1)"
    }
  }, [_vm._m(0), _vm._v(" "), _vm._m(1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "end sn-end-loading"
  }, [_c('span', [_vm._v("DUANG~到底了")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "loading sn-local-loading"
  }, [_c('span', {
    staticClass: "shape"
  }), _c('span', [_vm._v("努力加载中...")])])
}]}

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "clipTab",
    staticClass: "scroller-tab"
  }, [_c('div', {
    class: [_vm.fixed, 'tab', 'scroller-box', 'sticky'],
    staticStyle: {
      "position": "static"
    }
  }, [_c('div', {
    directives: [{
      name: "iscroll",
      rawName: "v-iscroll",
      value: (_vm.opts),
      expression: "opts"
    }],
    ref: "tab",
    staticClass: "app-scroller"
  }, [_c('div', {
    staticClass: "scroller-items hor-view"
  }, [_vm._t("default")], 2)])])])
},staticRenderFns: []}

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "bannerSlider",
    staticClass: "banner-slider",
    attrs: {
      "data-spm": "topslide"
    }
  }, [_c('div', {
    staticClass: "head-wrapper"
  }, _vm._l((_vm.list), function(value, index) {
    return _c('div', {
      key: index,
      staticClass: "item-desc",
      style: (_vm.curIndex == index ? 'opacity:1' : 'opacity:0')
    }, [_vm._v("\n                " + _vm._s(value.title) + "\n            ")])
  })), _vm._v(" "), _c('div', {
    staticClass: "back-wrapper"
  }, _vm._l((_vm.list), function(value, index) {
    return _c('div', {
      key: index,
      staticClass: "back-image",
      style: (_vm.curIndex == index ? 'opacity:1' : 'opacity:0')
    }, [_c('img', {
      attrs: {
        "src": value.bgImg,
        "alt": ""
      }
    })])
  })), _vm._v(" "), _c('div', {
    staticClass: "slider-wrapper"
  }, _vm._l((_vm.list), function(value, index) {
    return _c('a', {
      key: index,
      staticClass: "item-wrapper img-transition transparent",
      style: (value.cssStr),
      attrs: {
        "target": "_blank",
        "data-spm": "d0",
        "data-itemid": "533821150249"
      }
    }, [_c('section', {
      staticClass: "item"
    }, [_c('div', {
      staticClass: "img-wrapper"
    }, [_c('img', {
      attrs: {
        "src": value.imgUrl,
        "alt": value.txt
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "item-txt"
    }, [_vm._v(_vm._s(value.txt))])])])
  })), _vm._v(" "), _c('div', {
    staticClass: "slider-nav"
  }, _vm._l((_vm.list), function(value, index) {
    return _c('i', {
      key: index,
      class: _vm.curIndex == index ? 'current' : '',
      attrs: {
        "data-index": "0",
        "data-date": "8.24"
      }
    })
  })), _vm._v(" "), _c('div', {
    staticClass: "arrow-wrap"
  }, [_c('div', {
    staticClass: "pre",
    on: {
      "click": _vm.goPrev
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "next",
    on: {
      "click": _vm.goNext
    }
  })])])
},staticRenderFns: []}

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "father-mod"
  }, [_c('p', {
    staticClass: "info"
  }, [_vm._v("滑动切换tab组件，tab和tab-item分开用")]), _vm._v(" "), _c('scroll-tab', {
    ref: "scrollTab",
    on: {
      "scrollChange": _vm.scrollChange
    }
  }, _vm._l((_vm.tabList), function(tab, idx) {
    return _c('scroll-item', {
      key: idx,
      attrs: {
        "idx": idx
      }
    }, [_vm._v("\n\t\t\t" + _vm._s(tab.name) + "\n\t\t")])
  })), _vm._v(" "), _c('div', {
    staticClass: "cate"
  }, _vm._l((_vm.tabList), function(tab, idx) {
    return _c('div', {
      key: idx,
      ref: 'cate' + idx,
      refInFor: true,
      staticClass: "cate-box",
      attrs: {
        "cate-id": tab.id,
        "offsetTop": tab.offsetTop
      }
    }, [_c('sn-list')], 1)
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sn-nav sn-block"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "sn-nav-title of"
  }, [_vm._v(_vm._s(_vm.navTitle))]), _vm._v(" "), _c('div', {
    staticClass: "sn-nav-right tr pr"
  }, [_c('img', {
    staticStyle: {
      "width": "1rem"
    },
    attrs: {
      "src": "http://sale.suning.com/images/advertise/cdn/images/more.png"
    },
    on: {
      "click": _vm.showList
    }
  }), _vm._v(" "), (_vm.showUlList) ? _c('ul', {
    staticClass: "nav-more-list",
    staticStyle: {
      "transform-origin": "0px 0px 0px",
      "opacity": "1",
      "transform": "scale(1, 1)",
      "display": "block"
    },
    attrs: {
      "id": "sub-title"
    }
  }, [_vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3), _vm._v(" "), _vm._m(4), _vm._v(" "), _vm._m(5)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "screenIfm",
    staticStyle: {
      "transform-origin": "0px 0px 0px",
      "opacity": "1",
      "transform": "scale(1, 1)",
      "display": "none"
    },
    attrs: {
      "id": "screenIfmNav"
    },
    on: {
      "click": function($event) {}
    }
  })])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sn-nav-back"
  }, [_c('a', {
    staticClass: "sn-iconbtn",
    attrs: {
      "href": "javascript:history.back(-1)"
    }
  }, [_vm._v("返回")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('a', {
    staticClass: "nav-more-icon home-icon",
    attrs: {
      "href": "//m.suning.com"
    }
  }, [_vm._v("首页")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('a', {
    staticClass: "nav-more-icon cart-icon",
    attrs: {
      "href": "//shopping.suning.com/project/cart/cart1.html"
    }
  }, [_vm._v("购物车")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('a', {
    staticClass: "nav-more-icon search-icon",
    attrs: {
      "href": "//m.suning.com/list/list.html"
    }
  }, [_vm._v("全部分类")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('a', {
    staticClass: "nav-more-icon cate-icon",
    attrs: {
      "href": "//m.suning.com/search.html"
    }
  }, [_vm._v("搜索")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('a', {
    staticClass: "nav-more-icon ebuy-icon",
    attrs: {
      "href": "//my.suning.com/wap/home.do"
    }
  }, [_vm._v("我的易购")])])
}]}

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-swipe-item"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-swipe"
  }, [_c('div', {
    ref: "wrap",
    staticClass: "mint-swipe-items-wrap"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showIndicators),
      expression: "showIndicators"
    }],
    staticClass: "mint-swipe-indicators"
  }, _vm._l((_vm.pages), function(page, $index) {
    return _c('div', {
      key: $index,
      staticClass: "mint-swipe-indicator",
      class: {
        'is-active': $index === _vm.index
      }
    })
  }))])
},staticRenderFns: []}

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "father-mod"
  }, [_c('p', {
    staticClass: "info"
  }, [_vm._v("导航标题")]), _vm._v(" "), _c('sn-nav', {
    attrs: {
      "title": "导航标题"
    }
  }), _vm._v(" "), _c('sn-top'), _vm._v(" "), _c('p', {
    staticClass: "info"
  }, [_vm._v("倒计时")]), _vm._v(" "), _c('sn-count', {
    attrs: {
      "now": "1408060860000",
      "start": "1408060860000",
      "end": "1408060870000",
      "beforeStart": _vm.beforeStart
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "info"
  }, [_vm._v("滑动tab")]), _vm._v(" "), _c('sn-tab', {
    attrs: {
      "tablist": _vm.tabList,
      "opts": _vm.tabOpts
    },
    on: {
      "tabChange": _vm.tabChange
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "info"
  }, [_vm._v("列表数据")]), _vm._v(" "), _c('sn-list'), _vm._v(" "), _c('p', {
    staticClass: "info"
  }, [_c('a', {
    staticClass: "sn-btn sn-btn-positive sn-btn-big sn-btn-block mt10",
    attrs: {
      "id": "mini"
    },
    on: {
      "click": _vm.alertMini
    }
  }, [_vm._v("小弹窗 toast")]), _vm._v(" "), _c('a', {
    staticClass: "sn-btn sn-btn-positive sn-btn-big sn-btn-block mt10",
    attrs: {
      "id": "doubleBtn"
    },
    on: {
      "click": _vm.alertBtns
    }
  }, [_vm._v("双按钮弹窗")]), _vm._v(" "), _c('a', {
    staticClass: "sn-btn sn-btn-positive sn-btn-big sn-btn-block mt10",
    attrs: {
      "id": "onceCancel"
    },
    on: {
      "click": _vm.alertCancel
    }
  }, [_vm._v("只有取消按钮")]), _vm._v(" "), _c('a', {
    staticClass: "sn-btn sn-btn-positive sn-btn-big sn-btn-block mt10",
    attrs: {
      "id": "onceConfirm"
    },
    on: {
      "click": _vm.alertConfirm
    }
  }, [_vm._v("只有确认按钮")]), _vm._v(" "), _c('a', {
    staticClass: "sn-btn sn-btn-positive sn-btn-big sn-btn-block mt10",
    attrs: {
      "id": "fixed"
    },
    on: {
      "click": _vm.alertFixed
    }
  }, [_vm._v("弹窗 fixed")])]), _vm._v(" "), _c('p', {
    staticClass: "info"
  }, [_vm._v("列表分页加载")]), _vm._v(" "), _c('sn-lists')], 1)
},staticRenderFns: []}

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('a', [_vm._v(_vm._s(_vm.modData))]), _vm._v(" "), _c('br'), _vm._v(" "), _c('a', [_vm._v(_vm._s(_vm.mod2Txt))])])
},staticRenderFns: []}

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mod1"
  }, [_vm._v("\n    " + _vm._s(_vm.mod1Txt) + "\n")])
},staticRenderFns: []}

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "father-mod"
  }, [_c('p', {
    staticClass: "info"
  }, [_vm._v("横向滚动广告")]), _vm._v(" "), _c('sn-slip', {
    attrs: {
      "list": _vm.slipList
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "info"
  }, [_vm._v("滑动联版广告")]), _vm._v(" "), _c('sn-swipe', {
    attrs: {
      "list": _vm.swipeList
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "info",
    attrs: {
      "timer": "10000"
    }
  }, [_vm._v("滑动联版广告")]), _vm._v(" "), _c('sn-banner')], 1)
},staticRenderFns: []}

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    class: ['item', _vm.cur ? 'cur' : ''],
    attrs: {
      "idx": _vm.idx
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "clipTab"
  }, [_c('div', {
    class: [_vm.fixed, 'tab', 'scroller-box', 'sticky'],
    staticStyle: {
      "position": "static"
    }
  }, [_c('div', {
    directives: [{
      name: "iscroll",
      rawName: "v-iscroll",
      value: (_vm.opts),
      expression: "opts"
    }],
    ref: "tab",
    staticClass: "app-scroller"
  }, [_c('div', {
    staticClass: "scroller-items hor-view"
  }, [_vm._t("default")], 2)])])])
},staticRenderFns: []}

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('ul', {
    staticClass: "sn-list-common"
  }, _vm._l((_vm.list), function(content, idx) {
    return _c('li', {
      key: idx
    }, [_c('div', {
      staticClass: "wbox-flex"
    }, [_c('div', {
      staticClass: "wbox pro-list"
    }, [_c('div', {
      staticClass: "pro-img"
    }, [_c('img', {
      attrs: {
        "src": content.imgUrl,
        "alt": ""
      }
    })]), _vm._v(" "), _vm._m(0, true)])])])
  }))])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pro-info wbox-flex"
  }, [_c('div', {
    staticClass: "pro-name"
  }, [_vm._v("苹果 手机 iPhone5S (16GB) (金)移动版苹果首款 4G移动版手机，支持TD-LTE 4G网络，带你全速进入4G时代！完美机身，引领潮流！苏宁同步首发！！！")]), _vm._v(" "), _c('div', {
    staticClass: "snPrice"
  }, [_vm._v("¥4899.00")]), _vm._v(" "), _c('div', {
    staticClass: "list-opra sn-txt-muted"
  }, [_vm._v("数量：12")])])
}]}

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "father-mod"
  }, [_c('p', {
    staticClass: "info"
  }, [_vm._v("tab组件，tab和tab-item分开用")]), _vm._v(" "), _c('tab', {
    on: {
      "tabChange": _vm.tabChange
    }
  }, _vm._l((_vm.tabList), function(tab, idx) {
    return _c('tab-item', {
      key: idx,
      attrs: {
        "idx": idx
      }
    }, [_vm._v("\n\t\t\t" + _vm._s(tab.name) + "\n\t\t")])
  })), _vm._v(" "), _c('div', {
    staticClass: "cate"
  }, _vm._l((_vm.tabList), function(tab, idx) {
    return _c('div', {
      key: idx,
      class: ['cate-box', _vm.tabIndex == idx ? '' : 'hide'],
      attrs: {
        "cate-id": tab.id
      }
    }, [_c('sn-list')], 1)
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    class: ['item', _vm.cur ? 'cur' : ''],
    attrs: {
      "idx": _vm.idx
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('swipe', {
    staticClass: "my-swipe",
    attrs: {
      "speed": _vm.opts.speed,
      "auto": _vm.opts.auto,
      "continuous": _vm.opts.continuous,
      "showIndicators": _vm.opts.showIndicators,
      "noDragWhenSingle": _vm.opts.noDragWhenSingle,
      "prevent": _vm.opts.prevent
    }
  }, _vm._l((_vm.list), function(item, idx) {
    return _c('swipe-item', {
      key: idx,
      staticClass: "slide"
    }, [_c('a', {
      attrs: {
        "href": "#"
      }
    }, [_c('img', {
      staticClass: "swipe-img",
      attrs: {
        "src": item.url
      }
    })])])
  }))
},staticRenderFns: []}

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('h2', {
    ref: "count-down"
  }, [_c('span', {
    staticClass: "day-node sn-tag sn-tag-d"
  }, [_vm._v(_vm._s(_vm.dayStr))]), _vm._v(" "), _c('span', {
    staticClass: "hour-node sn-tag sn-tag-d"
  }, [_vm._v(_vm._s(_vm.hourStr))]), _vm._v(" "), _c('span', {
    staticClass: "minute-node sn-tag sn-tag-d"
  }, [_vm._v(_vm._s(_vm.minuteStr))]), _vm._v(" "), _c('span', {
    staticClass: "second-node sn-tag sn-tag-d"
  }, [_vm._v(_vm._s(_vm.secStr))])])])
},staticRenderFns: []}

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w"
  }, [_c('p', {
    staticClass: "info"
  }, [_vm._v("页面埋点，点击埋点")]), _vm._v(" "), _c('div', {
    staticClass: "demo",
    on: {
      "click": _vm.saClick
    }
  }, [_vm._v("\n\t\t点击埋点\n\t")]), _vm._v(" "), _c('p', {
    staticClass: "info"
  }, [_vm._v("登陆信息")]), _vm._v(" "), _c('p', {
    staticClass: "info"
  }, [_vm._v("除了组件：大部分根weex的调用方法基本一致")])])
},staticRenderFns: []}

/***/ }),
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
],[40]);
//# sourceMappingURL=app.6e9e416ce6b3fccebe85.js.map