<template>
    <!--微博图标-->
    <div id="all">
        <div id="top">
            <p class="topText">Retrieve Password</p>
        </div>
        <div id="mid">
            <!--验证码切换-->
            <div class="inarow setpadding">
                <div class="title">找回密码</div>
            </div>
            <!--输入框-->
            <el-form :key="'form'" class="registerForm" :model="registerForm" :rules="rules" ref="registerForm"
                label-width="100px">
                <el-form-item class="formInput" label="邮箱" prop="email">
                    <el-input prefix-icon="el-icon-message" v-model="registerForm.email"
                        placeholder="请输入注册时使用的邮箱地址"></el-input>
                </el-form-item>
                <el-form-item class="formInput" label="密码" prop="password">
                    <el-input prefix-icon="el-icon-lock" :show-password=true v-model="registerForm.password"
                        placeholder="请输入密码6-8位"></el-input>
                </el-form-item>
                <el-form-item class="formInput" label="确认密码" prop="confirmPassword">
                    <el-input prefix-icon="el-icon-lock" :show-password=true v-model="registerForm.confirmPassword"
                        placeholder="请确认你的密码"></el-input>
                </el-form-item>
                <el-form-item class="formInput" label="邮箱验证码" prop="code">
                    <el-input class="codeInput" v-model="registerForm.code" placeholder="请输入验证码" type="text" />
                    <el-button class="get-code-button" type="primary" @click="getCode"
                        :disabled="timer > 0">{{ timer <= 0 ? '点击获取验证码' : timer + '秒后获取' }}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginButton" type="primary" @click="submitForm('registerForm')">点击提交</el-button>
                    <el-button class="loginButton" @click="resetForm('registerForm')">重置表单</el-button>
                </el-form-item>
            </el-form>
            <div class="loginFormBottom">
                <div class="inarow">
                    <span class="tip setLineHeight">已经有账号?</span>
                    <el-link type="primary" :href="'/login'">点此登录</el-link>
                </div>
            </div>
        </div>
        <div id="bottom" class="in-a-column">
            <span class="tip">X网文【2022】XXXX-XXXX号XXX-XXXXXXXX</span>
            <span class="tip"> X公网安备 XXXXXXXXXXXXXX号</span>
            <span class="tip">Copyright © 2001 - 2022 XXXX. All Rights Reserved.</span>
            <span class="tip">XX公司 版权所有</span>
        </div>

    </div>
</template>
<script>
export default {
    name: 'Register',
    data() {
        var checkEmail = (rule, value, callback) => {
            var that = this;
            setTimeout(() => {
                that.$http.get('/user/email/' + value).then(
                    res => {
                        if (res.result && res.data) {
                            callback(new Error('该账号尚未注册'));
                        } else {
                            callback();
                        }
                    }
                ).catch(err => {
                    callback(new Error('校验失败'));
                })
            }, 1000);
        };
        var confirmPassword = (rule, value, callback) => {
            setTimeout(() => {
                if (value != this.registerForm.password) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            }, 1000);
        };
        return {
            confirmPassword: '',
            baseURL: '',
            timer: 0,
            active: true,
            registerForm: {
                email: '',
                password: '',
                confirmPassword: '',
                code: ''
            },
            rules: {
                email: [
                    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
                    {
                        validator: checkEmail, trigger: 'blur'
                    }
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
                code: [
                    { required: true, message: '请输入激活码', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.baseURL = this.$BASE_PATH + '/login/getCode';
    },
    methods: {
        getCode() {
            if (this.registerForm.email) {
                var that = this;
                this.$http.get('/user/email/' + this.registerForm.email).then(
                    res => {
                        if (res.result && res.data) {
                            that.$message.error('该邮箱尚未注册')
                            return;
                        } else {
                            that.$http.get("/email/retrieve", {
                                params: {
                                    email: that.registerForm.email
                                }
                            }).then(
                                res => {
                                    if (res.result) {
                                        that.timer = 300;
                                        that.countDown();
                                        that.$message.success(res.message);
                                    } else {
                                        that.$message.error(res.message);
                                    }
                                }
                            ).catch(err => {
                                console.error(err);
                                that.$message("网络开小差了哦，请重新再试")
                            })

                        }
                    }
                ).catch(err => {
                    console.error(err)
                })


            } else {
                this.$message.warn("请输入邮箱地址后再获取验证码")
            }

        },
        countDown() {
            var that = this;
            setInterval(() => {
                if (that.timer <= 0) {
                    clearInterval();
                } else {
                    that.timer--;
                }
            }, 1300)
        },
        submitForm(formName) {
            var that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 使用账号密码登录
                    that.$http.put('/user/retrieve', {
                        email: that.registerForm.email,
                        password: that.registerForm.password,
                        code: that.registerForm.code,
                    }
                    ).then(res => {
                        // 设置token
                        if (res.result) {
                            that.$message.success("注册成功，正在跳转至登录页面")
                            setTimeout(() => {
                                that.$router.replace('/login');
                            }, 1000)
                        } else {
                            that.$message.error(res.message);
                            that.refreshCode();
                        }
                    }).catch(err => {
                        console.error(err)
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
@import '../assets/icon/font_nrttjl4kv3k/iconfont.css';
@import '../assets/css/common.css';

.title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 30px;
}

#all {
    background-image: url('../assets/img/back2.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 855px;
    width: 100%;
    box-align: center;
}


#top {
    display: flex;
    align-self: center;
    margin: 0 auto;
    width: fit-content;
    padding-top: 19px;
}

.topIcon {
    font-size: 40px;
    align-self: center;
    margin: 0;
}

.topText {
    font-size: 45px;
    font-style: italic;
    margin: 10px;
}

#mid {
    background-color: white;
    margin: 0 auto;
    margin-top: 14px;
    padding: 40px;
    width: 600px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px gray;
}

#bottom {
    width: fit-content;
    margin: 0 auto;
    padding-top: 50px;
}

.inarow {
    display: flex;
}

.setpadding {
    margin: 0 auto;
    width: fit-content;
}

.loginwaybox {
    font-size: 20px;
    font-weight: bolder;
    cursor: pointer;
}

.loginwaybox:not(:first-child) {
    margin-left: 10px;
}

.loginForm {
    margin: 0 auto;
    margin-top: 20px;
    width: 400px;
}

.loginactive {
    border-bottom: 3px #ffa00a solid;
}

.formInput {
    margin-bottom: 18px;
}

.codeImage {
    width: 130px;
    height: 40px;
    cursor: pointer;
}

.codeImageBox {
    width: fit-content;
    height: 40px;
    float: right;
}

.codeInput {
    width: 170px;
}

.verificationCode {
    height: 40px;
    width: 125px;
}

.rememberMeBox {
    margin-bottom: 0px;
}

.loginButton {
    width: 100px;
    height: 40px;
}

.loginFormBottom {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: 0 auto;
}

.setLineHeight {
    line-height: 24px;
}
</style>
