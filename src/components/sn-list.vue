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

.sn-list-common li:last-child{
	border-bottom: 1px solid #f00099; 
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
						<div class="pro-img"><img :src="content.imgUrl" alt=""></div>
						<div class="pro-info wbox-flex">
							<div class="pro-name">苹果 手机 iPhone5S (16GB) (金)移动版苹果首款 4G移动版手机，支持TD-LTE 4G网络，带你全速进入4G时代！完美机身，引领潮流！苏宁同步首发！！！</div>
							<div class="snPrice">¥4899.00</div>
							<div class="list-opra sn-txt-muted">数量：12</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>

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
			pageNum: 0,
			list: [
					{
						elementName: "测试数据1",
						elementDesc: "测试数据描述1",
						imgUrl: "//image4.suning.cn/uimg/MFS/show/150097189354276844.jpg"
					},
					{
						elementName: "测试数据2",
						elementDesc: "测试数据描述2",
						imgUrl: "//image1.suning.cn/uimg/MFS/show/150303762848888336_340x340.jpg"
					}
			]
		}
	  },
	  mounted(){
	  	
	  },
	  methods:{
	  	
  	  }
  }
</script>