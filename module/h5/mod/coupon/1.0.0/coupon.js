;
(function(M, W) {

	var stream = weex.requireModule('stream');

    function ajaxCrossDomain(url, param, success, error, config) {
        if (typeof config == 'undefined') {
            if (typeof passport_config != 'undefined') {
                config = passport_config;
            } else {
                console.log('You must define passport_config var.');
                return;
            }
        }
        var split = "?"
        if(url.indexOf('?') > -1){
        	split = "&"
        }

        stream.fetch({
            url: url + split + (param == null ? "crossDomainJsonpRequest=true" : param +
                "&crossDomainJsonpRequest=true"),
            type: 'jsonp'
        }, function(result) {
        	if (result.authStatusResponse) {
                var requestAgain = function() {
                    ajaxCrossDomain(url, param, success, error, config);
                };
                if (result.hasLogin) {
                    requestAgain();
                }
                return;
            }
            success(result);
        }, error, config);

    }
    var receiveParamObj = receiveParamObj || {};
    var coupon = coupon || {};
    /**
     * 领券模块
     * 参数格式：
     * 
     */
    coupon.receive = (function() {
        /**
         * 通用样式领券
         * @param paramObj 结构化参数对象
         * {
         *   "actId" : "活动编码",
         *   "actKey" : "活动秘钥",
         *   "cityId" : "LES城市编码",
         *   "sourceId" : "领券来源ID：1001领券中心PC 1002领券中心WAP 2001四级页PC 2002四级页APP 2003四级页WAP 3001我的易购PC 4001我的优惠券PC 5001店铺页PC 5002店铺页WAP 5003店铺页面APP 6001静态页PC 6002静态页WAP 7003新人-四级页APP"
         * }
         * @param callback 回调函数，用于处理领券后的接口结果处理
         * 
         * 返回参数
         * {
         *   "resultCode" : "错误编码，0：领券成功，其他：领券失败",
         *   "resultMsg" : "错误提示语"
         * }
         */
        var receiveCoupon = function(paramObj, callback) {
            //基本信息暂存到全局变量
            receiveParamObj.actId = paramObj.actId;
            receiveParamObj.actKey = paramObj.actKey;
            receiveParamObj.cityId = paramObj.cityId;
            receiveParamObj.sourceId = paramObj.sourceId;
            receiveParamObj.base = paramObj.base;
            receiveParamObj.callback = callback;
            //领券
            coupon.receive.receiveCouponAjax(paramObj, callback, true);


            


        };
        /**
         * 只调接口不给样式弹框
         * @param paramObj 结构化参数对象
         * {
         *   "actId" : "活动编码",
         *   "actKey" : "活动秘钥",
         *   "cityId" : "LES城市编码",
         *   "validateCode" : "验证码值",
         *   "uuid" : "图形验证码uuid",
         *   "sourceId" : "领券来源ID：1001领券中心PC 1002领券中心WAP 2001四级页PC 2002四级页APP 2003四级页WAP 3001我的易购PC 4001我的优惠券PC 5001店铺页PC 5002店铺页WAP 5003店铺页面APP 6001静态页PC 6002静态页WAP 7003新人-四级页APP"
         * }
         * @param callback 回调函数，用于处理领券后的接口结果处理
         * 
         * 返回参数
         * {
         *   "resultCode" : "错误编码，0：领券成功，1001 1002(需要滑动验证)，1003 1004(需要图形验证)，2004 2005 2006(需要短信验证)，其他：领券失败",
         *   "resultMsg" : "错误提示语",
         *   "uuid" : "图形验证码uuid",
         *   "sceneId" : "图形验证码场景id"
         * }
         */
        var receiveCouponV2 = function(paramObj, callback) {
            //领券
            coupon.receive.receiveCouponAjax(paramObj, callback, false);
        };
        /**
         * 领券接口调用
         * @param paramObj 领券入参 
         * @param callback 回调函数
         * @param needAlert 是否需要默认样式弹框
         */
        var receiveCouponAjax = function(paramObj, callback, needAlert) {
            if (typeof(callback) != "function") {
                alert("未传入参数：回调函数callback！");
                return;
            }
            var targetUrl = "//quan.suning.com/lqzx_rsf.do?callback=?";
            paramObj.detect = encodeURIComponent(bd.rst()); //人机标识
            paramObj.deviceToken = bd.ptoken();
            paramObj.channel = "5";
            // 换用passport封装的跨域访问API
            if (needAlert) {
                ajaxCrossDomain(targetUrl, paramObj.base.serialize(paramObj), function(data) {
                    couponSuccessCallBack(data, callback);
                }, function() {
                    couponFailCallBack(callback);
                }, coupon.common.passport_config);
            } else {
                ajaxCrossDomain(targetUrl, paramObj.base.serialize(paramObj), function(data) {
                    couponSuccessCallBackV2(data, callback);
                }, function() {
                    couponFailCallBackV2(callback);
                }, coupon.common.passport_config);
            }
        };
        /**
         * 默认弹框样式领券调用成功回调函数
         * @param respData 响应结果
         * @param callerCallBack 调用方回调函数
         */
        var couponSuccessCallBack = function(respData, callerCallBack) {
            if (respData.resultCode == "0") {
                // 执行回调函数，由调用方处理响应结果
                callerCallBack(respData);
                resultAlert("恭喜你，领券成功啦！");
            } else {
                if (respData.resultCode == '1001' || respData.resultCode == '1002') { //滑动验证码
                    coupon.sillerCode.sillerAlertBox(respData);
                } else if (respData.resultCode == '1003' || respData.resultCode == '1004') { //图形验证码
                    coupon.imageCode.imageAlertBox(respData);
                } else if (respData.resultCode == '2004' || respData.resultCode == '2005' || respData.resultCode == '2006') { //短信验证码
                    coupon.sms.smsAlertBox(respData);
                } else {
                    resultAlert(respData.resultMsg);
                    callerCallBack(respData);
                }
            }
        };
        /**
         * 默认弹框样式领券调用失败回调函数
         * @param callerCallBack 调用方回调函数
         */
        var couponFailCallBack = function(callerCallBack) {
            var respData = {};
            respData.resultCode = "C0000";
            respData.resultMsg = "当前网络异常，请稍后再试（C0000）";
            // 执行回调函数，由调用方处理响应结果
            callerCallBack(respData);
        };
        /**
         * 默认弹框样式领券调用成功回调函数
         * @param respData 响应结果
         * @param callerCallBack 调用方回调函数
         */
        var couponSuccessCallBackV2 = function(respData, callerCallBack) {
            callerCallBack(respData);
        };
        /**
         * 默认弹框样式领券调用失败回调函数
         * @param callerCallBack 调用方回调函数
         */
        var couponFailCallBackV2 = function(callerCallBack) {
            var respData = {};
            respData.resultCode = "C0000";
            respData.resultMsg = "当前网络异常，请稍后再试（C0000）";
            // 执行回调函数，由调用方处理响应结果
            callerCallBack(respData);
        };
        /**
         * 错误提示弹框
         * @param message 错误提示语
         */
        var resultAlert = function(message) {
            Wap.AlertBox({
                type: "mini",
                msg: message,
                callback: function() {}
            });
        };
        /**
         * API暴露返回
         */
        return {
            receiveCoupon: receiveCoupon,
            receiveCouponV2: receiveCouponV2,
            receiveCouponAjax: receiveCouponAjax
        };
    })();
    /**
     * 图形验证码
     */
    coupon.imageCode = (function() {
        var uuid = "";
        var sceneId = "";
        /**
         * 弹框图形验证码
         */
        var imageAlertBox = function(respData) {
            uuid = respData.uuid;
            sceneId = respData.sceneId;
            var vcsImgsrc = "//vcs.suning.com/vcs/imageCode.htm?uuid=" + uuid + "&yys=" + new Date().getTime() + "&sceneId=" + sceneId;
            var alertHtml = '<div class="dialog-common identify-code m-Info">' +
                '  <div class="code-input clearfix">' +
                '    <dl>' +
                '      <dt class="l">验证码</dt>' +
                '      <dd class="l">' +
                '      	 <p class="item-ide"><input autocomplete="off" onkeyup="coupon.imageCode.keyupFunc();" onfocus="coupon.imageCode.focusFunc();" class="ui-text l" type="text" placeholder="以下字符不区分大小写" id="inputCode" ><i id="tipCode" ></i></p>' +
                '        <p class="item-ide"><img onclick="coupon.imageCode.changeCode();" id="imgCode" class="l" src="' + vcsImgsrc + '"><span class="change l">看不清楚？<a href="javascript:void(0);" onclick="coupon.imageCode.changeCode();">换一张</a></span></p>' +
                '      </dd>' +
                '    </dl>' +
                '  </div>' +
                '</div>';
            Wap.AlertBox({
                type: 'onceCancel',
                alertType: 'fixed',
                alertCls: 'alertCls',
                title: respData.resultMsg,
                msg: alertHtml,
                cancelText: '关闭',
                callback: function() {}
            });

            document.querySelector(".alert-mini-box").parentNode.addEventListener('touchmove', function(e) {
                if (e && e.preventDefault) {
                    e.preventDefault();
                }
                if (window.event) {
                    window.event.returnValue = false;
                }
                return false;
            }, false);
        };
        /**
         * 验证码校验
         * flag校验成功时是否继续领券
         */
        var validateCode = function(flag) {
        	var inputCode = document.querySelector("#inputCode")
        	var tipCode = document.querySelector("#tipCode")
        	var checkout = document.querySelector("#checkout")
            var code = inputCode.value
            //替换中文输入法中的空格和英文空格
            code = code.replace(/\s+/g, "");
            //code = $.trim(code);
            if (code == "" || code == undefined) {
            	tipCode.style.display = "none"
                inputCode.className += " error-input"
                inputCode.vallue = ''
                inputCode.placeholder = "请输入正确的验证码"
                coupon.imageCode.changeCode();
                return;
            }
            var param = "code=" + code + "&uuid=" + uuid + "&delFlag=0";
            stream.fetch({
                type: 'get',
                url: "//vcs.suning.com/vcs/validate_jsonp.htm" + param,
                type: 'jsonp'
            }, function(data) {
            		// data即为服务器端的返回值
                    // 此处可以写获取返回值后的逻辑
                    if (data[0].result == "true") {
                    	tipCode.className += " tip-icon tip-ok-16 tip-ok l"
                        // $("#tipCode").addClass("tip-icon tip-ok-16 tip-ok l");
                        tipCode.style.display = "block"
                        inputCode.className = inputCode.className.replace('error-input','')
                        // $("#inputCode").removeClass("error-input");
                        if (flag == "1") {
                        	checkout.className = checkout.className.replace('checkout-loading','')

                            checkout.click();
                            document.querySelector('.alertCls').parentNode.removeChild(document.querySelector('.alertCls'))
                            //再次调用领券
                            var paramObj = {
                                "actId": receiveParamObj.actId,
                                "actKey": receiveParamObj.actKey,
                                "cityId": receiveParamObj.cityId,
                                "validateCode": code,
                                "uuid": uuid,
                                "sourceId": receiveParamObj.sourceId
                            };
                            coupon.receive.receiveCouponAjax(paramObj, receiveParamObj.callback, true);
                        }
                    } else {
                        // false
                        tipCode.style.display = "none"
                        inputCode.className += " error-input"
                        inputCode.vallue = ''
                        inputCode.placeholder = "请输入正确的验证码"
                        coupon.imageCode.changeCode();
                    }
            })

        };
        /**
         * 用户输入的验证码不对时，刷新验证码，供用户重新输入
         */
        var changeCode = function() {
            var src = "//vcs.suning.com/vcs/imageCode.htm?uuid=" + uuid +
                "&yys=" + new Date().getTime() + "&sceneId=" + sceneId;
            document.querySelector('#imgCode').src = src
            // $("#imgCode").attr("src", src);
        };
        //当用户输入的验证码位数大于等于4时，开始校验验证码
        var keyupFunc = function() {
            var code = document.querySelector("#inputCode").value;
            //替换中文输入法中的空格
            code = code.replace(/\s+/g, "");
            var length = code.length;
            if (length >= 4) {
                coupon.imageCode.validateCode(1);
            }
        };
        var focusFunc = function() {
            document.querySelector("#inputCode").className = document.querySelector("#inputCode").className.replace('error-input','')
            document.querySelector("#inputCode").placeholder = "以下字符不区分大小写"
            // $("#inputCode").attr("placeholder", "以下字符不区分大小写");
        };
        return {
            imageAlertBox: imageAlertBox,
            changeCode: changeCode,
            keyupFunc: keyupFunc,
            focusFunc: focusFunc,
            validateCode: validateCode
        };
    })();
    /**
     * 滑动验证码
     */
    coupon.sillerCode = (function() {
        /**
         * 弹框滑动验证码
         */
        var sillerAlertBox = function(respData) {
            //滑动验证弹框
            document.querySelector(".alert-title").innerText = respData.resultMsg
            // $('.alert-title').text(respData.resultMsg);
            siller.reset();
            document.querySelector(".siller").style.display = 'block'
            // $('.siller').show();
        };
        /**
         * 初始化滑动验证码
         */
        var initSillerCode = function() {
            siller.init({
                backWidth: '100%', // 控件长度（使用系统默认样式则不加此属性）
                backHeight: '37px', // 控件高度（使用系统默认样式则不加此属性）
                slWidth: '36px', // 滑块宽度（使用系统默认样式则不加此属性）
                slHeight: '36px', // 滑块高度（使用系统默认样式则不加此属性）
                fontSize: '12px', // 字体大小（使用系统默认样式则不加此属性）
                target: "sillerCodeDiv", //滑动验证码所在页面div的id（业务系统预先在页面写入一个空的div，必填！）
                url: "//dt.suning.com/detect/dt/dragDetect.json" //滑动验证后台地址，必填！
            });
        };
        /**
         * 再次领券
         */
        var receiveCouponAgain = function() {
            if (siller.status == 1) {
                //关闭弹出框
                coupon.init.closeSillerAlert();
                var paramObj = {
                    "actId": receiveParamObj.actId,
                    "actKey": receiveParamObj.actKey,
                    "cityId": receiveParamObj.cityId,
                    "validateCode": siller.queryToken(),
                    "sourceId": receiveParamObj.sourceId
                };
                coupon.receive.receiveCouponAjax(paramObj, receiveParamObj.callback, true);
            }
        };
        return {
            sillerAlertBox: sillerAlertBox,
            initSillerCode: initSillerCode,
            receiveCouponAgain: receiveCouponAgain
        };
    })();
    /**
     * 短信验证码
     */
    coupon.sms = (function() {
    	var getSms = document.querySelector(".get-sms");
    	var disable = document.querySelector(".disable");
    	var smsError = document.querySelector(".sms-error");
        /**
         * 发送验证码倒计时
         */
        var count = function(count) {

        	disable.querySelector('i').innerText = count
            // $('.disable').find('i').text(count);
            if (count >= 0) {
                setTimeout(function() {
                    coupon.sms.count(--count);
                }, 1000);
            } else {
            	getSms.style.display = 'block'
            	disable.style.display = 'none'
                // $('.get-sms').show();
                // $('.disable').hide();
            }
        };
        /**
         * 发送短信验证码
         */
        var sendSmsCode = function() {
            var targetUrl = "//quan.suning.com/sms/getSmsCode.do?callback=?";
            ajaxCrossDomain(targetUrl, "", function(data) {
                sendSmsSuccessCallBack(data);
            }, function() {
                sendSmsFailCallBack();
            }, coupon.common.passport_config);
        };
        /**
         * 发送短信成功回调
         */
        var sendSmsSuccessCallBack = function(data) {
            if ("1001" == data.errcode) {
                //成功
                getSms.style.display = 'block'
            	disable.style.display = 'none'
                coupon.sms.count(60); //倒计时60秒
                smsError.style.display = 'none'
            } else if (data.errcode == "01001") {
                getSms.style.display = 'none'
                document.querySelector(".has-send").style.display = 'block';
                // $('.has-send').show(); //今日次数已用完
                smsError.style.display = 'none'
            } else if (data.errcode == "1104" || data.errcode == "1106") {
                //验证码发送失败
                smsError.innerText = "验证码发送失败，请重新获取"
                // $('.sms-error').text("验证码发送失败，请重新获取");
                smsError.style.display = 'block'
            } else if (data.errcode == "01002") {
                //请求间隔少于60s
                smsError.innerText = "您的操作过于频繁，请1分钟后再试"
                // $('.sms-error').text("您的操作过于频繁，请1分钟后再试");
                smsError.style.display = 'block'
            }
        };
        /**
         * 发送短信失败回调
         */
        var sendSmsFailCallBack = function() {};
        /**
         * 短信验证码弹框
         */
        var smsAlertBox = function(respData) {
            if (document.querySelector(".sms-fixed-box")) {
                var alertHtml = '<div class="sms-fixed-box">' +
                    '	<div class="sms-fixed wbox"></div>' +
                    '</div>' +
                    '<div class="sms-box">' +
                    '	<div class="sms-close"><i></i></div>' +
                    '	<div class="sms-con">' +
                    '		<div class="sms-title">短信安全验证</div>' +
                    '		<div class="sms-con-txt">' +
                    '			<p id="smsPhoneNo">' + respData.mobileNum + '</p>' +
                    '			<div class="sms-input wbox">' +
                    '				<input class="sms-v" placeholder="&#x8BF7;&#x8F93;&#x5165;&#x9A8C;&#x8BC1;&#x7801;" type="text">' +
                    '				<a class="get-sms">获取验证码</a>' +
                    '				<a class="disable">重新获取(<i>60</i>)</a>' +
                    '				<a class="has-send">今日次数用完</a>' +
                    '			</div>' +
                    '			<p v-show="showError" class="sms-error" style="display:none">验证码错误</p>' +
                    '		</div>' +
                    '		<div class="sms-btn">' +
                    '			<a>确定</a>' +
                    '		</div>' +
                    '	</div>' +
                    '</div>';
                //弹框加入body标签
                document.body.insertAdjacentHTML( 'beforeend', alertHtml );
                // $("body").append(alertHtml);
            }
            if (respData.resultCode == '2005') { //短信验证码错误
            	smsError.innerText = '验证码错误'
                // $('.sms-error').text("验证码错误");
                smsError.style.display = 'block'
                // $('.sms-error').show();
            } else if (respData.resultCode == '2006') { //短信验证错误超过5次
            	smsError.innerText = '验证码错误次数过多，请重新获取'
                // $('.sms-error').text("验证码错误次数过多，请重新获取");
                
                smsError.style.display = 'block'
            } else {
                smsError.style.display = 'none'
            }
            document.querySelector(".sms-fixed-box").style.display = 'block'
            document.querySelector(".sms-box").style.display = 'block'
            // $('.sms-fixed-box,.sms-box').show();
            document.querySelector(".has-send").style.display = 'none'
            document.querySelector(".disable").style.display = 'none'
            // $('.disable,.has-send').hide();
            document.querySelector(".get-sms").style.display = 'block'
            // $('.get-sms').show();
            document.querySelector(".get-sms").removeEventListener('click').addEventListener('click', function() {
            	sendSmsCode();
            }, false)
            // $('.get-sms').off("click").on("click", function() {
            //     sendSmsCode();
            // });
            // $('.sms-v').off("focus").on("focus", function() {
            //     $('.sms-error').hide();
            // });
            document.querySelector(".sms-v").removeEventListener('focus').addEventListener('focus', function() {
            	document.querySelector(".get-sms").style.display = 'none'
            }, false)

            // $('.sms-btn').off("click").on("click", function() {
            //     var validateCode = $('.sms-v').val(); //获取验证码
            //     if (validateCode == "") {
            //         $('.sms-error').text("请输入验证码");
            //         $('.sms-error').show();
            //         return;
            //     }
            //     $('.sms-fixed-box,.sms-box').hide();
            //     //再次领券
            //     var paramObj = {
            //         "actId": receiveParamObj.actId,
            //         "actKey": receiveParamObj.actKey,
            //         "cityId": receiveParamObj.cityId,
            //         "validateCode": validateCode,
            //         "sourceId": receiveParamObj.sourceId
            //     };
            //     coupon.receive.receiveCouponAjax(paramObj, receiveParamObj.callback, true);
            // });

            document.querySelector(".sms-btn").removeEventListener('click').addEventListener('click', function() {
            	var validateCode = document.querySelector(".sms-btn").value; //获取验证码
                if (validateCode == "") {
                    // $('.sms-error').text("请输入验证码");
                    smsError.innerText = "请输入验证码"
                    smsError.style.display = 'block'
                    // $('.sms-error').show();
                    return;
                }
                // $('.sms-fixed-box,.sms-box').hide();
                document.querySelector(".sms-fixed-box").style.display = 'none'
            	document.querySelector(".sms-box").style.display = 'none'
                //再次领券
                var paramObj = {
                    "actId": receiveParamObj.actId,
                    "actKey": receiveParamObj.actKey,
                    "cityId": receiveParamObj.cityId,
                    "validateCode": validateCode,
                    "sourceId": receiveParamObj.sourceId
                };
                coupon.receive.receiveCouponAjax(paramObj, receiveParamObj.callback, true);
            }, false)

            //关闭弹窗
            // $('.sms-close,.sms-fixed-box').click(function() {
            //     $('.sms-fixed-box,.sms-box').hide();
            // });
            document.querySelector(".sms-close").addEventListener('click', function() {
            	document.querySelector(".sms-fixed-box").style.display = 'none'
            	document.querySelector(".sms-box").style.display = 'none'
            }, false)
        };
        return {
            smsAlertBox: smsAlertBox,
            count: count
        };
    })();
    /**
     * 公共模块
     */
    coupon.common = (function() {
        var passport_config = {
            base: "//quan.suning.com/",
            loginTheme: "wap_new"
        };
        return {
            passport_config: passport_config
        };
    })();
    /**
     * 初始化相关事宜
     */
    coupon.init = (function() {
        /**
         * 滑动验证码弹框初始化
         */
        var alertSillerHtml = function() {
            var alertHtml = '<div class="siller" style="display: none;">' +
                '				<div class="alert-box">' +
                '  				<div class="alert-title"></div>' +
                '  				<div class="alert-msg"><div id="sillerCodeDiv"></div></div>' +
                '  				<div class="alert-btn">' +
                '  					<a href="javascript:coupon.init.closeSillerAlert()" class="siller-cancel alert-cancel mr10">取消</a>' +
                '  					<a href="javascript:coupon.sillerCode.receiveCouponAgain()" class="siller-confirm alert-confirm">确定</a>' +
                '    				</div>' +
                '  			</div>' +
                '  		</div>';
            // $('body').append(alertHtml);
            document.body.insertAdjacentHTML( 'beforeend', alertHtml );
        };
        var closeSillerAlert = function() {
            // $('.siller').hide();
            document.querySelector('.siller').style.display = 'none'
        };
        return {
            alertSillerHtml: alertSillerHtml,
            closeSillerAlert: closeSillerAlert
        };
    })();

    coupon.loadDT = function(base, callback) {
    	//判断人机活动
	        if (typeof(bd) == 'undefined' || bd == 'undefined') {
	            base.h5.loadScript('//dt.suning.com/detect/dt/detect.js').then(function() {
	                hook();
	            });
	        } else {
	            hook();
	        }

	        function hook() {
	            bd.init({
	                'token': 'other',
	                'system': 'CPF',
	                'url': '//dt.suning.com/detect/dt/portoToken.json'
	            });
	            callback()
	        }
	        if (typeof(Wap.AlertBox) == 'undefined') {
	            base.h5.loadScript('//res.suning.cn/public/v5/js/weex/h5/mod/alertBox/1.0.0/alertBox.js');
	        }
	        if (typeof(siller) == 'undefined') {
	            base.h5.loadScript('//dt.suning.com/detect/dt/siller.js').then(function() {
	                coupon.sillerCode.initSillerCode();
	            });
	        }
    }
    /**
     * 页面加载运行模块
     */
    document.addEventListener("DOMContentLoaded", function() {

        document.body.insertAdjacentHTML( 'beforeend','<style>.alert-box{position:absolute;left:0;top:0;border-radius:0.2rem;background:#FFF;-webkit-box-sizing:border-box;z-index:100;font-size:0.6rem}' +
            '.alert-msg{padding:0.4rem 0.6rem 0.6rem;text-align:center;line-height:1.8;word-break:break-all}' +
            '.alert-title{padding:0.6rem 0.6rem 0;text-align:center}' +
            '.alert-btn{display:-webkit-flex!important;display:-webkit-box;border-top:1px solid #DCDCDC}' +
            '.alert-btn a{display:block;-webkit-flex:1!important;-webkit-box-flex:1;height:1.68rem;line-height:1.68rem;text-align:center}' +
            '.alert-btn a.alert-confirm{border-left:1px solid #DCDCDC;color:#ffc200}' +
            '.alert-btn a.alert-confirm.single{border-left:none}' +
            '.alert-mini-box{border-radius:0.2rem;background:rgba(0,0,0,0.7);color:#fff}' +
            '.sms-fixed-box{display:none;position:fixed;left:0;top:0;bottom:0;right:0;z-index:1000}' +
            '.sms-fixed{background:rgba(0,0,0,0.6);height:100%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}' +
            '.sms-box{display:none;width:11.2rem;position:fixed;z-index:9999;left:50%;top:15%;margin-left:-5.6rem;}' +
            '.sms-close{height:1rem;text-align:right}' +
            '.sms-close i{display:inline-block;width:1rem;height:1rem;background:url(//res.suning.cn/project/cpf/js/api/wap/css/images/SMS_close.png) no-repeat;background-size:cover}' +
            '.sms-con{margin-top:.6rem;background-color:#fff;border-top-left-radius:2px;border-top-right-radius:2px}' +
            '.sms-title{padding:.9rem 0;text-align:center;font-size:.68rem;color:#1c0606}' +
            '.sms-con-txt{padding:0.8rem}' +
            '.sms-con-txt p{font-size:.56rem;color:#1c0606}' +
            '.sms-con-txt input{border:1px solid #ccc;height:1.4rem;padding:0.2rem;border-radius:3px;width:100%}' +
            '.sms-input{margin-top:.4rem}' +
            '.sms-input input{width:5rem}' +
            '.sms-input a{display:block;width:4.2rem;height:1.4rem;color:#fff;background-color:#ff6455;border-radius:3px;margin-left:.4rem;font-size:.48rem;text-align:center;line-height:1.4rem}' +
            '.sms-input .disable{background-color:#ccc;color:#fff;display:none}' +
            '.sms-input .has-send{background-color:#ccc;color:#fff;display:none}' +
            '.sms-con-txt .sms-error{padding-top:.2rem;color:#ff6455;font-size:.48rem;display:none}' +
            '.sms-btn{margin-top:1rem;height:3.3rem;padding-top:1.1rem;background:url(//res.suning.cn/project/cpf/js/api/wap/css/images/SMS_bg.jpg) no-repeat;background-size:cover;text-align:center}' +
            '.sms-btn a{display:inline-block;width:6rem;height:1.56rem;background:url(//res.suning.cn/project/cpf/js/api/wap/css/images/SMS_btn.png) no-repeat;background-size:cover;line-height:1.56rem;font-size:.64rem}' +
            '.siller{position:fixed;left:0px;top:0px;width:100%;height:100%;background:rgba(0,0,0,0.298039);z-index:99}' +
            '.siller .alert-box{width:13rem;left:1rem;top:50%;-webkit-transform:translate3d(0px,-50%,0px);transform:translate3d(0px,-50%,0px)}' +
            '.l{float:left;}' +
            '.dialog-common{font-family:"Microsoft YaHei"}' +
            '.dialog-common .dialog-opt{display:inline-block;height:26px;padding:0 18px;margin-right:10px;text-align:center;font:14px/26px \'microsoft yahei\';border-radius:2px;cursor:pointer}' +
            '.dialog-common .dialog-certain{height:24px;line-height:24px;background-color:#f90;color:#FFF;border:1px solid #f90}' +
            '.dialog-common .dialog-opt:hover{text-decoration:none}' +
            '.dialog-common .dialog-certain:hover{background-color:#f70}' +
            '.dialog-common .dialog-close{height:24px;line-height:24px;border:1px solid #ddd;color:#333}' +
            '.dialog-common .tips{padding:30px 0;text-align:center;font-size:14px;font-weight:700}' +
            '.dialog-common .tips .tip-icon{margin-right:10px;vertical-align:middle}' +
            '.identify-code{width:308px;margin:0 auto}' +
            '.identify-code .tips{padding:0;margin-top:22px;text-align:left;color:#333}' +
            '.identify-code .code-input{width:280px;margin-top:29px}' +
            '.identify-code .code-input dl{height:auto}' +
            '.identify-code .code-input dt{width:52px;font:14px/32px \'microsoft yahei\';color:#666}' +
            '.identify-code .code-input dd,' +
            '.identify-code .code-input dd p{width:220px}' +
            '.identify-code .code-input .item-ide{display:inline-block;height:32px;margin-bottom:12px;color:#bbb}' +
            '.identify-code .code-input .item-ide .tip-icon{margin-top:6px}' +
            '.identify-code .code-input dd input{width:174px;margin-right:10px;padding:6px 0 6px 6px;text-align:left}' +
            '.identify-code .code-input .error-input{border:1px solid #d00;color:#d00}' +
            '.identify-code .code-input img{display:inline-block;width:80px;height:30px;margin-right:5px}' +
            '.identify-code .code-input .change{height:32px;line-height:32px}' +
            '.identify-code .code-input .change a{color:#2272c8}' +
            '.identify-code .lion-btn{display:inline-block;width:69px;height:26px;margin-right:10px;text-align:center;font:14px/26px \'microsoft yahei\';border-radius:3px}' +
            '.identify-code .lion-btn:hover{text-decoration:none}' +
            '.identify-code .certain{background-color:#f90;border:1px solid #f90;color:#fff}' +
            '.identify-code .certain:hover{background-color:#f70}' +
            '.identify-code .close{background-color:#eee;border:1px solid #ddd;color:#333}' +
            '.alertCls .identify-code .code-input,' +
            '.alertCls .identify-code{width:100%;max-width:12rem;}' +
            '.alertCls .identify-code .code-input dd,' +
            '.alertCls .identify-code .code-input dd p{width:9rem;}' +
            '.alertCls .identify-code .code-input .item-ide{width:9rem;}' +
            '.alertCls .identify-code .code-input dd input{height:35px;width:9rem;font-size:.4rem;}' +
            '.m-dialog .content{margin-bottom:0;}' +
            '.m-shopresultInfo .alertCls .identify-code .code-input,' +
            '.alertCls .identify-code{max-width:15rem;}' +
            '.m-shopresultInfo .identify-code .code-input dt{width:1.4rem;font:.4rem/.64rem "Microsoft Yahei";}' +
            '.m-shopresultInfo .identify-code .code-input dl{padding:0 .4rem;height:auto;}' +
            '.m-shopresultInfo .alertCls .identify-code .code-input dd,' +
            '.alertCls .identify-code .code-input dd p{width:7.8rem;vertical-align:top;}' +
            '.m-shopresultInfo .alertCls .identify-code .code-input dd input{width:7.8rem;height:.7rem;margin-right:0;}' +
            '.m-shopresultInfo .alertCls .identify-code .code-input .item-ide{width:7.8rem;height:1rem;display:block;}' +
            '.m-shopresultInfo .identify-code .code-input img{width:1.6rem;height:.6rem;}' +
            '.m-shopresultInfo .identify-code .code-input .change{font-size:.4rem;height:.6rem;line-height:.6rem;}' +
            '.m-Info .code-input dl{height:auto;width:100%;overflow:hidden;}' +
            'div{-moz-user-select:none;-webkit-user-select:none;user-select:none;}' +
            '.dt_parent .dt_child_content,' +
            '.dt_parent .dt_child_content_knob,' +
            '.dt_parent .dt_child_content_knob_move,' +
            '.dt_parent .dt_child_content_knob_move_back,' +
            '.dt_parent .dt_child_content_knob_complete,' +
            '.dt_parent .dt_child_content_knob_error,' +
            '.dt_parent .dt_slide_bar,' +
            '.dt_parent .dt_slide_bar_back,' +
            '.dt_parent .dt_slide_bar_error{background-repeat:no-repeat;background-image:url(//dt.suning.com/detect/images/slide-new.png);}' +
            '.dt_parent{overflow:visible;position:relative;zoom:1;letter-spacing:0!important;}' +
            '.dt_parent.float{width:332px;}' +
            '.dt_parent.float .dt_child_content{left:0;}' +
            '.dt_parent .dt_child_content{height:42px;width:332px;background-position:-13px -11px;position:relative;left:15px;overflow:visible;}' +
            '.dt_parent .dt_child_content_knob{height:42px;width:42px;background-position:-28px -200px;cursor:pointer;display:block;position:absolute;left:0px;top:0px;-moz-box-shadow:none;z-index:399;}' +
            '.dt_parent .dt_child_content_knob_complete{height:42px;width:42px;background-position:-28px -263px;cursor:pointer;display:block;position:absolute;left:0px;top:0px;-moz-box-shadow:none;z-index:399;}' +
            '.dt_parent .dt_child_content_knob_error{height:42px;width:42px;background-position:-28px -326px;cursor:pointer;display:block;position:absolute;left:0px;top:0px;-moz-box-shadow:none;z-index:399;}' +
            '.dt_parent .dt_child_content_knob_move{height:42px;width:42px;background-position:-28px -200px;cursor:pointer;display:block;position:absolute;left:0px;top:0px;-moz-box-shadow:none;z-index:399;}' +
            '.dt_parent .dt_child_content_knob_move_back{height:42px;width:42px;background-position:-28px -200px;cursor:pointer;display:block;position:absolute;left:0px;top:0px;-moz-box-shadow:none;z-index:399;transition:left .5s ease;-webkit-transition:left .5s ease;}' +
            '.dt_parent .dt_notice{cursor:default;position:absolute;left:0px;font-family:Helvetica,SimSun,monospace!important;font-size:14px;color:#999;opacity:1;filter:alpha(opacity=100);height:42px;line-height:42px;text-align:center;width:330px;display:inline-block;animation:dt_notice 3s infinite;-webkit-animation:dt_notice 3s infinite;-moz-animation:dt_notice 3s infinite;background:-webkit-gradient(linear,left top,right top,color-stop(0,#999),color-stop(.4,#999),color-stop(.5,#fff),color-stop(.6,#999),color-stop(1,#999));-webkit-background-clip:text;-webkit-text-fill-color:transparent;-webkit-text-size-adjust:none;}' +
            '@keyframes dt_notice{' +
            '	0%{background-position:-200px 0}' +
            '	100%{background-position:200px 0}' +
            '}' +
            '@-webkit-keyframes dt_notice{' +
            '	0%{background-position:-200px 0}' +
            '	100%{background-position:200px 0}' +
            '}' +
            '@-moz-keyframes dt_notice{' +
            '	0%{background-position:-200px 0}' +
            '	100%{background-position:200px 0}' +
            '}' +
            '@-o-keyframes dt_notice{' +
            '	0%{background-position:-200px 0}' +
            '	100%{background-position:200px 0}' +
            '}' +
            '.dt_parent .dt_notice_complete{cursor:default;position:absolute;left:0px;font-family:Helvetica,SimSun,monospace!important;font-size:14px;color:#fff;opacity:1;filter:alpha(opacity=100);height:42px;line-height:42px;text-align:center;width:330px;}' +
            '.dt_parent .dt_notice_error{cursor:default;position:absolute;left:0px;font-family:Helvetica,SimSun,monospace!important;font-size:14px;color:#333;opacity:1;filter:alpha(opacity=100);height:42px;line-height:42px;text-align:center;width:330px;}' +
            '.dt_parent .dt_slide_bar{cursor:default;position:absolute;left:0px;height:42px;line-height:42px;width:0px;background-position:-13px -74px;}' +
            '.dt_parent .dt_slide_bar_error{cursor:default;position:absolute;left:0px;height:42px;line-height:42px;width:0px;background-position:-13px -137px;}' +
            '.dt_parent .dt_slide_bar_back{cursor:default;position:absolute;left:0px;height:42px;line-height:42px;width:0px;background-position:-13px -74px;transition:all .5s ease;-webkit-transition:all .5s ease;}</style>'
        );
        coupon.init.alertSillerHtml();
    });

	M.coupon = coupon;

})(window.Wap = window.Wap || {}, window)
// coupon.receive.receiveCoupon({
//     actId: id,
//     actKey: key,
//     cityId: $.cookie('cityCode') || '025',
//     sourceId: '6002'
// }, function(res) {

// 	// 业务代码
//     if (res.resultCode == '0') {
//         $item.find('.q1').removeClass('hide');
//     } else if (res.resultCode != '1001' && res.resultCode != '1002' && res.resultCode != '1003' && res.resultCode != '1004' && res.resultCode != '2004' && res.resultCode != '2005' && res.resultCode != '2006') {
//         $item.find('.q2').removeClass('hide');
//     }


// });