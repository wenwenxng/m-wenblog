<template>
    <div class="register-container">
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>用户名</label>
                <input type="text" class="mui-input-clear" placeholder="用户名" v-model.trim="user_name">
            </div>
            <div class="mui-input-row">
                <label>邮箱</label>
                <input type="text" class="mui-input-clear" placeholder="邮箱" v-model.trim="user_email">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" class="mui-input-password" placeholder="密码" v-model.trim="password">
            </div>
            <div class="mui-input-row">
                <label>确认密码</label>
                <input type="password" class="mui-input-password" placeholder="确认密码" v-model.trim="comfirm">
            </div>
            <div class="mui-input-row vcode">
                <label><img :src="vcodeURL" @tap="vcodeURL+='?'+Math.random()"></label>
                <input type="text" class="mui-input-clear" placeholder="验证码" v-model.trim="vcode">
            </div>
            <div class="mui-button-row">
                <mt-button type="primary" size="small" @click="handleRegister">注册</mt-button>
                <router-link to="/login" tag="button">前往登录</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import mui from '../../static/lib/mui/dist/js/mui.min.js'
    import {Toast} from 'mint-ui'
    export default {
        name: "Register",
        data(){
            return{
                vcodeURL:this.$store.getters.getBaseUrl+'/api/common/vcode.php',
                returnUrl:this.$route.query.returnUrl || '/',
                user_email:'',
                password:'',
                comfirm:'',
                user_name:'',
                vcode:''
            }
        },
        methods:{
            handleRegister(){
                if (!this.user_email || !this.password ||!this.comfirm || !this.user_name || !this.vcode ){
                    return Toast('输入数据不能有空')
                }
                if (this.password !== this.comfirm){
                    return Toast('两次输入的密码不同')
                }
                this.$axios.post('/api/user/register.php',
                    {user_name:this.user_name,user_email:this.user_email,password:this.password,vcode:this.vcode})
                    .then(res => {
                        console.log(res.data)
                        if (res.data.error){
                            this.vcodeURL+='?'+Math.random()
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
    .register-container{
        .vcode{
            label{
                display: flex;
                justify-content: space-between;
                img{
                    height: 20px;
                }
            }
        }
    }
</style>