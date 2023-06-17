<template>
    <div class="box">
        <div v-for="(item, index) of hotSearchList" class="hot-box">
            <div class="hot">
                <div class="num">
                    <span v-if="index == 0" class="top">置顶</span>
                    <span v-else :class="index < 4 ? 'orange-red' : 'gray'">{{ index }}</span>
                </div>
                <div class="link-box">
                    <router-link class="link" :to="'/search?q=' + item.value">{{ item.value }}</router-link>
                </div>
                <div class="score">{{ item.score }}</div>
            </div>
        </div>
        <div>
             <el-divider content-position="center">暂无更多数据</el-divider>
        </div>
    </div>
</template>
<script>
export default {
    name: "HotSearchList",
    data() {
        return {
            hotSearchList: []
        };
    },
    created() {
        var that = this;
        this.$http.get('/search/hot', {params:{ pageSize: 50} }).then(
            res => {
                if (res.result) {
                    that.hotSearchList = res.data;
                }
            }
        ).catch()
    }
}
</script>
<style scoped>

.orange-red {
    color: orangered;
}

.gray {
    color: #939393;
}

.link-box {
    width: 526px;
}

.score {
    color: #939393;
}

.link {
    text-decoration: none;
    color: black;
    font-size: 16px;
    font-weight: 600;
}

.link:hover {
    color: #eb7350;
}

.top {
    color: red;
    font-weight: 500;
    font-style: italic;
}

.hot-box {
    margin-bottom: 10px;
}

.box {
    margin: 0px 7px;
}

.hot {
    display: flex;
    background-color: white;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
    border-radius: 4px;
    width: 642px;
    padding: 12px 14px;
}

.num {
    width: 50px;
    display: flex;
    justify-content: space-evenly;
}
</style>
<style>
.el-divider__text {
    position: absolute;
    background-color:transparent;
    padding: 0 20px;
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}
</style>
