<template>
    <div class="articledetail-container">
        <div class="mui-scroll-wrapper" id="refreshContainer1">
            <div class="mui-scroll">
                <h3>最新留言</h3>
                <comment-box :comments="comments" ly="ly" @getMulti="getMulti" @handleSecondPostClick="handleSecondPostClick"></comment-box>

            </div>
        </div>
        <div class="post-cmt" v-show="!flag">
            <p><span class="mui-icon mui-icon-compose"></span><input type="text" placeholder="我来评论..." @click="handlePostClick" class="write">
            </p>
        </div>
        <login-box v-if="flag && !$store.getters.getUser" @hideLG="hideLG"></login-box>
        <post-comment v-if="flag && $store.getters.getUser" @hidePC="hidePC" @addComment="addComment" :com_info="com_info"></post-comment>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import commentBox from '../subcomponents/comment.vue'
    import mui from '../../static/lib/mui/dist/js/mui.min.js'
    import loginBox from '../subcomponents/LoginComponent.vue'
    import postComment from '../subcomponents/PostComment.vue'
    export default {
        name: "lyContainer",
        data() {
            return {
                id: 0,
                detail: '',
                comments:{data:[]},
                pageSize:5,
                pageIndex:1,
                count:0,
                flag:false,
                com_info:''
            }
        },
        methods: {
            getComments(){
                this.$axios.get('/api/comments/queryComments.php',{params:{page:this.pageIndex,pageSize:this.pageSize,art_id:this.id}})
                    .then(res => {
                        if (res.data.error) {
                            return Toast(res.data.message)
                        }
                        console.log(res.data)
                        this.comments = res.data
                        this.count = res.data.count
                    })
            },
            getMulti(index) {
                this.comments.data[index].com_multi.page++
                var page = this.comments.data[index].com_multi.page
                var com_id = this.comments.data[index].com_id
                this.$axios.get('/api/comments/querySecondComments.php',{params:{page,pageSize:this.pageSize,com_id}})
                    .then(res => {
                        if (res.data.error) {
                            return Toast(res.data.message)
                        }
                        for (var i=0;i<this.comments.data[index].com_multi.data.length;i++){
                            res.data.forEach(t=>{
                                if (this.comments.data[index].com_multi.data[i].com_multi_id == t.com_multi_id){
                                    this.comments.data[index].com_multi.data.splice(i,1)
                                    i--
                                }
                            })
                        }

                        this.comments.data[index].com_multi.data = this.comments.data[index].com_multi.data.concat(res.data)
                    })
            },
            getMoreComment(callback) {
                this.pageIndex++
                this.$axios.get('/api/comments/queryComments.php',{params:{page:this.pageIndex,pageSize:this.pageSize,art_id:this.id}})
                    .then(res => {
                        if (res.data.error) {
                            return Toast(res.data.message)
                        }
                        setTimeout(()=>{
                            for (var i=0;i<this.comments.data.length;i++){
                                res.data.data.forEach(t=>{
                                    if (this.comments.data[i].com_id == t.com_id){
                                        this.comments.data.splice(i,1)
                                        i--
                                    }
                                })
                            }
                            this.comments.data = this.comments.data.concat(res.data.data)
                            this.count = res.data.count
                            if (this.comments.data.length>=this.count){
                                callback && callback(true)
                            }else{
                                callback && callback(false)
                            }
                        },200)

                    })
            },
            handlePostClick(){
                this.com_info = ''
                this.flag = 1
                //为了解决搜狗输入法会挡住输入框问题
                setTimeout(function(){
                    document.body.scrollTop = document.body.scrollHeight;
                },200);
            },
            handleSecondPostClick(obj){
                this.com_info = obj
                this.flag = 2;
                setTimeout(function(){
                    document.body.scrollTop = document.body.scrollHeight;
                },200);
            },
            hidePC(){
                this.flag = false
            },
            hideLG(){
                this.flag = false
            },
            addComment(content,callback){
                if (this.flag === 1){
                    var com_id = ''
                    this.$axios.post('/api/comments/addComments.php',{
                        art_id:this.id,content:content}
                    )
                        .then(res => {
                            if (res.data.error){
                                this.flag=false
                                return Toast(res.data.message)
                            }
                            Toast('评论成功')
                            callback &&callback()
                            this.flag=false
                            com_id = res.data.id

                            this.comments.data = this.comments.data.concat({
                                com_art_id: this.id,
                                com_content: content,
                                com_id: com_id,
                                com_multi: {count:0,data:[]},
                                com_time: Date.now(),
                                com_user_id: this.$store.getters.getUser.user_id,
                                user_img: this.$store.getters.getUser.user_img,
                                user_name: this.$store.getters.getUser.user_name,
                            })

                        })
                } else if(this.flag === 2){
                    var com_parent_multi_id = this.com_info.com_parent_multi_id || ''
                    var parent_user_name = this.com_info.com_parent_multi_id?this.com_info.parent_user_name:null;
                    this.$axios.post('/api/comments/addSecondComments.php',{
                        com_id:this.com_info.com_id,com_multi_content:content,com_parent_multi_id:com_parent_multi_id}
                    )
                        .then(res => {
                            console.log(res.data)
                            if (res.data.error){
                                this.flag=false

                                return Toast(res.data.message)
                            }
                            Toast('回复成功')
                            callback &&callback()
                            this.flag=false
                            com_multi_id = res.data.id
                            this.comments.data[this.com_info.index].com_multi.count ++

                            this.comments.data[this.com_info.index].com_multi.data = this.comments.data[this.com_info.index].com_multi.data.concat({
                                com_id:this.com_info.com_id ,
                                com_multi_content: content,
                                com_multi_id: com_multi_id,
                                com_multi_time: Date.now(),
                                com_multi_user_id: this.$store.getters.getUser.user_id,
                                com_parent_multi_id: com_parent_multi_id,
                                parent_user_name: parent_user_name,
                                user_id: this.$store.getters.getUser.user_id,
                                user_img: this.$store.getters.getUser.user_img,
                                user_name: this.$store.getters.getUser.user_name,
                            })
                            this.com_info = ''


                        })
                }

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
                        container: '#refreshContainer1',
                        down : {
                            auto:true,
                            callback :function () {
                                this.endPulldownToRefresh();
                                this.disablePulldownToRefresh();
                                this.disablePullupToRefresh();
                                setTimeout(()=>{
                                    //为了防止一开始盒子没撑开的时候就进行上来加载
                                    if (that.comments.data.length<that.pageSize){
                                        this.endPullupToRefresh();
                                    }else{
                                        this.enablePullupToRefresh();
                                    }

                                },1000)

                            }
                        },
                        up: {
                            callback: function () {
                                that.getMoreComment((flag)=>{
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
            this.getComments()
        },
        mounted() {
            this.muiInit()


        },
        components: {
            commentBox,
            loginBox,
            postComment
        }

    }
</script>

<style scoped lang="less">
    .v-enter,
    .v-leave-to{
        .mui-scroll-wrapper{
            margin-top: 0 !important;
        }
    }

    .v-enter-active,
    .v-leave-active{
        .mui-scroll-wrapper{
            margin-top: 0 !important;
        }
    }

    .articledetail-container {
        .mui-scroll-wrapper{
            margin-top: 40px;
            margin-bottom: 50px;
            padding-top: 10px;
            padding-bottom: 55px;
            .mui-scroll{
                width: 90%;
                background: #fff;
                border-radius: 10px;
                padding: 10px;
                left:5%;
            }
        }

        h3 {
            font-size: 16px;
            color: #226aff;
            height: 25px;
            margin: 15px 0;
            margin-left: 5px;
            border-bottom: 1px solid #ccc;
        }
        .content {
            text-align: center;
            p {
                text-align: left;
                text-indent: 2em;
                line-height: 2;
            }
            img {
                width: 50%;
            }
        }

        .post-cmt{
            width: 100%;
            position: fixed;
            bottom:50px;
            z-index:90;
            background: #fff;
            left:0;
            border-top:1px solid #ccc;
            padding-bottom: 5px;
            padding-left: 50px;
            p{
                border-bottom: 1px solid #ccc;
                padding: 0;
                margin: 0;
                width: 120px;
                .write{
                    height: 33px;
                    line-height: 33px;
                    margin: 0;
                    padding: 0;
                    border: none;
                    width: 100px;
                    font-size: 14px;
                    color:#666;
                }
                span{
                    font-size: 16px;
                    margin: 0;
                }
            }

        }
    }
</style>