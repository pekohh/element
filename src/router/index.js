import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ratings from '@/components/ratings/ratings'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',redirect:'/goods'
    },
    {
      path: '/goods',component: goods
    },
    {
      path: '/seller',component: seller
    } ,
    {
      path: '/ratings',component: ratings
    }     
  ]
})
