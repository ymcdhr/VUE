<style>
@import url("swiper");  

	.slide-box{
		width: 400px;
		height: 100px;
		margin: 0 auto;
	}


    .slide-box .swiper-container {
      width: 100%;
      height: 100px;
      margin-left: auto;
      margin-right: auto;
    }
    .slide-box .swiper-slide {
      background-size: cover;
      background-position: center;
    }
    .slide-box .gallery-top {
      height: 80%;
      width: 100%;
    }
    .slide-box .gallery-thumbs {
      height: 20%;
      box-sizing: border-box;
    }
    .slide-box .gallery-thumbs .swiper-slide {
      height: 100%;
      opacity: 0.4;
    }
    .slide-box .gallery-thumbs .swiper-slide-active {
      opacity: 1;
    }

	.slide-box .swiper-slide img{
		width: 100%;
		height: 100%;
	}
	/* .imgpre-box .gallery-thumbs .swiper-slide img{
		width: 92.5px;
	} */

</style>

<template>
	<div class="slide-box">
		<div class="swiper-container slide-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(img,idx) in list" :key="idx">
					<img :src="img.url" @load="imageLoaded">
				</div>
			</div>
        	<div class="swiper-pagination"></div>

		</div>
		<br />
	</div>

</template>


<script>

// "version": "3.4.2", 4.2.0版本有ie兼容性问题
// npm install swiper@3.4.2 --save-dev
import Swiper from "swiper";


export default {
	props:{
		list: {default: ""}
	},
	data() {
		return {
			imgLoadedTimes: 0,
			showImgboxFlag: false,
			listLength: this.list.length,
			loop: true
		}
	},
	components: {

		
	},

	mounted(){


	},

	methods: {

		imageLoaded(){
			this.imgLoadedTimes++;

			// 所有图片都加载结束
			if(this.imgLoadedTimes>=this.list.length){

				this.showImgboxFlag = true;


				// 详细配置参考：http://3.swiper.com.cn/api/start/2014/1218/140.html
				setTimeout(()=>{
					var swiper = new Swiper('.slide-container', {
						pagination: '.swiper-pagination',
						slidesPerView: 2.5,
						paginationClickable: true,
						spaceBetween: 30,
						loop: true
					});
				},50);

			}
		}

	}
}
</script>
