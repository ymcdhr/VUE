<!--组件的使用示例-->
<style>
	.nav-top{
		width: 100%;
		background-color: #f2f2f2
	}

	.nav-box{
		max-width: 1200px;
		width: 100%;
		height: 30px;
		margin: 0 auto;
	}

	.nav-box a{
		display: inline-block;
		height: 30px;
		line-height: 30px;
		float: left;
		cursor: pointer;
	}

	.nav-box a:hover{
		text-decoration: none;
	}

	.nav-login{
		margin-right: 10px;
	}
	.nav-login:hover{
		color: rgb(227, 38, 38);
	}

	.nav-register:hover{
		color: rgb(227, 38, 38);
	}
	.nav-title{
		margin-left: 30px;
	}



	.ie-notice {
		/* display: none; */
		height: 40px;
		background: #ffc414;
		line-height: 40px;
		font-size: 18px;
		color: #744303;
	}
	.notice-box{
		max-width: 1200px;
		margin: 0 auto;
	}
	.fl {
		float: left;
	}
	.fr {
		float: right;
	}
	.ie-notice a {
		color: #3695ff;
	}
	.t-line {
		text-decoration: underline;
	}
	.ml15 {
		margin-left: 15px;
	}
	.ie-notice .icon-add-r{
		font-size: 20px;
		transform: rotate(45deg);
		margin-top: 1px;
		cursor: pointer;
	}

</style>

<template>

<div class="nav-top">
	<div class="ie-notice" v-if="ieNoticeFlag">
		<div class="notice-box">
			<i class="fl">尊敬的用户：为保证后台体验，请使用chrome浏览器进行操作，其他浏览器后续将陆续支持<a href="http://sw.bos.baidu.com/sw-search-sp/software/016407617db/ChromeStandalone_51.0.2704.103_Setup.exe" class="t-line ml15">chrome浏览器下载请点击</a></i>
			<i class="fr icon iconfont icon-add-r" @click="hideIeNotice"></i>
		</div>
	</div>


	<div class="nav-box">
		<a class="nav-login">您好，请登陆</a>
		<a class="nav-register">免费注册</a>

		<a class="nav-title">欢迎来到温州市企业服务云平台</a>

	</div>
</div>
</template>


<script>
export default {
	data() {
		return {
			ieNoticeFlag: false

		}
	},
	// 初始化引入子组件,两种引入方式，写法二:
	components: {

		
	},
	mounted: function(){
		this.showIeNotice();
	},

	methods: {
		showIeNotice(){
			//ie浏览器弹出框
			if (window.navigator.userAgent.indexOf("Chrome") == -1) {
				this.ieNoticeFlag = true;
			}	
		},
		hideIeNotice(){
			this.ieNoticeFlag = false;
		}
	}
}
</script>