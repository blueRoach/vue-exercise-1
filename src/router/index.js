import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/common/HelloWorld'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld'
    }
  ]
})
