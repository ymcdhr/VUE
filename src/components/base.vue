<template>
	<div class="w">
		<p class="info">页面埋点，点击埋点</p>	
		<div class="demo" @click="saClick">
			点击埋点
		</div>


		<p class="info">登陆信息</p>	


		<p class="info">除了组件：大部分根weex的调用方法基本一致</p>	

	</div>

</template>

<style>

	.demo{
		padding: .4rem 0;
		margin: .4rem 0;
		color: #ffffff;
		background-color: cornflowerblue
	}
</style>

<script>
	import base from "../../module/base.js";

	export default {
		data() {
			return {
			}
		},
		mounted() {
			this.getLoginStatus();
		},
		methods: {
			//点击埋点
			saClick(){
				base.sa.saClick("djmd_djmd_djmd_djmd");
			},
			//获取登陆信息
			getLoginStatus(){
				base.h5.probeAuthStatus(function(username){
					console.log(username,"已登录");
				},function(err){
					console.log(err,"未登录");
				})
			}
		}
	}
</script>