/**
 * @file vue iscroll指令，用指令封装iscroll进行dom操作
 * @author MarxJiao
 * @date 2016/12/03
 */

//var IScroll =  require('http://res.suning.cn/public/v5/mod/iscroll-lite/5.1.3/iscroll-lite.js');
// import IScroll from '../../script/lib/iscroll-lite.5.1.3.js';
const IScroll = require('../../script/lib/iscroll-lite.5.1.3.js');

const VIScroll = {
    install(Vue, options) {
        Vue.directive('iscroll', {
            bind(el, binding, vnode, oldVnode) {
                // 判断输入参数
                let vtype = binding.value ? [].toString.call(binding.value) : undefined;
                // 设置iscorll属性的参数
                let iscrollOptions  = vtype === '[object Object]' ? binding.value : options;
                // 阻止touchmove默认事件
                el.addEventListener('touchmove', event => {
                    event.preventDefault();
                })
                // 建立新的iscroll
                // 为什么要加上setTimeout？https://segmentfault.com/q/1010000005353311
                // iscroll 需要获取到父元素的高度在初始化，需要监听到menu值变化后再初始化即可
                setTimeout(function(){
                    vnode.scroll = new IScroll(el, iscrollOptions);
                    el.scroll = vnode.scroll;
                },0);
            },
            update(el, binding, vnode, oldVnode) {
                  // 判断输入参数
                let vtype = binding.value ? [].toString.call(binding.value) : undefined;
                // 设置iscorll属性的参数
                let iscrollOptions  = vtype === '[object Object]' ? binding.value : options;
                // 阻止touchmove默认事件
                el.addEventListener('touchmove', event => {
                    event.preventDefault();
                })
                // 建立新的iscroll，不需要这个？
                // vnode.scroll = new IScroll(el, iscrollOptions);
                // el.scroll = vnode.scroll;
            },
            unbind(el, binding, vnode, oldVnode) {
                /**
                 * 解除绑定时要把iscroll销毁
                 */
                try{
    	                //vnode.scroll = oldVnode.scroll;
	                vnode.scroll.destroy();
	                vnode.scroll = null;
                }
                catch(e){
                		console.log("ERROR:",e.message);
                }

            }
        })
    }
}
// export default VIScroll;

exports.VIScroll = VIScroll;