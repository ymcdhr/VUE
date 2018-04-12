<!--组件的使用示例-->
<style>
/* 引入外部css的方法 */
 /* @import "//res.suning.cn/public/v5/common/2.0.0/m-common.css";  */

.info {
	padding: .4rem 0;
	margin: .4rem 0;
}

.father-mod {
	font-size: .6rem
}
</style>

<template>
	<div class="father-mod">


		<!--tab组件，tab和tab-item分开用-->
		<p class="info">滑动切换tab组件，tab和tab-item分开用</p>

		<!-- tab的列表 -->
		<scroll-tab @scrollChange="scrollChange" ref="scrollTab">
			<scroll-item v-for="(tab,idx) in tabList" :key="idx" :idx="idx">
				{{tab.name}}
			</scroll-item>
		</scroll-tab>

		<!-- tab数据列表 -->
		 <div class="cate">
			<div class="cate-box" :cate-id="tab.id" :ref="'cate'+idx" :offsetTop="tab.offsetTop" v-for="(tab,idx) in tabList" :key="idx"> 
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
			scrolling: false,
			//滑动数据
			tabIndex: 0,
			tabHeight: 0,
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
			}

		}
	},
	// 初始化引入子组件,两种引入方式，写法二:
	components: {
		'scroll-tab': require('./scroll-tab'),
		'scroll-item': require('./scroll-item'),
		'sn-list': require('./sn-list.vue')
	},

	mounted(){
		var self= this;
		




		//为什么要加上setTimeout？	
		//因为viscroll有setTimeout——此问题已解决

		//但是外部引用css可能会加载慢？从而获取不到正确的tab高度，不要用import，用link
		//所以还是有问题，不加setTimeout tab高度计算不对 

		// setTimeout(()=>{
			//tab栏的高度
			self.tabHeight = self.$refs["scrollTab"].$el.clientHeight;

			self.getOffsetTop();
			self.changeToTab(0);
			self.pageScroll();
		// },200);



	},

	methods: {
		/**
		 * tab切换回调方法，传值obj:{index,id}
		 */
		scrollChange(obj){
			this.tabIndex = obj.index;

			let index = obj.index;
	
			//标记是手动触发的滚动
			this.scrolling = true;
			// 滑动到对应cate位置
			this.scrollToPos(this.tabList[index].offsetTop - this.tabHeight);
		},

		/**
		 * 滑动到tab对应的数据列表
		 */
		scrollToPos(domTop){
			//console.log("domTop",domTop);

			if(document.body.scrollTop){
				document.body.scrollTop = domTop;
			}
			else{
				document.documentElement.scrollTop = domTop;
			}
		},

		/**
		 * 获取并存储每个cate的顶部位置
		 */
		getOffsetTop(){

			for(let i=0;i<this.tabList.length;i++){
				let cateDom = this.$refs['cate'+i][0];

				//cate顶部的标准线，在页面的绝对位置
				let domTop = cateDom.offsetTop;
					
				this.tabList[i].offsetTop = domTop - this.tabHeight;
			}

			this.$set(this.tabList,this.tabList);
			console.log(this.tabList);
		},

		changeToTab(index){
		
			this.tabIndex = index;
			this.$refs["scrollTab"].clickTab(index);
		},

		/**
		 * 页面的滑动事件监听
		 */
		pageScroll(){
			var self = this;
			//页面的高度
			let bodyH = document.body.clientHeight;

			//tab栏的高度
			// let tabHeight = this.$refs["scrollTab"].$el.clientHeight;

			//list顶部的标准线，在页面的绝对位置
			// let topLine = this.$refs['cate0'][0].offsetTop - tabHeight;


			window.addEventListener("scroll", myScroll);
			window.addEventListener("touchmove", myScroll);
			window.addEventListener("mousewheel", myScroll, false);

			function myScroll() {

				// 被标记是手动触发的滚动，不再重复执行事件
				if(!self.scrolling){
					let scrollTop = document.documentElement.scrollTop;
					// console.log("这一块儿有问题待解决------------------------");

					console.log("scrollTop",scrollTop);//页面顶部偏移量
					// console.log("topLine",topLine);//list顶部标准线
					// console.log("bodyH",bodyH);//body的高度

					// 如果跟当前类别不同就切换
					let index = self.getCateIndex(scrollTop);
					if(index != self.tabIndex){
						self.changeToTab(index);
					}
				}
				else{
					self.scrolling = false;
				}
			}
		},

		/**
		 * 根据当前位置，获取当前cate的索引
		 */
		getCateIndex(scrollTop){
			var list = this.tabList,
				cateIdx = 0;

			for(var i=0;i<list.length;i++){
				if(scrollTop >= list[i].offsetTop){
					cateIdx = i;
				}
			}
			return cateIdx;
		}

	}
}
</script>

