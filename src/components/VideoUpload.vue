<template>
    <el-container>
        <el-header>
            <div class="title">视频发布</div>
        </el-header>
        <el-main>
            <div class="upload">
                <div style="width:25%"></div>
                <div style="width:50%">
                    <div v-show="uploading&&!blogUpload">
                        <div class="text">上传视频</div>
                        <br>
                        <div>请上传500MB以下的视频，请勿上传色情，反动等违法视频</div>
                        <br>
                        <el-progress :percentage="percentage" :color="customColorMethod"></el-progress>
                        <div>{{ percentage == 100 ? '上传完成' : '上传中' }}</div>
                        <br>
                        <div class="text">基本信息</div>
                        <div class="s-text">标题</div>
                        <el-input type="text" placeholder="填写标题30字以内" required v-model="blog.title" maxlength="30"
                            show-word-limit>
                        </el-input>
                        <div class="upload-close">
                            <div>上传视频封面</div>
                            <el-upload class="upload-demo" :on-success="headerSuccess" drag
                                action="http://localhost:8080/microblog/file/upload" :headers="headerObj">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </div>
                        <div class="s-text">分类</div>
                        <el-select v-model="blog.channelId" placeholder="请选择">
                            <el-option v-for="item of options" :key="item.id" :label="item.content" :value="item.id">
                            </el-option>
                        </el-select>
                        <div class="s-text">设置微博内容</div>
                        <div :class="selected ? 'text-box' : 'unselect-text-box'">
                            <textarea v-model="blog.content" @focus="selectInput" @keyup="autosize($event.target)"
                                @blur="unselectInput" class="text-input" placeholder="有什么新鲜事想分享给大家？"></textarea>
                        </div>
                        <div style="margin-top:10px;margin-left:600px"><el-button type="primary"
                                @click="onSubmit">上传</el-button></div>
                        <div style="height:200px;width:100%"></div>
                    </div>
                    <div v-show="!uploading&&!blogUpload">
                        <div class="text">上传视频</div>
                        <br>
                        <div>请上传500MB以下的视频，请勿上传色情，反动等违法视频</div>
                        <br>
                        <div style="justify-content:center;display:flex">
                            <el-upload class="upload-demo" drag :on-success="success" :before-upload="beforUpload"
                                action="http://localhost:8080/microblog/file/upload/video" :headers="headerObj">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传mp4格式文件</div>
                            </el-upload>
                        </div>
                    </div>
                    <div v-show="blogUpload">
                        <el-result icon="success" title="视频已发布成功" subTitle="请根据提示进行操作">
                            <template slot="extra">
                                <el-button type="primary" round @click="reload()">再上传一个视频</el-button>
                                <el-button type="success" round @click="goIndex()">返回首页</el-button>
                            </template>
                        </el-result>
                    </div>
                </div>
                <div style="width:25%"></div>
            </div>

        </el-main>
    </el-container>
</template>
<script>
export default {
    name: 'VideoUpload',
    data() {
        return {
            percentage: 1,
            options: [],
            uploading: false,
            customColor: '#409eff',
            customColors: [
                { color: '#f56c6c', percentage: 20 },
                { color: '#e6a23c', percentage: 40 },
                { color: '#5cb87a', percentage: 60 },
                { color: '#1989fa', percentage: 80 },
                { color: '#6f7ad3', percentage: 100 }
            ],
            headerObj: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            blog: {
                title: '',
                channelId: null,
                content: '',
                urls: ''

            },
            blogUpload: false,
            selected: false
        }
    },
    created() {
        var that = this;
        this.$http.get('/channel').then(
            res => {
                if (res.result) {
                    that.options = res.data;
                }
            }
        ).catch(err=>{
            console.error(err)
        })
       
    },
    methods: {
        goIndex(){
            this.$router.push('/index')
        },
        reload() {
            this.percentage = 1;
            this.uploading = false;
            this.blog.title = '';
            this.blog.channelId = null;
            this.blog.content = '';
            this.blog.urls = '';
            this.blogUpload = false;
            this.selected = false;
        },
        selectInput() {
            this.selected = true;
        },
        unselectInput() {
            this.selected = false;
        },
        autosize(target) {
            target.style.height = '24px';
            target.style.height = target.scrollHeight + 'px';
        },
        beforUpload(file) {
            this.uploading = true
        },
        success(response, file, fileList) {
            this.blog.urls = response.message;
            this.percentage = 100
        },
        headerSuccess(response, file, fileList) {
            this.blog.urls = this.blog.urls + ',' + response.message;
        },
        customColorMethod(percentage) {
            if (percentage < 30) {
                return '#909399';
            } else if (percentage < 70) {
                return '#e6a23c';
            } else {
                return '#67c23a';
            }
        },
        increase() {
            this.percentage += 10;
            if (this.percentage > 100) {
                this.percentage = 100;
            }
        },
        decrease() {
            this.percentage -= 10;
            if (this.percentage < 0) {
                this.percentage = 0;
            }
        },
        onSubmit() {
            var that = this;
            this.$http.post('/blog/video',
                this.blog
            ).then(
                res => {
                    if (res.result) {
                        that.blogUpload = true;
                    }
                }
            )
        }
    }

}
</script>
<style scoped>
.text-box {
    background-color: white;
    border: 1px solid #409EFF;
    border-radius: 5px;
}

.text-input {
    min-width: 96%;
    max-width: 96%;
    min-height: 24px;
    padding-left: 4px;
    padding-top: 4px;
    border: none;
    background-color: transparent;
    outline: none;
    resize: none;
    padding: 12px;
}

.unselect-text-box {
    background-color: #f0f1f4;
    border-radius: 5px;
}

.upload-close {
    margin-top: 10px;
}

.title {
    margin: 20px 129px;
}

.upload {
    display: flex;

}

.text {
    font-weight: 600;
    font-size: 30px;
}

.s-text {
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 7px;
    margin-top: 7px;
}
</style>