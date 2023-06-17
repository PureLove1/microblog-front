<template>
    <div>
        <video class="video" controls="controls">
            <source :src="video.urls[0]">
        </video>
        <div class="title-box">
            <span class="title">{{ video.title }}</span>

        </div>
        <div class="base-info">
            <span class="time">{{ '发布于' + video.createTime }}</span>
            <div style="display: flex;width: 650px;justify-content: end;">
                <div class="bottom_button_box">
                    <div class="button_box_item">
                        <i class="iconfont icon-fenxiang icon-item-i"> </i>
                        <div>
                            <span v-if="video.shareNum == 0" class="button_box_item_span">分享</span>
                            <span v-else class="button_box_item_span" v-text="video.shareNum"></span>
                        </div>
                    </div>
                </div>
                <div class="bottom_button_box">
                    <div class="button_box_item">
                        <i class="iconfont icon-pinglun icon-item-i"> </i>
                        <span v-if="video.commentsNum == 0" class="button_box_item_span">评论</span>
                        <span v-else class="button_box_item_span" v-text="video.commentsNum"></span>
                    </div>
                </div>
                <div class="bottom_button_box">
                    <div @click="like(video)" :class="video.liked ? 'button_box_item_isLiked' : 'button_box_item'">
                        <i class="iconfont icon-dianzan icon-item-i"> </i>
                        <span v-if="video.likeNum == 0" class="button_box_item_span">点赞</span>
                        <span v-else class="button_box_item_span" v-text="video.likeNum"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="user-info">
            <div>
                <img class="header" :src="video.user.image">
            </div>
            <div style="width:660px">
                <div><router-link class="link" :to="'/usr/' + video.userId">{{ video.user.name }}</router-link></div>
                <div class="fan-num">{{ video.user.fanNum + '粉丝' }}</div>
            </div>
            <div v-if="video.userId != userId" style="margin:auto 0">
                <button v-if="video.user.followed == false" @click="follow(video, video.user.followed)"
                    class="follow_btn">+关注</button>
                <button v-else @click="follow(video, video.user.followed)" class="unfollow_btn">已关注</button>
            </div>
        </div>

        <div class="blog-content">
            {{ video.content }}
        </div>
        <div style="margin-top:12px;font-size:16px">{{ '共' + video.commentsNum + '条评论' }}</div>
        <div class="transition-box" style="display: flex;width: 100%;">
            <div>
                <img :src="usericonurl" class="commentbox_user">
            </div>
            <div style="width: inherit;">
                <input @keyup="commentIsEmpty(video, $event)" @keydown="commentIsEmpty(video, $event)"
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
                <el-button :plain="true" :key="video.id" :disabled="video.hasOwnProperty('empty') ? video.empty : true"
                    @click="comment(video, $event)" class="btn4">评论
                </el-button>
            </div>
        </div>
        <div>
            <el-dialog style="font-weight: bolder;" :title="'回复' + '@' + form.target" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item :label-width="formLabelWidth">
                        <el-input type="text" placeholder="发布你的回复" v-model="form.content" autocomplete="off">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button class="mybutton" @click="dialogFormVisible = false">取 消
                    </el-button>
                    <el-button class="mybutton" type="primary" @click="subComment">回 复
                    </el-button>
                </div>
            </el-dialog>
            <div class="buttonbox">
                <div>
                    <el-link class="topLink active" @click="changeWay($event, 0)" :underline="false">按热度</el-link>
                    <el-link class="topLink" @click="changeWay($event, 1)" :underline="false">按正序</el-link>
                    <el-link class="topLink" @click="changeWay($event, 2)" :underline="false">按倒序</el-link>
                </div>
            </div>
            <div v-for="(comment, index) in video.blogComments">
                <div v-if="index < 2">
                    <div class="in-a-line mainbox">
                        <div class="image">
                            <el-avatar class="header" :src="comment.user.image"></el-avatar>
                        </div>
                        <div class="in-a-column maxwidth">
                            <div class="web-box">
                                <a :href="'/user/' + comment.userId" class="link">{{ comment.user.name }}</a>
                                <span class="text text-weight">:{{ comment.content }}</span>
                            </div>
                            <div class="in-a-line diliver">
                                <span class="tip date">{{ comment.createTime }}</span>
                                <div class="in-a-line button-box">
                                    <div class="small-button">
                                        <span class="el-icon-warning-outline item-lineheight"></span>
                                    </div>
                                    <div class="small-button">
                                        <span class="el-icon-share item-lineheight"></span>
                                    </div>
                                    <div class="small-button">
                                        <span @click="openComment(comment)"
                                            class="el-icon-chat-dot-square item-lineheight"></span>
                                    </div>
                                    <div
                                        :class="comment.liked ? 'small-button-s in-a-line liked' : 'small-button-s in-a-line'">
                                        <span @click="commentLike(comment, comment.liked)"
                                            class="iconfont icon-dianzan item-lineheight"></span>
                                        <span v-if="comment.likeNum > 0" class="item-lineheight">{{ comment.likeNum
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="list-box" v-for="(child, index) in comment.children">
                            <div class="in-a-column" v-if="index < 2">
                                <div v-if="child.target != comment.user.name" class="web-box">
                                    <a href="/user/" class="link">{{ child.user.name }}</a>:回复<a href="/user/"
                                        class="link">@{{
                                            child.target }}</a>
                                    <span class="text text-weight">:{{ child.content }}</span>
                                </div>
                                <div v-else>
                                    <a :href="'/user/' + child.userId" class="link">{{ child.user.name }}</a>
                                    <span class="text text-weight">:{{ child.content }}</span>
                                </div>
                                <div class="in-a-line diliver">
                                    <span class="tip date">{{ child.createTime }}</span>
                                    <div class="in-a-line button-box">
                                        <div class="small-button">
                                            <span class="el-icon-warning-outline item-lineheight"></span>
                                        </div>
                                        <div class="small-button">
                                            <span class="el-icon-share item-lineheight"></span>
                                        </div>
                                        <div class="small-button">
                                            <span @click="openSubComment(child, comment)"
                                                class="el-icon-chat-dot-square item-lineheight"></span>
                                        </div>
                                        <div
                                            :class="child.liked ? 'small-button-s in-a-line liked' : 'small-button-s in-a-line'">
                                            <span @click="commentLike(child, child.liked)"
                                                class="iconfont icon-dianzan item-lineheight"></span>
                                            <span v-if="child.likeNum > 0" class="item-lineheight">{{ child.likeNum
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="index > 3 && index == comment.children.length - 1">
                                <a href="/user/" class="link">共{{ comment.children.length }}条回复<span
                                        class="el-icon-caret-bottom"></span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    name: 'Show',
    props: ['id'],
    data() {
        return {
            video: null,
            dialogFormVisible: false,
            formLabelWidth: "0px",
            form: {
                //当前博客id
                blogId: null,
                //回复的评论id
                parentId: null,
                //用户id从cookie拿
                //被评论人的昵称
                target: null,
                //评论内容
                content: null,
            },
            way: 0
        }
    },
    created() {
        this.fetchData();
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
    methods: {
        fetchData() {
            var that = this;
            this.$http.get('/blog/' + this.id).then(
                res => {
                    if (res.result) {
                        that.video = res.data;
                        let tempBlog = that.video;
                        let trimResult = tempBlog.urls.split(',');//按逗号拆分，得到一个数组
                        //split返回的是一个数组，可以前端遍历
                        tempBlog.urls = trimResult;
                        //that.allBlogs.push(tempBlog);
                        that.video = tempBlog;
                    }
                }
            ).catch()
        },
        follow(value, judge) {
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
        getWay() {
            return this.way;
        },
        changeWay(event, way) {
            var cur = $(event.currentTarget);
            let blogId = this.video.id;
            var that = this;
            this.$http.get('/blogComments/' + blogId, { params: { way: way } })
                .then(res => {
                    if (res.result) {
                        that.video.blogComments = res.data;
                        cur.siblings().removeClass("active");
                        cur.addClass('active');
                        that.way = way;
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch(err => {
                    console.error(err)
                })

        },
        openComment(comment) {
            //打开评论框
            this.dialogFormVisible = true;
            //设置回复的人的名称
            this.form.target = comment.user.name;
            console.log("回复了" + this.form.target);
            this.form.parentId = comment.id;
            console.log("回复了评论id为" + this.form.parentId + "的评论");
            this.form.blogId = comment.blogId;
            console.log("回复了id为" + this.form.blogId + "的博客");
        },
        openSubComment(child, comment) {
            //打开评论框
            this.dialogFormVisible = true;
            //设置回复的人的名称
            this.form.target = child.user.name;
            console.log("回复了" + this.form.target);
            this.form.parentId = comment.id;
            console.log("回复了评论id为" + this.form.parentId + "的评论");
            this.form.blogId = child.blogId;
            console.log("回复了id为" + this.form.blogId + "的博客");
        },
        subComment() {
            var myForm = this.form;
            var blogId = myForm.blogId;
            var parentId = myForm.parentId;
            var content = myForm.content;
            var target = myForm.target;
            var that = this;
            this.dialogFormVisible = false;
            //添加评论
            this.$http.post("/blogComments", {
                "blogId": blogId,
                "parentId": parentId,
                "content": content,
                "target": target,
            }).then(function (res) {
                if (res.result) {
                    that.$http.get("/blogComments/" + blogId, { params: { 'way': that.way } })
                        .then(function (res) {
                            if (res.result) {
                                console.log(res.data);
                                value.blogComments = res.data;
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
                else {
                    that.$message.error("出错啦");
                    console.log(res);
                }
            }).catch(function (err) {
                that.$message.error("出错啦");
                console.log(err);
            });
        },
        commentLike(comment, liked) {
            let commentId = comment.id;
            let operate = !liked;
            var curr = comment;
            var that = this;
            this.$http.post("/blogComments/like/" + commentId + '/' + operate)
                .then(res => {
                    if (res.result) {
                        curr.liked = !curr.liked;
                        if (operate) {
                            curr.likeNum = curr.likeNum + 1;
                        } else {
                            curr.likeNum = curr.likeNum - 1;
                        }
                    } else {
                        that.$message.error(res.message);
                    }
                }).catch(err => {
                    that.$message.error('請求出錯了哦');
                    console.error(err)
                })
        }
    }
}
</script>
<style scoped>
@import '../assets/icon/font_wo1ghzn7j68/iconfont.css';


.el-button.is-disabled.is-plain,
.el-button.is-disabled.is-plain:focus,
.el-button.is-disabled.is-plain:hover {
    background-color: #ff8200;
    color: white;
}
.comment_box_input{
    width: 93%;
    /* border: 1px solid orange; */
    border: none;
    height: -webkit-fill-available;
    border-radius: 10px;
    padding-left: 12px;
    margin-left: 9px;
    background-color: #f0f1f4;
    outline: medium;
}

.comment_box_input:focus{
    border: 2px solid orange; 
    background-color: transparent;
}
.commentbox_user{
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 100%;
    border: 1px solid rgba(0, 0, 0, .05);
}
.maxwidth {
    width: 100%;
}

.comment-link {
    text-align: center;
}

.liked {
    color: #EB7340;
}

.commentbox {
    margin-top: 5px;
}

.mainbox {
    width: 100%
}

.header {
    width: 34px;
    height: 34px;
}

.image {
    padding: 0 10px;
    /* padding-top: 5px; */
}

.list-box {
    margin-left: 5px;
}

.list {
    width: inherit;
    margin: 0px 0 2px 42px;
    position: relative;
}

a {
    text-decoration: none;
    color: #EB7340;
    cursor: pointer;
    font-size: 12px;
}

.web-box {
    display: -webkit-box;
    font-size: 12px;
}

a:hover {
    text-decoration: none;
}

.link {
    align-items: center;
    width: fit-content;
}

.date {
    margin: auto 0;
    height: fit-content;
}

.text-weight {
    font-size: 12px;
}

.diliver {
    justify-content: space-between;
}

.small-button {
    font-size: 12px !important;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
}

.small-button:hover {
    color: #ff8200;
    background-color: rgba(255, 130, 0, 0.1);
}

.small-button-s {
    font-size: 12px !important;
    width: fit-content;
    height: 20px;
    text-align: center;
    cursor: pointer;
}

.small-button-s:hover {
    color: #ff8200;
}

.small-button-s:hover .icon-dianzan {
    background-color: rgba(255, 130, 0, 0.1);
}

.icon-dianzan {
    width: 20px !important;
    height: 20px !important;
    border-radius: 10px !important;
}

.item-lineheight {
    font-size: 12px;
    line-height: 20px;
}

.list:before {
    content: "";
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 0;
    border-left: 2px solid #f2f2f2;
}

.topLink:hover {
    color: #ff8200;
}

.active {
    color: #ff8200;
    font-weight: bolder;
}

.buttonbox {
    padding-left: 10px;
    padding-bottom: 5px;
}

.blog-content {
    color: #939393;
}

.fan-num {
    color: #939393;
}

.link {
    color: black;
    text-decoration: none;
}

.follow_btn {
    width: 100px;
    padding: 7px 0px;
    border-radius: 25px;
    border: 1px solid #ff8200;
    background: transparent;
    color: #ff8200;
    cursor: pointer;
}

.follow_btn:hover {
    background-color: #fae9d7;
}

.unfollow_btn {
    width: 100px;
    padding: 7px 0px;
    border-radius: 25px;
    border: 1px solid #ff8200;
    background: transparent;
    color: #ff8200;
    cursor: pointer;
}

.unfollow_btn:hover {
    background-color: #fae9d7;
}

.header {
    width: 50px;
    height: 50px;
    border-radius: 50px;
}

.user-info {
    display: flex;
    padding: 10px;
}

.bottom_button_box {
    margin-left: 5px;
}

.button_box_item {
    display: flex;
    cursor: pointer;
}

.button_box_item:hover {
    color: #EB7350;
}

.time {
    color: #939393;
}

.title-box {
    margin: 10px 0;
}

.title {
    font-size: 22px;
    font-weight: 600;
}

.base-info {
    display: flex;
}

.video {
    width: 900px;
    height: 520px;
    background-color: black;
}</style>