<template>
    <div>
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>邮箱</label>
                <input type="text" class="mui-input-clear" placeholder="请输入邮箱" v-model="user_email">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="mui-input-row remember">
                <div><input type="checkbox">记住我</div>
                <div><a href="javascript:;">忘记密码?</a></div>
            </div>
            <div class="mui-button-row">
               <mt-button type="primary" size="small" @click="handleLogin">登录</mt-button>
               <router-link tag="button" to="/register">去往注册</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import mui from '../../static/lib/mui/dist/js/mui.min.js'
    import {Toast} from 'mint-ui'
    export default {
        name: "Login",
        data(){
            return {
                returnUrl:this.$route.query.returnUrl || '/',
                user_email:'',
                password:'',
            }
        },
        methods:{
            handleLogin(){
                this.$axios.post('/api/user/login.php',
                    {user_email:this.user_email,password:this.password})
                    .then(res => {
                        console.log(res.data)
                        if (res.data.error){
                            return Toast(res.data.message)
                        }
                        this.$store.commit('userLogin',res.data)
                        this.$router.push(this.returnUrl)

                    })
            }
        },
        created(){

        },
        mounted(){
            mui('.mui-input-row input').input();
        }
    }
</script>

<style scoped lang="less">
    .remember{
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        padding: 0 30px;
        font-size: 14px;
    }
</style>