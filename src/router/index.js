import Vue from 'vue'
import Router from 'vue-router'

// import ratings from '@/components/ratings/ratings'
// import goods from '@/components/goods/goods'
// import seller from '@/components/seller/seller'

const ratings = (resolve) => {
  import('components/ratings/ratings').then((module) => {
    resolve(module)
  })
}

const goods = (resolve) => {
  import('components/goods/goods').then((module) => {
    resolve(module)
  })
}

const seller = (resolve) => {
  import('components/seller/seller').then((module) => {
    resolve(module)
  })
}
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
