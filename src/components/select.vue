<style>
	.sel-box{
		min-width: 120px;
		max-width: 450px;
		width: 100%;
		height: 32px;
		position: relative;
		z-index: 1;
	}
	.sel-input{
		width: 100%;
		height: 32px;
		padding-left: 10px;
		border: 1px solid #dcdfe6;
		/* border-radius: 5px; */
	}

	.sel-input:focus{
		border: 1px solid #409eff;
	}

	.sel-box .icon-div{
		width: 40px;
    	height: 32px;
    	line-height: 32px;
		position: absolute;
		top: 0;
		right: 0;
		text-align: center;
	}
	.reserve{
		transform: rotate(180deg);
	}

	.sel-ul{
		border: 1px solid #dcdfe6;
		margin-top: -1px;
		background-color: #ffffff;
	}

	.sel-li{
		height: 32px;
		line-height: 32px;
		cursor: pointer;
		padding-left: 10px;
		text-align: left;
	}
	.sel-li:hover{
		color: #ffffff;
		background-color: #409eff;
	}
</style>

<template>
	<div class="sel-box">
        <input class="sel-input" placeholder="请输入内容" @click="showOps" v-model="selectedValue"/>

		<div class="icon-div" :class="{ reserve : isShowOps }">		
			<i class="icon iconfont icon-extend"></i>
		</div>

		<ul class="sel-ul" v-if="isShowOps">
			<li class="sel-li" v-for="(value,index) in list" :key="index" @click="setOps(value,index)">{{value.name}}</li>
		</ul>
	</div>

</template>


<script>
export default {
	props:{
		list: {default: ""}
	},
	data() {
		return {
			selectedValue: "",
			isShowOps: false
		}
	},
	components: {

		
	},

	mounted(){
		
	},

	methods: {
		showOps: function(){
			this.isShowOps = !this.isShowOps;
		},
		setOps: function(value,index){

			this.showOps();

			this.selectedValue = value.name;
			
			//向父组件传递数据
			this.$emit('onSelected', {
				'index': index,
				'value': value
			});

		}
	}
}
</script>
