<template>
	<div id="Top" :class="['top',hide]" @click="scrollToTop" ></div>
</template>

<style>
	#Top{
		position: fixed;
		bottom: 3rem;
		right: .6rem;
		border-radius: 1.6rem;
		width: 1.6rem;
		height: 1.6rem;
		background: url(data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAmBAMAAAAhNzZRAAAABGdBTUEAALGPC/xhBQAAAB5QTFRFAAAA////////////////////////////AAAA////1NnxJAAAAAl0Uk5TAN3zXsMyFZ8Alc3kwAAAAKlJREFUKM9jmIkKGND5xAFW4wAUfuTMqchcNsnyiQlI/JTpDJViSHxPN4aUKQguO1Axm2QBnF+pCiSCpsOlZ4IsY9WEKYicDKYsoVayKkEk2CdB3JQI0wixks3TAcpnmZIAtQzqSk+Qxko1uL1J0xGmMECttFRGcrflZIZKAyQ+83QGS1CoTQCyOUGMyQzMnkj8KRDFnBNgBMOw4LOAk4oDIpxAfp4CDjcAxtdL76lU1wEAAAAASUVORK5CYII=) center no-repeat #5b6167;		background-size: .6rem .76rem;
		z-index: 100;
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
					window.scrollY < 1.5 * winHeight ? self.hide = 'hide' : self.hide = ''
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