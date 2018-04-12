<!--npm install viscroll-->
<!--使用的是：https://github.com/MarxJiao/vue-iscroll-directive-->

<template>
	<!-- 使用iscroll指令，这里的iscroll实例使用Vue.use初始化指令时的参数-->
	<!--<div v-iscroll>-->
	<!--</div>-->
	<div ref="clip">

		<!-- 也可以在使用的时候设置iscroll的参数 -->
		<div :class="[fixed, 'tab','scroller-box','sticky']" style="position: static;">
			<div class="app-scroller" v-iscroll="opts" ref="tab">
				<!-- content，需要在列表外部包围一个div -->
				<div class="scroller-items hor-view">
					<a v-for="(tab,idx) in tablist" :key="idx" :id="tab.id" :ref="'tab'+idx" :class="['item',tabIndex==idx?'cur':'']" @click="scrollToTab(idx,tab.id)" name="tab.trickPoint">
						{{tab.name}}
					</a>
				</div>
			</div>
		</div>

		<!-- 数据列表 -->
		<div class="cate">
			<div :class="['cate-box',tabIndex==idx?'':'hide']" :cate-id="tab.id" v-for="(tab,idx) in tablist" :key="idx">
				<sn-list></sn-list>
			</div>
		</div>
	</div>
</template>

<style>
.scroller-box {
	z-index: 45;
	width: 100%;
	background: #fff;
}

.scroller-box.fixed {
	position: fixed !important;
	top: 0;
}

.app-scroller {
	border-bottom: 1px solid #dcdcdc;
	position: relative;
	background-color: #fff;
}

.tab .app-scroller {
	height: 1.8rem;
}

.scroller-items {
	position: absolute;
	padding: 0;
}

.hor-view {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-webkit-flex-direction: row;
	flex-direction: row;
}

.item {
	width: 4rem;
	min-width: 2.5rem;
	height: 1.8rem;
	line-height: 1.8rem;
	padding: 0 .4rem;
}

.item.cur {
	color: #4f80f9;
	border-bottom: .12rem solid #4f80f9;
}
</style>

<script> 
import Vue from 'vue';
//	import slide from "http://res.suning.cn/public/v5/mod/iscroll-lite/5.1.3/iscroll-lite.js";

//	引入插件，已经安装或者本地文件都行
import VIscroll from './slide/VIscroll.js';
//	import VIscroll from "viscroll";
//	引入外部插件时,需要使用use注册插件，默认参数
Vue.use(VIscroll, {
	mouseWheel: true,
	scrollX: true,
	scrollY: false,
	click: false,
	preventDefault: true,
	tap: false,
	bounce: false,
	disableTouch: true
});

export default {
	props: {
		tablist: {
			type: Array,
			default: () => {
				return [];
			}
		},
		opts: {
			type: Object,
			default: () => {
				return {
					scrollX: true,
					scrollY: false,
					click: false,
					useTransform: true,
					preventDefaultException: {
						tagName: /.*/
					},
					eventpassthrough: true
				}
			}
		}
	},
	data() {
		return {
			tabIndex: 0,
			fixed: ''
		}
	},
	components: {
		'sn-list': require('./sn-list.vue')
	},
	mounted() {
		this.pageScroll();
	},
	methods: {
		/**
		 * 滑动tab效果
		 */
		scrollToTab(index, id) {

			//向父组件传递数据
			this.$emit('tabChange', {
				'index': index,
				'id': id
			});


			//滚动效果
			let tab_w = this.$refs.tab.getBoundingClientRect().width,//获取元素的宽度
				half_w = tab_w / 2 - 15;
			let scroll = this.$refs.tab.scroll;
			let max_x = scroll ? scroll.maxScrollX : 0;

			this.tabIndex = index;

			//点击滚动距离
			if (scroll) {
				var left = this.$refs['tab' + index][0].offsetLeft;

				var _moveX = 0;
				if (max_x + left - half_w < 0) {
					if (left > half_w) {
						_moveX = half_w - left;
					}
				} else {
					_moveX = max_x;
				}

				setTimeout(function() {
					scroll.scrollTo(_moveX, 0, 400);
				}, 180);
			}
		},

		/**
		 * 安卓和浏览器sticky效果
		 */
		pageScroll() {

			let self = this;
            let clipTab = self.$refs.clip;

			window.addEventListener("scroll", myScroll);
			window.addEventListener("touchmove", myScroll);
			window.addEventListener("mousewheel", myScroll, false);

			function myScroll() {
       			if("undefied" != typeof clipTab){
                    var top = clipTab.getBoundingClientRect().top;
                    self.fixed = top <= 0 ? 'fixed' : '';
                }
			}
		}
	}

}


</script>  



