import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

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

		Vue.http({
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
export var fetch = common.fetch;
export var setCookie = common.setCookie;
export var getCookie = common.getCookie;
