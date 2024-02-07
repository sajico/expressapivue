import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import App2 from './App2.vue';
import RouterView from './RouterView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: App, name: 'root' },
        { path: '/app', component: App, name: 'app' },
        { path: '/app2', component: App2, name: 'app2' },
        { path: '/app/:id', component: App, name: 'app_id', props: true },
        { path: '/app2/:id', component: App2, name: 'app2_id', props: true },
    ],
})

const app = createApp(RouterView);
app.use(router);
app.mount('#app');