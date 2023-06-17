<template>
    <transition name="el-fade-in-linear">
        <div class="box">
            <div>
                <h3 class="title">修改密码</h3>
            </div>
            <div class="form-box">
                <el-form :label-position="'right'" label-width="100px" :model="user" ref="user" :rules="rules">
                    <el-form-item label="原密码" prop="opassword">
                        <el-input placeholder="请输入您的原密码" :show-password=true type="password"
                            v-model="user.opassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" porp="password">
                        <el-input placeholder="请输入您的新密码" :show-password=true type="password"
                            v-model="user.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" porp="confirmPassword">
                        <el-input placeholder="请确认您的新密码" :show-password=true type="password"
                            v-model="user.confirmPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('user')">确认修改</el-button>
                        <el-button @click="resetForm('user')">重置表单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'SetPassword',
    data() {
        var confirmPassword = (rule, value, callback) => {
            if (value != this.user.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        };
        return {
            user: {
                opassword: '',
                password: '',
                confirmPassword: ''
            },
            rules: {
                opassword: [
                    { required: true, message: '密码不得为空', trigger: 'blur' },
                    { max: 8, min: 6, message: '密码长度为6-8个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不得为空', trigger: 'blur' },
                    { max: 8, min: 6, message: '密码长度为6-8个字符', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请确认你的密码', trigger: 'blur' },
                    { max: 8, min: 6, message: '密码长度为6-8个字符', trigger: 'blur' },
                    {
                        validator: confirmPassword,
                        trigger: 'blur'
                    }
                ],
            }
        }
    },
    methods: {
        submitForm(formName) {
            var that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 使用账号密码登录
                    that.$http.put('/user/password',
                        {
                            oPassword: that.user.opassword,
                            password: that.user.password
                        }
                    ).then(res => {
                        // 设置token
                        if (res.result) {
                            that.$message.success(res.message)
                            setTimeout(() => {
                                that.$router.replace('/login');
                            }, 1000)
                        } else {
                            that.$message.error(res.message);
                        }
                    }).catch(err => {
                        console.error("网络开小差了")
                    })
                }
                else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style scoped>
.form-box {
    width: 522px;
}

.title {
    padding: 10px
}

.box {
    width: 611px;
    background-color: white;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
    border-radius: 4px;
    margin: 0px 7px;
    min-height: 100%;
}</style>