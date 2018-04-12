<style>
	.search-box{
		width: 100%;
		position: relative;
		z-index: 2;
	}
	.search-cnt{
		width: 100%;
		height: 32px;
	}
	.cnt-left{
		height: 32px;
		float: left;
		position: relative;
		overflow: visible;
	}
	.cnt-right{
		float: right;
	}
	.cnt-input{
		min-width: 250px;
		max-width: 450px;
		width: 100%;
		height: 32px;
		padding-left: 10px;
		border: 2px solid #c40000;
		/* border-radius: 5px; */
	}

	/* .cnt-input:focus{
		border: 3px solid #c40000;
	} */

	.cnt-submit{
		width: 80px;
		height: 32px;
		line-height: 32px;
		display: inline-block;
		color: #ffffff;
		background-color: #c40000;
		cursor: pointer;
		text-align: center;
	}
	.cnt-submit:hover{
		text-decoration: none;
	}
	.search-ul{
		width: 100%;
		border: 1px solid #dcdfe6;
		/* margin-top: 33px; */
		background-color: #ffffff;
		border: 1px solid #f2f2f2;
		position: relative;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.search-li{
		width: 100%;
		height: 32px;
		line-height: 32px;
		cursor: pointer;
		padding-left: 10px;
		text-align: left;
	}
	.search-li:hover{
		color: #ffffff;
		background-color: rgba(253,135,135,0.7);
	}
</style>

<template>
	<div class="search-box">
		<div class="search-types">

		</div>
		<div class="search-cnt">
			<div class="cnt-left">
				<input class="cnt-input" placeholder="请输入关键词" @click="showHistory" v-model="searchedValue"/>
				<ul class="search-ul" v-if="isShowHistory">
					<li class="search-li" v-for="(value,index) in historyList" :key="index" @click="submitSearch(value.name)">{{value.name}}</li>
				</ul>
			</div>
			<div class="cnt-left">
				<a class="cnt-submit" @click="submitSearch()">搜索</a>
			</div>


		</div>
	</div>

</template>


<script>

// import和export配对写，es6写法
// import {service} from '../script/service.js';

// require和exports配对写，AMD写法
const S = require('../script/service.js');

export default {
	props:{

	},
	data() {
		return {
			searchedValue: "",
			isShowHistory: false,
			historyList: []
		}
	},
	components: {

		
	},

	mounted(){

		
	},

	methods: {
		showHistory: function(){
			this.historyList = S.service.storage.getSearch();
			if(this.historyList.length){
				this.isShowHistory = !this.isShowHistory;
			}
		},
		submitSearch: function(name){

			this.isShowHistory = this.isShowHistory && false;

			this.searchedValue = name||this.searchedValue;
			
			if(this.searchedValue){
			//记录本地缓存
			S.service.storage.setSearch(this.searchedValue);
			
			//向父组件传递数据
			this.$emit('onSearched', this.searchedValue);
			}


		}
	}
}
</script>
