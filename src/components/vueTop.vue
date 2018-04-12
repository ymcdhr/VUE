<template>
	<div id="Top" :class="['top',hide]" @click="scrollToTop" ></div>
</template>

<style>
	#Top{
		position: fixed;
		bottom: 150px;
		right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background: url(data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAmBAMAAAAhNzZRAAAABGdBTUEAALGPC/xhBQAAAB5QTFRFAAAA////////////////////////////AAAA////1NnxJAAAAAl0Uk5TAN3zXsMyFZ8Alc3kwAAAAKlJREFUKM9jmIkKGND5xAFW4wAUfuTMqchcNsnyiQlI/JTpDJViSHxPN4aUKQguO1Axm2QBnF+pCiSCpsOlZ4IsY9WEKYicDKYsoVayKkEk2CdB3JQI0wixks3TAcpnmZIAtQzqSk+Qxko1uL1J0xGmMECttFRGcrflZIZKAyQ+83QGS1CoTQCyOUGMyQzMnkj8KRDFnBNgBMOw4LOAk4oDIpxAfp4CDjcAxtdL76lU1wEAAAAASUVORK5CYII=) center no-repeat #5b6167;		
        background-size: 15px 19px;
        z-index: 100;
        cursor: pointer;
	}
	.hide{
		display: none
	}
</style>

<script>
	export default {
		data() {
			return {
				hide: "hide"
			}
		},
		mounted() {
			this.setTop();
		},
		methods: {

			setTop(){
				let self = this;
				let winHeight = window.innerHeight || window.screen.height;
				window.addEventListener("scroll", myScroll);
				window.addEventListener("touchmove", myScroll);
				window.addEventListener("mousewheel", myScroll);


				function myScroll() {
					self.hide = window.scrollY < 1 * winHeight ? 'hide' : '';
				}
			},

			scrollToTop(){
				if(document.body.scrollTop){
					document.body.scrollTop = 0;
				}
				else{
					document.documentElement.scrollTop = 0;
				}
			}
		
		}
	}
</script>