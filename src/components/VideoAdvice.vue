<template>
    <div class="advice">
        <div>推荐视频</div>
        <div class="videos-box">
            <div v-for="item of videos" class="video-box" @click="redirect('/show/' + item.id)">
                <div>
                    <img :src="item.urls[1]" class="cover">
                </div>
                <div class="link-box">
                    <router-link class="link" :to="'/show/' + item.id">{{
                        item.title.length > 30 ? item.title.substring(0, 30) + '..' : item.title }}</router-link>
                </div>
                <div class="user-info">
                    <img class="header" @click="redirect('/usr/' + item.userId)" :src="item.user.image">
                    <div class="user-info-box">
                        <div><router-link class="uname" :to="'/usr/' + item.userId">{{ '@' + item.user.name }}</router-link>
                        </div>
                        <div class="time">{{ item.createTime }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:"VideoAdvice",
    data(){
        return{
            videos: []
        }
    },
    props:['id'],
    created(){

    },
    methods:{
        
    }
}
</script>
<style scoped>
.advice{
    margin-left: 10px;
    width: 400px;
}
</style>