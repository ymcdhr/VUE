/**
 * [description]
 * @return {[type]} [description]
 * @调用方式 
 * Wap.wxShare.config({
       title:'红包，就在你身边的苏宁',
       desc:'全国苏宁门店红包大派送！据说离门店越近，红包越大！来来来你也试一下？',
       link:'${shareRPHost}/project/redpacket/index.html',
       imgUrl:'http://image2.suning.cn/uimg/cms/img/144619077320900915.jpg'
   }).loadJWeixin(base);
 */

;
(function(M, W) {
    var wxShare = wxShare || {};
    var isJWeixin = false;

    var jsApiList = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'];

    var Config = {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        success: function() {
            // alert('分享成功')
        },
        cancel: function() {
            // alert('您已取消分享')
        }
    };
    var MessageConfig = {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        success: function() {
            // alert('分享成功')
        },
        cancel: function() {
            // alert('您已取消分享')
        }
    };
    var defaultImg = window.location.protocol + '//res.suning.cn/project/cmsWeb/suning/wap/images/suning-icon-114-114.png';

    wxShare.loadJWeixin = function(base, callback) {
        var _callback_ = callback || function() {}

        M.wxSDK(function(wx) {
          // alert(wx)
            wxShare.ready = true;
            _callback_()
            wx.onMenuShareTimeline(Config);
            if (MessageConfig.title != '') {
                Config = MessageConfig
            }
            wx.onMenuShareAppMessage(Config);
        })

    };

    wxShare.config = function(obj) {
        if (!obj) return;
        Config.title = obj.title;
        Config.desc = obj.desc;
        Config.link = obj.link;
        Config.imgUrl = obj.imgUrl || defaultImg
        return this;
    }

    wxShare.AppMessage = function(obj) {
        if (!obj) return;
        MessageConfig.title = obj.title;
        MessageConfig.desc = obj.desc;
        MessageConfig.link = obj.link;
        MessageConfig.imgUrl = obj.imgUrl || defaultImg;
        return this;
    }



    M.wxShare = wxShare;


    window.checkWxSDKisLoaded__ = false;

    M.wxSDK = function (callback) {
        // var dfd = base.promise()
        var stream = weex.requireModule('stream');
        
        var scriptOnLoad = function() {

            stream.fetch({
                url: '//act.suning.com/act-wap-web/wap/public/getWechatToken.htm?url=' + encodeURIComponent(window.location.href),
                type: 'jsonp',
                jsonpCallback: 'get_wx_config'
            }, function(wx_config) {

              // alert(get_wx_config)
              var wx_config = wx_config.data
                wx.config({
                    debug: false,
                    appId: wx_config.appId,
                    timestamp: wx_config.timestamp,
                    nonceStr: wx_config.nonceStr,
                    signature: wx_config.signature,
                    jsApiList: jsApiList
                });

                wx.ready(function() {
                    // dfd.resolve(wx);
                    callback(wx)
                    // alert(wx)
                    window.checkWxSDKisLoaded__ = true
                })

                wx.error(function(res) {
                    callback(JSON.stringify(res), wx)
                    // dfd.reject(JSON.stringify(res));
                })
            })

        }

        if (navigator.userAgent.match(/MicroMessenger/i) && !window.checkWxSDKisLoaded__) {
            var script = document.createElement('script');
            var _scripts = document.getElementsByTagName('script')[0];
            script.src = '//res.wx.qq.com/open/js/jweixin-1.0.0.js';
            script.onload = scriptOnLoad;
            _scripts.parentNode.insertBefore(script, _scripts);
        }

        // return dfd;
    }

})(window.Wap = window.Wap || {}, window);