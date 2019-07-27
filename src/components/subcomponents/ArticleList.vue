<template>
    <div class="article-list">
        <div class="mui-scroll-wrapper" id="refreshContainer">
            <div class="mui-scroll">
               <div>
                   <div class="good-item" v-for="item in articleList" :key="item.art_id" @tap="goDetail(item.art_id)">
                       <img src="/static/images/menu/menu1.png" alt="">
                       <h1 class="title">{{item.art_title}}</h1>
                       <p class="content">{{item.art_content}}</p>
                       <div class="info">
                           <div class="sell">
                               <div>
                                   <img :src="item.user_img" alt="">
                                   <span>{{item.user_name}}</span>
                               </div>
                               <span class="mui-icon mui-icon-eye">{{item.art_view}}</span>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script>

    import mui from '../../static/lib/mui/dist/js/mui.min.js'

    export default {
        name: "ArticleList",
        props: ['articleList'],
        data() {
            return {

            }
        },
        methods: {
            goDetail(id) {
                this.$router.push({name: "articledetail", params: {id}})

            },
            muiRenew(){
                for(var i = mui.hooks.inits.length-1,item;i>=0;i--){
                    item=mui.hooks.inits[i];
                    if(item.name=="pullrefresh"){
                        item.repeat=true;
                    }
                }
            },
            muiInit(){
                var that = this
                mui.init({
                    pullRefresh: {
                        container: '#refreshContainer',
                        down : {
                            auto:true,
                            callback :function () {
                                that.$emit('initStudy',(flag)=>{
                                    if (flag){
                                        //true,为还有更多
                                        this.endPulldownToRefresh();
                                        this.enablePullupToRefresh();
                                    }else{
                                        this.endPulldownToRefresh();
                                        this.disablePullupToRefresh();
                                    }

                                })
                            }
                        },
                        up: {
                            callback: function () {

                                that.$emit('getMore',(flag)=>{
                                    this.endPullupToRefresh(flag);
                                    if(!flag) {
                                        //解决不显示上拉加载更多的bug
                                        var bottomElem = document.querySelector('.mui-pull-bottom-pocket');
                                        if(!bottomElem.classList.contains('mui-visibility')) {
                                            bottomElem.classList.add('mui-visibility');
                                        }

                                    }
                                })

                            }
                        }
                    }
                });


            }
        },
        created() {
            this.muiRenew()
        },
        mounted() {
            this.muiInit()
        }
    }
</script>

<style scoped lang="less">

    .article-list {
        .mui-scroll-wrapper {
            margin-top: 40px;
            margin-bottom: 50px;
            .mui-scroll{
                min-height: 101%;
            }
        }
        .good-item {
            background: #fff;
            margin: 10px auto;
            width: 90%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            padding: 2px;
            min-height: 120px;
            > img {
                display: block;
                width: 50px;
                float: right;
                margin-top: 16px;
            }
            .title {
                overflow: hidden;
                height: 21px;
                line-height: 21px;
                font-size: 14px;
            }
            .content {
                overflow: hidden;
                font-size: 14px;
                height: 42px;
                line-height: 21px;
            }
            .info {
                background-color: #f5f5f5;
                padding-right: 10px;
                .sell {
                    display: flex;
                    justify-content: space-between;
                    img {
                        width: 30px;
                        border-radius: 50%;
                        vertical-align: -45%;
                    }
                    span {
                        color:#888;
                        line-height: 30px;
                        font-size: 14px;
                    }
                    .mui-icon{
                        line-height: 35px;
                    }

                }
            }
        }
    }
</style>