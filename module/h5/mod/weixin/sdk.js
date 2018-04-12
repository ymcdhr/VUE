window.checkWxSDKisLoaded__ = false;
function wxSDK(base) {
  var dfd = base.promise()
  var stream = weex.requireModule('stream');
  var jsApiList = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'];
  var scriptOnLoad = function() {

      stream.fetch({
        url: '//act.suning.com/act-wap-web/wap/public/getWechatToken.htm?url=' + encodeURIComponent(window.location.href),
        type: 'jsonp',
        jsonpCallback: 'get_wx_config'
      },function(wx_config) {

        wx.config({
            debug: false,
            appId: wx_config.appId,
            timestamp: wx_config.timestamp,
            nonceStr: wx_config.nonceStr,
            signature: wx_config.signature,
            jsApiList: jsApiList
        });
        wx.ready(function() {
            dfd.resolve(wx);
            window.checkWxSDKisLoaded__ = true
        })

        wx.error(function(res) {
          dfd.reject(JSON.stringify(res));
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

  return dfd;
}