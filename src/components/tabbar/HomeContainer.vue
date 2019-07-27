<template>
    <div>


        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/study">
                    <img src="../../static/images/menu/menu1.png" alt="">
                    <div class="mui-media-body">交流学习</div></router-link></li>

                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/funny">
                    <img src="../../static/images/menu/menu2.png" alt="">
                    <div class="mui-media-body">娱乐段子</div></router-link></li>

                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/dream">
                    <img src="../../static/images/menu/menu3.png" alt="">
                    <div class="mui-media-body">心灵鸡汤</div></router-link></li>

                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click.prevent="handleNothing"><a href="#">
                    <img src="../../static/images/menu/menu4.png" alt="">
                    <div class="mui-media-body">图片分享</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click.prevent="handleNothing"><a href="#">
                    <img src="../../static/images/menu/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click.prevent="handleNothing"><a href="#">
                    <img src="../../static/images/menu/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>
            </ul>
        </div>

    </div>

</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    import { Toast } from 'mint-ui'
    export default {
        name: "HomeContainer",
        data(){
            return {
                lunbotuList:[],//保存轮播图的数组
            }
        },
        mounted(){
            this.getLunBoTu()
        },
        methods:{
            getLunBoTu(){
                this.$axios.get('/api/banner/queryBanner.php').then((res) => {
                    if (res.data.error){
                        return Toast("获取轮播图失败")
                    }
                    this.lunbotuList= res.data

                })

            },
            handleNothing(){
                alert('该功能尚未开放')
            }
        },
        components:{
            swiper
        }
    }
</script>

<style lang="less" scoped>

    .mui-grid-view.mui-grid-9{
        border:none;
        background-color: #fff;
        .mui-table-view-cell{
            border:none;
            img{
                width: 60px;
                height: 60px;
            }
            .mui-media-body{
                font-size: 13px;
            }
        }
    }
    .mui-content>.mui-table-view:first-child{
        margin: 0;
    }
</style>