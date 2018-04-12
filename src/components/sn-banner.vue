<template>
	<div ref="bannerSlider" class="banner-slider" data-spm="topslide">

        <!--标题-->
        <div class="head-wrapper">
            <div v-for="(value,index) in list" :key="index" class="item-desc" :style="curIndex==index?'opacity:1':'opacity:0'">
                {{value.title}}
            </div>
        </div>


        <!--背景-->
        <div class="back-wrapper">
            <div v-for="(value,index) in list" :key="index" class="back-image" :style="curIndex==index?'opacity:1':'opacity:0'">
                <img :src="value.bgImg" alt="">
            </div>
        </div>


        <!--列表数据-->
        <div class="slider-wrapper">
            <a v-for="(value,index) in list" :key="index" :style="value.cssStr" class="item-wrapper img-transition transparent" target="_blank" data-spm="d0" data-itemid="533821150249">
                <section class="item">
                    <div class="img-wrapper">
                        <img :src="value.imgUrl" :alt="value.txt" class="">
                    </div>
                    <div class="item-txt">{{value.txt}}</div>
                </section>
            </a>
        </div>


        <!--nav数据-->
        <div class="slider-nav">
			<i v-for="(value,index) in list" :key="index" data-index="0" data-date="8.24" :class="curIndex==index?'current':''">
			</i>
        </div>


        <!--左右箭头-->
        <div class="arrow-wrap">
            <div class="pre" @click="goPrev"></div>
            <div class="next" @click="goNext"></div>
        </div>

	</div>
</template>

<style>

	.banner-slider {
		overflow: hidden;
		width: 100%;
		position: relative;
		display: block;
		z-index: 0;
		/*padding-top: 1.28rem;*/
		/*margin-top: -1.28rem*/
	}

	.banner-slider .arrow-wrap{
		position: absolute; 
		top: 0;
		width: 100%;
		height: 100%;
	}

	.banner-slider .arrow-wrap>div {
		width: .18rem;
		height: .32rem;
		overflow: hidden
	}

	.banner-slider .arrow-wrap>div.pre {
		padding-right: 1rem;
		height: 100%;
		margin-left: .28rem;
		float: left;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAAXNSR0IArs4c6QAAAWlJREFUSA2lls8rg3Ecx01KyK/kRxmHxWG1C3GQOEhyUFYrhx2UiwsXiX+Hf8HEhcMOUkqJFFE0JQctLPNjxuP10T7l/H6+9eqzvuv12rOtvs8TqQqxgiCoQd+AbTlDpBa2wNa6FEKshz34gWU10oR8AGVYUCNtyMdQgjk10oV8Du8wo0Z6ka/hFSbUSD/yHTzBiBpJID/AIwyokSHkPNxDXI2MIb/ALcTUyBRyES4hqkaSyJ9wCh1qJI38BUfQqkYWkb8hC41qZAXZ1i7USRGkamiuyEVmufJaG1zJql0Sawfkq/r7dALhfyf/HsTC/3P/YrMEP+AMOn1fmgQmwY6MK+iRIi4RGIVnyEGf70uTwCDYEWJHSUKKuEQgDnaU2JEy7PvSJBCDGyjAuBRxiUA3XMAbTPu+NAm0wwnYUZOSIi4RaIFDsBvkvO9Lk0AD7IPdspekiEsE7CEiA7bWIv6GMgnYY80mZH4BYAekulCzgWQAAAAASUVORK5CYII=) no-repeat;
		-webkit-background-size: contain;
		background-size: .18rem;
		background-position-y: center;
	}

	.banner-slider .arrow-wrap>div.next {
		padding-left: 1rem;
		height: 100%;
		margin-right: .28rem;
		float: right;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAAXNSR0IArs4c6QAAAUlJREFUSA2t1j9IQlEYhnGJwEgILSKhcigncbKmipYIWqJwiRAaGhtqDNqjLXCtOVqjMWgKgnAIcZBcqiEbKigoKftzej5pcP7eDjzc6ftx1HvuNRJC2KDdiLpAimRrjzokD2DHJNYBdarYVosK4YhrVMXWQX7ohLpVbBXkm86oR8WWQJpUoj4Vmwd5pwolVWwG5JVqlFKxCZBnuqW0iuVAHuiesiqWAanTI42p2CjIDb3QlIoNgVzRG82q2ABImez2WFCxXpAL+qRl5bHRZCcNMsN3lNhBom03BddHA2j/fha9yDCQ9osBpMnuITsuk96dZBm242HHJOdFxhl+ojvKeJFphu04XNOIF5ljuEFVGvQieYY/6JL6vcgKw190TnEvssawvY5OKeZFNhm2dUxdXmS7RYRwyNX3ymaw+Ifsc/U/DRj+l781vxH0qgKIg0OaAAAAAElFTkSuQmCC) no-repeat;
		-webkit-background-size: contain;
		background-size: .18rem;
		background-position-y: center;
		background-position-x: right;
	}



	/*标题样式*/
	.banner-slider .head-wrapper {
		color: #fff;
		position: absolute;
		top: 1.28rem;
		z-index: 99;
		width: 100%;
		text-align: center
	}

	.head-wrapper .item-desc {
		position: absolute;
		-webkit-transition: .2s;
		transition: .2s;
		width: 100%;
		font-size: .4rem
	}



	/*背景图样式*/
	.back-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0
	}

	.back-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		opacity: 1;
		bottom: 0;
		-webkit-transition: .8s;
		transition: .8s
	}

	.back-image img {
		width: 100%;
		height: 100%
	}


	/*列表样式*/
	.slider-wrapper {
		width: 83.73333333%;
		padding-top: 64%;
		margin: 17.5% auto .56rem;
		position: relative;
		-webkit-transform-style: 'preserve-3d';
		transform-style: 'preserve-3d';
		-webkit-perspective: 10rem;
		perspective: 10rem;
		z-index: 0;
		height: 0
	}

	.item-wrapper {
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		z-index: 100;
		left: 0;
		top: 0;
		border-radius: 4px
	}
	
	.item-wrapper .item{
		width: auto;
	}

	.item-wrapper .item .img-wrapper {
		position: relative;
		width: 100%;
		z-index: 5;
		margin: 3.5% auto
	}

	.item-wrapper .item .img-wrapper:after {
		padding-top: 100%;
		display: block;
		content: ' '
	}

	.item-wrapper .item .img-wrapper img {
		z-index: 6;
		position: absolute;
		top: 0;
		/*height: 100%;*/
		width: 100%;
		height: 4rem;
		left: 0
	}
	.item-wrapper .item .item-txt{
		position: absolute;
		width: 100%;
		bottom: .4rem;
		text-align: center;
	}


	.item-wrapper.transparent {
		background: 0 0
	}

	.item-wrapper.transparent img {
		width: 100%;
		height: auto;
		background-color: transparent
	}

	.item-wrapper>img {
		display: block;
		width: 100%;
		height: 100%;
		border-top-right-radius: .08rem;
		border-top-left-radius: .08rem
	}

	.item-wrapper.img-transition {
		-webkit-transition: all .4s ease-in-out;
		transition: all .4s ease-in-out
	}

	.item-wrapper.hidden {
		display: none
	}


	/*导航按钮样式*/
	.slider-nav {
		position: absolute;
		bottom: .14rem;
		width: 100%;
		text-align: center;
		z-index: 800;
		/*display: none*/
	}

	.slider-nav>i {
		height: .16rem;
		width: .16rem;
		border-radius: .16rem;
		margin: 0 3px;
		display: inline-block;
		background: rgba(255,255,255,.6)
	}

	.slider-nav>i.current {
		/*color: #fff;*/
		/*width: .6rem;*/
		/*height: .26rem;*/
		/*line-height: .28rem;*/
		background-color: #f2f2f2;
		/*border: 1px solid #fff;*/
		/*border-radius: .6rem;*/
		/*text-align: center;*/
		/*font-size: .24rem;*/
	}

	@-webkit-keyframes zoomIn {
		from {
			opacity: 0;
			-webkit-transform: scale3d(.7,.7,.7);
			transform: scale3d(.7,.7,.7)
		}

		50% {
			opacity: 1
		}
	}

	@keyframes zoomIn {
		from {
			opacity: 0;
			-webkit-transform: scale3d(.7,.7,.7);
			transform: scale3d(.7,.7,.7)
		}

		50% {
			opacity: 1
		}
	}

	.banner-slider .animated {
		-webkit-animation-duration: .6s;
		animation-duration: .6s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both
	}

</style>

<script>
	export default {
		props: {
			timer: {
				default: "5000"
			}
		},
		data() {
			return {
				curIndex: 0,
				cssStr: '',
				list:[
					{
						title:"日本网红饼干",
						bgImg:"http://image.suning.cn/uimg/aps/material/150459934019195143.jpg",
						imgUrl:"//image.suning.cn/uimg/MZMS/show/150416758866488282.jpg",
						txt:"日本进口日光猫舌饼干抹茶味",
						bgColor:"rgb(153, 182, 0)"
					},
					{
						title:"七夕限量礼盒",
						bgImg:"http://image1.suning.cn/uimg/cms/img/150466102154716146.jpg",
						imgUrl:"//image.suning.cn/uimg/MZMS/show/150416758866488282.jpg",
						txt:"韩国进口LG倍瑞傲按压式派缤牙膏285g",
						bgColor:"rgb(244, 105, 127)"
					},
					{
						title:"46cm拥有清新口气",
						bgImg:"http://image1.suning.cn/uimg/cms/img/150459607206261521.jpg",
						imgUrl:"//image.suning.cn/uimg/MZMS/show/150416758866488282.jpg",
						txt:"意大利马尔维斯进口牙膏75ml",
						bgColor:"rgb(0, 113, 191)"
					}
				]
			}
		},
		mounted() {
			this.init();
		},
		components: {
		},
		methods: {
			init: function(){
                this.obj = document.querySelector('.banner-slider');

                // this.itemBox = $('.slider-wrapper a');
                this.maxLen = this.list.length - 1;
                this.startX;
				this.autoTimer = null;
				
                this.move(0);
                this.autoMove();

				this.touchEvent();
			},
			touchEvent: function(){
				let self = this;
				this.$refs['bannerSlider'].addEventListener('touchstart',function(evt){
					self.startX = evt.changedTouches[0].pageX;
					clearTimeout(self.autoTimer);
				});
				this.$refs['bannerSlider'].addEventListener('touchend',function(evt){
					var dis = evt.changedTouches[0].pageX
					if(Math.abs(dis-self.startX)>50){
						if(dis-self.startX>0){
							self.goNext()
						}else{
							self.goPrev()
						}
					}
					self.autoMove();
				});
			},
			// touchStart: function(evt){
			// 	console.log(evt);
			// 	this.startX = evt.changedTouches[0].pageX;
			// 	clearTimeout(this.autoTimer);
			// },

			// touchEnd: function(evt){
			// 	var dis = evt.changedTouches[0].pageX
			// 	if(Math.abs(dis-this.startX)>50){
			// 		if(dis-this.startX>0){
			// 			this.goPrev()
			// 		}else{
			// 			this.goNext()
			// 		}
			// 	}
			// 	this.autoMove();
			// },
            autoMove: function (){
				var self = this;
				clearTimeout(self.autoTimer);
                self.autoTimer = setTimeout(function(){
                    self.goNext();
                    self.autoMove();
                },self.timer);
            },
            goNext: function (){
				let index = this.curIndex === this.maxLen ? 0 : this.curIndex + 1;
				this.move(index);
				this.autoMove();
            },
            goPrev: function (){
				let index = 0 === this.curIndex ? this.maxLen : this.curIndex - 1;
				this.move(index);
				this.autoMove();
            },
            move: function (index){
				let self = this,
					curIndex = index;
				let preIdx = 0 === curIndex ? this.maxLen : curIndex - 1,//上一页
					nexIdx = curIndex === this.maxLen ? 0 : curIndex + 1;//下一页
					
				this.curIndex = index;

				for(let idx =0;idx<this.list.length;idx++){
					let cssStr;
					let value = this.list[idx],bgColor = value.bgColor;
					if(idx === curIndex){
						cssStr = this.changeStyle(0, 0, false, bgColor);
					}
					else{
						if(idx === preIdx){//下一页
							cssStr = this.changeStyle("120%", "-130px", false, bgColor);
						}
						else{//上一页
							cssStr = idx === nexIdx ? this.changeStyle("-120%", "-130px", false, bgColor) : changeStyle(0, "-100px", true, bgColor);
						}
					}

					value.cssStr = cssStr;
				}
				
				this.$set(this.list,this.list);

			},

            changeStyle: function (i,t,a,b){
				var r = "translateX(" + i + ") translateZ(" + t + ") translate3d(0,0,0)";
				
				let cssStr =
                    `opacity: ${a ? 0 : 0 === i ? 1 : .6};`+
                    `visibility: ${a ? "hidden" : "visible"};`+
                    `-webkit-transform: ${r};`+
                    `-moz-transform: ${r};`+
                    `-ms-transform: ${r};`+
                    `-o-transform: ${r};`+
                    `transform: ${r};`+
					`z-index: ${0 === i ? 200 : 100};`;;

				return cssStr + (b?`background-color: ${b}`:'');
            }
		}
	}
</script>