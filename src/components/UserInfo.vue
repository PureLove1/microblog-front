<template>
    <div style="width:642px;min-height: 400px;position: relative;">
        <div class="inbox">
            <div id="innerbox1">
                <div id="header">
                    <i class="el-icon-back" style="align-self: center;color: white;"></i>
                    <h3 style="color:white;font-weight: bolder;" @click="goBack">返回</h3>
                    <div style="position: absolute;width: 598px;text-align: center;pointer-events: none;">
                        <span style="justify-content: center;">@{{ user.name }}的个人主页</span>
                    </div>
                </div>
            </div>
            <img class="backimg" src="../assets/img/userback.jpg" />
            <!--站位div-->
            <div style="width:611px;height: 196px;"></div>

            <div style="margin:20px 20px;width:611px;display: flex;position: relative;">
                <div style="width:110px;margin-left: 0px;margin-right: 4px;">
                    <img class="user-img" :src="user.image" />
                </div>
                <div style="display:flex;flex-direction: column;margin-left: 2px;">
                    <h4 style="margin-left:12px">{{ user.name }}</h4>
                    <div style="display:flex">
                        <router-link class="link" :to="'/follow/fan/' + user.id">粉丝{{ user.fanNum }}</router-link>
                        <router-link class="link" :to="'/follow/' + user.id">关注{{ user.followNum }}</router-link>
                    </div>
                </div>
            </div>
            <div style="margin-left:20px">
                <el-descriptions class="margin-top" :column="1" :size="size">

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-document"></i>
                        </template>
                        {{ user.introduce }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-map-location"></i>
                        </template>
                        IP属地：广东
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-present"></i>
                        </template>
                        {{ user.birth + '' }}
                    </el-descriptions-item>

                </el-descriptions>
                <el-descriptions class="margin-top" :column="4" :size="size">
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-date"></i>
                        </template>
                        {{ user.createTime + '加入微博' }}
                    </el-descriptions-item>
                    <el-descriptions-item>

                        <template slot="label">
                            <i class="el-icon-service"></i>
                        </template>
                        信用很好
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <div style="width:inherit">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="精选" name="first" width="25%">
                        <div style="min-height:500px">
                            <div>
                                <span>热门内容</span>
                            </div>
                            <div>
                                <el-result icon="info" title="" subTitle="暂无数据">
                                </el-result>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="微博" name="second" width="25%">
                        <div style="min-height:500px">
                            <Blogs :subBlogs="this.allBlogs" :loadingBlog="loadingBlog" :userId="userId"
                            :usericonurl="usericonurl" :padding="false" />
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="视频" name="third" width="25%">
                        <div style="min-height:500px">
                            <div>
                                <span>视频微博</span>
                            </div>
                            <div>
                                <el-result icon="info" title="" subTitle="暂无数据">
                                </el-result>
                            </div>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="相册" name="fourth" width="25%">
                        <div style="min-height:500px">
                            <div>
                                <span>照片</span>
                            </div>
                            <div>
                                <el-result icon="info" title="" subTitle="暂无数据">
                                </el-result>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!-- <img src="../assets/img/userback.jpg"> -->
    </div>
</template>
<script>
import Blogs from './Blogs.vue';
export default {
    name: 'UserInfo',
    props: ['id'],
    data: function () {
        return {
            size: 'small',
            activeName: 'second',
            user: {
                name:'',
                id:'',
                fanNum:''
            },
            allBlogs: [],
            loadingBlog: false
        }
    },
    components: { Blogs },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'fetchData'
    },
    created() {
        this.fetchData();
        var that = this;
        this.$http.get('/blog/user/' + this.id).then(
            function (res) {
                var temp = res.data;//temp是一个数组
                if (temp != undefined) {
                    for (var i = 0; i < temp.length; i++) {//对传输的blog的urls进行拆分
                        var tempBlog = temp[i];
                        var trimResult = tempBlog.urls.split(',');//按逗号拆分，得到一个数组
                        //split返回的是一个数组，可以前端遍历
                        tempBlog.urls = trimResult;
                        that.allBlogs.push(tempBlog);
                    }
                }
                that.loadingBlog = false;
            }, function (err) {
                that.loadingBlog = false;
            }
        );
    },
    computed: {
        username() {
            return this.$store.state.username;
        },
        usericonurl() {
            return this.$store.state.userIconUrl;
        },
        userId() {
            return this.$store.state.userId;
        }
    },
    methods: {
        fetchData() {
            var that = this;
            this.$http.get('/user/' + this.id).then(res => {
                if (res.data) {
                    var newBirth = /\d{4}\-\d{1,2}\-\d{1,2}/g.exec(res.data.birth);
                    var newCreateTime = /\d{4}\-\d{1,2}\-\d{1,2}/g.exec(res.data.createTime);
                    that.user = res.data;
                    that.user.createTime = newCreateTime;
                    that.user.birth = newBirth;
                }
            }).catch(err => {
                console.error(err);
            })
        },
        goBack() {
            this.$router.go(-1);
        },
        handleClick(tab, event) {
        }
    }
}
</script>
<style scoped>
* {
    margin: 0 auto;
    padding: 0px;
}

.link {
    text-decoration: none;
    margin-left: 0px;
    font-size: 12px;
    padding-left: 12px;
    cursor: pointer;
    color: #838383;
    ;
}

.link:hover {
    text-decoration: none;
    color: #FF8200
}

.user-img {
    border-radius: 100%;
    width: 100px;
    height: 100px;
    border: 3px solid white;
    position: absolute;
    bottom: 0px;
}

#innerbox1 {
    display: flex;
    position: relative;
    background-color: transparent;
    z-index: 300;
}

.inbox {
    width: 611px;
    background-color: white;
    -webkit-box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
    border-radius: 4px;
}

#header {
    position: relative;
    display: flex;
    width: fit-content;
    align-self: center;
    cursor: pointer;
    margin-left: 10px;
}

.backimg {
    height: 240px;
    width: 611px;
    position: absolute;
    top: 0;
    border-radius: inherit;


    position: absolute;


    object-fit: cover;
}
</style>
<style>
.el-tabs__item {
    width: 25%;
    text-align: center;
}

.el-tabs__nav {
    width: 100% !important;
}

.el-tabs__item:hover {
    color: #FF8200 !important;
}

.is-active {
    color: #FF8200 !important;
}

.el-tabs__active-bar {
    background-color: #FF8200 !important;
}
</style>