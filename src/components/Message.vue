<template>
    <div class="message-box">
        <div style="width:25%;background: #292b2e;overflow: hidden;">
            <div style="padding: 7px 15px;display:flex">
                <img :src="usericonurl" class="usericon" />
                <div style="width:100%;display: flex;">
                    <div style="width: 120px;padding: 15px 15px;">
                        <a href="www.baidu.com" style="color:white;text-decoration:none">{{ userName }}</a>
                    </div>
                    <div style="display:flex;font-size: 23px;padding: 13px 0px;">
                        <a class="el-icon-chat-line-square choose"></a>
                        <a class="el-icon-s-operation choose"></a>
                    </div>
                </div>
            </div>
            <div style="height:auto;background-color: #33353a;padding: 10px;border-bottom: 1px solid #404247;">
                <div style="background-color:#4f5054;border-radius: 6px;">
                    <i class="el-icon-search" style="color:white;line-height: 33px;margin-left: 7px;"></i>
                    <input class="search" style="background-color:transparent;border-style:none;color: white;"
                        placeholder="查找联系人或群" />
                </div>
            </div>

            <ul class="session-ul">
                <Session v-for="item of chatList" :key="item.id" :image="item.image" :name="item.name" :last-time="'19:20'"
                    :lastmsg="123" @click.native="changeCurrent(item.id, item.name, item.image)" />
            </ul>
        </div>
        <div style="width:75%;background-color: #eee;">
            <div>
                <div style="border-bottom:1px solid #ddd;position: relative;">
                    <header class="header">
                        <div>
                            <span style="color:#808080">{{ current.name }}</span>
                        </div>
                        <div>
                            <i class="el-icon-menu add-group"></i>
                        </div>
                    </header>
                    <div class="alter" style="display:none">
                        <div class="tip">该对话来自未关注人</div>
                    </div>
                    <div style="position: relative;width: 100%;height: 490px;">
                        <div style="position:absolute;width: inherit;">
                            <ul class="myscorll scorll-ul">
                                <li style="margin-top:2px" v-for="item in historyMessage">
                                    <div v-if="item.sender == userId" style="padding:0 15px">
                                        <!--右侧气泡-->
                                        <p class="time">{{ item.createTime }}</p>
                                        <div style="display:flex">
                                            <div class="right-box">
                                                <div class="right-angle"></div>
                                                <div class="blue">{{ item.content }}</div>
                                            </div>
                                            <div>
                                                <img class="right-avator" :src="usericonurl" />
                                            </div>
                                        </div>
                                    </div>
                                    <!--左侧气泡-->
                                    <div v-else style="padding:0 15px">
                                        <p class="time">{{ item.createTime }}</p>
                                        <div style="display:flex">
                                            <div>
                                                <img class="avator" :src="current.image" />
                                            </div>
                                            <div class="left-box">
                                                <div class="left-angle"></div>
                                                <div class="white">{{ item.content }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div style="display:flex;font-size: 18px;">
                        <i class="iconfont icon-biaoqing bar1"></i>
                        <i class="el-icon-picture-outline bar"></i>
                        <i class="el-icon-paperclip bar"></i>
                        <i class="el-icon-bell bar"></i>
                    </div>
                    <textarea class="input" @keydown.enter="submit" v-model="message.content"></textarea>
                    <div>
                        <span style="color:#808080;font-size: 12px;float: right;margin-right: 14px;">点击Enter发送消息</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Session from './Session.vue';
import MessageLi from './MessageLi.vue';
let ws;
export default {
    name: 'Message',
    components: { Session, MessageLi },
    data() {
        return {
            //对话列表
            chatList: [],
            historyMessage: [],
            //发送的文本消息
            message: {
                content: '',
                sender: '',
                receiver: '',
                createTime: '',
                status: 1,
                id: null
            },
            //当前会话
            current: {
                id: '',
                name: '',
                image: ''
            }
        }
    },
    computed: {
        usericonurl() {
            if (this.$store.state.userIconUrl == "") {
                return sessionStorage.getItem("userIconUrl");
            }
            return this.$store.state.userIconUrl;
        },
        userId() {
            if (this.$store.state.userId == "") {
                return sessionStorage.getItem("userId");
            }
            return this.$store.state.userId;
        },
        userName() {
            if (this.$store.state.username == "") {
                return sessionStorage.getItem("username");
            }
            return this.$store.state.username;
        }
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            await this.$http.get("/follow/" + this.userId).then(res => {
                if (res.result) {
                    console.log(res);
                    this.chatList = res.data;
                }
            }).catch(err => {
                console.error(err);
            });
            console.log(this.chatList);
            //创建webSocket对象
            ws = new WebSocket("ws://localhost:8080/microblog/chat/" + this.userId);
            //给ws绑定事件
            ws.onopen = this.onOpen;
            //接收到服务端推送的消息后触发
            ws.onmessage = this.onMessage;
            ws.onclose = this.onClose;
            this.current.id = this.chatList[0].id;
            this.current.name = this.chatList[0].name;
            this.current.image = this.chatList[0].image;
            await this.$http.get("/message/history/" + this.userId + '/' + this.current.id).then(res => {
                if (res.result) {
                    console.log(res)

                    this.historyMessage = res.data;
                }
            }).catch(err => {
                console.error(err);
            });
        },
        submit() {
            console.log("函数触发");
            this.message.sender = this.userId;
            this.message.receiver = this.current.id;
            this.message.createTime = new Date();
            console.log(this.message.content);
            this.historyMessage.push(JSON.parse(JSON.stringify(this.message)));
            ws.send(JSON.stringify(this.message));
            this.message.content = "";
            console.error(this.historyMessage);
        },
        onOpen() {
            console.log('websocket链接打开')
        },
        onMessage(evt) {
            //获取服务端推送过来的消息
            var dataStr = evt.data;
            //将dataStr 转换为json对象
            var res = JSON.parse(dataStr);
            console.log('消息推送')
            this.historyMessage.push(res);
        },
        onClose() {
            console.log('websocket链接关闭')
        },
        changeCurrent(id, name, image) {
            console.log('修改聊天对象');
            this.current.id = id;
            this.current.name = name;
            this.current.image = image;
            this.$http.get("/message/history/" + this.userId + '/' + this.current.id).then(res => {
                if (res.result) {
                    console.log(res)
                    this.historyMessage = res.data;
                }
            }).catch(err => {
                console.error(err);
            });
        }
    }
}
</script>
<style scoped>
@import '../assets/icon/iconfont.css';

.message-box {
    width: 75%;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
}

.usericon {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    cursor: pointer;
}

.session-ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
    overflow: auto;
    height: 603px;
}

.scorll-ul {
    list-style: none;
    height: 460px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-left: 0px;
}

.myscorll::-webkit-scrollbar {
    background-color: transparent;
    width: 6px;
}

.myscorll::-webkit-scrollbar-thumb {
    background-color: rgb(82, 85, 91);
    border-radius: 15px;
    width: 4px;
}

.tip {
    height: fit-content;
    margin: auto;
}

.bar {
    color: rgb(104 110 121);
    font-size: 24px;
    padding-left: 10px;
    cursor: pointer;
}

.bar1 {
    color: rgb(104 110 121);
    font-size: 24px;
    padding-left: 10px;
    margin-right: 5px;
    cursor: pointer;
}

.input {
    color: #333;
    width: 100%;
    height: 88px;
    display: block;
    box-sizing: border-box;
    padding: 0 8px 0 17px;
    font-size: 14px;
    line-height: 22px;
    background: #eee;
    overflow: auto;
    border: none;
    resize: none;
}

.input:focus {
    outline: none;
}

.bar:hover,
.bar1:hover {
    color: #ff8f2c;
}

.header {
    height: 50px;
    box-sizing: border-box;
    line-height: 50px;
    margin-left: 18px;
    margin-right: 20px;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.add-group {
    cursor: pointer;
}

.alter {
    background-color: white;
    color: #333333;
    font-size: 12px;
    height: 34px;
    text-align: center;
    display: grid;
    border-right: 1px solid #33333333;
}

.add-group:hover {
    color: #ff8f2c;
}

.choose {
    color: white;
    cursor: pointer;
}

.choose:hover {
    color: #ff8f2c
}

::-webkit-input-placeholder {
    color: #ffffffd6;
}

::-moz-placeholder {
    color: #ffffffd6;
}

:-moz-placeholder {
    color: #ffffffd6;
}

.search:focus-visible {
    outline: 0px;
}

.left-box {
    position: relative;
    width: -webkit-fill-available;
}

.right-box {
    position: relative;
    width: -webkit-fill-available;
}

.white {
    background-color: white;
    margin-left: 10px;
    max-width: 400px;
    width: fit-content;
    padding: 10px;
    border-radius: 8px;
}

.blue {
    background-color: #e5f3fd;
    margin-right: 10px;
    max-width: 400px;
    width: fit-content;
    padding: 10px;
    float: right;
    border-radius: 8px;
}

.time {
    font-size: 12px;
    color: #a3a7ae;
    width: 100%;
    text-align: center;
}

.left-angle {
    position: absolute;
    margin-top: 10px;
    background-color: transparent;
    border: 5px solid rgba(0, 0, 0, 0);
    border-right-color: white;
}

.right-angle {
    position: absolute;
    margin-top: 10px;
    right: 0px;
    background-color: transparent;
    border: 5px solid rgba(0, 0, 0, 0);
    border-left-color: #e5f3fd;
}

.avator {
    border-radius: 100%;
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.right-avator {
    border-radius: 100%;
    width: 30px;
    height: 30px;
    cursor: pointer;
}</style>