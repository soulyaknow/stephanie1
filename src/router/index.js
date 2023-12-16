import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../views/IndexPage.vue'
import TodoApp from '../components/TodoApp.vue'
import DiaryApp from '../components/DiaryApp.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: IndexPage
    },
    {
        path: '/todoapp',
        name: 'TodoApp',
        component: TodoApp
    }
    ,
    {
        path: '/diary',
        name: 'DiaryApp',
        component: DiaryApp
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  
export default router