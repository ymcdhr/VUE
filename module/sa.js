/**
 * [saClick]
 * @param  {[type]} businessId [description]
 * @return {[type]}            [description]
 */
let base = require('./base.js')
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