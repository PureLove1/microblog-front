<template>
    <transition name="el-fade-in">
        <div v-show="showbox" class="bigbox">
            <div class="in-a-column smallbox">
                <span class="el-icon-circle-check" style="font-size:30px"></span>
                <span>{{ this.message }}</span>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'MessageBox',
    props: ['message','showbox']
}
</script>
<style scoped>
.bigbox {
    display: flex;
    margin: 0px auto;
    z-index: 9999;
    position: absolute;
    top: 50%;
    background-color: rgb(48, 49, 51);
    height: 100px;
    opacity: 0.94;
    border-radius: 8px;
    align-items: center;
    align-self: center;
}

.smallbox {
    width: 220px;
    height: fit-content;
    color: white;
    border-radius: 3px;
    text-align: center;
}
</style>