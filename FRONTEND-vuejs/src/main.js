import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuesax from 'vuesax'
import App from './App.vue'
import router from './router'
//import index from './store'
import Vue2MultipleVModels from "vue2-multiple-vmodels";
import moment from 'moment'
//import Datepicker from 'vuejs-datepicker'
import VueDatePicker from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import store from './authentification/index.js'
import Axios from 'axios'
import VueSwal from 'vue-swal'
import JwPagination from 'jw-vue-pagination'
import Vuelidate from 'vuelidate'
import selection from 'v-select2-component'
//import {BootstrapVue} from 'bootstrap-vue'
Vue.config.productionTip = false

Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.tokenParent}`;
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.tokenAnneSco}`;
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.tokenAnneeAdmin}`;
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.tokenProf}`;
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.tokenAnneeProf}`;


Vue.use(VueSwal)
Vue.use(Vuelidate)
Vue.component('selection',selection)
//Vue.use(BootstrapVue)
Vue.component('pagination', JwPagination);
Vue.use(VueDatePicker)
Vue.use(VueDatePicker,{
  lang:'fr'
})
/*Vue.component('my-component',{
  components:{
    Datepicker,
    lang:'fr'
  }
})*/


/**
 * CSS
*/
 
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';
import 'vue-skeletor/dist/vue-skeletor.css';

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Vue2MultipleVModels);
Vue.prototype.moment = moment;
Vue.use(Vuesax, {
  // options here
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

