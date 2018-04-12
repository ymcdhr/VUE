<template>
	<div ref="dom" :class="['loadmore','sn-loading-type',status]" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
		<div class="end sn-end-loading"><span>DUANG~到底了</span></div>
		<div class="loading sn-local-loading"><span class="shape"></span><span>努力加载中...</span></div>
	</div>
</template>

<style>
	.sn-loading-type {
	    margin: .4rem 0
	}
	
	.sn-loading-type .loading {
	    display: none
	}
	
	.sn-loading-type .end {
	    display: block
	}
	
	.sn-loading-type.loading .loading {
	    display: block
	}
	
	.sn-loading-type.loading .end {
	    display: none
	}
	
	.sn-loading-type.done .loading {
	    display: none
	}
	
	.sn-loading-type.done .end {
	    display: block
	}
</style>

<script>
	export default {
		props: {
			status: {
				default: "done"
			}
		},
		data() {
			return {
				
			}
		},
		mounted() {
			this.pageScroll();
		},
		methods: {
			pageScroll(){

				let self = this;

				window.addEventListener("scroll", myScroll);
				window.addEventListener("mousewheel", myScroll, false);
				
				function myScroll() {
					
					try{
						var loadmore = false;
						var top = self.$refs.dom.getBoundingClientRect().top;
				
						var winHeight = window.innerHeight || window.screen.height;//窗口/文档显示区域的高度

						// if (window.pageYOffset > top + winHeight || window.pageYOffset < top - winHeight && "done" != self.status) {
						// } else {
						//     if (window.pageYOffset > top - winHeight - 30 && "done" != self.status) {
						// 		loadmore = true;
						//     }
						// }

						//loadmore组件的位置出来时，就开始请求分页加载
						if(top - winHeight < 0 && "done" != self.status && "loading" != self.status){
							loadmore = true;
						}

						var callback = function(cb){
							"undefined"!= typeof cb && cb(loadmore);
						};
						self.$emit('onscroll',callback);
					}
					catch(e){
						console.log(e.message);
					}

				}

			}
		}
	}
</script>