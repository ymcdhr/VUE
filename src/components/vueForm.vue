<style>

	.input{
		width: 100%;
		min-width: 350px;
		max-width: 450px;
		height: 32px;
		padding-left: 10px;
		border: 1px solid #dcdfe6;
		/* border-color: rgb(255, 0, 0); */
		/* border-radius: 5px; */
		vertical-align: middle;
	}

	.input:focus{
		border: 1px solid #409eff;
	}

	.empty{
		height: 32px;
		line-height: 32px;
		display: inline-block;
		width: 100px;
		color: rgb(255, 0, 0);
		vertical-align: middle;
		margin-left: 10px;
		/* border: 1px solid rgb(255, 0, 0); */
	}

	.textarea{
		width: 100%;
		min-width: 350px;
		max-width: 450px;
		min-height: 100px;
		padding-top: 10px;
		padding-left: 10px;
		border: 1px solid #dcdfe6;
		/* border-color: rgb(255, 0, 0); */
		/* border-radius: 5px; */
		vertical-align: middle;
	}

</style>

<template>
	<div class="form-box">

		<div class="">
			<!-- //input的父节点里面只能有一个input节点 -->
			<input class="input" placeholder="请输入内容！" v-check-empty/>
		</div>

		<br/>

		<div class="">
			<!-- //input的父节点里面只能有一个input节点 -->
			<textarea class="textarea" placeholder="请输入内容！" v-check-empty></textarea>
		</div>

	</div>

</template>


<script>
import Vue from 'vue';

Vue.directive('check-empty', function (el, binding) {


	
	let p;
	let getEmptyTxt =  function(el){
		return el.nextSibling;
	};

	el.addEventListener("blur",function(e){
		let isEistP = getEmptyTxt(el);

		if(!el.value){//输入为空
			if(!isEistP){
				el.style.borderColor = "rgb(255, 0, 0)";

				p = document.createElement('p');
				p.setAttribute("class","empty");
				p.innerText = "内容不能为空！";
				el.parentNode.appendChild(p);
			}
		}
		else{
			if(isEistP){
				el.style.borderColor = "#dcdfe6";
				el.parentNode.removeChild(p);
			}
		}
	});

	
})
		
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

	}
}
</script>
