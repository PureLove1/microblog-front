<template>
    <div class="box">
        <h3>{{ title }}</h3>
        <div v-show="videos.length == 0">
            <el-empty description="暂无数据"></el-empty>
        </div>
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
export default {
    name: 'Video',
    props:['title'],
    data() {
        return {
            videos: []
        }
    },
    watch: {
        $route: {
            handler(newVal, oldVal) {
                console.log(newVal.path)
                if (newVal.path == '/video') {
                    this.fetchVideo();
                } else if (newVal.path == '/fvideo') {
                    this.fetchFollowVideo()
                } else {
                    this.fetchHistoryVideo()
                }
            }
        }
    },
    created() {
        console.log(this.$route.path)
        if (this.$route.path == '/video') {
            this.fetchVideo();
        } else if (this.$route.path == '/fvideo') {
            this.fetchFollowVideo()
        } else {
            this.fetchHistoryVideo()
        }
    },
    methods: {
        fetchVideo() {
            var that = this;
            this.$http.get('/blog/video').then(
                res => {
                    if (res.result) {
                        that.videos = [];
                        let temp = res.data;//temp是一个数组
                        if (temp != undefined) {
                            for (let i = 0; i < temp.length; i++) {//对传输的blog的urls进行拆分
                                let tempBlog = temp[i];
                                let trimResult = tempBlog.urls.split(',');//按逗号拆分，得到一个数组
                                //split返回的是一个数组，可以前端遍历
                                tempBlog.urls = trimResult;
                                //that.allBlogs.push(tempBlog);
                                that.videos.splice(i, 1, tempBlog);

                            }
                        }
                        console.log(that.videos)
                    }
                }
            )
        },
        fetchFollowVideo() {
            var that = this;
            this.$http.get('/blog/video/follow').then(
                res => {
                    if (res.result) {
                        that.videos = [];
                        let temp = res.data;//temp是一个数组
                        if (temp != undefined) {
                            for (let i = 0; i < temp.length; i++) {//对传输的blog的urls进行拆分
                                let tempBlog = temp[i];
                                let trimResult = tempBlog.urls.split(',');//按逗号拆分，得到一个数组
                                //split返回的是一个数组，可以前端遍历
                                tempBlog.urls = trimResult;
                                //that.allBlogs.push(tempBlog);
                                that.videos.splice(i, 1, tempBlog);

                            }
                        }
                        console.log(that.videos)
                    }
                }
            )
        },
        redirect(link) {
            this.$router.push(link)
        }

    }
}
</script>
<style scoped>
.user-info-box {
    padding: 0 10px;
}

.uname {
    text-decoration: none;
    color: #939393;
    font-size: 13px;
}

.uname:hover {
    color: #ff8200;
}

.link-box {
    width: 258px;
    height: 40px;
    padding: 10px;
}

.link {
    width: 278px;
    text-decoration: none;
    color: black;
    font-weight: 600;
}

.link:hover {
    color: #ff8200;
}

.videos-box {
    display: flex;
    flex-wrap: wrap;
}
.video-box {
    margin: 10px;
    background-color: white;
    width: fit-content;
    cursor: pointer;
    border-radius: 5px;
}
.video-box:hover{
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
}

.user-info {
    display: flex;
    padding: 0 14px;
}

.header {
    width: 34px;
    height: 34px;
    border-radius: 100%;
    margin: auto 0;
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.cover {
    width: 278px;
    height: 165px;
}

.box {
    width: 900px;
    padding: 10px;
}</style>