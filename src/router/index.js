import Vue from 'vue'
import Router from 'vue-router'
import base from '@/components/base'
import mods from '@/components/mods'
import tab from '@/components/mods-tab'
import scroll from '@/components/mods-scroll'
import swipe from '@/components/mods-swipe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mods',
      name: 'mods',
      component: mods
    },
    {
      path: '/base',
      name: 'base',
      component: base
    },
    {
      path: '/tab',
      name: 'tab',
      component: tab
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: scroll
    },
    {
      path: '/swipe',
      name: 'swipe',
      component: swipe
    }
  ]
})
