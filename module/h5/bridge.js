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
