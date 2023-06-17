<template>
    <div>
        <SmallTab :tabList="tabList" :display="display" />
        <div>

        </div>
    </div>
</template>
<script>
import SmallTab from './SmallTab.vue';

export default{
    name: "UserMessage",
    props:['tabList', 'display'],
    components: { SmallTab }
}
</script>
<style>
</style>