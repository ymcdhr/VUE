<!--npm install viscroll-->
<!--使用的是：https://github.com/MarxJiao/vue-iscroll-directive-->

<template>
	<a :class="['item',cur?'cur':'']" :idx="idx">
		<slot></slot>
	</a>				
</template>

<style>
.item {
	width: 4rem;
	min-width: 2.5rem;
	height: 1.8rem;
	line-height: 1.8rem;
	padding: 0 .4rem;
}

.item.cur {
	color: #4f80f9;
	border-bottom: .12rem solid #4f80f9;
}
</style>

<script> 
// import Vue from 'vue';

export default {
	props: {
		idx: {default: ""}
		// text: {
		// 	default: ""
		// }
	},
	data() {
		return {
			cur: false,
			fixed: ''
		}
	},
	components: {
	},
	mounted() {

	},
	methods: {

	}

}


</script>  



