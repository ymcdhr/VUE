<!--npm install viscroll-->
<!--使用的是：https://github.com/MarxJiao/vue-iscroll-directive-->

<template>
     <!-- 使用iscroll指令，这里的iscroll实例使用Vue.use初始化指令时的参数-->
    <!--<div v-iscroll>-->
    <!--</div>-->
    <!-- 也可以在使用的时候设置iscroll的参数 -->
	<div class="scroller-box sticky" style="position: static;">

	    <div class="app-scroller" v-iscroll="opts" ref="tab">
	        <!-- content，需要在列表外部包围一个div -->
		    	<div class="scroller-items hor-view">
		    		
	            <a v-for="(item,idx) in list" :key="idx" :ref="'item'+idx" class="scroller-item" name="item.trickPoint">
	            		<img :src="item.url">
	            </a>
	            
		    	</div>

	    </div>
	</div>

</template>

<style>
	.scroller-box{
		z-index: 45;
	    width: 100%;
	    background: #fff;
	}
	.app-scroller{
		height: 3.5rem;
	    border-bottom: 1px solid #dcdcdc;
	    position: relative;
	    background-color: #fff;
	}
	.hor-view{
		display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	}
	.scroller-items{
	    position: absolute;
	}
	.scroller-item{
		width: 7rem;
		height: 3.5rem;
		margin-right: .4rem;
	}
	
	.scroller-item img{
		width: 100%;
		height: 100%;
	}

</style>

<script> 
	import Vue from 'vue';
//	import slide from "http://res.suning.cn/public/v5/mod/iscroll-lite/5.1.3/iscroll-lite.js";

//	引入插件，已经安装或者本地文件都行
	import VIscroll from './slide/VIscroll.js';
//	import VIscroll from "viscroll";
//	引入外部插件时,需要使用use注册插件，默认参数
	Vue.use(VIscroll, {
	    mouseWheel: true,
	    scrollX: true,
	    scrollY: false,
	    click: false,
	    preventDefault: true,
	    tap: false,
	    bounce: false,
	    disableTouch: true
	});
	
	export default {
	  props:{
	  	  list: {
	  	  	type: Array,
	  	  	default: () => {
	  	  		return [];
	  	  	}
  	  	  },
		  opts: {
			type: Object,
			default:  () => {
				return {
					scrollX: true,
					scrollY: false,	
					click: false,
					useTransform: true,
					preventDefaultException: {
						tagName: /.*/
					},
					eventpassthrough: true
				}
			}
		  }
	  },
	  data () {
	    return {
	    		tabIndex: 0
        }
	  },
	  mounted(){
		  
	  },
	  methods:{
	  	
      }
        
	}
	
	
</script>  
