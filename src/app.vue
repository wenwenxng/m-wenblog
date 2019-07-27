<template>
    <div class="app-conteiner">
        <!--顶部 header区域 -->
        <header class="my-header">
            <div class="my-left">
                <span v-show="flag" @click="goBack"><mt-button icon="back">返回</mt-button></span>
            </div>
            <h1><img src="./static/images/smalllogo.png" alt="">温星博客</h1>
            <div class="my-right"></div>
        </header>
        <!--中间路由 router-view区域 -->
        <transition>
            <router-view class="main-conteiner"></router-view>
        </transition>
        <!--底部 tabbar 区域 -->
        <nav class="mui-bar mui-bar-tab" v-show="$store.getters.getShowTabbar">
            <router-link class="mui-tab-item-wen" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-wen" to="/ly">
                <span class="mui-icon mui-icon-chat"></span>
                <span class="mui-tab-label">留言</span>
            </router-link>
            <router-link class="mui-tab-item-wen" to="/about">
                <span class="mui-icon mui-icon-info"></span>
                <span class="mui-tab-label">关于</span>
            </router-link>
            <router-link class="mui-tab-item-wen" to="/user">
                <span class="mui-icon mui-icon-contact" ></span>
                <span class="mui-tab-label">用户</span>
            </router-link>
        </nav>

    </div>
</template>

<script>

    export default {
        name: "app",
        data(){
            return{
                flag:false
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        },
        watch:{
          '$route.path':function(newVal){
              //显不显示返回键
              this.flag = newVal === '/home'? false : true;
              //是否隐藏tabbar
              if (newVal.indexOf('/home/articledetail/') !== -1) {
                  //如果是看文章详情就是不显示底部四个东西
                  this.$store.commit('changeShowTabbar',false)
              }else{
                  this.$store.commit('changeShowTabbar',true)
              }
          }
        },
        created(){
            this.flag = this.$route.path === '/home'? false : true;
            this.$store.commit('checkLogin')
            if (this.$route.path.indexOf('/home/articledetail/') !== -1) {
                //如果是看文章详情就是不显示底部四个东西
                this.$store.commit('changeShowTabbar',false)
            }else{
                this.$store.commit('changeShowTabbar',true)
            }
        }
    }
</script>

<style scoped lang="less">
    .my-header{
        width: 100%;
        position: fixed;
        top:0;
        left:0;
        display: flex;
        z-index:99;
        background-color:#fff;
        color:#888;
        height: 40px;
        div{
            flex:1;
        }
        .my-left button{
            background: #fff;
            box-shadow: none;
            height: 40px;
            line-height: 40px;
        }
        h1{
            flex:1;
            font-size: 18px;
            line-height: 30px;
            text-align: center;
            img{
                height: 30px;
                vertical-align: -25%;
            }
        }
    }
    .app-conteiner{
        padding-top: 40px;
        padding-bottom: 50px;
    }
    .main-conteiner{
        /*overflow-x:hidden;*/
    }
    .mui-bar{
        box-shadow: 0 0 2px rgba(0,0,0,.2);
    }
    .v-enter,
    .v-leave-to{
        opacity:0;
        transform:translateX(100%);
    }
    .v-leave-to{
        transform:translateX(-100%);
        position:absolute;
    }
    .v-enter-active,
    .v-leave-active{
        transition:all 0.5s ease
    }

    /*改类名,解决tabbar无法点击切换的问题*/
    .mui-bar-tab .mui-tab-item-wen
    {
        display: table-cell;
        overflow: hidden;
        z-index:10;
        width: 1%;
        height: 50px;

        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;

        color: #929292;
    }
    .mui-bar-tab .mui-tab-item-wen.mui-active
    {
        color: #007aff;
    }
    .mui-bar-tab .mui-tab-item-wen .mui-icon
    {
        top: 3px;

        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-wen .mui-icon ~ .mui-tab-label
    {
        font-size: 11px;

        display: block;
        overflow: hidden;

        text-overflow: ellipsis;
    }
    .mui-bar-tab .mui-tab-item-wen .mui-icon:active
    {
        background: none;
    }
</style>