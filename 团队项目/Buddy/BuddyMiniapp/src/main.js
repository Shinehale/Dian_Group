import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

App.mpType = 'app';

// 全局分享
const $x = {};
Vue.prototype.$x = $x;
let share = require('utils/share.js');
Vue.mixin(share);

const app = new Vue({
    ...App
});
app.$mount();
