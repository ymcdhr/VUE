<style>

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
	<div class="menu-list" v-if="list.length" @mouseover="delayHide" @mouseout="hideList">
		<div class="menu-list-title">{{name}}</div>
		<ul class="menu-list-ul">
			<li class="menu-list-li" v-for="(item,idx) in list" :key="idx">
				<a class="menu-list-a">{{item.name}}</a>
			</li>
		</ul>
	</div>
</template>


<script>

// import和export配对写，es6写法
// import {service} from '../script/service.js';

// require和exports配对写，AMD写法
// const S = require('../script/service.js');

export default {
	props: {
		cate: {default: ""}
	},
	data() {
		return {
			timer: "",
			name: this.cate.name,
			list: this.cate.list
		}
	},
	components: {

		
	},

	mounted(){
		console.log(this.cate);
		
	},
	watch:{
		cate: function(newCate,oldCate){

		}
	},

	methods: {

		showList: function(cate,index){

		},

		hideList: function(){
			this.cate.flag = false;
		},

		delayHide(){
			this.cate.flag = true;
		}
	}
}
</script>
