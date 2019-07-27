<template>
    <art-list-com :articleList="articleList.data" @getMore="getMoreStudyList" @initStudy="initStudyList"></art-list-com>
</template>

<script>
    import {Toast} from 'mint-ui'
    import artListCom from '../subcomponents/ArticleList.vue'
    export default {
        name: "FunnyList",
        data(){
            return {
                articleList:[],
                pageIndex:1,
                pageSize:5,
            }
        },
        methods:{
            initStudyList(callback){
                this.pageIndex=1
                this.$axios.get('/api/article/queryArticle.php?art_type_id=4&pageSize=5&page=' + this.pageIndex)
                    .then((res) => {
                        if (!res.data.data.length){return Toast('没有更多文章了')}
                        if (!res.data.data.length < 5) {
                            callback && callback(false)
                        }else{
                            callback && callback(true)
                        }
                        this.articleList = res.data

                    })
            },
            getMoreStudyList(callback){
                this.pageIndex++
                this.$axios.get('/api/article/queryArticle.php?art_type_id=3&pageSize='+this.pageSize+'&page=' + this.pageIndex)
                    .then((res) => {
                        if (!res.data.data.length){

                            return Toast('没有更多文章了')
                        }
                        if (!res.data.data.length < 5) {
                            callback && callback(true)
                        }else{
                            callback && callback(false)
                        }
                        this.articleList.data = this.articleList.data.concat(res.data.data)
                    })

            }
        },
        created(){

        },
        components:{
            artListCom
        }
    }
</script>

<style scoped>

</style>