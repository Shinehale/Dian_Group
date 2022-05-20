
import Vue from 'vue'
import App from './App'
import vueAxios from 'vue-axios'
import axios from 'axios'
import VueRouter from 'vue-router'
import Routes from './routes'
Vue.use(vueAxios,axios)
Vue.use(VueRouter)
Vue.config.productionTip = false


Vue.directive('rainbow',{
  bind(el,binding,vnode){
    el.style.color='#'+Math.random().toString(16).slice(2,8);
  }
})
Vue.directive('theme',{
  bind (el,binding,vnode){
    if (binding.value=='wide'){
      el.style.maxWidth='1260px';
    }else if (binding.value=='narrow'){
      el.style.maxWidth='560px';
    }else {
      el.style.maxWidth='800px';
    }
  }
})
Vue.filter("to-uppercase",function(value){
  return value.toUpperCase();
})
Vue.filter('snippet',function(value){
  return value.slice(0,100)+"..."
})
//创建路由
const router =new VueRouter({
    routes:Routes,
    mode:"history"
})
new Vue({
  el: '#app',
  components: { App },
  router:router,
  template: '<App/>'
})
