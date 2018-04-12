<!--组件的使用示例-->
<template>
	<div class="father-mod">


		<!--tab组件，tab和tab-item分开用-->
		<p class="info">tab组件，tab和tab-item分开用</p>
		<!-- tab的列表 -->
		<tab @tabChange="tabChange">
			<tab-item v-for="(tab,idx) in tabList" :key="idx" :idx="idx">
				{{tab.name}}
			</tab-item>
		</tab>
		<!-- tab数据列表 -->
		 <div class="cate">		
			<div :class="['cate-box',tabIndex==idx?'':'hide']" :cate-id="tab.id" v-for="(tab,idx) in tabList" :key="idx"> 
				<sn-list></sn-list> 
			</div>   
		</div> 



	</div>
</template>

<script>


export default {
	data() {
		return {
			modData: '2、父组件传给子组件的值',
			
			//滑动数据
			tabIndex: 0,
			tabList: [
				{ id: "id1", name: "畅销排行", trickPoint: "name1" },
				{ id: "id2", name: "手机", trickPoint: "name2" },
				{ id: "id3", name: "电脑", trickPoint: "name3" },
				{ id: "id4", name: "数码", trickPoint: "name4" },
				{ id: "id5", name: "手机配件", trickPoint: "name5" },
				{ id: "id6", name: "电脑外设", trickPoint: "name6" }
			],
			tabOpts: {
				scrollX: true,
				scrollY: false,
				click: false,
				useTransform: true,
				preventDefaultException: {
					tagName: /.*/
				},
				eventpassthrough: true
			},

			//项目中直接设置变量值改变sn-loading的展示效果
			loadStatus: "loading"

		}
	},
	// 初始化引入子组件,两种引入方式，写法二:
	components: {
	
		'sn-list': require('./sn-list.vue'),
		'sn-lists': require('./sn-lists.vue'),
		'tab': require('./tab'),
		'tab-item': require('./tab-item')

	},

	methods: {
		/**
		 * tab切换回调方法
		 */
		tabChange(obj) {
			// obj:{index: 1, id: "id2"}
			console.log("tabChange:", obj);
			this.tabIndex = obj.index;
		},
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



.sn-btn.sn-btn-positive {
	background: #ffc001;
	color: #fff;
}

.sn-btn.sn-btn-big {
	height: 1.56rem;
	line-height: 1.56rem;
	font-size: .6rem;
}

.sn-btn.sn-btn-block {
	display: block;
}

.sn-btn {
	display: inline-block;
	padding: 0 .5rem;
	height: 1.2rem;
	line-height: 1.2rem;
	border-radius: .1rem;
}
</style>