<template>
    <!--微博图标-->
    <div id="all">
        <div id="top">
            <p class="topText">Login</p>
        </div>
        <div id="mid">
            <!--验证码切换-->
            <div class="inarow setpadding">
                <!--账号密码-->
                <div @click="switchWay($event)" :class="{loginwaybox:true,loginactive:active}">账号密码登录</div>
                <!--验证码登录-->
                <div @click="switchWay($event)" :class="{ loginwaybox: true, loginactive: !active }">验证码登录</div>
            </div>
            <!--输入框-->
            <el-form :key="'form1'" v-if="active" class="loginForm" :model="loginForm" :rules="rules" ref="loginForm"
                label-width="100px">
                <el-form-item class="formInput" label="邮箱" prop="email1">
                    <el-input prefix-icon="el-icon-message" v-model="loginForm.email1"
                        placeholder="请输入注册时使用的邮箱地址"></el-input>
                </el-form-item>
                <el-form-item class="formInput" label="密码" prop="password">
                    <el-input prefix-icon="el-icon-lock" :show-password=true v-model="loginForm.password"
                        placeholder="请输入账户密码"></el-input>
                </el-form-item>
                <el-form-item class="formInput" label="图片验证码" prop="code">
                    <el-input class="codeInput" v-model="loginForm.code" placeholder="请输入验证码" type="text" />
                    <div class="codeImageBox">
                        <img @click="refreshCode" class="codeImage" :src="baseURL" />
                    </div>
                </el-form-item>
                <el-form-item class="rememberMeBox">
                    <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginButton" type="primary" @click="submitForm('loginForm')">立即登录</el-button>
                    <el-button class="loginButton" @click="resetForm('loginForm')">重置表单</el-button>
                </el-form-item>
            </el-form>

            <el-form :key="'form2'" v-else class="loginForm" :model="codeLoginForm" :rules="extraRule"
                ref="codeLoginForm" label-width="100px">
                <el-form-item class="formInput" label="邮箱" prop="email2">
                    <el-input prefix-icon="el-icon-message" v-model="codeLoginForm.email2"
                        placeholder="请输入注册时使用的邮箱地址"></el-input>
                </el-form-item>
                <el-form-item class="formInput" label="验证码" prop="verificationCode">
                    <el-input class="codeInput" v-model="codeLoginForm.verificationCode" placeholder="请输入验证码"
                        type="text" />
                    <el-button class="verificationCode" type="primary" @click="getVerificationCode"
                        :disabled="timer > 0">{{ timer <= 0 ? '发送验证码' : timer + '秒后获取' }}</el-button>
                </el-form-item>
                <el-form-item class="rememberMeBox">
                    <el-checkbox v-model="codeLoginForm.rememberMe">记住我</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginButton" type="primary" @click="submitForm('codeLoginForm')">立即登录</el-button>
                    <el-button class="loginButton" @click="resetForm('codeLoginForm')">重置表单</el-button>
                </el-form-item>

            </el-form>

            <div class="loginFormBottom">
                <div class="inarow">
                    <span class="tip setLineHeight">还没有账号?</span>
                    <el-link type="primary" :href="'/register'">点击注册</el-link>
                </div>
                <div class="inarow">
                    <span class="tip setLineHeight">忘记密码?</span>
                    <el-link type="primary" :href="'/retrieve'">点击找回</el-link>
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
    name: 'Login',
    data() {
        return {
            baseURL: '',
            timer: 0,
            active: true,
            loginForm: {
                email1: '',
                password: '',
                // 图片验证码
                code: '',
                rememberMe: false
            },
            codeLoginForm: {
                email2: '',
                // 邮箱验证码
                verificationCode: '',
                rememberMe: false
            },
            rules: {
                email1: [
                    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: '密码不得为空', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            extraRule: {
                email2: [
                    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                verificationCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.baseURL = this.$BASE_PATH + '/login/getCode';
    },
    methods: {
        switchWay(event) {
            // 切换登录方式
            if (event.target.classList.contains('loginactive')) {
                return;
            } else {
                this.active = !this.active;
            };
        },
        refreshCode() {
            var that = this;
            this.$http({
                method: 'get',
                url: "/login/getCode",
                /* blob流对象 */
                responseType: 'blob'
            }).then((res) => {
                /* 使用URL.createObjectURL方法获取blob对象的url地址 */

                that.baseURL = URL.createObjectURL(res)


            }).catch(err => {
                console.error(err)
            });


        },
        getVerificationCode() {
            if (this.codeLoginForm.email2) {
                var that = this;
                this.$http.post('/login/getEmailCode', {
                    to: this.codeLoginForm.email2
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    that.$message.success(res.message);
                    that.timer = 60;
                    that.countDown();
                }).catch(err => {
                    console.error(err);
                })
            }else{
                this.$message.warn("请先输入邮箱地址")
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
                    if (that.active) {
                        // 使用账号密码登录
                        that.$http.post('/login', {
                            email: that.loginForm.email1,
                            password: that.loginForm.password,
                            code: that.loginForm.code,
                            loginWay: that.active ? 0 : 1,
                            rememberMe: that.loginForm.rememberMe
                        }, {
                            headers: {
                                // 设置以表单形式提交
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                        ).then(res => {
                            // 设置token
                            if (res.result) {
                                that.$store.commit('setToken', res.data.token);
                                that.$store.commit('setRefreshToken', res.data.refreshToken);
                                that.$store.commit('setUserId', res.data.userId);
                                that.$store.commit('setUsername', res.data.username);
                                that.$store.commit('setUserIconUrl', res.data.userIconUrl);
                                that.$message.success(res.message);
                                setTimeout(() => {
                                    that.$router.replace('/');
                                }, 1000)
                            } else {
                                that.$message.error(res.message);
                                that.refreshCode();
                            }
                        }).catch(err => {
                            console.error(err)
                        })
                    } else {
                        // 使用账号密码登录
                        that.$http.post('/login', {
                            email: that.codeLoginForm.email2,
                            verificationCode: that.codeLoginForm.verificationCode,
                            loginWay: that.active ? 0 : 1,
                            rememberMe: that.loginForm.rememberMe
                        }, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(res => {
                            if(res.result){
                                that.$store.commit('setToken', res.data.token);
                                that.$store.commit('setRefreshToken', res.data.refreshToken);
                                that.$store.commit('setUserId', res.data.userId);
                                that.$store.commit('setUsername', res.data.username);
                                that.$store.commit('setUserIconUrl', res.data.userIconUrl);
                                that.$message.success(res.message);
                                setTimeout(() => {
                                    that.$router.replace('/');
                                }, 1000)
                            }else{
                                that.$message.error(res.message);
                            }
                        }).catch(err => {
                            console.error(err)
                        })
                    }
                } else {
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
