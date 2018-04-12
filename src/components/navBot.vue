<!--组件的使用示例-->
<style>
.foot {
    height: 85px;
	margin-top: 40px;
	background-color: #f2f2f2;
}
.page_con {
    width: 800px;
    margin: 0 auto;
    position: relative;
	z-index: 10;
	text-align: center;
}
.foot_text {
    padding-left: 72px;
    display: inline-block;
    position: relative;
    font: 12px/24px microsoft yahei;
    color: #999;
    text-align: left;
}

.foot_text i {
    width: 48px;
    height: 60px;
    background: url("//image.suning.cn/uimg/cms/img/149386341371637387.jpg") no-repeat;
    position: absolute;
    left: 0;
    top: 10px;
}

</style>

<template>

<div class="foot ">
	<div class="page_con center">
		<div class="foot_text">
			<i></i>
			<ul class="foot_info">
				<li>地址：上海市大木桥路108号6楼&nbsp;电话:021-64223707&nbsp;邮箱:qyfwy@sheitc.gov.cn</li>
				<li>版权所有&nbsp;上海市中小企业发展服务中心保留所有权利。</li>
				<li>网站备案号:沪ICP020577号</li>
			</ul>
		</div>
	</div>
</div>
</template>


<script>
export default {
	data() {
		return {

		}
	},
	// 初始化引入子组件,两种引入方式，写法二:
	components: {

		
	},
	mounted: function(){
	},

	methods: {

	}
}
</script>