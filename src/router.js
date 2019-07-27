import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import LyContainer from './components/tabbar/LyContainer.vue'
import AboutContainer from './components/tabbar/AboutContainer.vue'
import UserContainer from './components/tabbar/UserContainer.vue'

import StudyList from './components/study/StudyList.vue'
import FunnyList from './components/funny/FunnyList.vue'
import DreamList from './components/dream/DreamList.vue'
import ArticleDesc from './components/subcomponents/ArticleDetail.vue'

import Login from './components/user/Login.vue'
import Register from './components/user/Register.vue'
//3.创建路由对象
var router = new VueRouter({
    routes:[
        { path:'/', redirect:'/home' },
        { path:'/home', component:HomeContainer },
        { path:'/ly', component:LyContainer },
        { path:'/about', component: AboutContainer},
        { path:'/user', component:UserContainer },

        { path:'/home/study', component:StudyList },
        { path:'/home/funny', component: FunnyList },
        { path:'/home/dream', component:DreamList },

        { path:'/home/articledetail/:id', component:ArticleDesc ,name:'articledetail'},


        { path:'/login', component:Login },
        { path:'/register', component:Register },

    ],
    linkActiveClass:'mui-active' //覆盖默认的路由高亮的类,默认的类叫做 link-router-active
})
export default router

