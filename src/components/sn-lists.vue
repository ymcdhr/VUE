<style>
.pro-list {
    padding: .4rem
}

.pro-list .pro-img {
    margin-right: .4rem
}

.pro-list .pro-img img {
    width: 2.4rem;
    height: 2.4rem;
    display: block;
    border: 1px solid #DCDCDC
}

.sn-list-common li,.sn-list-input li {
    position: relative;
    display: -webkit-box
}

.pro-list .pro-name {
    line-height: .7rem;
    overflow: hidden;
    margin-bottom: .32rem
}

.pro-list .pro-info {
    position: relative;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    text-align: left;
}

.pro-list .pro-info .list-opra {
    position: absolute;
    right: 0;
    bottom: 0
}

.sn-list-common{
	background-color: #FFFFFF;
}

.sn-list-common li {
    border-bottom: 1px solid #DCDCDC
}

.sn-list-common li:last-child {
    border-bottom: none
}

.sn-list-input label.input-text {
    height: 1.2rem;
    line-height: 1.2rem
}

.sn-list-input li {
    margin-left: .6rem;
    padding: .5rem .6rem .5rem 0;
    border-bottom: 1px solid #DCDCDC
}

.sn-list-input li:last-child {
    border-bottom: none
}

.sn-list-div {
    position: relative;
    padding: .6rem;
    border-bottom: 1px solid #E0E0E0
}

.sn-list-div a {
    display: block
}

.sn-list-div a:after {
    content: "";
    display: inline-block;
    position: absolute;
    right: .4rem;
    top: 50%;
    margin-top: -.16rem;
    width: .28rem;
    height: .28rem;
    border-style: solid;
    border-color: #7D7D7D;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotateZ(135deg)
}
</style>

<template>
	<div>
		<ul class="sn-list-common">
			<li v-for="(content,idx) in list" :key="idx">
				<div class="wbox-flex">
					<div class="wbox pro-list">
						<div class="pro-img"><img :src="content.hgContent.smallImageUrl" alt=""></div>
						<div class="pro-info wbox-flex">
							<div class="pro-name">苹果 手机 iPhone5S (16GB) (金)移动版苹果首款 4G移动版手机，支持TD-LTE 4G网络，带你全速进入4G时代！完美机身，引领潮流！苏宁同步首发！！！</div>
							<div class="snPrice">¥4899.00</div>
							<div class="list-opra sn-txt-muted">数量：12</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<!-- onScroll滑动事件后回调方法，参数为组件的顶部位置 -->
		<sn-loading :status="loadStatus" @onscroll="onScroll"></sn-loading>
	</div>
</template>

<script>
	const Common = require('../../module/common.js');

	export default {
	  props:{
	  	  listid: {
	  	  	type: Array,
	  	  	default: () => {
	  	  		return [];
	  	  	}
  	  	 }
	  },
	  data () {
	    return {
			pageNum: 1,
			pageSize: 10,
			// url: `//show.m.suning.com/higou/hotContent/jsonpNew/listPageNew_HG_BQ_001_{pageNum}_{pageSize}_{callback}.html`,
			url: `//show.m.suning.com/higou/enroll/jsonp/listEnroll_100413_{pageNum}_{pageSize}_{callback}.do`,
			list: [],
			loadStatus: ''//默认值为空
		}
	  },
	  components:{
		'sn-loading': require('./sn-loading.vue')
	  },
	  mounted(){
		  this.getData();
		//   this.pageScroll();
	  },
	  methods:{
	  	getData(){
			let callback = "cntCallback",
				url = this.url
					.replace("{pageNum}",this.pageNum)
					.replace("{pageSize}",this.pageSize)
					.replace("{callback}",callback);

			this.loadStatus = 'loading';

			Common.fetch({
				url: url,
				type: "jsonp",
				jsonpCallback: callback,
				callback: (res)=>{
					if(!res.data.data.content.length || res.data.data.content.length<this.pageSize){
						this.loadStatus = 'done';
					}
					else{
						this.list = this.list.concat(res.data.data.content);
						this.pageNum++;
						this.loadStatus = '';
					}
				}
			});
		},

		onScroll(callback){
			callback((loadmore) => {

				//分页加载更多
				if(loadmore){
					this.getData();
				}

			});
		}
  	  }
  }
</script>