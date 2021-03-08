import Vue from 'vue'
import App from './App.vue'
import AxiosPlugin from './plugin/AxiosPlugin.js'
import * as VueGoogleMaps from "vue2-google-maps";


Vue.config.productionTip = false;
Vue.use(AxiosPlugin);


Vue.use(VueGoogleMaps, {
  load: {
    key: "[api key google]", //"REPLACE-THIS-WITH-YOUR-KEY-FROM-ABOVE",
    libraries: "places" // necessary for places input
  }
});


new Vue({
  render: h => h(App),  
}).$mount('#app')
