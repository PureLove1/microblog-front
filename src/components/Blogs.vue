<template>
    <div :class="padding?'Home_feed_3o7ry':'blog-box'" id="blogs">

        <!--v-for遍历博客-->
        <div v-show="subBlogs.length == 0 && loadingBlog == false && showTip == true">
            <el-empty description="暂无数据"></el-empty>
        </div>
        <div v-show="!loadingBlog" v-for="value in subBlogs" :key="value.id" class="blog_user_box">
            <!--博文用户信息-->
            <div style="display: flex;">
                <!--头像-->
                <div>
                    <img class="user_image" :src="value.user.image">
                </div>
                <!--用户头像、博文发布时间-->
                <div class="user_info_box">
                    <div><router-link :to="'/usr/' + value.userId" v-text="value.user.name"
                            class="user_name_link"></router-link>
                    </div>
                    <div style="font-size: 12px;" v-text="value.createTime"></div>
                </div>
                <!--操作-->
                <div class="blog_user_box_item">
                    <div class="blog_user_box_item_options">
                        <div :style="value.userId != userId ? '' : 'width:70px'">
                            <button v-show="value.userId != userId" v-if="value.user.followed == false"
                                @click="follow(value, value.user.followed)" class="follow_btn">+关注</button>
                            <button v-show="value.userId != userId" v-else @click="follow(value, value.user.followed)"
                                class="unfollow_btn">已关注</button>
                        </div>
                        <div>
                            <!-- <button class="more_btn">v</button> -->
                            <OptionDropDown :options="value.userId != userId ? others : selfowner" :blogId="value.id" />
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
                        <span v-html="value.content"></span>
                        <router-link v-if="value.type=='视频'" class="video-link" :to="'/show/'+value.id">
                            <i class="el-icon-video-camera"></i>
                            {{ value.user.name+'的视频博客' }}
                        </router-link>
                    </div>
                </div>
                <!--博文图片-->
                <div>
                    <div v-if="value.urls.length > 1" style="display:block">
                        <!--判断图片数量，如果大于1就用方格形式展示，否则自适应窗体大小-->
                        <div v-for="(item,index) of value.urls" class="image_box">
                            <img v-if="value.type=='图片'" class="blog_image" :src="item">
                            <video class="video" v-else-if="value.type=='视频'&&index==0" controls="controls">
                                <source :src="item">
                            </video>
                        </div>
                    </div>
                    <div v-else style="display:block">
                        <!--判断图片数量，如果大于1就用方格形式展示，否则自适应窗体大小-->
                        <div v-for="(item,index) of value.urls" class="image_box">
                            <img v-if="value.type=='图片'" class="one_blog_image" :src="item">
                            <video class="video" v-else-if="value.type=='视频'&&index==0" controls="controls">
                                <source :src="item">
                            </video>
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
                                <span v-if="value.shareNum == 0" class="button_box_item_span">分享</span>
                                <span v-else class="button_box_item_span" v-text="value.shareNum"></span>
                            </div>
                        </div>
                    </div>
                    <div class="bottom_button_box">
                        <div class="button_box_item" @click="unfoldComment(value)">
                            <i class="iconfont icon-pinglun icon-item-i"> </i>
                            <span v-if="value.commentsNum == 0" class="button_box_item_span">评论</span>
                            <span v-else class="button_box_item_span" v-text="value.commentsNum"></span>
                        </div>


                    </div>
                    <div class="bottom_button_box">
                        <div @click="like(value)" :class="value.liked ? 'button_box_item_isLiked' : 'button_box_item'">
                            <i class="iconfont icon-dianzan icon-item-i"> </i>
                            <span v-if="value.likeNum == 0" class="button_box_item_span">点赞</span>
                            <span v-else class="button_box_item_span" v-text="value.likeNum"></span>
                        </div>
                    </div>
                </div>
                <!--展示评论-->
                <el-collapse-transition>
                    <div v-show="value.showComment">
                        <!--分割线-->
                        <div class="deliver2 transition-box"></div>
                        <div class="transition-box" style="display: flex;width: 100%;">
                            <div>
                                <img :src="usericonurl" class="commentbox_user">
                            </div>
                            <div style="width: inherit;">
                                <input @keyup="commentIsEmpty(value, $event)" @keydown="commentIsEmpty(value, $event)"
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
                                <el-button :plain="true" :key="value.id"
                                    :disabled="value.hasOwnProperty('empty') ? value.empty : true"
                                    @click="comment(value, $event)" class="btn4">评论
                                </el-button>
                            </div>
                        </div>
                        <div v-show="value.blogComments != null && value.blogComments.length != 0" class="transition-box">
                            <!--分割线-->
                            <div class="deliver2"></div>
                            <Comments :showAll="false" :comments="value.blogComments" :blogId="value.id" :commentsNum="value.commentsNum"/>
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
    props: ["subBlogs", "query", "loadingBlog", "padding"],
    watch: {
        loadingBlog(newValue, oldValue) {
            if (newValue == true) {
                this.showTip = false;
                if (this.loadingInstance) {
                    this.loadingInstance.close();
                    this.loadingInstance = Loading.service({
                        target: document.querySelector("#blogs"),
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
        }
    },
    data: function () {
        return {
            commentAndForward: false,
            loadingInstance: null,
            showTip: false,
            tem: { 'text': '编辑微博', 'opt': '/edit/blog/' },
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
        if (this.loadingBlog == true) {
            var that = this;
            this.$nextTick(() => {
                that.loadingInstance = Loading.service({
                    target: document.querySelector("#blogs"),
                    lock: false,
                    background: "transparent",
                    fullscreen: false,
                    text: "正在玩命加载中...",
                    body: false
                });
            });
        }
    },
    methods: {
        showMessage(msg) {
            this.$emit('showMessage', msg);
        },
        commentIsEmpty(value, event) {
            let eventTarget = event.currentTarget;
            let val = $(eventTarget).val();
            let result = val.trim().length > 0 ? false : true;
            this.$set(value, 'empty', result);
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
                    else if(res.statusCode!='A0200') {
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
                this.$http.get("/blogComment/" + value.id)
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
            var that = this;
            this.$http.post("/blogComment", { "blogId": value.id, "content": userComment })
                .then(function (res) {
                    if (res.result) {
                        that.$http.get("/blogComment/" + value.id)
                            .then(res=>{
                                if (res.result) {
                                    value.blogComments = res.data;
                                    value.commentsNum = value.commentsNum + 1;
                                    $(curr).parent().parent().prev().children().find(".comment_box_input").val('')
                                }
                                else {
                                    that.$message.error("服务器繁忙，请稍后再试");
                                }
                            })
                            .catch(err=>{
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
        }
    },
    components: { OptionDropDown, Comments }
}
</script>
<style scoped="scoped">
@import '../assets/css/homepage.css';
@import '../assets/icon/font_wo1ghzn7j68/iconfont.css';

.video-link{
    color: #ff8200;
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
.video{
    width: 500px;
    height: 280px;
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