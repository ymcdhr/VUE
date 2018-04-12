<!--组件的使用示例-->
<template>
	<div class="father-mod">



		<!--横向滚动-->
		<p class="info">横向滚动广告</p>
		<sn-slip :list="slipList"></sn-slip>



		<!--滑动联版-->
		<p class="info">滑动联版广告</p>
		<sn-swipe :list="swipeList"></sn-swipe>



		<!--滑动联版-->
		<p class="info" timer="10000">滑动联版广告</p>
		<sn-banner></sn-banner>





	</div>
</template>

<script>

export default {
	data() {
		return {
			modData: '2、父组件传给子组件的值',
	
			//联版数据
			swipeList: [
				{ url: "//image4.suning.cn/uimg/MFS/show/150097189354276844.jpg" },
				{ url: "//image4.suning.cn/uimg/MFS/show/150097325360958549.jpg" },
				{ url: "//image4.suning.cn/uimg/MFS/show/150097376771784636.jpg" }
			],

			//滑动广告数据
			slipList: [
				{ url: "//image4.suning.cn/uimg/MFS/show/150097189354276844.jpg" },
				{ url: "//image4.suning.cn/uimg/MFS/show/150097325360958549.jpg" },
				{ url: "//image4.suning.cn/uimg/MFS/show/150097376771784636.jpg" }
			]
		}
	},
	// 初始化引入子组件,两种引入方式，写法二:
	components: {
		'sn-swipe': require('./sn-swipe.vue'),
		'sn-banner': require('./sn-banner.vue'),
		'sn-slip': require('./sn-slip.vue')
		


	},

	methods: {
		beforeStart() {
			console.log("beforeStart，开始前");
		}
	}
}
</script>

<style>
/* 引入外部css的方法 */


/* @import "//res.suning.cn/public/v5/common/2.0.0/m-common.css"; */

.info {
	padding: .4rem 0;
	margin: .4rem 0;
}

.father-mod {
	font-size: .6rem
}
</style>