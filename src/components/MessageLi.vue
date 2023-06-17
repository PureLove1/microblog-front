<template>
    <li style="margin-top:2px">
        <div v-if="sender==userId" style="padding:0 15px">
            <!--右侧气泡-->
            <p class="time">{{ createTime }}</p>
            <div style="display:flex">
                <div class="right-box">
                    <div class="right-angle"></div>
                    <div class="blue">{{content}}</div>
                </div> 
                <div>
                    <img class="right-avator"
                    :src="image" />
                </div>
            </div>
        </div>
        <!--左侧气泡-->
        <div v-else style="padding:0 15px">
            <p class="time">{{ createTime }}</p>
            <div style="display:flex">
                <div>
                    <img class="avator"
                        :src="image" />
                </div>
                <div class="left-box">
                    <div class="left-angle"></div>
                    <div class="white">{{content}}</div>
                </div>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    name: 'MessageLi',
    props:['createTime','content','image','sender','receiver'],
    data() {
        return {

        }
    },
    computed:{
        userId() {
            if (this.$store.state.userId == "") {
                return sessionStorage.getItem("userId");
            }
            return this.$store.state.userId;
        }
    }
}
</script>
<style scoped>
.left-box {
    position: relative;
    width: -webkit-fill-available;
}
.right-box{
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
.right-angle{
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
.right-avator{
    border-radius: 100%;
    width: 30px;
    height: 30px;
    cursor: pointer;
}
</style>