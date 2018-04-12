<template>
	<!--通用导航-->
	<!--<div class="sn-nav sn-block">
		<div class="sn-nav-back"><a class="sn-iconbtn" href="#">返回</a></div>
		<div class="sn-nav-title of">导航标题</div>
	</div>-->
	
	<!--通用导航右边有内容-->
	<div class="sn-nav sn-block">
		<div class="sn-nav-back"><a class="sn-iconbtn" href="javascript:history.back(-1)">返回</a></div>
		<div class="sn-nav-title of">{{navTitle}}</div>
		
		<!--如果不要右边的内容，可以注释下面代码-->
		<div class="sn-nav-right tr pr">
			<!--<a href="#" style="right:auto;margin-right:.2rem;">编辑</a>-->
			<img @click="showList" src="http://sale.suning.com/images/advertise/cdn/images/more.png" style="width:1rem;">
			<ul v-if="showUlList" class="nav-more-list" id="sub-title" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);display: block;">
				<li><a class="nav-more-icon home-icon" href="//m.suning.com">首页</a></li>
				<li><a class="nav-more-icon cart-icon" href="//shopping.suning.com/project/cart/cart1.html">购物车</a></li>
				<li><a class="nav-more-icon search-icon" href="//m.suning.com/list/list.html">全部分类</a></li>
				<li><a class="nav-more-icon cate-icon" href="//m.suning.com/search.html">搜索</a></li>
				<li><a class="nav-more-icon ebuy-icon" href="//my.suning.com/wap/home.do">我的易购</a></li>
			</ul>
		</div>
		<div id="screenIfmNav" class="screenIfm" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1); display: none;"></div>
	</div>
</template>

<script>
	
	export default {
		props:['title'],
		data(){
			return {
				navTitle: "",
				showUlList: false
			}
		},
		
		mounted(){
			this.navTitle = this.title;

		},
		
		methods:{
			showList(){
				console.log(this.showUlList);
				this.showUlList = !this.showUlList;
			}
		}
	}
</script>

<style>
</style>