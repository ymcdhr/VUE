<style>
@import url("swiper");  

	.imgpre-box{
		width: 400px;
		height: 300px;
		margin: 0 auto;
	}


    .imgpre-box .swiper-container {
      width: 100%;
      height: 300px;
      margin-left: auto;
      margin-right: auto;
    }
    .imgpre-box .swiper-slide {
      background-size: cover;
      background-position: center;
    }
    .imgpre-box .gallery-top {
      height: 80%;
      width: 100%;
    }
    .imgpre-box .gallery-thumbs {
      height: 20%;
      box-sizing: border-box;
    }
    .imgpre-box .gallery-thumbs .swiper-slide {
      height: 100%;
      opacity: 0.4;
    }
    .imgpre-box .gallery-thumbs .swiper-slide-active {
      opacity: 1;
    }

	.imgpre-box .swiper-slide img{
		width: 100%;
		height: 100%;
	}
	/* .imgpre-box .gallery-thumbs .swiper-slide img{
		width: 92.5px;
	} */

</style>

<template>
	<div class="imgpre-box">
		<div class="swiper-container gallery-top">
			<div class="swiper-wrapper swiper-no-swiping">
				<div class="swiper-slide" v-for="(img,idx) in list" :key="idx">
					<img :src="img.url">
				</div>
			</div>
			<!-- Add Arrows -->
			<div class="swiper-button-next swiper-button-white"></div>
			<div class="swiper-button-prev swiper-button-white"></div>
		</div>
		<br />

		<div class="swiper-container gallery-thumbs" v-show="showImgboxFlag">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(img,idx) in list" :key="idx">
					<img :src="img.url" @load="imageLoaded">
				</div>
			</div>
		</div>
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
			listLength: this.list.length
		}
	},
	components: {

		
	},

	mounted(){


	},

	methods: {

		imageLoaded(){
			let self = this;
			this.imgLoadedTimes++;

			// 所有图片都加载结束
			if(this.imgLoadedTimes>=this.list.length){

				this.showImgboxFlag = true;


				// 详细配置参考：http://3.swiper.com.cn/api/start/2014/1218/140.html
				setTimeout(()=>{
					var galleryTop = new Swiper('.gallery-top',{
						simulateTouch : false,//鼠标滑动
						noSwiping : true,
						spaceBetween: 10,
						// slidesPerView: 4,
						loop:true,
						loopedSlides: self.listLength, //looped slides should be the same
						prevButton:'.swiper-button-prev',
						nextButton:'.swiper-button-next',
						onSlideChangeStart: function(swiper){
							let index = swiper.realIndex + self.listLength;

							galleryThumbs && galleryThumbs.slideTo(index,1000,true);

						}
					});

					var galleryThumbs = new Swiper('.gallery-thumbs',{
						simulateTouch : true,//鼠标滑动
						// noSwiping : true,//不可以滑动，兼容IE
						spaceBetween: 10,
						slidesPerView: 4,
						touchRatio: 0.2,
						loop: true,
						loopedSlides: self.listLength, //looped slides should be the same
						slideToClickedSlide: true,
						onSlideChangeStart: function(swiper){
							galleryTop && galleryTop.slideTo(swiper.activeIndex,1000,false);

						}
					});

					// galleryTop.controller.control = galleryThumbs;
					// galleryThumbs.controller.control = galleryTop;
				},50);

			}
		}

	}
}
</script>
