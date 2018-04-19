import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
    state:{
        show: false
    },
    getters:{
        notShow(state){
            return !state.show;
        }
    },
    mutations:{
        showAction(state){
            state.show = true;
        },
        hideAction(state){
            state.show = false;
        }

    },
    actions:{
        toggleAction(context){
            context.state.show?context.commit("hideAction"):context.commit("showAction");
        }
    }
});