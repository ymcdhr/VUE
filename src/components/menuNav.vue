<style>
	.menu-box{
		/* box-shadow: 10px 1px 15px rgba(0,0,0,.17); */
		width: 200px;
		position: relative;
	}
	.menu-ul{
		width: 100%;
		border: 1px solid #c40000;
		box-shadow: 10px 1px 15px rgba(0,0,0,.17);
	}
	.menu-li{
		width: 100%;
		min-height: 60px;
		line-height: 60px;
		font-size: 18px;
		text-align: left;
		position: relative;
	}
	.menu-bar{
		width: 100%;
		min-height: 60px;
		line-height: 60px;
		font-size: 18px;
		text-align: left;
		background-color: #c40000;
	}
	.menu-bar .iconfont,.menu-bar .menu-a span{
		color: #ffffff;
	}
	/* .menu-li:hover{
		background-color: #fbdac8;
		cursor: pointer;
	} */
	.menu-a{
		display: block;
		width: 100%;
		height: 100%;
		padding-left: 20px;
	}
	.menu-a:hover{
		cursor: pointer;
		text-decoration: none;
	}

	.menu-a .iconfont{
		font-size: 20px;
		margin-right: 10px;
	}
	.menu-li .menu-a{
		background-color: #ffffff;
	}
	.menu-li .menu-a:hover{
		background-color: #fbdac8;
	}

	.menu-li .menu-a:hover .iconfont{
		color: #e22626;
	}
	.menu-li .menu-a:hover span{
		color: #e22626;
	}

	.menu-li .menu-sub-a{
		display: block;
		width: 100%;
		height: 100%;
		padding-left: 20px;
		font-size: 16px;
		background-color: #ffefe7;
	}
	.menu-li .menu-sub-a:hover{
		background-color: #fbdac8;
		cursor: pointer;
		text-decoration: none;
	}

	.menu-li .menu-sub-a .iconfont{
		font-size: 16px;
		margin-right: 10px;
	}
	.menu-li .menu-sub-a:hover .iconfont{
		color: #e22626;
	}
	.menu-li .menu-sub-a:hover span{
		color: #e22626;
	}
	.menu-sub-li{
		position: relative;
	}


	.menu-list{
		position: absolute;
		top: 0;
		left: 100%;
		right: -200%;
		border: 1px solid #e22626;
		background-color: #ffffff;
		box-shadow: 10px 1px 15px rgba(0,0,0,.17);
	}
	.menu-list-title{
		height: 60px;
		line-height: 60px;
		padding-left: 20px;
		font-size: 18px;
		color: #e22626;
		border-bottom: 1px solid #e22626;
		text-align: left;
	}
	.menu-list-ul{
		overflow: hidden;
		padding: 20px;
	}
	.menu-list-li{
		float: left;
		height: 35px;
		line-height: 35px;
		margin-right: 20px;
	}

	.menu-list-a{
		font-size: 14px;
	}
	.menu-list-a:hover{
		cursor: pointer;
	}
</style>

<template>
	<div class="menu-box">
		
		<ul class="menu-ul">

			<li class="menu-bar" ref="ele">
				<a class="menu-a">
					<i class="icon iconfont icon-view-list"></i>
					<span class="menu-txt">服务资源库</span>
				</a>
			</li>


			<li class="menu-li" v-for="(cate,index) in list" :key="index">
				<a class="menu-a" @click="toggleSubMenu(cate,index)" @mouseover="showList(cate,index)" @mouseout="hideList(cate)">
					<i :class="['icon','iconfont',cate.icon]"></i>
					<span class="menu-txt">{{cate.name}}</span>
				</a>
				<ul class="menu-sub-ul" v-if="cate.sub.length && cate.isShow">
					<li class="menu-sub-li" v-for="(subCate,subIdx) in cate.sub" :key="subIdx">
						<a class="menu-sub-a" @mouseover="showList(subCate,subIdx)" @mouseout="hideList(subCate)">
							<i class="icon iconfont icon-checkbox"></i>
							<span class="menu-sub-txt">{{subCate.name}}</span>
						</a>
						<menu-list v-if="subCate.flag" :cate="subCate"></menu-list>

					</li>
				</ul>
				<menu-list v-if="cate.flag" :cate="cate"></menu-list>
			</li>
		</ul>


	</div>

</template>


<script>

// import和export配对写，es6写法
// import {service} from '../script/service.js';

// require和exports配对写，AMD写法
// const S = require('../script/service.js');

import menuList from './menuList.vue'


export default {
	props: {
		list: {default: ""}
	},
	data() {
		return {
		}
	},
	components: {
		'menu-list': menuList
	},

	mounted(){

		
	},

	methods: {
		toggleSubMenu: function(cate,index){

			this.$set(cate,'isShow',!cate.isShow);
		},

		showList: function(cate,index){
			if(cate.list.length){
				this.$set(cate,'flag',true);
			}
		},

		hideList: function(cate){
			cate.flag = false;
		},
		
		delayHide(cate){
			clearTimeout(cate.timer);
		}
	}
}
</script>
