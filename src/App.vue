<style>
  /* 引入外部css的方法 */
  /* @import "//res.suning.cn/public/v5/common/2.0.0/m-common.css"; */
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .router{
    overflow: hidden;
  }
  .router li{
    float: left;
    width: 100%;
    padding: .4rem;
    background-color: #ffffff;
    border-bottom: 1px solid #f2f2ff;
  }
  .router li a{
      color: #333333;
  }
</style>


<template>
  <div id="app">
   <!--<img src="./assets/logo.png">-->

	
	
	<!--路由示例-->
    <ul class="router">
        <li><router-link to="/mods">跳转到基础组件示例</router-link></li>
        <li><router-link to="/base">跳转到基础功能示例</router-link></li>
        <li><router-link to="/swipe">跳转到联版/滑动广告</router-link></li> 
        <li><router-link to="/tab">跳转到tab组件示例（点击切换）</router-link></li> 
        <li><router-link to="/scroll">跳转到scroll-tab示例（滑动切换）</router-link></li> 
    </ul>   

    <p style="margin:0 auto;margin:.4rem">----------------这里是分割线，下面是路由视图----------------</p>
    
    <!-- 供路由使用的视图 -->
    <router-view></router-view>
   
  </div>
</template>



<script>
export default {
  name: 'app'
}
</script>



