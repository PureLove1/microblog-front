<template>
    <!--左侧导航栏-->
    <div id="leftnav_box">
        <div id="leftnav_box_item">
            <h2 id="text1">{{ navTitle }}</h2>
            <router-link v-for="(nav, index) in navGroup" :key="nav.text"
                :to="nav.link">
                <div class="div7">
                    <i :class="nav.icon + ' icon2'"></i>
                    <span class="text2">{{ nav.text }}</span>
                </div>
            </router-link>
            <div class="line1"></div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    name: 'LeftNav',
    props: ['navTitle', 'navGroup'],
    watch:{
        $router:()=>{
            
        }
    },
    data: function () {
        return {
            userId: ''
        }
    },
    created() {
        // 登录后可以获取用户id
        this.userId = this.$store.state.userId;
    },
    afterMounted() {
    },
    methods: {
    }
}
</script>
<style scoped>
@import '../assets/css/homepage.css';

.icon2 {
    width: 24px;
    height: 24px;
    margin-right: 18px;
    overflow: hidden;
    font-size: 24px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-style: normal;
    -webkit-font-feature-settings: normal;
    font-feature-settings: normal;
    font-variant: normal;
    font-weight: 400;
    text-decoration: none;
    text-transform: none;
    display: inline-block;
    line-height: 1;
}
a {
    text-decoration: none;
}

#leftnav_box {
    top: 61px;
    width: 182px;
    position: sticky;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
}

#leftnav_box_item {
    background-color: white;
    box-shadow: 0px 0px 1px 1px rgb(0 0 0 / 10%);
    border-radius: 4px;
    width: 182px;
    height: 100%;
}

.link-active .div7{
    color: #f26d5f !important
}
</style>