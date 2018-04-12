<style>
@import url("../style/fluid.css");

.test-fluid{
	border: 1px solid cadetblue;
}

.test-li{
	height: 50px;
	line-height: 50px;
	text-align: center;
	color: #ffffff;
	background-color: #c40000;
	border-bottom: 1px solid #ffffff;
}
.test-li:nth-child(odd){
	background-color: #409eff;
}

</style>

<template>
	
	<div class="container-fluid test-fluid">
		<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2 test-li">11111</div>
		<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2 test-li">22222</div>
		<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2 test-li">33333</div>
		<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2 test-li">44444</div>
		<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2 test-li">55555</div>
		<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2 test-li">66666</div>
	</div>

</template>


<script>




export default {
	props:{
	},
	data() {
		return {

		}
	},
	components: {
	},

	mounted(){
	},

	methods: {
	}
}
</script>
