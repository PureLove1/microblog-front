<template>
    <div>
        <div class="in-a-line">
        <div v-for="item of tabs">
            <router-link :to="item.to">{{item.text}}</router-link>
        </div>
    </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default{
    name:'Tabs',
    props:['tabs']
}
</script>
<style scoped>
@import '../assets/css/common.css';
</style>