<template>
    <div id="main">
        <div style="width:642px">
            <div style="display:flex;flex-direction: column;">
                <div style="display:flex;flex-direction: column;">
                    <!--富文本输入框-->
                    <div class="innerbox" v-show="showInput">
                        <div style="padding: 20px 20px 10px;">
                            <div id="box1">
                                <div :class="selected ? 'text-box' : 'unselect-text-box'">
                                    <textarea v-model="blog" @input="count" @focus="selectInput"
                                        @keyup="autosize($event.target)" @blur="unselectInput" class="text-input"
                                        placeholder="有什么新鲜事想分享给大家？"></textarea>
                                </div>
                            </div>
                            <div id="box2" v-show="uploadFileUrl.length != 0">
                                <div>
                                    <div v-for="value in uploadFileUrl" class="box2item">
                                        <!--图片展示-->
                                        <div class="box2itemdiv">
                                            <div>
                                                <img class="uploadImage" :src="value">
                                                <div></div>
                                                <div class="imgHoverMask"></div>
                                            </div>
                                            <i @click="delImage($event)" class="iconfont icon-chacha myclose"></i>
                                            <div></div>
                                        </div>
                                    </div>
                                    <!--上传框-->
                                    <div class="box2item">
                                        <div class="box2itemdiv2">
                                            <div class="divbeforei">
                                                <i id="addImage" class="iconfont icon-jia"></i>
                                                <input @change="upload($event)" class="fileInput" type="file"
                                                    multiple="multipe">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="box3">
                                <div style="display:flex">
                                    <!--按钮组-->
                                    <div style="align-self:center;display: flex;">
                                        <div>
                                            <div>
                                                <div @click="exposeEmoji" title="表情" class="mid_button_item">
                                                    <i class="iconfont icon-biaoqing"></i>
                                                </div>
                                                <div v-show="showEmoji" @mouseleave="showEmoji=false"
                                                    style="display:flex;position: absolute;background-color: white;
                                                box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;height: 100px;width: 300px;z-index: 1;">
                                                    <div v-for="item of emojis" style="padding:3px">
                                                        <div><img @click="chooseEmoji(item.name)"
                                                                style="width:20px;height:20px;cursor:pointer"
                                                                :alt="item.name" :src="item.path"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div9">
                                            <div>
                                                <div @click="uploadImage" title="图片" class="mid_button_item">
                                                    <i class="iconfont icon-zhaopian" aria-hidden="true"></i>
                                                    <input v-show="false" type="file" @change="upload" id="fileInput">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div9">
                                            <div>
                                                <div title="视频" class="mid_button_item" @click="uploadVideo()">
                                                    <i class="iconfont icon-shipin"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div9">
                                            <div>
                                                <div title="话题" class="mid_button_item">
                                                    <i class="iconfont icon-huati1"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="width: 90px;text-align: center;">
                                        <p :class="textSizeCount < 0 ? 'textFlow' : 'textUnFlow'"
                                            v-show="textSizeCount != 0" v-text="textSizeCount"></p>
                                    </div>
                                    <!--定时发送按钮-->
                                    <div class="glyphicon glyphicon-time" style="margin-left: 10px;
                                                    padding-top: 6px;"></div>
                                    <!--公开下拉框-->
                                    <div>
                                        <select style="border:none;margin-left: 23px;
                                                        padding-top: 4px;">
                                            <option>公开</option>
                                        </select>
                                    </div>
                                    <!--发送按钮-->
                                    <div>
                                        <el-button @click="uploadBlog" class="btn4">发送</el-button>
                                    </div>
                                </div>
                            </div>
                            <!--表情-->
                            <div id="box4"></div>
                        </div>
                    </div>
                    <!--按钮组-->
                    <SmallTab :tabList="tabList" :display="display" />
                    <!--内容页-->
                    <Blogs @showMessage="fshowMessage" :subBlogs="allBlogs" :loadingBlog="loadingBlog" :userId="userId"
                        :usericonurl="usericonurl" :padding="true" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import Blogs from './Blogs.vue';
import SmallTab from './SmallTab.vue';

export default {
    name: 'Main',
    components: { Blogs, SmallTab },
    props: ['usericonurl', 'query', 'tabList', 'display', 'showInput'],
    watch: {
        query: function (newValue, oldValue) {
            this.listenQueryChange(newValue);
        },
        $route: {
            handler(newVal, oldVal) {
                if (newVal.path == '/&video') {
                    this.fetchVideoBlogs()
                } else if (newVal.path == '/index' || newVal.path == '/') {
                    this.fetchAllBlogs();
                } else if (newVal.path == '/newest') {
                    // this.fetchUserFollowBlogs()
                } else if (newVal.path == '/hot') {
                    this.fetchHotBlogs()
                }
            }
        }
    },
    computed: {
    },
    data: function () {
        return {
            showEmoji: false,
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
            userId: '',
            loadingBlog: false,
            message: "hello vue!",
            //博客内容字数
            textSizeCount: 0,
            selected: false,
            //上传博客内容
            blog: "",
            //上传文件数组
            uploadFileUrl: [],
            //token
            token: "",
            allBlogs: [],
            topicList: [],
            commentAndForward: false,
            dialogFormVisible: false,
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
            formLabelWidth: '0px'
        }
    },

    created: function () {
        this.userId = this.$store.state.userId;
        this.loadingBlog = true;
        var that = this;
        if (this.$route.path == '/&video') {
            this.fetchVideoBlogs();
            return
        }
        if (this.$route.path == '/hot') {
            this.fetchHotBlogs();
            return
        }
        if (this.$route.path == '/newest') {
            this.fetchUserFollowBlogs();
            return
        }
        this.$http.get('/blog').then(
            function (res) {
                var temp = res.data;//temp是一个数组
                if (temp != undefined) {
                    for (var i = 0; i < temp.length; i++) {//对传输的blog的urls进行拆分
                        var tempBlog = temp[i];
                        var trimResult = tempBlog.urls.split(',');//按逗号拆分，得到一个数组
                        //split返回的是一个数组，可以前端遍历

                        tempBlog.urls = trimResult;
                        tempBlog.content=that.replaceEmoji(that.turnTextIntoHtml(tempBlog.content))
                        that.allBlogs.push(tempBlog);
                    }
                }
                that.loadingBlog = false;
            }, function (err) {
                console.err(err);
                that.loadingBlog = false;
            }
        );
    },
    methods: {
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
        exposeEmoji() {
            this.showEmoji = true
        },
        chooseEmoji(name) {
            this.showEmoji = false;
            this.blog = this.blog + name
        },
        uploadVideo() {
            this.$router.push('/upload')
        },
        selectInput() {
            this.selected = true;
        },
        unselectInput() {
            this.selected = false;
        },
        fshowMessage(msg) {
            this.$emit('fshowMessage', msg)
        },
        listenQueryChange: function (newValue) {
            if (newValue == 'newest') {
                this.fetchUserFollowBlogs();
            } else if (newValue == '') {
                this.fetchAllBlogs();
            }
        },
        uploadImage: function () {
            $('#fileInput').click();
        },
        upload: function (event) {
            const flie = event.target.files[0];
            // 在这里进行一系列的校验
            const formData = new FormData();
            formData.append("file", flie);
            var that = this.uploadFileUrl;
            if (that.length == 9) {
                alert("最多上传九张照片！");
                return;
            }
            this.$http.post('/file/upload', formData, {
                'Content-type': 'multipart/form-data'
            }).then(res => {
                //获取返回的上传文件地址
                var fileLocation = res.message;
                that.push(fileLocation)
                //that[that.length] = fileLocation;
                // 上传成功后的处理
            }, err => {
                alert(err);
                // 出现错误时的处理
            })
        },
        count: function () {
            //输入内容大小检验
            this.textSizeCount = this.blog.trim().length;
            if (this.blog.length > 5000) {
                this.textSizeCount = -(this.blog.length - 5000);
            }
        },
        delImage: function (event) {
            //删除上传的图片
        },
        turnTextIntoHtml(text){
            //替换话题
            let temp = this.regmatch(text);
            //替换换行等字符为<br>
            let res = temp.replace(/[\n\r]/g, '<br>');
            return res;
        },
        uploadBlog() {
            if (this.blog.trim().length == 0) {
                this.$message.error({ "message": "发送内容不得为空", "center": false });
                return;
            }
            var that = this;
            var urls = "";
            while (this.uploadFileUrl.length != 0) {
                urls += this.uploadFileUrl.shift();
                if (this.uploadFileUrl.length != 0) {
                    urls += ",";
                }
            }
            var text = this.blog;
            if (this.topicList != null) {
                this.$http.post('/blog/topic', {
                    'blog': { 'content': text, 'urls': urls },
                    'topicContentList': that.topicList
                }).then(
                    res => {
                        if (this.$route.path == '/index') {
                            this.fetchAllBlogs();
                        } else {
                            this.fetchUserFollowBlogs();
                        }
                    },
                    function (err) {
                        console.error(err);
                    })
            } else {
                this.$http.post('/blog', { 'content': text, 'urls': urls }).then(
                    function (response) {
                        if (this.$route.path == '/index') {
                            this.fetchAllBlogs();
                        } else {
                            this.fetchUserFollowBlogs();
                        }
                        alert(response.data.message);
                    },
                    function (err) {
                        console.error(err);
                    })
            }
            this.blog = "";
            this.count();

        },
        fetchAllBlogs: function () {
            console.log('fetchAllBlogs')
            this.loadingBlog = true;
            var that = this;
            //splice(start,deleteCount,…value)：从start开始替换deleteCount个元素，后面跟上要替换的元素。
            this.$http.get('/blog').then(
                function (res) {
                    that.allBlogs = [];
                    var temp = res.data;//temp是一个数组
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
                }, function (err) {
                    that.allBlogs = [];
                    that.loadingBlog = false;
                }
            );
        },
        fetchUserFollowBlogs: function () {
            console.log('查询用户关注的人发布的博客')
            this.loadingBlog = true;
            var that = this;
            //splice(start,deleteCount,…value)：从start开始替换deleteCount个元素，后面跟上要替换的元素。
            this.$http.get('/blog/follow').then(
                function (res) {
                    that.allBlogs = [];
                    if (res.result) {
                        var temp = res.data;//temp是一个数组
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
                    } else if (res.statusCode == 'A0230') {
                        that.allBlogs = [];
                    } else if(res.statusCode=='A0200'){
                        that.allBlogs = [];
                    }
                    that.loadingBlog = false;
                }, function (err) {
                    that.loadingBlog = false;
                }
            );

        },
        fetchVideoBlogs() {
            var that = this;
            this.$http.get('/blog/video').then(
                res => {
                    if (res.result) {
                        that.allBlogs = [];
                        let temp = res.data;//temp是一个数组
                        if (temp != undefined) {
                            for (let i = 0; i < temp.length; i++) {//对传输的blog的urls进行拆分
                                let tempBlog = temp[i];
                                let trimResult = tempBlog.urls.split(',');//按逗号拆分，得到一个数组
                                //split返回的是一个数组，可以前端遍历
                                tempBlog.urls = trimResult;
                        tempBlog.content=that.replaceEmoji(that.turnTextIntoHtml(tempBlog.content))
                                //that.allBlogs.push(tempBlog);
                                that.allBlogs.splice(i, 1, tempBlog);
                            }
                        }
                        that.loadingBlog = false;
                    }
                }
            )
        },
        fetchHotBlogs() {
            var that = this;
            this.$http.get('/blog/hot').then(
                res => {
                    if (res.result) {
                        that.allBlogs = [];
                        let temp = res.data;//temp是一个数组
                        if (temp != undefined) {
                            for (let i = 0; i < temp.length; i++) {//对传输的blog的urls进行拆分
                                let tempBlog = temp[i];
                                let trimResult = tempBlog.urls.split(',');//按逗号拆分，得到一个数组
                                //split返回的是一个数组，可以前端遍历
                                tempBlog.urls = trimResult;
                        tempBlog.content=that.replaceEmoji(that.turnTextIntoHtml(tempBlog.content))
                                //that.allBlogs.push(tempBlog);
                                that.allBlogs.splice(i, 1, tempBlog);
                            }
                        }
                        that.loadingBlog = false;
                    }
                }
            )
        },
        regmatch: function (regstr) {
            let topicSet = new Set();
            var reg = '#[^#]+#';
            var str = regstr.matchAll(reg); //返回迭代器
            var ret = '';
            for (let match of str) {//mactch[0]就是匹配的值

                //去除首尾的#号<el-link type="warning">警告链接</el-link>
                let matchStartEnd = match[0].replace('#', '').replace('#', '');
                var count = 0;
                topicSet.add(matchStartEnd);

                let oldm = match[0]
                match[0] = match[0].replace('#' + matchStartEnd + '#', '<a class="link-style" href="/topic?q=' + matchStartEnd + '&ref=topic">' + match[0] + '</a>');
                //match[0]是转换出来的html

                let jinindex = regstr.indexOf('#');

                //#topic#--><el-link type="warning" href="/topic/topic"> #topic# </el-link>
                regstr = regstr.replace('#' + matchStartEnd + '#', '<a class="link-style" href="/topic?q=' + matchStartEnd + '&ref=topic">' + oldm + '</a>');

                let res = jinindex + match[0].length;

                let subStr = regstr.slice(0, res);

                regstr = regstr.slice(res);
                ret += subStr;
            }
            if (regstr != '') {
                ret += regstr;
            }
            this.topicList = Array.from(topicSet);
            return ret;
        },
        autosize(target) {
            target.style.height = '24px';
            target.style.height = target.scrollHeight + 'px';
        }

    }
}
</script>
<style scoped>
@import '../assets/css/homepage.css';

.text-input {
    min-width: 546px;
    max-width: 546px;
    min-height: 24px;
    padding-left: 4px;
    padding-top: 4px;
    border: none;
    background-color: transparent;
    outline: none;
    resize: none;
    padding: 12px;
}

.text-box {
    background-color: white;
    border: 1px solid orange;
    border-radius: 5px;
}

.unselect-text-box {
    background-color: #f0f1f4;
    border-radius: 5px;
}
</style>
<style>
.el-message {
    display: -webkit-box;
}
</style>