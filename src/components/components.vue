<!--组件的使用示例-->


<style>
	.components{
		max-width: 1200px;
		margin: 0 auto;
	}
	.vuex-btn{
		width: 100px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		border: 1px solid cornflowerblue;
		cursor: pointer;
	}
	.vuex{
		width: 400px;
		height: 100px;
		border: 2px solid red;
		margin: 20px 0;
	}
	.blue{
		border-color: blue;
	}
</style>

<template>


	<div class="components">
		<br/>
		<!-- vuex示例代码 -->
		<div class="vuex-btn" @click="$store.dispatch('toggleAction')">
			切换vuex状态
		</div>

		<div class="vuex" v-show="$store.state.show">
			vuex示例代码:store.state.show
		</div>

		<div class="vuex blue" v-show="$store.getters.notShow">
			vuex示例代码:$store.getters.notShow
		</div>

		<!-- vuex示例代码：购物车 -->
		<shopping-cart></shopping-cart>
	



		<!-- 栅格系统示例 -->
		栅格系统：
		<br/>
		<vue-fluid></vue-fluid>
		<br/>


		<!-- search搜索组件 -->
		<!-- 回调函数：onSearched，提交搜索后的回调 -->
		<vue-search @onSearched="onSearched"></vue-search>
		<br/>



		<!-- select组件 -->
		<!-- 输入参数：list，选项数据-->
		<!-- 回调函数：onSelected，选中选项后的回调 -->
		<vue-select :list="selectData" @onSelected="onSelected"></vue-select>
		<br/>

		<!-- menu导航组件 -->
		<!-- 输入参数：menuList，menu数据 -->
		<menu-nav :list="menuList"></menu-nav>
		<br/>




		<!-- form表单示例 -->
		<vue-form></vue-form>
		<br/>



		<!-- 存在兼容性问题，移动端好用 -->
		<!-- 输入参数：slipList，广告列表 -->
		<!-- 建议使用：swiper版本，参考：http://www.swiper.com.cn/demo/110-slides-per-view.html -->
		<vue-slip :list="slipList"></vue-slip>
		<br/>



		<!-- 普通swiper -->
		<swiper></swiper>
		<br/>
		<br/>




		<!-- 商品图片预览 -->
		<!-- 输入参数：slipList，广告列表  -->
		<img-pre v-if="slipList.length" :list="slipList"></img-pre>
		<br/>
		<br/>


		<slide :list="slipList"></slide>
		<br/>


		<!-- 回到顶部 -->
		<vue-top></vue-top>
		<br/>


		<!-- 懒加载 -->


		<!-- 分页加载 -->


	</div>
</template>


<script>

import select from './select.vue';
import search from './search.vue';
import menuNav from './menuNav.vue';
import vueForm from './vueForm.vue';
import vueSlip from './vueSlip.vue';
import vueTop from './vueTop.vue';
import swiper from './swiper.vue';
import imgPre from './imgPre.vue';
import slide from './slide.vue';
import vueFluid from './vueFluid.vue';
import shoppingCart from './shoppingCart.vue';

export default {
	data() {
		return {
			selectData:[
				{name: "选项一"},
				{name: "选项二"},
				{name: "选项三"}
			],
			onSelected: function(data){
				console.log("select选中数据：",data);
			},
			onSearched: function(data){
				console.log("提交搜索数据：",data);
			},
			menuList: [
				{
					id: 1,
					name: "分类一",
					icon: "icon-dashboard",
					list: [],//直接展示的列表
					sub: [//子列表，有子列表时，list应该为空
						{
							id: 1,
							name: "子类别一",
							list: [
								{id:1,name:"一具体子项1"},
								{id:1,name:"一具体子项2"}
							]
						},
						{
							id: 2,
							name: "子类别二",
							list: [
								{id:1,name:"二具体子项1"},
								{id:1,name:"二具体子项2"}
							]
						}
					],
				},
				{
					id: 2,
					name: "分类二",
					icon: "icon-electronics",
					list: [//直接展示的列表
						{id:1,name:"商务计划书编制"},
						{id:2,name:"具体分类2"},
						{id:1,name:"具体分类1"},
						{id:2,name:"具体分类2"},
						{id:1,name:"具体分类1"},
						{id:2,name:"具体分类2"}
					],
					sub: [],
				},
				{
					id: 3,
					icon: "icon-business",
					name: "分类三",
					list: [],
					sub: [						
						{
							id: 1,
							name: "子类别一",
							list: []
						},
						{
							id: 2,
							name: "子类别二",
							list: []
						}
					],
				}
			],
			slipList: [
				{ url: "//image4.suning.cn/uimg/MFS/show/150097189354276844.jpg" },
				{ url: "//image4.suning.cn/uimg/MFS/show/150097325360958549.jpg" },
				{ url: "//image4.suning.cn/uimg/MFS/show/150097376771784636.jpg" }
			]

		}
	},
	// 初始化引入子组件,两种引入方式，写法二:
	components: {
		'vue-select': select,
		'vue-search': search,
		'menu-nav': menuNav,
		'vue-form': vueForm,
		'vue-slip': vueSlip, //require('./vueSlip.vue')
		'swiper': swiper,
		'img-pre': imgPre,
		'slide': slide,
		'vue-top': vueTop,
		'vue-fluid': vueFluid,
		"shopping-cart": shoppingCart
	},

	methods: {
		
	}
}
</script>