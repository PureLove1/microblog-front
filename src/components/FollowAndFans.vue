<template>
    <div>
        <div id="setwidth" class="backhead">
            <i class="el-icon-back arrow" @click="goBack"></i>
            <h3 class="back" @click="goBack">返回</h3>
        </div>
        <SmallTab :display="true" :tab-list="linkList" :active="currLink" />
        <div class="user-box">
            <div v-for="item of userList">
                <follow-list :user="item" />
            </div>
            <div v-if="userList.length==0">
                <el-result icon="info" title="" subTitle="暂无数据">
                </el-result>
            </div>
        </div>
    </div>
</template>
<script>
import SmallTab from './SmallTab.vue';
import FollowList from './FollowList.vue';
export default {
    name: "FollowAndFans",
    components: { SmallTab, FollowList },
    watch: {
        $route(to, from) {
            let searchId = this.$route.params.id;
            var that = this;
            if (to.path == this.linkList[0].link) {
                this.$http.get('/follow/' + searchId)
                    .then(res => {
                        if (res.result) {
                            that.userList = res.data
                        } else {
                        }
                    }).catch(err => {
                        console.error(err)
                    })
            } else if (to.path == this.linkList[1].link) {
                this.$http.get('/follow/fan/' + searchId)
                    .then(res => {
                        if (res.result) {
                            that.userList = res.data
                        } else {
                        }
                    }).catch(err => {
                        console.error(err)
                    })
            }
        }
    },
    data() {
        return {
            userList: [],
            linkList: [
                { link: '', text: '关注' },
                { link: '', text: '粉丝' }
            ]
        }
    },
    created() {
        let searchId = this.$route.params.id;
        this.linkList[0].link = '/follow/' + searchId;
        this.linkList[1].link = '/follow/fan/' + searchId;
        var that = this;
        if (this.$route.path == this.linkList[0].link) {
            this.$http.get('/follow/' + searchId)
                .then(res => {
                    if (res.result) {
                        that.userList = res.data
                    } else {

                    }
                }).catch(err => {
                    console.error(err)
                })
        }
        else if (this.$route.path == this.linkList[1].link) {
            this.$http.get('/follow/fan/' + searchId)
                .then(res => {
                    if (res.result) {
                        that.userList = res.data
                    } else {
                    }
                }).catch(err => {
                    console.error(err)
                })
        }


    },
    computed: {
        currLink() {
            if (this.$route.path == this.linkList[0].link)
                return 0;
            else if (this.$route.path == this.linkList[1].link)
                return 1;
            else return null;
        }
    },
    methods: {
        goBack() {
            this.$router.push('/usr/' + this.$route.params.id);
        }
    }
}
</script>
<style scoped>
#setwidth {
    width: 611px;
    margin-bottom: 8px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
}

.backhead {
    margin: 0 14px;
    height: fit-content;
    background-color: white;
    position: relative;
    display: flex;
    width: fit-content;
    align-self: center;
    margin-left: 10px;
    border-radius: 4px;
}

.back {
    color: black;
    font-weight: bolder;
    line-height: 40px;
    cursor: pointer;
}

.arrow {
    align-self: center;
    color: black;
    cursor: pointer;
}

.user-box {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
    margin: 0 14px;
    min-height: 600px;
    background-color: white;
}
</style>