import Vue from 'vue'
//router模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//vuex模块
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state:{
        user:'',
        /*==========================删除线=====================*/
        //baseURL:'http://192.168.31.98',
        /*==========================删除线=====================*/
        baseURL:'',
        showTabbar:true,
    },
    mutations:{//this.$store.commit('',参数)
        checkLogin(state){
            axios.post('/api/user/checkLogin.php')
                .then((res)=>{
                    if (!res.data.error){
                        state.user = res.data
                    }
                })
        },
        userLogin(state,user){
            state.user = user
        },
        userRegister(state,user){
            state.user = user
        },
        userLogout(state){
            state.user = ''
        },
        changeShowTabbar(state,flag){
            state.showTabbar = flag
        }
    },
    getters:{
        getUser(state){
            return state.user
        },
        getBaseUrl(state){
            return state.baseURL
        },
        getShowTabbar(state){
            return state.showTabbar
        }
    }
})

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dateStr,pattern="YYYY-MM-DD"){
    return moment(dateStr).format(pattern)
})
//定义全局指令
Vue.directive('focus', {
    inserted:function(el){
        el.focus()
    }
})
//mint-ui模块
// import { Toast,Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);
//在runtime模式中,components只能接受单文件对象,不能接受简单对象
import MintUI from 'mint-ui'

Vue.use(MintUI)

import 'mint-ui/lib/style.css'

//axios模块
import axios from 'axios';
//上线的时候可以删除的三项,都是为了解决跨域问题
/*==========================删除线=====================*/
// axios.defaults.baseURL = store.state.baseURL;
// axios.defaults.withCredentials = true;
/*==========================删除线=====================*/
import qs from 'qs'
axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if(config.method === 'post') { // post请求时，处理数据
        config.data = qs.stringify( {
            ...config.data //后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用
        })
    }
    return config;
}, function (error) {
    loadinginstace.close()
    return Promise.reject(error);
})
//添加响应拦截器
axios.interceptors.response.use(function(response){
    return response;
},function(error){
    return Promise.reject(error);
});

Vue.prototype.$axios = axios;

import './static/lib/mui/dist/css/mui.min.css'
import './static/lib/mui/dist/css/icons-extra.css'
import './static/css/app.css'
import app from './app.vue'
import router from './router.js'

//安装图片预览插件
import VuePreview from 'vue-preview'

Vue.use(VuePreview)

var vm = new Vue({
    el:'#app',
    render:c => c(app),
    router,
    store
})

