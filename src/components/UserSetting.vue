<template>
    <div class="box">
        <div>
            <h3 class="title">帐号信息设置</h3>
        </div>
        <div>
            <div class="header-box">
                <div title="图片" class="mid_button_item">
                    <input v-show="false" type="file" @change="upload" id="fileInput">
                </div>
                <img class="header" :src="user.image" @click="uploadImage">
            </div>
            <div class="form-box">
                <el-form :label-position="'right'" label-width="100px" :model="user" ref="user" :rules="rules">
                    <el-form-item label="名称" prop="name">
                        <el-input placeholder="你的名称" v-model="user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍">
                        <el-input placeholder="介绍一下自己吧" v-model="user.introduce"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="user.sex">
                            <el-radio label="0">保密</el-radio>
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-date-picker type="date" placeholder="选择日期" v-model="user.birth"
                            style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('user')">确认修改</el-button>
                        <el-button @click="resetForm('user')">重置表单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    name: 'UserSetting',
    data() {
        return {
            user: {
                image: '',
                name: '',
                introduce: '',
                birth: '',
                sex: ''
            },
            rules: {
                name: [{ required: true, message: '名称不得为空', trigger: 'blur' },
                { min: 1, max: 20, message: '长度应为1-20个字符', trigger: 'blur' }]
            }
        }
    },
    computed: {
        userId() {
            return sessionStorage.getItem('userId')
        }
    },
    created() {
        var that = this;
        this.$http.get('/user').then(res => {
            that.user = res.data;
            that.user.sex = that.user.sex + ''
        }).catch()
    },
    methods: {
        uploadImage() {
            $('#fileInput').click();
        },
        upload(event) {
            const flie = event.target.files[0];
            // 在这里进行一系列的校验
            const formData = new FormData();
            formData.append("file", flie);
            var that = this;
            this.$http.post('/file/upload', formData, {
                'Content-type': 'multipart/form-data'
            }).then(res => {
                //获取返回的上传文件地址
                var fileLocation = res.message;
                that.user.image = fileLocation;
                // 上传成功后的处理
            }, err => {
                console.error(err);
                // 出现错误时的处理
            })
        },
        submitForm(formName) {
            var that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.put('/user', {
                        image: that.user.image,
                        name: that.user.name,
                        introduce: that.user.introduce,
                        birth: that.user.birth,
                        sex: that.user.sex
                    }).then(
                        res => {
                            if (res.result) {
                                that.$message.success(res.message)
                            } else {
                                that.$message.error(res.message)
                            }
                        }
                    ).catch()
                } else {
                    return false;
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style scoped>
.box {
    width: 611px;
    background-color: white;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
    border-radius: 4px;
    margin: 0px 7px;
    min-height: 100%;
}

.title {
    padding: 10px
}

.header {
    border-radius: 100%;
    width: 100px;
    height: 100px;
    margin: auto;
}

.header-box {
    display: flex;
    margin-bottom: 10px;
    cursor: pointer;
}

.form {
    display: flex;
    flex-direction: column;
}

.form-box {
    width: 522px;
}
</style>
