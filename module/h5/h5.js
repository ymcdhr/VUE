let base = require('../base.js')
let b = require('./bridge.js')
let com = require('../common.js')
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