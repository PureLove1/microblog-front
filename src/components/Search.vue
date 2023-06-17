<template>
    <div class="search-res">
        <div class="user-box" v-for="user in userList">
            <div>
                <img class="user-img" :src="user.image" />
            </div>
            <div class="user-info">
                <div class="user-name">{{ user.name }}</div>
                <div class="tip-text">{{ user.introduce }}</div>
                <div class="tip-text">粉丝：{{ user.fanNum }}</div>
            </div>
            <div style="margin:auto">
                <button class="follow" v-if="user.followed" @click="follow(user)">已关注</button>
                <button class="follow" v-else @click="follow(user)">+关注</button>
            </div>
        </div>
        <Blogs :subBlogs="allBlogs" :loadingBlog="loadingBlog" :padding="false" />
    </div>
</template>
<script>
import Blogs from './Blogs.vue';

export default {
    name: "Search",
    data() {
        return {
            emojis: [
                {
                    name: "[抽泣]",
                    path: require("../assets/emoji/bitter.png")
                },
                {
                    name: "[哭]",
                    path: require("../assets/emoji/cry.png")
                },
                {
                    name: "[狗头]",
                    path: require("../assets/emoji/doge.png")
                },
                {
                    name: "[苦笑]",
                    path: require("../assets/emoji/kuxiao.png")
                },
                {
                    name: "[思考]",
                    path: require("../assets/emoji/think.png")
                },
                {
                    name: "[笑而不语]",
                    path: require("../assets/emoji/xiaoerbuyu.png")
                }
            ],
            loadingBlog: false,
            allBlogs: [],
            user: null,
            currentPage: 0,
            pageSize: 5,
            userList:[]
        };
    },
    watch: {
        $route: {
            handler(newVal, oldVal) {
                this.loadingQuery()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        follow(user) {
            this.$http.put("/follow/" + user.id + "/" + !user.followed)
                .then(res => {
                    if (res.result) {
                        user.followed = !user.followed;
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        loadingQuery() {
            this.loadingBlog = true;
            var that = this;
            //splice(start,deleteCount,…value)：从start开始替换deleteCount个元素，后面跟上要替换的元素。
            this.$http.get('/search/blog/' + this.$route.query.q +
                '?currentPage=' + this.currentPage +
                '&pageSize=' + this.pageSize
            ).then(res => {
                if (res.result) {
                    that.allBlogs = [];
                    if (res.data != null) {
                        var temp = res.data.content;//temp是一个数组
                        if (temp != undefined) {
                            for (var i = 0; i < temp.length; i++) {//对传输的blog的urls进行拆分
                                var tempBlog = temp[i];
                                var trimResult = tempBlog.urls.split(',');//按逗号拆分，得到一个数组
                                //split返回的是一个数组，可以前端遍历
                                tempBlog.urls = trimResult;
                                tempBlog.content=that.replaceEmoji(that.turnTextIntoHtml(tempBlog.content))
                                //that.allBlogs.push(tempBlog);
                                that.allBlogs.splice(i, 1, tempBlog);
                            }
                        }
                        that.loadingBlog = false;
                    } else {
                        that.allBlogs = [];
                        that.loadingBlog = false;
                    }

                } else {
                    console.error(res.data)
                    that.loadingBlog = false;
                }
            }
            ).catch();
            this.$http.get('/user/name/' + this.$route.query.q + '?ref=user').then(
                res => {
                    if (res.result) {
                        that.userList = res.data
                    }
                }
            ).catch(err => {
                console.error(err)
            })
        },
        replaceEmoji(a) {
            var regex = /\[(.+?)\]/g;
            let str = a.matchAll(regex)
            for (let match of str) {//mactch[0]就是匹配的值
                for (let i = 0; i < this.emojis.length; i++) {
                    if (this.emojis[i].name == match[0] + '') {
                        console.log("匹配到字符");
                        let url = "<img src='" + this.emojis[i].path + "' style='width: 20px; height: 20px;'>";
                        a=a.replace(match[0], url)
                    }

                }
            }
            return a;
        },
        turnTextIntoHtml(regstr) {
            var reg = '#[^#]+#';
            var str = regstr.matchAll(reg); //返回迭代器
            var ret = '';
            for (let match of str) {//mactch[0]就是匹配的值
                //去除首尾的#号<el-link type="warning">警告链接</el-link>
                let matchStartEnd = match[0].replace('#', '').replace('#', '');
                var count = 0;
                let oldm = match[0]
                match[0] = match[0].replace('#' + matchStartEnd + '#', '<a class="link-style" target="_blank" href="/topic/' + matchStartEnd + '">' + match[0] + '</a>');
                //match[0]是转换出来的html
                let jinindex = regstr.indexOf('#');
                //#topic#--><el-link type="warning" href="/topic/topic"> #topic# </el-link>
                regstr = regstr.replace('#' + matchStartEnd + '#', '<a class="link-style" target="_blank" href="/topic/' + matchStartEnd + '">' + oldm + '</a>');

                let res = jinindex + match[0].length;

                let subStr = regstr.slice(0, res);

                regstr = regstr.slice(res);
                ret += subStr;
            }
            if (regstr != '') {
                ret += regstr;
            }
            let res = ret.replace(/[\n\r]/g, '<br>');
            return res;
        }
    },
    created() {
        this.loadingQuery();
    },
    components: { Blogs }
}
</script>
<style scoped>
.search-res {
    width: 642px;
}

.user-box {
    margin: 0px 7px;
    margin-bottom: 14px;
    display: flex;
    box-shadow: 0px 0px 1px 1px rgb(0 0 0 / 10%);
    border-radius: 4px;
    background-color: white;
    padding: 20px 18px;
    cursor: pointer;
}

.user-box:hover {
    background-color: #f2f2f2;
}

.user-info {
    width: 500px;
    margin-left: 8px
}

.user-img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
}

.user-name {
    font-size: 12px;
    font-family: PingFangSC-Semibold;
    line-height: 18px;
    font-weight: 600;
}

.tip-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    font-size: 12px;
    margin: 1px 0;
    line-height: 16px;
    color: #939393;
}

.follow {
    width: 70px;
    padding: 2px 0px;
    border-radius: 25px;
    border: 1px solid #ff8200;
    background: transparent;
    color: #ff8200;
    cursor: pointer;
}

.follow:hover {
    background-color: #fae9d7;
}
</style>