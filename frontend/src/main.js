import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";
import store from "./store";


const app = createApp(App);
app.use(store);

app.use(router).mount("#app");
