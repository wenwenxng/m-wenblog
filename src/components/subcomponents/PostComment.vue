<template>
    <div class="post-cmt-container">
        <div class="postCmtBox">
            <form class="mui-input-group">
               <div class="content">
                   <textarea v-model.trim="com_content" rows="1" :placeholder="(com_info && com_info.parent_user_name)? '回复@'+ com_info.parent_user_name+': ' : '说说你的看法'" v-focus autofocus @keyup.enter="handlePostCmt"></textarea>
                   <button type="button" @tap.prevent="handlePostCmt">发表</button>
               </div>
            </form>
        </div>
        <div class="curtain" @tap="hidePC"></div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "PostComment",
        props:['com_info'],
        data(){
            return {
                com_content:''
            }
        },
        methods:{
            handlePostCmt(){
                this.$emit('addComment',this.com_content,()=>{
                    this.com_content = '';
                })

            },
            hidePC(){
                this.$emit('hidePC')
            },
        },
        created(){

        },
    }
</script>

<style scoped lang="less">
    .post-cmt-container{
        position: fixed;
        z-index: 998;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        .postCmtBox{
            position: fixed;
            z-index: 10000;
            bottom: 0;
            left: 50%;
            overflow: hidden;
            width: 100%;
            transition-property: transform,opacity;
            transform: translate3d(-50%,0,0);
            text-align: center;
            opacity: 1;
            color: #000;
            .content {
                display: flex;
                justify-content: space-between;
                textarea{
                    font-size: 14px;
                    color:#555;
                    &::-webkit-input-placeholder{
                        color:#ccc;
                        font-size: 14px;
                    }
                }
                button{
                    color:#fff;
                    background: skyblue;
                    z-index: 10000;
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