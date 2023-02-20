import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
//Loading套件
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
//axios套件
import axios from "axios";
import VueAxios from "vue-axios";
const app = createApp(App);

import "./assets/all.scss";

app.use(createPinia());
app.use(router);
//全域註冊Loading
app.use(LoadingPlugin);
//全域註冊axios
app.use(VueAxios, axios);
app.mount("#app");
