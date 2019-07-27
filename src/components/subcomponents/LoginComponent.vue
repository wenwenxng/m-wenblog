<template>
    <div class="login-container">
        <div class="loginBox">
            <form class="mui-input-group">
                <h4>请先登录</h4>
                <div class="mui-input-row">
                    <input type="text" class="mui-input-clear" placeholder="邮箱" v-model="user_email" v-focus>
                </div>
                <div class="mui-input-row">
                    <input type="password" class="mui-input-password" placeholder="密码" v-model="password">
                </div>
                <div class="mui-button-row">
                    <mt-button type="primary" size="small" @click="handleLogin">登录</mt-button>
                    <router-link tag="button" to="/register">去往注册</router-link>
                </div>
            </form>
        </div>
        <div class="curtain" @tap="hideLG"></div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "LoginComponent",
        data(){
            return {
                user_email:'',
                password:''
            }
        },
        methods:{
            handleLogin(){
                this.$axios.post('/api/user/login.php',
                    {user_email:this.user_email,password:this.password})
                    .then(res => {
                        if (res.data.error){
                            return Toast(res.data.message)
                        }
                        this.$store.commit('userLogin',res.data)
                    })
            },
            hideLG(){
                this.$emit('hideLG')
            },
        },
        created(){

        },
        mounted(){


        }
    }
</script>

<style scoped lang="less">
    .login-container{
        position: fixed;
        z-index: 998;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        .loginBox{
            position: fixed;
            z-index: 100000;
            bottom: 0;
            left: 50%;
            overflow: hidden;
            width: 100%;
            transition-property: transform,opacity;
            transform: translate3d(-50%,0,0);
            text-align: center;
            opacity: 1;
            color: #000;
            border-radius: 13px 13px 0 0 ;
            h4{
                font-size: 18px;
                color: #888888;;
                font-weight: 400;
                line-height: 30px;
                height: 30px;
                padding: 0;
            }
            .mui-input-row{
                input::-webkit-input-placeholder{
                    font-size: 12px;
                    color:#999;
                }
            }
        }
        .curtain{
            position: fixed;
            z-index: 998;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transition-duration: 400ms;
            opacity: 1;
            background: rgba(0,0,0,.4);
        }
    }

</style>