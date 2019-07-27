<template>
    <div class="user-container">
        <div class="user" v-if="!$store.getters.getUser">
            <router-link to="/login" tag="div" class="login">登录</router-link>
            <router-link to="/register" tag="div" class="register">注册</router-link>
        </div>
        <div class="history">
            <a href="javascript:;"><span class="mui-icon mui-icon-star"></span><span>我的收藏</span></a>
            <a href="javascript:;"><span class="mui-icon mui-icon-chatbubble"></span><span>我的评论</span></a>
            <a href="javascript:;"><span class="mui-icon-extra mui-icon-extra-like"></span><span>我的点赞</span></a>
            <a href="javascript:;"><span class="mui-icon-extra mui-icon-extra-outline"></span><span>浏览历史</span></a>
        </div>
        <div  class="logout" v-if="$store.getters.getUser">
            <mt-button type="danger" size="large" @click="handleLogout">退出登录</mt-button>
        </div>

    </div>


</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "UserContainer",
        data(){
            return {

            }
        },
        methods:{
            handleLogout(){
                this.$axios.get('/api/user/logout.php')
                    .then(res=>{
                        if (res.data.error) {
                            return Toast(res.data.message)
                        }
                        this.$store.commit('userLogout')
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    .user-container{
        .user{
            margin-top: 30px;
            display: flex;
            justify-content: center;
            div{
                border-radius: 50%;
                background: skyblue;
                line-height: 80px;
                height: 80px;
                width: 80px;
                text-align: center;
                color:#fff;
                box-shadow: 0 0 8px #ccc;
            }
            .login{
                margin-right: 20px;
            }
            .register{
                margin-left: 20px;
            }
        }
        .history{
            margin-top: 20px;
            display: flex;
            a{
                padding-top: 5px;
                display: flex;
                flex-direction: column;
                flex:1;
                height: 60px;
                line-height: 30px;
                background: #fff;
                text-align: center;
                color:#999;
                .mui-icon{
                    line-height: 20px;
                    font-size: 14px;
                }
                .mui-icon-extra{
                    line-height: 20px;
                    font-size: 14px;
                }
            }
        }
        .logout{
            padding: 20px;
        }
    }
</style>