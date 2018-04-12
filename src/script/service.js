let service = {
    /**
     * [promise 简易语法糖]
     * @param  {[type]} Constructor_Promise [description]
     * @return {[type]}                     [description]
     */
    // promise: function(Constructor_Promise) {
    //     var p = null
    //     var q = {}
    //     if (!Constructor_Promise) {
    //         p = new Promise(function (resolve, reject) {
    //             q.resolve = resolve
    //             q.reject = reject
    //         })
    //         p.resolve = q.resolve
    //         p.reject = q.reject
    //         return p
    //     } else {
    //         return Promise
    //     }
    // },

    cookie(key, value, attributes) {
        // [js-cookie/js-cookie: A simple, lightweight JavaScript API for handling browser cookies](https://github.com/js-cookie/js-cookie)
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
    },

    /**
     * 还要考虑localStorage和JSON不兼容的情况
     */
    storage: {
        set: function(key,value){
            localStorage.setItem(key,value);
        },
        get: function(key){
            return localStorage.getItem(key);
        },

        setSearch: function(value,len){
            let str = this.get('searchHistory') || "[]",
                arr = JSON.parse(str);

            let item = service.getArrayItem(arr,"name",value);

            if(!item && value){
                if(arr.length < (len || 10)){
                    // 没有重复且长度小于10
                }
                else{
                    arr.shift();
                }
                arr.push({
                    name: value
                });
            }

            let newStr = JSON.stringify(arr);
            this.set('searchHistory',newStr);
        },
        getSearch: function(){
            let str = this.get('searchHistory') || "[]",
                arr = JSON.parse(str);

            return arr;
        }
    },

    getArrayItem: function(arr,pro,val){
        
        for(var i=0;i<arr.length;i++){
            if(arr[i][pro] === val){
                return arr[i];
            }
        }

        return false;
    }
};

exports.service = service;
// export var s = service;