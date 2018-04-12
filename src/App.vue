<style>
  /* 引入外部css的方法 */
  /* @import "//res.suning.cn/public/v5/common/2.0.0/m-common.css"; */

  /* reset样式 */
  @import "./style/reset.css";
  @import "./style/iconfont/iconfont.css";


  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .router{
    /* width: 150px; */
    /* position: fixed;
    top: 100px;
    left: 50px; */
    overflow: hidden;
    border: 1px dashed #409eff;
  }
  .router li{
    float: left;
    width: 100%;
    padding: .4rem;
    color: #ffffff;
    background-color: #409eff;
    border-bottom: 1px dashed #409eff;
    text-align: center;
  }
  .router li:last-child{
    border-bottom: none;
  }
  .router li a{
      color: #ffffff;
  }
</style>


<template>
  <div id="app">
   <!--<img src="./assets/logo.png">-->

	<nav-top></nav-top>
	
	<!--路由示例-->
    <ul class="router">
        <li><router-link to="/components">跳转到组件示例</router-link></li>
    </ul>   
    
    <!-- 供路由使用的视图 -->
    <router-view></router-view>
   
   <nav-bot></nav-bot>
  </div>
</template>



<script>

import navTop from './components/navTop.vue';
import navBot from './components/navBot.vue';

export default {
    name: 'app',
  	components: {
    'nav-top': navTop,
    'nav-bot': navBot
		// 'nav-top': require('./components/navTop.vue')
		
	}
}
</script>



