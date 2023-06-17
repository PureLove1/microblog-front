<template>
    <div>
        <SmallTab :tabList="tabList" />
        <div class="user-box" v-for="user of userList">
            <div>
                <img class="user-img" :src="user.image" />
            </div>
            <div class="user-info">
                <div class="user-name">{{ user.name }}</div>
                <div class="tip-text">{{ user.introduce }}</div>
                <div class="tip-text">粉丝：{{ user.fanNum }}</div>
            </div>
            <div style="margin:auto">
                <button class="follow" v-if="user.followed" @click="follow(user)">已关注</button>
                <button class="follow" v-else @click="follow(user)">+关注</button>
            </div>
        </div>
    </div>
</template>
<script>
import SmallTab from './SmallTab.vue';
export default {
    name: 'UserList',
    props: ['tabList'],
    data() {
        return {
            userList: [],
            currentPage: 1,
            pageSize: 10
        }
    },
    watch: {
        $route: {
            handler(newVal, oldVal) {
                this.fetchData();
            }
        }
    },
    created() {
        this.fetchData();

    },
    computed: {
    },
    methods: {
        follow(user) {
            this.$http.put("/follow/" + user.id + "/" + !user.followed)
                .then(res => {
                    if (res.result) {
                        user.followed = !user.followed;
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        fetchData() {
            let query = this.$route.query;
            let path = this.$route.path;
            var that = this;
            if (query.q != undefined && query.q.trim != '') {
                if (query.ref == 'user') {
                    this.$http.get('/user/query/' + query.q + '?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize).then(
                        res => {
                            if (res.result) {
                                that.userList = res.data
                            }
                        }
                    ).catch()

                } else if (path == '/user/name') {
                    this.$http.get('/user/name/' + query.q + '?ref=user&currentPage=' + this.currentPage + '&pageSize=' + this.pageSize).then(
                        res => {
                            if (res.result) {
                                that.userList = res.data
                            }
                        }
                    ).catch()
                } else if (path == '/user/introduce') {
                    this.$http.get('/user/introduce/' + query.q + '?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize).then(
                        res => {
                            if (res.result) {
                                that.userList = res.data
                            }
                        }
                    ).catch()
                }
            }
        }
    },
    components: { SmallTab }
}
</script>
<style scoped>
.user-box {
    width: 577px;
    margin: 0px 14px;
    margin-bottom: 14px;
    display: flex;
    box-shadow: 0px 0px 1px 1px rgb(0 0 0 / 10%);
    border-radius: 4px;
    background-color: white;
    padding: 20px 18px;
    cursor: pointer;
}

.user-box:hover {
    background-color: #f2f2f2;
}

.user-info {
    width: 500px;
    margin-left: 8px
}

.user-img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
}

.user-name {
    font-size: 12px;
    font-family: PingFangSC-Semibold;
    line-height: 18px;
    font-weight: 600;
}

.tip-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    font-size: 12px;
    margin: 1px 0;
    line-height: 16px;
    color: #939393;
}

.follow {
    width: 70px;
    padding: 2px 0px;
    border-radius: 25px;
    border: 1px solid #ff8200;
    background: transparent;
    color: #ff8200;
    cursor: pointer;
}

.follow:hover {
    background-color: #fae9d7;
}
</style>