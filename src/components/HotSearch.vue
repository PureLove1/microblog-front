<template>
    <div class="place">
        <a v-for="(item, index) in hotSearchList" :href="'/search?q=' + item.value"> <!--:href是v-bind:href缩写-->
            <div v-if="index == 0" class="div8">
                <div class="rank">
                    <i class="iconfont icon-zhiding"></i>
                </div>
                <!--置顶热搜--><!---->
                <div class="text4">{{ item.value.length > 11 ? item.value.slice(0, 11).concat('...') : item.value }}</div>
                <div>
                    <span class="text5">{{ item.score > 10000 ? (item.score / 10000).toFixed(1) + '万' : item.score }}</span>
                </div>
            </div>
            <div v-else-if="index <= 3" class="div8">
                <div class="rank top3">
                    <i>{{ index }}</i>
                </div>
                <!--置顶热搜-->
                <div class="text4">{{ item.value.length > 11 ? item.value.slice(0, 11).concat('...') : item.value }}</div>
                <div>
                    <span class="text5">{{ item.score > 10000 ? (item.score / 10000).toFixed(1) + '万' : item.score }}</span>
                </div>
            </div>
            <div v-else class="div8">
                <div class="rank">
                    <i>{{ index }}</i>
                </div>
                <!--置顶热搜-->
                <div class="text4">{{ item.value.length > 11 ? item.value.slice(0, 11).concat('...') : item.value }}</div>
                <div>
                    <span class="text5">{{ item.score > 10000 ? (item.score / 10000).toFixed(1) + '万' : item.score }}</span>
                </div>
            </div>
            <!--分割线-->
            <div class="deliver1"></div>
        </a>
    </div>
</template>
<script>
export default { //对外暴露这个模块
    name: 'HotSearch',
    props: ['hotSearchList'] //接收传递的参数
}
</script>
<style scoped>
@import '../assets/icon/font_7m49x58wzoq/iconfont.css';

.place {
    width: 670px;
    margin: 0px 7px;
}

a {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}

.div8 {
    position: relative;
    height: 40px;
    padding: 0 30px 0 24px;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    font-size: 14px;
}

.top3 {
    font-weight: bolder;
    color: orangered
}

.rank {
    font-size: 12px;
    color: #f26d5f;
    width: 20px;
    text-align: center;
}

.deliver1 {
    border-bottom: 1px solid #00000005;
}

.text4 {
    font-size: 12px;
    color: black;
    margin-left: 15px;
    width: 140px;
}

.text5 {
    color: #838383;
    width: 52px;
    font-size: 12px;
    text-align: end;
    float: right;
}

.rank .iconfont.icon-zhiding {
    font-size: 12px !important;
    font-weight: bolder;
}</style>