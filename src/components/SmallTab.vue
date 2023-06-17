<template>
    <div id="innerbox1" v-if="tabList!=null">
        <div v-for="(item, index) in tabList" class="link-box">
            <router-link :to="item.link" :key="index" class="tab">
                {{ item.text }}
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SmallTab',
    props: ['tabList'],
    data() {
        return {
        }
    },
    watch: {
    },
    created: function () {
    },
    methods: {
    }
}
</script>
<style scoped>
.link-box {
    margin: auto 0;
    width: max-content;
}

.tab {
    padding: 6px 12px;
    color: black;
    font-weight: 100;
    font-size: 14px;
    border-radius: 20px;
}
.tab:first-child{
    margin-left: 3px;
}

.tab:hover {
    background-color: rgba(255, 130, 0, .1)
}

.link-active {
    color: #FF8200;
    font-weight: 600;
}

.box-item-inlineBlock {
    display: inline-block;
    width: 12.5%;
}

a {
    text-decoration: none;
}

.curlink {
    color: orangered !important;
    font-weight: bolder !important;
}

#innerbox1 {
    background-color: white;
    margin-left: 14px;
    margin-bottom: 8px;
    width: 611px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
    border-radius: 4px;
    display: flex;
    height: 40px;
}

.box-item-flex {
    height: 44px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    display: flex;
    align-items: center;
    -webkit-box-align: center;
}

.box-item-text {
    width: 8.5%;
    margin: 7px 4px;
    padding: 10px;
    border-radius: 24px;
    line-height: 7px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    color: black;
}

.box-item-text:hover {
    background: rgba(255, 130, 0, .1);
    color: orangered
}
</style>