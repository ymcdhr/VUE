/**
 * [getAllPrice description]
 * 获取商品价格，weex 和 WAP 通用版
 * @param  {[type]} opt [description]
 * @param  {[type]} priceData [总的数据]
 * @param  {[type]} cityCode [025 三位城市编码]
 * @param  {[type]} productCode [商品编码]
 * @param  {[type]} venderCode [供应商编码]
 * @param  {[type]} callback [回调方法]
 * @return {[type]}     [description]
 *
 * var price = require('mod/getprice')
    price.getAllPrice({
        priceData: data_price,
        callback: function(prices, idx, length){
            self.priceData = prices
        }
    })
 */
function getAllPrice(opt) {
    var listIndex = 0

    return {

        icps: function() {
            this.proListQueue = []
                // this.proListQueueLength = 0
            this.total = 20
            this.listIndex = 0
            this.callbackFn = parseInt((new Date().getTime())) + (Math.random()*10).toString(16).substring(2,8)
            var _opt = opt || {}
            this.Qdata = []
            this.opt = _opt
            _opt.priceData = opt.priceData
            _opt.productCode = opt.productCode || 'productCode'
            _opt.venderCode = opt.venderCode || 'venderCode'
            _opt.cityCode = opt.cityCode || '025'
            _opt.chan = opt.chan || '5'
            _opt.callback = opt.callback || function() {}
            _opt.env = opt.env || '//icps.suning.com'

            this.checkData(_opt.priceData, _opt.productCode, _opt.venderCode, _opt.callback)
        },

        formatProCode: function(procode) {
            procode = procode.toString();
            var zeros = "";
            if (procode) {
                if (procode.length <= 18) // 补0
                {
                    var x = 18 - procode.length;
                    for (var i = 0; i < x; i++) {
                        zeros += "0";
                    }
                }
            }
            return zeros + procode;
        },
        checkData: function(data, productCode, venderCode, callback) {
            var self = this

            if (!data) {
                return;
            }
            try {
                data.forEach(function(item, idx) {

                    var queueIndex = Math.ceil((idx + 1) / self.total) - 1

                    if (idx % self.total === 0) {
                        var group = {
                            proCode: [],
                            venderCode: []
                        }
                        self.proListQueue.push(group)
                    }


                    self.proListQueue[queueIndex].proCode.push(self.formatProCode(item[productCode]))

                    if (!item[venderCode]) {
                        item[venderCode] = '';
                    } else if (item[venderCode] == '0') {
                        item[venderCode] = '0000000000';
                    }

                    self.proListQueue[queueIndex].venderCode.push(item[venderCode])

                })
            } catch (e) {

            }


            this.fetchPrice(productCode, venderCode, callback)
        },
        fetchPrice: function(productCode, venderCode, callback) {

            var self = this
            if (self.listIndex == self.proListQueue.length) {
                return;
            }


            var cmmdtyCode = self.proListQueue[self.listIndex].proCode.join(',')
            var bizCode = self.proListQueue[self.listIndex].venderCode.join(',')

            if (typeof(weex.requireModule) != 'undefined') {
                var stream = weex.requireModule('stream');

                stream.fetch({
                    method: 'GET',
                    type: 'jsonp',
                    url: self.opt.env + '/icps-web/getVarnishAllPrice014/' + cmmdtyCode + '_' + self.opt.cityCode + '_' + '' + '_' + bizCode + '_' + 5 + '_' + 'getVarnishAllPrice' + self.callbackFn + '_.vhtm',
                    jsonpCallback: 'getVarnishAllPrice' + self.callbackFn
                }, function(res) {

                    queueDone(res.data);
					
                }, function(err) {
//					16031316,20170823注释，加上这一段，可能由于callback的原因会报错
//				    stream.fetch({
//                      method: 'GET',
//                      type: 'jsonp',
//                      url: '//pts.suning.com/emall/queryPriceChannelPage/' + cmmdtyCode + '_' + self.opt.cityCode + '_' + '' + '_' + bizCode + '_' + 5 + '_' + 'getVarnishAllPrice' + self.callbackFn + '.jsonp',
//                      jsonpCallback: 'getVarnishAllPrice' + self.callbackFn
//                  }, function(res) {
//
//                      queueDone(res.data, true);
//                      
//                  });
                    
                })
            } /*else {
                $.ajax({
                    dataType: 'jsonp',
                    // url: REQ_SERVICE_API + cmmdtyCode + '_' + cityCode + '_' + area + '_' + bizCode + '_' + chan + '_' + CALLBACK_PRE + reqIndex + '.vhtm',
                    url: self.opt.env + '/icps-web/getVarnishAllPrice014/' + cmmdtyCode + '_' + self.opt.cityCode + '_' + '' + '_' + bizCode + '_' + 5 + '_' + 'getVarnishAllPrice' + self.listIndex + '_.vhtm',
                    cache: true,
                    timeout: 10000,
                    jsonpCallback: 'getVarnishAllPrice' + self.listIndex
                }).done(function(res) {
                    queueDone(res)

                }).fail(function(xOptions, textStatus) {
                    // console.log(xOptions, textStatus)
                }).always(function() {
                    // priceRequest(true);
                    // isProgress = false;
                });
            }*/





            function queueDone(res, pts) {


                // [{
                //     cmmdtyCode: "000000000601771351",
                //     cmmdtyType: "1",
                //     bizCode: "0000000000",
                //     refPrice: "3399.00",
                //     maPrice: "",
                //     snPrice: "3399.00",
                //     mpsPrice: "",
                //     proPrice: "",
                //     price: "3399.00",
                //     priceType: "1",
                //     bizCount: "1",
                //     govPrice: "",
                //     nmpsStartTime: "",
                //     nmpsEndTime: "",
                //     mpsId: "",
                //     bizType: "0",
                //     status: "1",
                //     invStatus: "1",
                //     bookPrice: "",
                //     bookPriceSwell: "",
                //     finalPayment: ""
                // }, {
                //     cmmdtyCode: "000000000600037340",
                //     cmmdtyType: "1",
                //     bizCode: "0000000000",
                //     refPrice: "1199.00",
                //     maPrice: "",
                //     snPrice: "1199.00",
                //     mpsPrice: "1129.00",
                //     proPrice: "",
                //     price: "1129.00",
                //     priceType: "4-2",
                //     bizCount: "1",
                //     govPrice: "",
                //     nmpsStartTime: "2017-02-23 09:50:00",
                //     nmpsEndTime: "2017-02-25 23:59:00",
                //     mpsId: "4820711",
                //     bizType: "0",
                //     status: "1",
                //     invStatus: "1",
                //     bookPrice: "",
                //     bookPriceSwell: "",
                //     finalPayment: ""
                // }]
                var finalData = []
                var _proCode = self.proListQueue[self.listIndex].proCode
                    // ['000000000181059984', '000000000600037340', '000000000172601557']
                    // 传入的值与接口给的价格顺序会有一定概率排序混乱，需要再重新排序
                _proCode.forEach(function(item, idx) {

                    if (item == res[idx].cmmdtyCode) {
                        finalData.push(res[idx])
                    } else {
                        res.forEach(function(itm, index) {
                            if (itm.cmmdtyCode == item) {
                                finalData.push(itm)
                            }
                        })
                    }

                })


                // res.forEach(function(item, idx) {

                //     // 因为价格接口返回顺序会有顺序问题，需要再重新排序
                //     if (item.cmmdtyCode == self.formatProCode(self.proListQueue[self.listIndex].proCode[idx])) {
                //         finalData.push(item)
                //     } else {
                //         self.proListQueue[self.listIndex].proCode.forEach(function(itm, index) {
                //             if (itm.cmmdtyCode == self.formatProCode(self.proListQueue[self.listIndex].proCode[idx])) {
                //                 finalData.push(itm)
                //             }
                //         })
                //     }

                // })

                // 处理逻辑
                //
                // callback('done1')
                finalData.forEach(function(item, idx) {

                    var price = item.price
                    var snPrice = item.snPrice

                    if (item.status == 2) {
                        price = '卖光了';
                        snPrice = '';
                    } else {
                        //销售价  挂牌价

                        //预约预订商品价格做特殊处理，普通商品价格大于易购价时 不展示易购价
                        if (item.priceType != '7-1') {
                            price = parseFloat(price);
                        }

                        if (item.priceType == '8-1' || item.priceType == '8-2') {
                            snPrice = parseFloat(snPrice);
                        } else if (item.priceType != '7-1' && item.priceType != '7-2') {
                            snPrice = parseFloat(item.refPrice || snPrice);
                        }

                        if (snPrice != '' && snPrice > price) {
                            // console.log(888)
//                          (typeof(snPrice) == 'number') && (snPrice = snPrice.toFixed(2));
                            (typeof(snPrice) == 'number') && (snPrice = snPrice);
                            snPrice = "￥" + snPrice

                        } else {
                            snPrice = ''
                        }

                        if (price) {
//                          (typeof(price) == 'number') && (price = price.toFixed(2));
                            (typeof(price) == 'number') && (price = price);
                            price = "￥" + price
                                // $product.find('.sale-price').html( + salePrice);
                        } else {
                            price = '卖光了';
                            snPrice = '';
                        }
                        // console.log(parseFloat(price))

                    }
                    item.price = price
                    item.snPrice = snPrice
                    if(pts){
                        item.price = item.snPrice
                        item.snPrice = ''
                    }
                    self.Qdata.push(item)
                })



                // self.Qdata.push(finalData)



                self.listIndex++
                self.callbackFn++
                    self.fetchPrice(productCode, venderCode, callback)
                if (self.proListQueue.length == 1) {
                    callback(self.Qdata, self.listIndex, self.proListQueue.length)
                }else if (self.listIndex == self.proListQueue.length) {
                    callback(self.Qdata, self.listIndex, self.proListQueue.length)
                }
                // callback(self.Qdata, self.listIndex, self.proListQueue.length)

            }

        }
    }.icps()

}

if (typeof(exports) != 'undefined') {
    exports.getAllPrice = getAllPrice
}