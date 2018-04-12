/**
 * 调用方式： Wap.Geo(function(meta){
 *     // meta = {"location":{"lng":116.911468,"lat":34.700648},"formatted_address":"江苏省南京市玄武区","business":"","addressComponent":{"city":"南京市","district":"玄武区","province":"江苏省","street":"","street_number":""},"cityCode":316};
 * });
 */


/**
 * 
 * Wap.Geo 调用方式逻辑简述：
 *
 * 调用 Wap.Geo 方法先调用系统自带 navigator.geolocation 方法获取浏览器经纬度 =>
 * 获取经纬度后会通过 api.map.baidu.com 接口把经纬度转化为当前城市信息（江苏省，南京市，玄武区）=>
 * 根据 （江苏省，南京市，玄武区）把字符串信息转化为苏宁对应的业务代码
 * {
       cityCode: 025,
       cityName: "南京",
       cityNo: 9173,
       provinceCode: 100,
       provinceName: "江苏"
       // 当 geoType 为 "gps"，则代表走了百度定位成功，可以获取经纬度；当 geoType 为 "ip"，则代表走百度定位失败，走了 ip 定位，无法获取经纬度，默认赋值南京经纬度。
       geoType: "ip" 或者 "gps"
 * }
 *
 * 
 *
 * Wap.Geo(function(meta){
    meta = {
        cityCode: 025,
        cityName: "南京",
        cityNo: 9173,
        geoType: "ip" 或者 "gps",
        provinceCode: 100,
        provinceName: "江苏",
        location: {
            lat: 32.08958282685081,
            lng: 118.88776039999993
        }
     }
   )}
 * 
 */

/**
 * 
 * Wap.Gps 调用方式逻辑简述：
 *
 * 调用 Wap.Gps 方法先调用百度定位方法获取浏览器经纬度和城市信息（江苏省，南京市，玄武区） =>
 * 根据 （江苏省，南京市，玄武区）把字符串信息转化为苏宁对应的业务代码
 * {
       cityCode: 025,
       cityName: "南京",
       cityNo: 9173,
       provinceCode: 100,
       provinceName: "江苏",
       geoType:"Gps"
 * }
 *
 * 
 *
 * Wap.Gps(function(meta){
    meta = {
        cityCode: 025,
        cityName: "南京",
        cityNo: 9173,
        provinceCode: 100,
        provinceName: "江苏",
        geoType:"Gps",
        point: {
            lat: 32.08958282685081,
            lng: 118.88776039999993
        }
     }
   )}
 * 
 */


;
(function(M, W) {

    // var cityDictionaryUrl = "//api.m.suning.com/cityAllData/getNewAllCityData.html"


    M.PROVINCE_MAP = [{
        "provinceCode": "10",
        "provinceName": "北京"
    }, {
        "provinceCode": "20",
        "provinceName": "上海"
    }, {
        "provinceCode": "30",
        "provinceName": "天津"
    }, {
        "provinceCode": "40",
        "provinceName": "内蒙古"
    }, {
        "provinceCode": "50",
        "provinceName": "山西"
    }, {
        "provinceCode": "60",
        "provinceName": "河北"
    }, {
        "provinceCode": "70",
        "provinceName": "辽宁"
    }, {
        "provinceCode": "80",
        "provinceName": "吉林"
    }, {
        "provinceCode": "90",
        "provinceName": "黑龙江"
    }, {
        "provinceCode": "100",
        "provinceName": "江苏"
    }, {
        "provinceCode": "110",
        "provinceName": "安徽"
    }, {
        "provinceCode": "120",
        "provinceName": "山东"
    }, {
        "provinceCode": "130",
        "provinceName": "浙江"
    }, {
        "provinceCode": "140",
        "provinceName": "江西"
    }, {
        "provinceCode": "150",
        "provinceName": "福建"
    }, {
        "provinceCode": "160",
        "provinceName": "湖南"
    }, {
        "provinceCode": "170",
        "provinceName": "湖北"
    }, {
        "provinceCode": "180",
        "provinceName": "河南"
    }, {
        "provinceCode": "190",
        "provinceName": "广东"
    }, {
        "provinceCode": "200",
        "provinceName": "海南"
    }, {
        "provinceCode": "210",
        "provinceName": "广西"
    }, {
        "provinceCode": "220",
        "provinceName": "贵州"
    }, {
        "provinceCode": "230",
        "provinceName": "四川"
    }, {
        "provinceCode": "240",
        "provinceName": "云南"
    }, {
        "provinceCode": "250",
        "provinceName": "陕西"
    }, {
        "provinceCode": "260",
        "provinceName": "甘肃"
    }, {
        "provinceCode": "270",
        "provinceName": "宁夏"
    }, {
        "provinceCode": "280",
        "provinceName": "青海"
    }, {
        "provinceCode": "290",
        "provinceName": "新疆"
    }, {
        "provinceCode": "300",
        "provinceName": "西藏"
    }, {
        "provinceCode": "320",
        "provinceName": "重庆"
    }];

    M.CITY_MAP = [{
        "cNo": "9017",
        "cName": "北京市",
        "pCode": "10",
        "pName": "北京",
        "cCode": "010"
    }, {
        "cNo": "9264",
        "cName": "上海市",
        "pCode": "20",
        "pName": "上海",
        "cCode": "021"
    }, {
        "cNo": "9281",
        "cName": "天津市",
        "pCode": "30",
        "pName": "天津",
        "cCode": "022"
    }, {
        "cNo": "9095",
        "cName": "石家庄市",
        "pCode": "60",
        "pName": "河北",
        "cCode": "311"
    }, {
        "cNo": "9099",
        "cName": "唐山市",
        "pCode": "60",
        "pName": "河北",
        "cCode": "315"
    }, {
        "cNo": "9104",
        "cName": "秦皇岛市",
        "pCode": "60",
        "pName": "河北",
        "cCode": "335"
    }, {
        "cNo": "9094",
        "cName": "邯郸市",
        "pCode": "60",
        "pName": "河北",
        "cCode": "310"
    }, {
        "cNo": "9103",
        "cName": "邢台市",
        "pCode": "60",
        "pName": "河北",
        "cCode": "319"
    }, {
        "cNo": "9096",
        "cName": "保定市",
        "pCode": "60",
        "pName": "河北",
        "cCode": "312"
    }, {
        "cNo": "9097",
        "cName": "张家口市",
        "pCode": "60",
        "pName": "河北",
        "cCode": "313"
    }, {
        "cNo": "9098",
        "cName": "承德市",
        "pCode": "60",
        "pName": "河北",
        "cCode": "314"
    }, {
        "cNo": "9101",
        "cName": "沧州市",
        "pCode": "60",
        "pName": "河北",
        "cCode": "317"
    }, {
        "cNo": "9100",
        "cName": "廊坊市",
        "pCode": "60",
        "pName": "河北",
        "cCode": "316"
    }, {
        "cNo": "9102",
        "cName": "衡水市",
        "pCode": "60",
        "pName": "河北",
        "cCode": "318"
    }, {
        "cNo": "9325",
        "cName": "重庆市",
        "pCode": "320",
        "pName": "重庆",
        "cCode": "023"
    }, {
        "cNo": "9245",
        "cName": "太原市",
        "pCode": "50",
        "pName": "山西",
        "cCode": "351"
    }, {
        "cNo": "9246",
        "cName": "大同市",
        "pCode": "50",
        "pName": "山西",
        "cCode": "352"
    }, {
        "cNo": "9249",
        "cName": "长治市",
        "pCode": "50",
        "pName": "山西",
        "cCode": "355"
    }, {
        "cNo": "9247",
        "cName": "阳泉市",
        "pCode": "50",
        "pName": "山西",
        "cCode": "353"
    }, {
        "cNo": "9250",
        "cName": "晋城市",
        "pCode": "50",
        "pName": "山西",
        "cCode": "356"
    }, {
        "cNo": "9243",
        "cName": "朔州市",
        "pCode": "50",
        "pName": "山西",
        "cCode": "349"
    }, {
        "cNo": "9248",
        "cName": "晋中市",
        "pCode": "50",
        "pName": "山西",
        "cCode": "354"
    }, {
        "cNo": "9253",
        "cName": "运城市",
        "pCode": "50",
        "pName": "山西",
        "cCode": "359"
    }, {
        "cNo": "9244",
        "cName": "忻州市",
        "pCode": "50",
        "pName": "山西",
        "cCode": "350"
    }, {
        "cNo": "9251",
        "cName": "临汾市",
        "pCode": "50",
        "pName": "山西",
        "cCode": "357"
    }, {
        "cNo": "9252",
        "cName": "吕梁市",
        "pCode": "50",
        "pName": "山西",
        "cCode": "358"
    }, {
        "cNo": "9211",
        "cName": "呼和浩特市",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "471"
    }, {
        "cNo": "9212",
        "cName": "包头市",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "472"
    }, {
        "cNo": "8989",
        "cName": "乌海市",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "473"
    }, {
        "cNo": "10019",
        "cName": "赤峰市",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "476"
    }, {
        "cNo": "9214",
        "cName": "通辽市",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "475"
    }, {
        "cNo": "9215",
        "cName": "鄂尔多斯市",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "477"
    }, {
        "cNo": "9210",
        "cName": "呼伦贝尔市",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "470"
    }, {
        "cNo": "9216",
        "cName": "巴彦淖尔市",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "478"
    }, {
        "cNo": "9213",
        "cName": "乌兰察布市",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "474"
    }, {
        "cNo": "9217",
        "cName": "兴安盟",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "482"
    }, {
        "cNo": "8991",
        "cName": "锡林郭勒盟",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "479"
    }, {
        "cNo": "8998",
        "cName": "阿拉善盟",
        "pCode": "40",
        "pName": "内蒙古",
        "cCode": "483"
    }, {
        "cNo": "9164",
        "cName": "长春市",
        "pCode": "80",
        "pName": "吉林",
        "cCode": "431"
    }, {
        "cNo": "9165",
        "cName": "吉林市",
        "pCode": "80",
        "pName": "吉林",
        "cCode": "432"
    }, {
        "cNo": "9167",
        "cName": "四平市",
        "pCode": "80",
        "pName": "吉林",
        "cCode": "434"
    }, {
        "cNo": "9170",
        "cName": "辽源市",
        "pCode": "80",
        "pName": "吉林",
        "cCode": "437"
    }, {
        "cNo": "9168",
        "cName": "通化市",
        "pCode": "80",
        "pName": "吉林",
        "cCode": "435"
    }, {
        "cNo": "9172",
        "cName": "白山市",
        "pCode": "80",
        "pName": "吉林",
        "cCode": "439"
    }, {
        "cNo": "9171",
        "cName": "松原市",
        "pCode": "80",
        "pName": "吉林",
        "cCode": "438"
    }, {
        "cNo": "9169",
        "cName": "白城市",
        "pCode": "80",
        "pName": "吉林",
        "cCode": "436"
    }, {
        "cNo": "9166",
        "cName": "延边州",
        "pCode": "80",
        "pName": "吉林",
        "cCode": "433"
    }, {
        "cNo": "9122",
        "cName": "哈尔滨市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "451"
    }, {
        "cNo": "9123",
        "cName": "齐齐哈尔市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "452"
    }, {
        "cNo": "9132",
        "cName": "鸡西市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "467"
    }, {
        "cNo": "9128",
        "cName": "大兴安岭地区",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "457"
    }, {
        "cNo": "9133",
        "cName": "鹤岗市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "468"
    }, {
        "cNo": "9134",
        "cName": "双鸭山市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "469"
    }, {
        "cNo": "9130",
        "cName": "大庆市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "459"
    }, {
        "cNo": "9129",
        "cName": "伊春市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "458"
    }, {
        "cNo": "9125",
        "cName": "佳木斯市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "454"
    }, {
        "cNo": "9131",
        "cName": "七台河市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "464"
    }, {
        "cNo": "9124",
        "cName": "牡丹江市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "453"
    }, {
        "cNo": "9127",
        "cName": "黑河市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "456"
    }, {
        "cNo": "9126",
        "cName": "绥化市",
        "pCode": "90",
        "pName": "黑龙江",
        "cCode": "455"
    }, {
        "cNo": "9315",
        "cName": "杭州市",
        "pCode": "130",
        "pName": "浙江",
        "cCode": "571"
    }, {
        "cNo": "9318",
        "cName": "宁波市",
        "pCode": "130",
        "pName": "浙江",
        "cCode": "574"
    }, {
        "cNo": "9321",
        "cName": "温州市",
        "pCode": "130",
        "pName": "浙江",
        "cCode": "577"
    }, {
        "cNo": "9317",
        "cName": "嘉兴市",
        "pCode": "130",
        "pName": "浙江",
        "cCode": "573"
    }, {
        "cNo": "9316",
        "cName": "湖州市",
        "pCode": "130",
        "pName": "浙江",
        "cCode": "572"
    }, {
        "cNo": "9319",
        "cName": "绍兴市",
        "pCode": "130",
        "pName": "浙江",
        "cCode": "575"
    }, {
        "cNo": "9323",
        "cName": "金华市",
        "pCode": "130",
        "pName": "浙江",
        "cCode": "579"
    }, {
        "cNo": "9314",
        "cName": "衢州市",
        "pCode": "130",
        "pName": "浙江",
        "cCode": "570"
    }, {
        "cNo": "9324",
        "cName": "舟山市",
        "pCode": "130",
        "pName": "浙江",
        "cCode": "580"
    }, {
        "cNo": "9320",
        "cName": "台州市",
        "pCode": "130",
        "pName": "浙江",
        "cCode": "576"
    }, {
        "cNo": "9322",
        "cName": "丽水市",
        "pCode": "130",
        "pName": "浙江",
        "cCode": "578"
    }, {
        "cNo": "9001",
        "cName": "合肥市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "551"
    }, {
        "cNo": "9003",
        "cName": "芜湖市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "553"
    }, {
        "cNo": "9002",
        "cName": "蚌埠市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "552"
    }, {
        "cNo": "9004",
        "cName": "淮南市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "554"
    }, {
        "cNo": "9005",
        "cName": "马鞍山市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "555"
    }, {
        "cNo": "9011",
        "cName": "淮北市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "561"
    }, {
        "cNo": "9012",
        "cName": "铜陵市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "562"
    }, {
        "cNo": "9006",
        "cName": "安庆市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "556"
    }, {
        "cNo": "9010",
        "cName": "黄山市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "559"
    }, {
        "cNo": "9000",
        "cName": "滁州市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "550"
    }, {
        "cNo": "9008",
        "cName": "阜阳市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "558"
    }, {
        "cNo": "9007",
        "cName": "宿州市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "557"
    }, {
        "cNo": "9014",
        "cName": "六安市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "564"
    }, {
        "cNo": "9009",
        "cName": "亳州市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "560"
    }, {
        "cNo": "9016",
        "cName": "池州市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "566"
    }, {
        "cNo": "9013",
        "cName": "宣城市",
        "pCode": "110",
        "pName": "安徽",
        "cCode": "563"
    }, {
        "cNo": "9173",
        "cName": "南京市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "025"
    }, {
        "cNo": "9174",
        "cName": "无锡市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "510"
    }, {
        "cNo": "9180",
        "cName": "徐州市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "516"
    }, {
        "cNo": "9183",
        "cName": "常州市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "519"
    }, {
        "cNo": "9176",
        "cName": "苏州市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "512"
    }, {
        "cNo": "9177",
        "cName": "南通市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "513"
    }, {
        "cNo": "9182",
        "cName": "连云港市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "518"
    }, {
        "cNo": "9181",
        "cName": "淮安市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "517"
    }, {
        "cNo": "9179",
        "cName": "盐城市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "515"
    }, {
        "cNo": "9178",
        "cName": "扬州市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "514"
    }, {
        "cNo": "9175",
        "cName": "镇江市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "511"
    }, {
        "cNo": "9184",
        "cName": "泰州市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "523"
    }, {
        "cNo": "9185",
        "cName": "宿迁市",
        "pCode": "100",
        "pName": "江苏",
        "cCode": "527"
    }, {
        "cNo": "9197",
        "cName": "沈阳市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "024"
    }, {
        "cNo": "9199",
        "cName": "大连市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "411"
    }, {
        "cNo": "9200",
        "cName": "鞍山市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "412"
    }, {
        "cNo": "9201",
        "cName": "抚顺市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "413"
    }, {
        "cNo": "9202",
        "cName": "本溪市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "414"
    }, {
        "cNo": "9331",
        "cName": "丹东市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "415"
    }, {
        "cNo": "9203",
        "cName": "锦州市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "416"
    }, {
        "cNo": "9204",
        "cName": "营口市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "417"
    }, {
        "cNo": "9205",
        "cName": "阜新市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "418"
    }, {
        "cNo": "9206",
        "cName": "辽阳市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "419"
    }, {
        "cNo": "9208",
        "cName": "盘锦市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "427"
    }, {
        "cNo": "9198",
        "cName": "铁岭市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "410"
    }, {
        "cNo": "9207",
        "cName": "朝阳市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "421"
    }, {
        "cNo": "9209",
        "cName": "葫芦岛市",
        "pCode": "70",
        "pName": "辽宁",
        "cCode": "429"
    }, {
        "cNo": "9018",
        "cName": "福州市",
        "pCode": "150",
        "pName": "福建",
        "cCode": "591"
    }, {
        "cNo": "9019",
        "cName": "厦门市",
        "pCode": "150",
        "pName": "福建",
        "cCode": "592"
    }, {
        "cNo": "9021",
        "cName": "莆田市",
        "pCode": "150",
        "pName": "福建",
        "cCode": "594"
    }, {
        "cNo": "9025",
        "cName": "三明市",
        "pCode": "150",
        "pName": "福建",
        "cCode": "598"
    }, {
        "cNo": "9022",
        "cName": "泉州市",
        "pCode": "150",
        "pName": "福建",
        "cCode": "595"
    }, {
        "cNo": "9023",
        "cName": "漳州市",
        "pCode": "150",
        "pName": "福建",
        "cCode": "596"
    }, {
        "cNo": "9026",
        "cName": "南平市",
        "pCode": "150",
        "pName": "福建",
        "cCode": "599"
    }, {
        "cNo": "9024",
        "cName": "龙岩市",
        "pCode": "150",
        "pName": "福建",
        "cCode": "597"
    }, {
        "cNo": "9020",
        "cName": "宁德市",
        "pCode": "150",
        "pName": "福建",
        "cCode": "593"
    }, {
        "cNo": "9106",
        "cName": "郑州市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "371"
    }, {
        "cNo": "9113",
        "cName": "开封市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "378"
    }, {
        "cNo": "9114",
        "cName": "洛阳市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "379"
    }, {
        "cNo": "9110",
        "cName": "平顶山市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "375"
    }, {
        "cNo": "9107",
        "cName": "安阳市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "372"
    }, {
        "cNo": "9116",
        "cName": "鹤壁市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "392"
    }, {
        "cNo": "9108",
        "cName": "新乡市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "373"
    }, {
        "cNo": "9115",
        "cName": "焦作市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "391"
    }, {
        "cNo": "9117",
        "cName": "濮阳市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "393"
    }, {
        "cNo": "9109",
        "cName": "许昌市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "374"
    }, {
        "cNo": "9119",
        "cName": "漯河市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "395"
    }, {
        "cNo": "9121",
        "cName": "三门峡市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "398"
    }, {
        "cNo": "9112",
        "cName": "南阳市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "377"
    }, {
        "cNo": "9105",
        "cName": "商丘市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "370"
    }, {
        "cNo": "9111",
        "cName": "信阳市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "376"
    }, {
        "cNo": "9118",
        "cName": "周口市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "394"
    }, {
        "cNo": "9120",
        "cName": "驻马店市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "396"
    }, {
        "cNo": "9999",
        "cName": "济源市",
        "pCode": "180",
        "pName": "河南",
        "cCode": "399"
    }, {
        "cNo": "9188",
        "cName": "南昌市",
        "pCode": "140",
        "pName": "江西",
        "cCode": "791"
    }, {
        "cNo": "9195",
        "cName": "景德镇市",
        "pCode": "140",
        "pName": "江西",
        "cCode": "798"
    }, {
        "cNo": "9196",
        "cName": "萍乡市",
        "pCode": "140",
        "pName": "江西",
        "cCode": "799"
    }, {
        "cNo": "9189",
        "cName": "九江市",
        "pCode": "140",
        "pName": "江西",
        "cCode": "792"
    }, {
        "cNo": "9187",
        "cName": "新余市",
        "pCode": "140",
        "pName": "江西",
        "cCode": "790"
    }, {
        "cNo": "9186",
        "cName": "鹰潭市",
        "pCode": "140",
        "pName": "江西",
        "cCode": "701"
    }, {
        "cNo": "9194",
        "cName": "赣州市",
        "pCode": "140",
        "pName": "江西",
        "cCode": "797"
    }, {
        "cNo": "9193",
        "cName": "吉安市",
        "pCode": "140",
        "pName": "江西",
        "cCode": "796"
    }, {
        "cNo": "9192",
        "cName": "宜春市",
        "pCode": "140",
        "pName": "江西",
        "cCode": "795"
    }, {
        "cNo": "9191",
        "cName": "抚州市",
        "pCode": "140",
        "pName": "江西",
        "cCode": "794"
    }, {
        "cNo": "9190",
        "cName": "上饶市",
        "pCode": "140",
        "pName": "江西",
        "cCode": "793"
    }, {
        "cNo": "9135",
        "cName": "武汉市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "027"
    }, {
        "cNo": "9140",
        "cName": "黄石市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "714"
    }, {
        "cNo": "9145",
        "cName": "十堰市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "719"
    }, {
        "cNo": "9143",
        "cName": "宜昌市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "717"
    }, {
        "cNo": "9136",
        "cName": "襄阳市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "710"
    }, {
        "cNo": "9137",
        "cName": "鄂州市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "711"
    }, {
        "cNo": "9148",
        "cName": "荆门市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "724"
    }, {
        "cNo": "9138",
        "cName": "孝感市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "712"
    }, {
        "cNo": "9142",
        "cName": "荆州市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "716"
    }, {
        "cNo": "9139",
        "cName": "黄冈市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "713"
    }, {
        "cNo": "9141",
        "cName": "咸宁市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "715"
    }, {
        "cNo": "9147",
        "cName": "随州市",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "722"
    }, {
        "cNo": "9144",
        "cName": "恩施州",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "718"
    }, {
        "cNo": "9149",
        "cName": "湖北省直辖",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "728"
    }, {
        "cNo": "9146",
        "cName": "神农架",
        "pCode": "170",
        "pName": "湖北",
        "cCode": "720"
    }, {
        "cNo": "9227",
        "cName": "济南市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "531"
    }, {
        "cNo": "9228",
        "cName": "青岛市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "532"
    }, {
        "cNo": "9229",
        "cName": "淄博市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "533"
    }, {
        "cNo": "9239",
        "cName": "枣庄市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "632"
    }, {
        "cNo": "9237",
        "cName": "东营市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "546"
    }, {
        "cNo": "9231",
        "cName": "烟台市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "535"
    }, {
        "cNo": "9232",
        "cName": "潍坊市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "536"
    }, {
        "cNo": "9233",
        "cName": "济宁市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "537"
    }, {
        "cNo": "9234",
        "cName": "泰安市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "538"
    }, {
        "cNo": "9238",
        "cName": "威海市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "631"
    }, {
        "cNo": "9240",
        "cName": "日照市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "633"
    }, {
        "cNo": "9241",
        "cName": "莱芜市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "634"
    }, {
        "cNo": "9235",
        "cName": "临沂市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "539"
    }, {
        "cNo": "9230",
        "cName": "德州市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "534"
    }, {
        "cNo": "9242",
        "cName": "聊城市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "635"
    }, {
        "cNo": "9236",
        "cName": "滨州市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "543"
    }, {
        "cNo": "9226",
        "cName": "菏泽市",
        "pCode": "120",
        "pName": "山东",
        "cCode": "530"
    }, {
        "cNo": "9151",
        "cName": "长沙市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "731"
    }, {
        "cNo": "9153",
        "cName": "株洲市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "733"
    }, {
        "cNo": "9152",
        "cName": "湘潭市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "732"
    }, {
        "cNo": "9154",
        "cName": "衡阳市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "734"
    }, {
        "cNo": "9159",
        "cName": "邵阳市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "739"
    }, {
        "cNo": "9150",
        "cName": "岳阳市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "730"
    }, {
        "cNo": "9156",
        "cName": "常德市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "736"
    }, {
        "cNo": "9161",
        "cName": "张家界市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "744"
    }, {
        "cNo": "9157",
        "cName": "益阳市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "737"
    }, {
        "cNo": "9155",
        "cName": "郴州市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "735"
    }, {
        "cNo": "9163",
        "cName": "永州市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "746"
    }, {
        "cNo": "9162",
        "cName": "怀化市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "745"
    }, {
        "cNo": "9158",
        "cName": "娄底市",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "738"
    }, {
        "cNo": "9160",
        "cName": "湘西州",
        "pCode": "160",
        "pName": "湖南",
        "cCode": "743"
    }, {
        "cNo": "9041",
        "cName": "广州市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "020"
    }, {
        "cNo": "9047",
        "cName": "韶关市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "751"
    }, {
        "cNo": "9051",
        "cName": "深圳市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "755"
    }, {
        "cNo": "9061",
        "cName": "东莞市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "769"
    }, {
        "cNo": "9052",
        "cName": "珠海市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "756"
    }, {
        "cNo": "9050",
        "cName": "汕头市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "754"
    }, {
        "cNo": "9053",
        "cName": "佛山市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "757"
    }, {
        "cNo": "9046",
        "cName": "江门市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "750"
    }, {
        "cNo": "9055",
        "cName": "湛江市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "759"
    }, {
        "cNo": "9045",
        "cName": "茂名市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "668"
    }, {
        "cNo": "9054",
        "cName": "肇庆市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "758"
    }, {
        "cNo": "9048",
        "cName": "惠州市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "752"
    }, {
        "cNo": "9049",
        "cName": "梅州市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "753"
    }, {
        "cNo": "9042",
        "cName": "汕尾市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "660"
    }, {
        "cNo": "9057",
        "cName": "河源市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "762"
    }, {
        "cNo": "9043",
        "cName": "阳江市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "662"
    }, {
        "cNo": "9058",
        "cName": "清远市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "763"
    }, {
        "cNo": "9060",
        "cName": "潮州市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "768"
    }, {
        "cNo": "9044",
        "cName": "揭阳市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "663"
    }, {
        "cNo": "9059",
        "cName": "云浮市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "766"
    }, {
        "cNo": "9056",
        "cName": "中山市",
        "pCode": "190",
        "pName": "广东",
        "cCode": "760"
    }, {
        "cNo": "9063",
        "cName": "南宁市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "771"
    }, {
        "cNo": "9065",
        "cName": "柳州市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "772"
    }, {
        "cNo": "9067",
        "cName": "桂林市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "773"
    }, {
        "cNo": "9068",
        "cName": "梧州市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "774"
    }, {
        "cNo": "9075",
        "cName": "北海市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "779"
    }, {
        "cNo": "9062",
        "cName": "防城港市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "770"
    }, {
        "cNo": "9073",
        "cName": "钦州市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "777"
    }, {
        "cNo": "9070",
        "cName": "贵港市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "775"
    }, {
        "cNo": "9071",
        "cName": "玉林市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "783"
    }, {
        "cNo": "9072",
        "cName": "百色市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "776"
    }, {
        "cNo": "9069",
        "cName": "贺州市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "782"
    }, {
        "cNo": "9074",
        "cName": "河池市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "778"
    }, {
        "cNo": "9066",
        "cName": "来宾市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "781"
    }, {
        "cNo": "9064",
        "cName": "崇左市",
        "pCode": "210",
        "pName": "广西",
        "cCode": "780"
    }, {
        "cNo": "9076",
        "cName": "贵阳市",
        "pCode": "220",
        "pName": "贵州",
        "cCode": "851"
    }, {
        "cNo": "9083",
        "cName": "六盘水市",
        "pCode": "220",
        "pName": "贵州",
        "cCode": "858"
    }, {
        "cNo": "9077",
        "cName": "遵义市",
        "pCode": "220",
        "pName": "贵州",
        "cCode": "852"
    }, {
        "cNo": "9078",
        "cName": "安顺市",
        "pCode": "220",
        "pName": "贵州",
        "cCode": "853"
    }, {
        "cNo": "9082",
        "cName": "毕节市",
        "pCode": "220",
        "pName": "贵州",
        "cCode": "857"
    }, {
        "cNo": "9081",
        "cName": "铜仁市",
        "pCode": "220",
        "pName": "贵州",
        "cCode": "856"
    }, {
        "cNo": "9084",
        "cName": "黔西南州",
        "pCode": "220",
        "pName": "贵州",
        "cCode": "859"
    }, {
        "cNo": "9080",
        "cName": "黔东南州",
        "pCode": "220",
        "pName": "贵州",
        "cCode": "855"
    }, {
        "cNo": "9079",
        "cName": "黔南州",
        "pCode": "220",
        "pName": "贵州",
        "cCode": "854"
    }, {
        "cNo": "9085",
        "cName": "海口市",
        "pCode": "200",
        "pName": "海南",
        "cCode": "898"
    }, {
        "cNo": "9089",
        "cName": "三亚市",
        "pCode": "200",
        "pName": "海南",
        "cCode": "897"
    }, {
        "cNo": "9336",
        "cName": "三沙市",
        "pCode": "200",
        "pName": "海南",
        "cCode": "890"
    }, {
        "cNo": "9092",
        "cName": "东方市",
        "pCode": "200",
        "pName": "海南",
        "cCode": "891"
    }, {
        "cNo": "9091",
        "cName": "儋州市",
        "pCode": "200",
        "pName": "海南",
        "cCode": "892"
    }, {
        "cNo": "9093",
        "cName": "海南省直辖",
        "pCode": "200",
        "pName": "海南",
        "cCode": "899"
    }, {
        "cNo": "9086",
        "cName": "琼海市",
        "pCode": "200",
        "pName": "海南",
        "cCode": "896"
    }, {
        "cNo": "9088",
        "cName": "万宁市",
        "pCode": "200",
        "pName": "海南",
        "cCode": "894"
    }, {
        "cNo": "9090",
        "cName": "五指山市",
        "pCode": "200",
        "pName": "海南",
        "cCode": "893"
    }, {
        "cNo": "9087",
        "cName": "文昌市",
        "pCode": "200",
        "pName": "海南",
        "cCode": "895"
    }, {
        "cNo": "9301",
        "cName": "昆明市",
        "pCode": "240",
        "pName": "云南",
        "cCode": "871"
    }, {
        "cNo": "9304",
        "cName": "曲靖市",
        "pCode": "240",
        "pName": "云南",
        "cCode": "874"
    }, {
        "cNo": "9307",
        "cName": "玉溪市",
        "pCode": "240",
        "pName": "云南",
        "cCode": "877"
    }, {
        "cNo": "9305",
        "cName": "保山市",
        "pCode": "240",
        "pName": "云南",
        "cCode": "875"
    }, {
        "cNo": "9302",
        "cName": "大理州",
        "pCode": "240",
        "pName": "云南",
        "cCode": "872"
    }, {
        "cNo": "9299",
        "cName": "德宏州",
        "pCode": "240",
        "pName": "云南",
        "cCode": "692"
    }, {
        "cNo": "9312",
        "cName": "迪庆州",
        "pCode": "240",
        "pName": "云南",
        "cCode": "887"
    }, {
        "cNo": "9300",
        "cName": "昭通市",
        "pCode": "240",
        "pName": "云南",
        "cCode": "870"
    }, {
        "cNo": "9313",
        "cName": "丽江市",
        "pCode": "240",
        "pName": "云南",
        "cCode": "888"
    }, {
        "cNo": "9309",
        "cName": "普洱市",
        "pCode": "240",
        "pName": "云南",
        "cCode": "879"
    }, {
        "cNo": "9310",
        "cName": "临沧市",
        "pCode": "240",
        "pName": "云南",
        "cCode": "883"
    }, {
        "cNo": "9303",
        "cName": "红河州",
        "pCode": "240",
        "pName": "云南",
        "cCode": "873"
    }, {
        "cNo": "9308",
        "cName": "楚雄州",
        "pCode": "240",
        "pName": "云南",
        "cCode": "878"
    }, {
        "cNo": "9311",
        "cName": "怒江州",
        "pCode": "240",
        "pName": "云南",
        "cCode": "886"
    }, {
        "cNo": "9306",
        "cName": "文山州",
        "pCode": "240",
        "pName": "云南",
        "cCode": "876"
    }, {
        "cNo": "9298",
        "cName": "西双版纳州",
        "pCode": "240",
        "pName": "云南",
        "cCode": "691"
    }, {
        "cNo": "9265",
        "cName": "成都市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "028"
    }, {
        "cNo": "9267",
        "cName": "自贡市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "813"
    }, {
        "cNo": "9266",
        "cName": "攀枝花市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "812"
    }, {
        "cNo": "9273",
        "cName": "泸州市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "830"
    }, {
        "cNo": "9279",
        "cName": "德阳市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "838"
    }, {
        "cNo": "9268",
        "cName": "绵阳市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "816"
    }, {
        "cNo": "9280",
        "cName": "广元市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "839"
    }, {
        "cNo": "9271",
        "cName": "遂宁市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "825"
    }, {
        "cNo": "9275",
        "cName": "内江市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "832"
    }, {
        "cNo": "9277",
        "cName": "乐山市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "841"
    }, {
        "cNo": "9269",
        "cName": "南充市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "817"
    }, {
        "cNo": "9278",
        "cName": "眉山市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "833"
    }, {
        "cNo": "9274",
        "cName": "宜宾市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "831"
    }, {
        "cNo": "9272",
        "cName": "广安市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "826"
    }, {
        "cNo": "9270",
        "cName": "达州市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "818"
    }, {
        "cNo": "8984",
        "cName": "雅安市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "835"
    }, {
        "cNo": "8990",
        "cName": "巴中市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "827"
    }, {
        "cNo": "9276",
        "cName": "资阳市",
        "pCode": "230",
        "pName": "四川",
        "cCode": "840"
    }, {
        "cNo": "8981",
        "cName": "凉山州",
        "pCode": "230",
        "pName": "四川",
        "cCode": "834"
    }, {
        "cNo": "8980",
        "cName": "甘孜州",
        "pCode": "230",
        "pName": "四川",
        "cCode": "836"
    }, {
        "cNo": "8979",
        "cName": "阿坝州",
        "pCode": "230",
        "pName": "四川",
        "cCode": "837"
    }, {
        "cNo": "9254",
        "cName": "西安市",
        "pCode": "250",
        "pName": "陕西",
        "cCode": "029"
    }, {
        "cNo": "9263",
        "cName": "铜川市",
        "pCode": "250",
        "pName": "陕西",
        "cCode": "919"
    }, {
        "cNo": "9262",
        "cName": "宝鸡市",
        "pCode": "250",
        "pName": "陕西",
        "cCode": "917"
    }, {
        "cNo": "9255",
        "cName": "咸阳市",
        "pCode": "250",
        "pName": "陕西",
        "cCode": "910"
    }, {
        "cNo": "9258",
        "cName": "渭南市",
        "pCode": "250",
        "pName": "陕西",
        "cCode": "913"
    }, {
        "cNo": "9256",
        "cName": "延安市",
        "pCode": "250",
        "pName": "陕西",
        "cCode": "911"
    }, {
        "cNo": "9261",
        "cName": "汉中市",
        "pCode": "250",
        "pName": "陕西",
        "cCode": "916"
    }, {
        "cNo": "9257",
        "cName": "榆林市",
        "pCode": "250",
        "pName": "陕西",
        "cCode": "912"
    }, {
        "cNo": "9260",
        "cName": "安康市",
        "pCode": "250",
        "pName": "陕西",
        "cCode": "915"
    }, {
        "cNo": "9259",
        "cName": "商洛市",
        "pCode": "250",
        "pName": "陕西",
        "cCode": "914"
    }, {
        "cNo": "9028",
        "cName": "兰州市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "931"
    }, {
        "cNo": "9036",
        "cName": "嘉峪关市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "942"
    }, {
        "cNo": "9032",
        "cName": "金昌市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "940"
    }, {
        "cNo": "9040",
        "cName": "白银市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "943"
    }, {
        "cNo": "9037",
        "cName": "天水市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "938"
    }, {
        "cNo": "9033",
        "cName": "武威市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "935"
    }, {
        "cNo": "9034",
        "cName": "张掖市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "936"
    }, {
        "cNo": "9030",
        "cName": "平凉市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "933"
    }, {
        "cNo": "9035",
        "cName": "酒泉市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "937"
    }, {
        "cNo": "9031",
        "cName": "庆阳市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "934"
    }, {
        "cNo": "9029",
        "cName": "定西市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "932"
    }, {
        "cNo": "9027",
        "cName": "临夏州",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "930"
    }, {
        "cNo": "9038",
        "cName": "陇南市",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "939"
    }, {
        "cNo": "9039",
        "cName": "甘南州",
        "pCode": "260",
        "pName": "甘肃",
        "cCode": "941"
    }, {
        "cNo": "8999",
        "cName": "拉萨市",
        "pCode": "300",
        "pName": "西藏",
        "cCode": "089"
    }, {
        "cNo": "8992",
        "cName": "日喀则地区",
        "pCode": "300",
        "pName": "西藏",
        "cCode": "092"
    }, {
        "cNo": "8996",
        "cName": "山南地区",
        "pCode": "300",
        "pName": "西藏",
        "cCode": "091"
    }, {
        "cNo": "8997",
        "cName": "昌都地区",
        "pCode": "300",
        "pName": "西藏",
        "cCode": "090"
    }, {
        "cNo": "8993",
        "cName": "林芝地区",
        "pCode": "300",
        "pName": "西藏",
        "cCode": "095"
    }, {
        "cNo": "8995",
        "cName": "那曲地区",
        "pCode": "300",
        "pName": "西藏",
        "cCode": "093"
    }, {
        "cNo": "8994",
        "cName": "阿里地区",
        "pCode": "300",
        "pName": "西藏",
        "cCode": "094"
    }, {
        "cNo": "9326",
        "cName": "银川市",
        "pCode": "270",
        "pName": "宁夏",
        "cCode": "951"
    }, {
        "cNo": "9327",
        "cName": "石嘴山市",
        "pCode": "270",
        "pName": "宁夏",
        "cCode": "952"
    }, {
        "cNo": "9328",
        "cName": "吴忠市",
        "pCode": "270",
        "pName": "宁夏",
        "cCode": "953"
    }, {
        "cNo": "9329",
        "cName": "中卫市",
        "pCode": "270",
        "pName": "宁夏",
        "cCode": "955"
    }, {
        "cNo": "9332",
        "cName": "固原市",
        "pCode": "270",
        "pName": "宁夏",
        "cCode": "954"
    }, {
        "cNo": "9219",
        "cName": "西宁市",
        "pCode": "280",
        "pName": "青海",
        "cCode": "971"
    }, {
        "cNo": "9225",
        "cName": "海西州",
        "pCode": "280",
        "pName": "青海",
        "cCode": "979"
    }, {
        "cNo": "9223",
        "cName": "果洛州",
        "pCode": "280",
        "pName": "青海",
        "cCode": "975"
    }, {
        "cNo": "9220",
        "cName": "海东地区",
        "pCode": "280",
        "pName": "青海",
        "cCode": "972"
    }, {
        "cNo": "9218",
        "cName": "海北州",
        "pCode": "280",
        "pName": "青海",
        "cCode": "970"
    }, {
        "cNo": "9222",
        "cName": "海南州",
        "pCode": "280",
        "pName": "青海",
        "cCode": "974"
    }, {
        "cNo": "9221",
        "cName": "黄南州",
        "pCode": "280",
        "pName": "青海",
        "cCode": "973"
    }, {
        "cNo": "9224",
        "cName": "玉树州",
        "pCode": "280",
        "pName": "青海",
        "cCode": "976"
    }, {
        "cNo": "9289",
        "cName": "乌鲁木齐市",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "991"
    }, {
        "cNo": "9288",
        "cName": "克拉玛依市",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "990"
    }, {
        "cNo": "9293",
        "cName": "吐鲁番地区",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "995"
    }, {
        "cNo": "9283",
        "cName": "哈密地区",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "902"
    }, {
        "cNo": "9292",
        "cName": "昌吉州",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "994"
    }, {
        "cNo": "9287",
        "cName": "博尔塔拉州",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "909"
    }, {
        "cNo": "9295",
        "cName": "阿克苏地区",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "997"
    }, {
        "cNo": "9294",
        "cName": "巴音郭楞州",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "996"
    }, {
        "cNo": "9286",
        "cName": "克孜勒苏州",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "908"
    }, {
        "cNo": "9297",
        "cName": "喀什地区",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "998"
    }, {
        "cNo": "9284",
        "cName": "和田地区",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "903"
    }, {
        "cNo": "9282",
        "cName": "塔城地区",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "901"
    }, {
        "cNo": "9285",
        "cName": "阿勒泰地区",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "906"
    }, {
        "cNo": "9334",
        "cName": "五家渠市",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "989"
    }, {
        "cNo": "9335",
        "cName": "图木舒克市",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "988"
    }, {
        "cNo": "9291",
        "cName": "石河子市",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "993"
    }, {
        "cNo": "9296",
        "cName": "阿拉尔市",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "999"
    }, {
        "cNo": "9290",
        "cName": "伊犁州",
        "pCode": "290",
        "pName": "新疆",
        "cCode": "992"
    }]



    M.Geo = function(opts) {
        var stream = weex.requireModule('stream');
        var Geo = {}

        // var Geo = function(callback, withAlert) {
        var self = Geo
        Geo.callback = opts.callback;

        Geo.isGeo = false;
        var base = opts.base

        Geo.alertFlag = (typeof opts.alert == "undefined") ? true : false;


        //定位出来的默认值
        Geo._postDataDefault = {
            "location": {
                "lng": 118.88776039999993,
                "lat": 32.08958282685081
            },
            "formatted_address": "",
            "business": "",
            "addressComponent": {
                "city": "南京市",
                "district": "玄武区",
                "province": "江苏省",
                "street": "",
                "street_number": ""
            },
            "cityCode": '025',
            "cityNo": "9173",
            "provinceCode": "100",
            'cityName': '南京市',
            'provinceName': '江苏省',
            'geoType': 'default'
        };


        Geo.fn = {
                locationError: function(error) {
                    Geo.isGeo = true;
                    switch (error.code) {
                        case error.TIMEOUT:
                            Geo.fn.getPositionByIp(Geo.alertFlag);
                            break;
                        case error.POSITION_UNAVAILABLE:
                            // 无法定位
                            Geo.fn.getPositionByIp(Geo.alertFlag);
                            break;
                        case error.PERMISSION_DENIED:
                            // 对网站永久拒绝定位服务或者暂时拒绝定位服务
                            Geo.fn.getPositionByIp(false);
                            break;
                        case error.UNKNOWN_ERROR:
                            Geo.fn.getPositionByIp(Geo.alertFlag);
                            break;
                        default:
                            Geo.fn.getPositionByIp(Geo.alertFlag);
                            break;
                    }
                },
                showPosition: function(position, webview) {

                    var self = Geo;
                    self.isGeo = true;

                    //alert(position.coords.latitude + '------'+position.coords.longitude);
                    var pos = {
                        lati: position.coords.latitude,
                        longi: position.coords.longitude
                    };


                    stream.fetch({
                        type: "GET",
                        url: "https://api.map.baidu.com/geocoder/v2/?ak=358795dcf3df541d1551c0cd052aee95&callback=jsonpCallbackBaidu&location=" + pos.lati + "," + pos.longi + "&output=json&pois=0",
                        type: "jsonp",
                        jsonpCallback: "jsonpCallbackBaidu",
                    }, function(posData) {
                        var posData = posData.data
                        if (self.alertFlag == true) {
                            if (typeof Wap.AlertBox == "undefined") {
                                alert("当前定位的城市为" + posData.result.addressComponent.city)
                            } else {
                                Wap.AlertBox({
                                    type: "mini",
                                    msg: "当前定位的城市为" + posData.result.addressComponent.city
                                });
                            }
                        }

                        M.CITY_MAP.forEach(function(item, index) {

                            var cityName = posData.result.addressComponent.city.slice(0, -1);

                            if (item.cName.indexOf(cityName) > -1) {

                                posData.result.cityNo = item.cNo;
                                posData.result.provinceCode = item.pCode;
                                posData.result.cityName = item.cName;
                                posData.result.cityCode = item.cCode;
                                posData.result.provinceName = item.pName;
                                if (!webview) {
                                    posData.result.geoType = "gps"
                                } else {
                                    posData.result.geoType = webview
                                }
                                // posData.result.geoType = "gps"
                                // console.log(posData.result)
                                self.callback(posData.result);
                                return false;

                            }
                        });

                    }, function() {
                        Geo.fn.getPositionByIp(self.alertFlag);
                    })

                },
                getPositionByIp: function(isAlert) {

                    Geo.isGeo = true;
                    var _this = Geo;

                    setTimeout(function() {
                        stream.fetch({
                            type: "GET",
                            url: "//ipservice.suning.com/ipQuery.do",
                            type: "jsonp",
                            jsonpCallback: "jsonpCallbackIp",
                        }, function(ipData) {
                            var ipData = ipData.data
                            if (ipData.status != 0) {
                                _this._postDataDefault.cityNo = ipData.cityCommerceId;
                                _this._postDataDefault.provinceCode = ipData.provinceCommerceId;
                                _this._postDataDefault.cityName = ipData.cityName;
                                _this._postDataDefault.cityCode = ipData.cityLESId;
                                _this._postDataDefault.provinceName = ipData.provinceName;
                                _this._postDataDefault.ipData = ipData
                                _this._postDataDefault.geoType = "ip"
                            }

                            if (isAlert == true) {
                                if (typeof Wap.AlertBox == "undefined") {
                                    alert("当前定位城市为" + _this._postDataDefault.cityName)
                                } else {
                                    Wap.AlertBox({
                                        type: "mini",
                                        msg: "当前定位城市为" + _this._postDataDefault.cityName
                                    });
                                }
                            }

                            _this.callback(_this._postDataDefault);
                        }, function() {
                            if (isAlert == true) {
                                if (typeof Wap.AlertBox == "undefined") {
                                    alert("很抱歉无法定位当前城市")
                                } else {
                                    Wap.AlertBox({
                                        type: "mini",
                                        msg: "很抱歉无法定位当前城市"
                                    });
                                }
                            }
                            _this.callback(_this._postDataDefault);
                        })

                    }, 100);

                },
                /**
                 * H5 Nav定位出错处理。过2秒后，扫描是否定位到数据，没有定位到，走IP定位
                 */
                navError: function() {

                    var _this = Geo;
                    setTimeout(function() {
                        if (!_this.isGeo) {
                            console.log("您的手机浏览器无法正确获取定位信息")
                            _this.fn.getPositionByIp(_this.alertFlag);
                        }
                    }, 5000)
                }

        }



        //不支持导航定位，采用IP定位
        if (!navigator.geolocation) {
            Geo.fn.getPositionByIp(Geo.alertFlag);
        } else {
            if (navigator.userAgent.match(/MicroMessenger/i)) {
                base.h5.loadScript('//res.suning.cn/public/v5/mod/weixin/sdk.js').then(function() {
                    wxSDK(base).then(function(wx) {
                        wx.getLocation({
                            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                            success: function(res) {
                                var pos = {}
                                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                                var speed = res.speed; // 速度，以米/每秒计
                                var accuracy = res.accuracy; // 位置精度
                                // var pos = {
                                //     lati: position.coords.latitude,
                                //     longi: position.coords.longitude
                                // };
                                pos.coords = res
                                Geo.fn.showPosition(pos, 'wechat')
                            }
                        });
                    }).catch(function() {
                        navigator.geolocation.getCurrentPosition(Geo.fn.showPosition, Geo.fn.locationError, {
                            timeout: 3000,
                            maximumAge: 86400000
                        });
                    })
                })
            } else {
                if (base.isApp()) {
                    base.h5.AppReady().then(function(bridge) {
                        bridge.api.getClientInfo(function(info) {
                            self.isGeo = true;

                            M.CITY_MAP.forEach(function(item, index) {


                                if (info.cityCode == item.cNo) {

                                    var result = {}
                                    result.cityNo = item.cNo;
                                    result.provinceCode = item.pCode;
                                    result.cityName = item.cName;
                                    result.cityCode = item.cCode;
                                    result.provinceName = item.pName;
                                    result.clientInfo = info;
                                    result.geoType = "app"

                                    self.callback(result);

                                    return false;

                                }
                            });

                            
                        })
                    })

                } else {
                        //采用导航定位
                    navigator.geolocation.getCurrentPosition(Geo.fn.showPosition, Geo.fn.locationError, {
                        timeout: 3000,
                        maximumAge: 86400000
                    });

                }
            }

        }
        Geo.fn.navError();

    }

}(window.Wap = window.Wap || {}, window));