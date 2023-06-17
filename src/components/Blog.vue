<template>
    <div style="margin-right:14px;width:642px" class="Home_feed_3o7ry" id="blog">
        <div id="innerbox1">
                <div id="header">
                    <i class="el-icon-back" style="align-self: center;color: black;"></i>
                    <h3 style="color:black;font-weight: bolder;" @click="goBack">返回</h3>
                    <div style="position: absolute;width: 598px;text-align: center;pointer-events: none;">
                        <span style="justify-content: center;font-size: 20px;">@{{ blog.user.name }}</span>
                    </div>
                </div>
            </div>
        <div v-show="blog == null && loadingBlog == false && showTip == true">
            <el-empty description="暂无数据"></el-empty>
        </div>
        <div v-show="!loadingBlog" class="blog_user_box">
            <!--博文用户信息-->
            <div style="display: flex;">
                <!--头像-->
                <div>
                    <img class="user_image" :src="blog.user.image">
                </div>
                <!--用户头像、博文发布时间-->
                <div class="user_info_box">
                    <div><router-link :to="'/usr/' + blog.userId" v-text="blog.user.name"
                            class="user_name_link"></router-link>
                    </div>
                    <div style="font-size: 12px;" v-text="blog.createTime"></div>
                </div>
                <!--操作-->
                <div class="blog_user_box_item">
                    <div class="blog_user_box_item_options">
                        <div :style="blog.userId != userId ? '' : 'width:70px'">
                            <button v-show="blog.userId != userId" v-if="blog.user.followed == false"
                                @click="follow(blog, blog.user.followed)" class="follow_btn">+关注</button>
                            <button v-show="blog.userId != userId" v-else @click="follow(blog, blog.user.followed)"
                                class="unfollow_btn">已关注</button>
                        </div>
                        <div>
                            <!-- <button class="more_btn">v</button> -->
                            <OptionDropDown :options="blog.userId != userId ? others : selfowner" :blogId="blog.id" />
                        </div>
                    </div>
                </div>
            </div>
            <!--博文-->
            <div class="blog_text_box">
                <!--博文正文-->
                <div style="margin-bottom: 2px;">
                    <!--正文内容-->
                    <div style="font-size:14px">
                        <span v-html="blog.content"></span>
                    </div>
                </div>
                <!--博文图片-->
                <div>
                    <div v-if="blog.urls.length > 1" style="display:block">
                        <!--判断图片数量，如果大于1就用方格形式展示，否则自适应窗体大小-->
                        <div v-for="item of blog.urls" class="image_box">
                            <img class="blog_image" :src="item">
                        </div>
                    </div>
                    <div v-else style="display:block">
                        <!--判断图片数量，如果大于1就用方格形式展示，否则自适应窗体大小-->
                        <div v-for="item of blog.urls" class="image_box">
                            <img class="one_blog_image" :src="item">
                        </div>
                    </div>
                </div>
            </div>
            <!--按钮组-->
            <div>
                <div style="display: flex;">
                    <div class="bottom_button_box">
                        <div class="button_box_item">
                            <i class="iconfont icon-fenxiang icon-item-i"> </i>
                            <div>
                                <span v-if="blog.shareNum == 0" class="button_box_item_span">分享</span>
                                <span v-else class="button_box_item_span" v-text="blog.shareNum"></span>
                            </div>
                        </div>
                    </div>
                    <div class="bottom_button_box">
                        <div class="button_box_item" @click="unfoldComment(blog)">
                            <i class="iconfont icon-pinglun icon-item-i"> </i>
                            <span v-if="blog.commentsNum == 0" class="button_box_item_span">评论</span>
                            <span v-else class="button_box_item_span" v-text="blog.commentsNum"></span>
                        </div>


                    </div>
                    <div class="bottom_button_box">
                        <div @click="like(blog)" :class="blog.liked ? 'button_box_item_isLiked' : 'button_box_item'">
                            <i class="iconfont icon-dianzan icon-item-i"> </i>
                            <span v-if="blog.likeNum == 0" class="button_box_item_span">点赞</span>
                            <span v-else class="button_box_item_span" v-text="blog.likeNum"></span>
                        </div>
                    </div>
                </div>
                <!--展示评论-->
                <el-collapse-transition>
                    <div>
                        <!--分割线-->
                        <div class="deliver2 transition-box"></div>
                        <div class="transition-box" style="display: flex;width: 100%;">
                            <div>
                                <img :src="usericonurl" class="commentbox_user">
                            </div>
                            <div style="width: inherit;">
                                <input @keyup="commentIsEmpty(blog, $event)" @keydown="commentIsEmpty(blog, $event)"
                                    class="comment_box_input" type="text" placeholder="发布你的评论">
                            </div>
                        </div>
                        <div class="transition-box" style="display: flex;margin-top: 7px;">
                            <div style="width: 19%;text-align: end;">
                                <i class="iconfont icon-biaoqing comment_box_i"></i>
                            </div>
                            <div style="margin-left: 32px;width:100%">
                                <input type="checkbox">
                                <span>同时转发</span>
                            </div>
                            <div style="width:46%">
                                <el-button :plain="true" :key="blog.id"
                                    :disabled="blog.hasOwnProperty('empty') ? blog.empty : true"
                                    @click="comment(blog, $event)" class="btn4">评论
                                </el-button>
                            </div>
                        </div>
                        <div v-show="blog.blogComments != null && blog.blogComments.length != 0" class="transition-box">
                            <!--分割线-->
                            <div class="deliver2"></div>
                            <Comments :blogId="blog.id" :showAll="true" :comments="blog.blogComments" :commentsNum="blog.commentsNum" />
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import { Loading } from 'element-ui';
import OptionDropDown from './OptionDropDown.vue';
import Comments from './Comments.vue';
export default {
    name: "Blogs",
    props: ['id'],
    watch: {
        loadingBlog(newValue, oldValue) {
            if (newValue == true) {
                this.showTip = false;
                if (this.loadingInstance) {
                    this.loadingInstance.close();
                    this.loadingInstance = Loading.service({
                        target: document.querySelector("#blog"),
                        lock: false,
                        background: "transparent",
                        text: "正在玩命加载中",
                        fullscreen: false,
                        body: false
                    });
                }
            }
            else {
                if (this.loadingInstance) {
                    var that = this;
                    // 以服务的方式调用的 Loading 需要异步关闭
                    setTimeout(() => {
                        that.loadingInstance.close();
                        that.showTip = true;
                    }, 1000);
                }
                ;
            }
        },
        $router: () => {
            alert(this.$route.query.gid)
        }
    },
    data: function () {
        return {
            commentAndForward: false,
            loadingInstance: null,
            showTip: false,
            blog: null,
            loadingBlog: true,
            tem: { 'text': '编辑微博', 'opt': '/edit/blog/' },
            //查询方式
            way: 0,
            selfowner: [
                { 'text': '编辑微博', 'opt': '/edit/blog/' },
                { 'text': '转换为公开', 'opt': '/blog/toPublic/' },
                { 'text': '转换为粉丝可见', 'opt': '/blog/toFan/' },
                { 'text': '转换为好友可见', 'opt': '/blog/toFriend/' },
                { 'text': '删除', 'opt': '/blog/' },
                { 'text': '复制微博地址', 'opt': '/blog/' }
            ],
            others: [
                { 'text': '帮上头条', 'opt': '/blog/toHot/' },
                { 'text': '收藏', 'opt': '/blog/toHot/' },
                { 'text': '屏蔽此微博', 'opt': '/blog/toHot/' },
                { 'text': '屏蔽该博主', 'opt': '/blog/toHot/' },
                { 'text': '屏蔽关键词', 'opt': '/blog/toHot/' },
                { 'text': '投诉', 'opt': '/blog/toHot/' },
                { 'text': '复制微博地址', 'opt': '/blog/toHot/' }
            ]
        };
    },
    computed: {
        usericonurl() {
            let usericon = sessionStorage.getItem("userIconUrl");
            if (usericon) {
                return usericon;
            } else if (this.$store.state.userIconUrl) {
                return this.$store.state.userIconUrl;
            } else {
                return 'http://43.143.129.55:8080/group1/M00/00/00/CgAIEWQn81WAWqqhAAAIcngfAoI259.jpg'
            }
        },
        userId() {
            let userId = sessionStorage.getItem("userId");
            if (userId) {
                return userId;
            } else {
                return this.$store.state.userId;
            }
        }
    },
    created: function () {
        console.log(this.id);
        this.loadingBlog = true;
        this.$nextTick(() => {
            that.loadingInstance = Loading.service({
                target: document.querySelector("#blog"),
                lock: false,
                background: "transparent",
                fullscreen: false,
                text: "正在玩命加载中...",
                body: false
            });
        });
        var that = this;
        this.$http.get('/blog/' + this.id + '/comments/' + this.way)
            .then(res => {
                if (res.result) {
                    that.blog = res.data;
                    var trimResult = that.blog.urls.split(',');//按逗号拆分，得到一个数组
                    that.blog.urls = trimResult;
                    that.loadingBlog = false;
                } else {
                    that.loadingBlog = false;
                    that.$message.error(res.message)
                }
            }).catch(err => {
                that.loadingBlog = false;
                console.error(err)
            })


    },
    methods: {
        showMessage(msg) {
            this.$emit('showMessage', msg);
        },
        commentIsEmpty(value, event) {
            let eventTarget = event.currentTarget;
            let val = $(eventTarget).val();
            console.log(val.trim())
            let result = val.trim().length > 0 ? false : true;
            this.$set(value, 'empty', result);
            console.log(value)
        },
        like: function (value) {
            var blogId = value.id;
            this.$http.put("/blog/like/" + blogId)
                .then(res => {
                    if (res.result) {
                        value.liked = !value.liked;
                        value.likeNum = value.liked ? value.likeNum + 1 : value.likeNum - 1;
                    }
                    else {
                        var choose = confirm("尚未登陆!请登录后再试");
                        if (choose) {
                            this.$router.push('/login')
                        }
                    }
                })
                .catch(function (error) {
                    alert("请求出错！请稍候再试或联系微博管理员");
                });
        },
        follow: function (value, judge) {
            //value:博客对象，judge:是否关注了
            var that = this;
            this.$http.put("/follow/" + value.userId + "/" + !judge)
                .then(res => {
                    if (res.result) {
                        //splice(start,deleteCount,…value)：
                        //从start开始替换deleteCount个元素，后面跟上要替换的元素。
                        value.user.followed = !judge;
                        that.showMessage(res.message);
                    }
                    else if (res.statusCode != 'A0200') {
                        that.showMessage(res.message);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        unfoldComment: function (value) {
            var that = this;
            if (value.showComment == false) {
                this.$http.get("/blogComments/" + value.id)
                    .then(function (res) {
                        if (res.result) {
                            value.blogComments = res.data;
                            value.showComment = !value.showComment;
                        }
                        else {
                            that.$message.error(res.message);
                        }
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            } else {
                value.showComment = !value.showComment;
            }

            //展示评论

        },
        comment: function (value, event) {
            var curr = event.currentTarget; //获取触发事件的按钮
            var userComment = $(curr).parent().parent().prev().children().find(".comment_box_input").val();
            console.log("用户评论" + userComment);
            var that = this;
            this.$http.post("/blogComments", { "blogId": value.id, "content": userComment })
                .then(function (res) {
                    if (res.result) {
                        that.$http.get("/blogComments/" + value.id)
                            .then(res => {
                                if (res.result) {
                                    value.blogComments = res.data;
                                    value.commentsNum = value.commentsNum + 1;
                                    $(curr).parent().parent().prev().children().find(".comment_box_input").val('')
                                }
                                else {
                                    that.$message.error("服务器繁忙，请稍后再试");
                                }
                            })
                            .catch(err => {
                                console.error(err)
                            });
                    }
                    else {
                    }
                }).catch(function (err) {
                });
        },
        deleteBlog: function (blogId) {
            this.subBlogs = this.subBlogs.filter(element => {
                return element.id != blogId;
            });
        },
        goBack() {
            console.log('go back');
            this.$router.go(-1);
        }
    },
    components: { OptionDropDown, Comments }
}
</script>
<style scoped="scoped">
@import '../assets/css/homepage.css';
@import '../assets/icon/font_wo1ghzn7j68/iconfont.css';
#innerbox1 {
    display: flex;
    position: relative;
    background-color: transparent;
    z-index: 300;
    background-color: white;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
    height: 45px;
    position: sticky;
    top:60px
}
#header {
    position: relative;
    display: flex;
    width: fit-content;
    align-self: center;
    cursor: pointer;
    margin-left: 10px;
}
.blog_user_box {
    background-color: white;
    height: fit-content;
    margin-bottom: 8px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
    border-radius: 4px;
    padding: 20px 20px;
}

.blog_user_box_unpadding {
    background-color: white;
    height: fit-content;
    margin-bottom: 8px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
    border-radius: 4px;
    padding: 20px 2px;
}

#blogs {
    min-height: 90px;
    position: relative;
}

.myMask {
    position: sticky !important;

    background-color: rgba(255, 255, 255, .9) !important;
    margin: 0 auto !important;
    top: 34px !important;

    -webkit-transition: opacity .3s !important;
    transition: opacity .3s !important;
    width: 100px !important;
    height: 100px !important;
}

#blogs.Home_feed_3o7ry .el-loading-mask .el-loading-spinner {
    width: inherit;
    position: relative;
}


.el-button.is-disabled.is-plain,
.el-button.is-disabled.is-plain:focus,
.el-button.is-disabled.is-plain:hover {
    background-color: #ff8200;
    color: white;
}
</style>
<style>
.mybutton {
    padding: auto !important;
}

.link-style {
    font-size: 14px;
    text-decoration: none;
    color: #EB7340;
}

.link-style:hover {
    text-decoration: underline !important;
}
</style>