<template>
    <li class="sessionlist">
        <div class="line"></div>
        <div class="list-left">
            <div class="avator-box">
                <img :src="image" class="avatar">
            </div>
        </div>
        <div class="list-right relative">
            <div class="content-top flex">
                <p class="name">
                    <span class="username">{{ name }}</span>
                    <span class="hidden">2028810631</span><!----><!---->
                </p><span class="time">{{ lastTime }}</span>
            </div>
            <div class="content-bottom flex">
                <p class="lastmsg"><!---->
                    <span>{{ lastmsg }}</span>
                </p><!---->
            </div>
        </div>
    </li>
</template>
<script>
export default {
    name: 'Session',
    props: ['name', 'lastmsg', 'image', 'lastTime'],
    data() {
        return {
        }
    }
}
</script>
<style scoped>
.sessionlist {
    background-color: #33353a;
    border-bottom: 1px solid #33353a;
    list-style: none;
    display: flex;
    height: 80px;
    cursor: pointer;
}

.sessionlist:hover {
    background-color: #3a3c42;
}

.name {
    margin: 0px;
}

.list-left {
    display: block;
    margin: auto 0;
}

.list-right {
    margin: auto 0;
}

.username {
    color: white;
    font-size: 14px;
    display: inline-block;
    max-width: 120px;
}

.lastmsg {
    color: #999999;
    font-size: 14px;
    max-width: 190px;
    margin-top: 6px;
    margin-bottom: 0px;
}

.time {
    color: #51555e;
    font-size: 10px;
    vertical-align: top;
}

.hidden {
    display: none;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    display: inline-block;
}

.avator-box {
    width: 50px;
    height: 50px;
    margin: 0 15px 0 18px;
}

.line {
    color: transparent;
    width: 2px;
}

.relative {
    position: relative;
}

.flex {
    display: flex;
}

.content-top {
    margin-right: 15px;
    line-height: 20px;
    -webkit-box-pack: justify;
    justify-content: space-between;
}</style>