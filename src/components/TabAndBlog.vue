<template>
    <div class="in-a-column">
        <SmallTab/>
        <Blogs/>
    </div>
</template>
<script>
export default{
    name: 'TabAndBlog',
    components: { Blogs, SmallTab },
    data(){
        return{

        }
    },
    props:[],
    created(){

    },
    methods:{

    }

}
</script>
<style scoped>
@import '../assets/css/common.css';
</style>