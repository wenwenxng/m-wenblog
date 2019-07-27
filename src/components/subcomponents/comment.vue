<template>
    <div class="comment-container">
        <h3 v-if="!ly">最新评论</h3>


        <div class="cmt-list">
            <div class="cmt-item excerpt"  v-for="(item,index) in comments.data" :key="item.com_id">
                <div class="focus">
                    <a href="javascript:;" class="thumbnail nothing" target="_blank">
                        <img :src="item.user_img" ></a>
                </div>
                <header class="header">
                    <h2>
                        <a href="javascript:;" class="nothing">{{item.user_name}}</a></h2>
                </header>

                <p class="note" @tap="handleMulti({com_id:item.com_id,index:index,parent_user_name:item.user_name})">{{item.com_content}}</p>
                <p class="interact">
                    <span class="muted">
            <i class="mui-icon-extra mui-icon-extra-like"></i></span>
                </p>


                <div class="multi_comment">

                    <ul>


                        <li class="multi_excerpt clearfix" v-for="(t,i) in item.com_multi.data" :key="t.com_multi_id">
                            <div class="multi_focus">
                                <a href="javascript:;" class="thumbnail nothing" target="_blank">
                                    <img :src="t.user_img" ></a>
                            </div>
                            <header class="multi_header">
                                <h2>
                                    <a href="javascript:;" class="nothing">{{t.user_name}}</a></h2>
                            </header>
                            <p class="multi_note" @tap="handleMulti({com_id:item.com_id,com_parent_multi_id: t.user_id,parent_user_name:t.user_name,index:index})">{{t.parent_user_name?'回复@'+t.parent_user_name+':': ''}}{{t.com_multi_content}}</p>
                            <p class="multi_interact">
                                <span class="muted">
                    <i class="mui-icon-extra mui-icon-extra-like"></i></span>
                            </p>
                        </li>
                        <button class="getMulti" v-if="item.com_multi.count>3 && item.com_multi.data.length<item.com_multi.count" @tap="getMoreMulti(index)">展开更多评论</button>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "comment",
        data() {
            return {
                cmt: '',
            }
        },
        props: ['comments','ly'],
        methods: {
            getMoreMulti(index){
                this.$emit('getMulti',index)
            },
            handleMulti(obj){
                this.$emit('handleSecondPostClick',obj)

            }

        },
        created() {

        }
    }
</script>

<style lang="less" scoped>

    .comment-container {
        ul{
            list-style: none;
            padding: 0;
            margin: 0;
        }
        h3 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list {
            .excerpt {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                position: relative;
                .focus {
                    float: left;
                    margin-right: 20px;
                    a {
                        border-radius: 50%;
                        overflow: hidden;
                    }
                    img {
                        height: 40px;
                    }
                }
                .header {
                    margin: 5px 0;
                    h2 {
                        font-size: 16px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    a {
                        font-size: 16px;
                        font-weight: bold;
                        text-align: left;
                        color: #555;
                        transition: all 0.3s ease;
                    }
                }
                .note {
                    font-size: 14px;
                    color: #888;
                    line-height: 23.333px;
                    overflow: hidden;
                }
                .interact {
                    position: absolute;
                    right: 0;
                    top: 20px;
                    .muted {
                        font-size: 14px;
                        color: #aaa;
                        margin-right: 15px;
                        cursor: pointer;
                        i{
                            font-size: 14px;
                        }
                    }
                }
            }

            .multi_comment {
                padding-left: 30px;
                .multi_excerpt {
                    position: relative;
                    .multi_focus {
                        float: left;
                        margin-right: 20px;

                    }
                    .multi_focus{
                        a{
                            border-radius: 50%;
                            overflow: hidden;
                        }
                    }
                    .multi_focus img {
                        height: 20px;
                    }
                    .multi_header {
                        margin: 5px 0;
                    }
                    .multi_header {
                        h2 {
                            font-size: 14px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        a {
                            font-size: 14px;
                            font-weight: bold;
                            text-align: left;
                            color: #555;
                            transition: all 0.3s ease;
                        }
                    }
                    .multi_note {
                        font-size: 12px;
                        color: #888;
                        line-height: 23.333px;
                        overflow: hidden;
                    }
                    .multi_interact {
                        position: absolute;
                        right: -10px;
                        top: 10px;
                    }
                    .multi_interact .muted {
                        font-size: 14px;
                        color: #aaa;
                        margin-right: 15px;
                        cursor: pointer;
                        i{
                            font-size: 14px;
                        }
                    }
                }
                .getMulti{
                    padding: 3px;
                    font-size: 12px;
                    background: skyblue;
                    color: #fff;
                }
            }

        }


    }
</style>