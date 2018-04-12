<style>
@import url("swiper");  

.swiper-box .swiper-container{
	width: 400px;
	height: 200px;;
}
.swiper-box .swiper-slide{
	background-color: #f2f2f2;
}
.swiper-box .swiper-slide:nth-child(odd){
	background-color: cadetblue;
}

</style>

<template>
	<div class="swiper-box">
		<div class="swiper-container swiper-content">
			<div class="swiper-wrapper">
				<div class="swiper-slide">slider1</div>
				<div class="swiper-slide">slider2</div>
				<div class="swiper-slide">slider3</div>
			</div>
		</div>
	</div>

</template>


<script>

// "version": "4.2.0",
// npm install swiper --save-dev

import Swiper from "swiper";
// console.log(S);

// var Swiper = require("swiper");
// var Swiper = require("../script/lib/swiper-4.1.6.min.js");
// console.log(Swiper);

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
		try{
			var swiper1 = new Swiper('.swiper-content');

		}
		catch(e){
			console.log(e.message);
		}

	},

	methods: {



	}
}
</script>
