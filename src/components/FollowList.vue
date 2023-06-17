<template>
    <div class="outside-box">
        <div>
            <img class="image" :src="myUser.image">
        </div>
        <div class="info-box">
            <div class="name">{{ myUser.name }}</div>
            <div class="gray">{{ myUser.introduce.length > 30 ? myUser.introduce.slice(0, 27)+'...' : myUser.introduce }}</div>
            <div class="gray">粉丝：{{ ' ' + myUser.fanNum }}</div>
        </div>
        <div class="button-box">
            <button v-if="!myUser.followed&myUser.id!=currentUserId" class="follow" @click="follow(myUser.followed)">+关注</button>
            <div class="self" v-else-if="myUser.id==currentUserId">
                <span class="self-text">你在这里</span>
            </div>
            <button v-else class="follow" @click="follow(myUser.followed)">已关注</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FollowList',
    props: {
        user: { type: Object }
    },
    computed:{
        currentUserId(){
            return sessionStorage.getItem('userId');
        }
    },
    watch: {
        user: {
            handler: function (newVal, oldVal) {
                this.myUser = newVal
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            myUser: this.user,
        }
    },
    methods: {
        follow() {
            //value:博客对象，judge:是否关注了
            var that = this;
            this.$http.put("/follow/" + this.myUser.id + "/" + !this.myUser.followed)
                .then(res => {
                    if (res.result) {
                        //splice(start,deleteCount,…value)：
                        //从start开始替换deleteCount个元素，后面跟上要替换的元素。
                        that.myUser.followed = !that.myUser.followed;
                    }
                    else {
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
}
</script>
<style scoped>
.outside-box {
    padding: 20px;
    background-color: white;
    cursor: pointer;
    display: flex;
}

.info-box {
    margin: 0px auto 0px 8px;
}

.outside-box:hover {
    background-color: #f2f2f2;
}

.image {
    border-radius: 100%;
    width: 50px;
    height: 50px
}
.self{
    color:green;
    width: 80px;
    display: flex;
}
.self-text{
    margin: auto;
}
.follow {
    width: 80px;
    padding: 5px 0px;
    margin: auto 0;
    border-radius: 25px;
    border: 1px solid #ff8200;
    background: transparent;
    color: #ff8200;
    cursor: pointer;
}

.follow:hover {
    background-color: #fae9d7;
}

.name {
    font-weight: bolder;
    font-size: 12px;
}
.button-box{
    display: flex;
}
.gray {
    color: #939393;
    font-size: 12px;
}
</style>