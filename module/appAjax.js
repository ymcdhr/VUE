/**
 * [appAjax]
 * @param  {[type]} businessId [description]
 * @return {[type]}            [description]
 */
let base = require('./base.js')

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