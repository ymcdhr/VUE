import Vue from 'vue'
import vuex from 'vuex'
import api from "../api/shop.js";
import service from "../service/service.js";

Vue.use(vuex);

export default new vuex.Store({
    state:{
        show: false,
        productList: [],
        addedList: []
    },
    // 类似于computed，计算一些数据，作为一个属性使用
    getters:{
        notShow(state){
            return !state.show;
        }
    },
    // 原始操作
    mutations:{
        showAction(state){
            state.show = true;
        },
        hideAction(state){
            state.show = false;
        },

        setProductList(state,list){
            state.productList = list.filter((item)=>(item.price<20));
        },

        addProduct(state,product){
            // 查找product，去重
            if(!state.addedList.find((value)=>(value.id===product.id))){
                state.addedList.push(product);
            }
        },
        deleteProduct(state,product){
            state.addedList = state.addedList.filter((item)=>{
                return product.id!==item.id;
            });
        }
    },

    // 复合操作，可以组合mutations中的方法使用
    // context可以理解为store，成员有commit、state等
    actions:{
        toggleAction(context){
            context.state.show?context.commit("hideAction"):context.commit("showAction");
        },

        getAllProducts(context){
            api.getProducts((products)=>{
                context.commit("setProductList",products);
            });
        },

        addProductToCart(context,product){
            context.commit("addProduct",product);
        },

        deleteProduct(context,product){
            context.commit("deleteProduct",product);
        }
    }
});