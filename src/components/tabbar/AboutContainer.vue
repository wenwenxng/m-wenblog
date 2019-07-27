<template>
    <div class="about-container">
        <div class="inner-container">
            <div class="title_box">
                <h4 class="title">关于我</h4>
            </div>
            <div class="content clearfix">
                <img src="/static/images/myphoto.jpg" alt="飞了" title="温文星" class="myphoto">
                <p class="text"><strong>姓名: </strong>温文星</p>
                <p class="text"><strong>姓名: </strong>广东</p>
                <p class="text"><strong>职业: </strong>前端工程师</p>
                <p class="text"><strong>个人说明: </strong>90后</p>
                <p class="text"><strong>我的邮箱: </strong>529768301@qq.com</p>
            </div>
        </div>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        name: "AboutContainer",
        data(){
            return{

            }
        },
        methods:{


        },
        created(){

        },
        components:{

        }
    }
</script>

<style scoped lang="less">
    .about-container{
        margin-top: 15px;
        .inner-container{
            background: #fff;
            min-height: 500px;
            border-radius: 15px;
        }
        .title_box{
            padding: 20px;
            border-bottom: 1px solid #ccc;
        }
        .title_box .title{
            font-size: 20px;
        }
        .content{
            padding: 25px;
        }
        .content img{
            width: 100%;
            margin-bottom: 20px;
        }
        .content .myphoto{
            display: block;
            float:left;
            overflow: hidden;
            margin-right: 20px;
        }
        .content .text{
            margin-top: 15px;
            font-size: 18px;
            color:#888;
        }
    }

</style>