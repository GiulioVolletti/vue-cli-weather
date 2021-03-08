import axios from "axios";

const BASE_URL = "http://api.airvisual.com/v2/states?country=Italy&key= [api key air visual]";

export default {
    install(Vue){
        Vue.prototype.axios = axios;
        Vue.prototype.base_url = BASE_URL;
    }
};