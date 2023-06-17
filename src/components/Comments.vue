<template>
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
        <div v-for="(comment, index) in commentsBased">
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
                                <div :class="comment.liked ? 'small-button-s in-a-line liked' : 'small-button-s in-a-line'">
                                    <span @click="commentLike(comment, comment.liked)"
                                        class="iconfont icon-dianzan item-lineheight"></span>
                                    <span v-if="comment.likeNum > 0" class="item-lineheight">{{ comment.likeNum }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <div class="list-box" v-for="(child, index) in comment.children">
                        <div class="in-a-column" v-if="index < 2">
                            <div v-if="child.target != comment.user.name" class="web-box">
                                <a href="/user/" class="link">{{ child.user.name }}</a>:回复<a href="/user/" class="link">@{{
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
                                        <span v-if="child.likeNum > 0" class="item-lineheight">{{ child.likeNum }}</span>
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
        <div class="comment-link" v-if="commentsNum>2&&!showAll">
            <a :href="'http://localhost:8081/blog/'+blogId">点击查看全部{{commentsNum}}条评论></a>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    name: 'Comments',
    props: ['comments','commentsNum','blogId','showAll'],
    watch: {
        comments: {
            handler(newVal, oldVal) {
                this.commentsBased = newVal;
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
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
            commentsBased: this.comments,
            way: 0
        }
    },
    created() {
    },
    methods: {
        getWay(){
            return this.way;
        },
        changeWay(event, way) {
            var cur = $(event.currentTarget);
            let blogId = this.commentsBased[0].blogId;
            var that = this;
            this.$http.get('/blogComments/' + blogId, { params: { way: way } })
                .then(res => {
                    if (res.result) {
                        that.commentsBased = res.data;
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
@import '../assets/css/common.css';
@import '../assets/icon/font_wo1ghzn7j68/iconfont.css';

.maxwidth {
    width: 100%;
}
.comment-link{
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
</style>