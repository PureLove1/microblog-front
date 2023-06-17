<template>
    <div class="index">
        <!--导航-->
        <TopNavigation @showdialog="boxvisible" />
        <div class="inside">
            <div class="middle in-a-line">
                <!--左侧导航栏-->
                <div>
                    <router-view name="left"/>
                </div>
                <!--右侧部分-->
                <div>
                    <router-view name="right" />
                </div>
            </div>
            <el-dialog title="请选择如下方式登录微博" :visible.sync="centerDialogVisible" width="30%" center>
                <div class="in-a-column">
                    <el-link href="/login">账号密码登录</el-link>
                    <el-link href="/login">邮箱登录</el-link>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import MessageBox from './MessageBox.vue';
import TopNavigation from './TopNavigation.vue'
export default {
    name: 'VideoIndex',
    components: { TopNavigation, MessageBox },
    data: function () {
        return {
            showbox: false,
            //用户id
            userId: "",
            //用户头像
            usericonurl: "",
            //token
            token: "",
            centerDialogVisible: false,
            message: '',
        }
    },
    created: function () {
        var that = this;
        this.$http.get('/login/getToken').then(res => {
            if (res.result) {
                that.$store.commit('setToken', res.data.token);
                that.$store.commit('setUserId', res.data.userId);
                that.$store.commit('setUsername', res.data.username);
                that.$store.commit('setUserIconUrl', res.data.userIconUrl);
            }
        }).catch(err => {
            console.log(err)
        }
        )
    },
    methods: {
        show() {
            this.showbox = !this.showbox;
        },
        showfMsg(msg) {
            this.message = msg;
            this.showbox=true;
            let that = this;
            setTimeout(
                () => {
                    that.showbox = false;
                }, 2000
            );
        },
        boxvisible(visible) {
            this.centerDialogVisible = visible;
        }
    }
}
</script>
<style>
@import '../assets/css/common.css';
@import '../assets/icon/iconfont.css';
@import '../assets/icon/font_7m49x58wzoq/iconfont.css';
@import '../assets/css/common.css';

* {
    margin: 0;
    padding: 0px;
}

.index {
    /* width: 100%;
    min-height: 100%;
    margin: 0 auto; */
    /* height: 1200px; */
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
}

.inside {
    display: flex;
}

#userset {
    width: inherit;
    height: auto;
}
</style>