<template>
    <div class="box">
        <h1>404 NOT FOUND</h1>
        <h1>对不起，您访问的页面不存在</h1>
        <el-col :sm="12" :lg="6">
            <el-result icon="warning" title="Warning" subTitle="404 ERROR">
                <template slot="extra">
                    <el-button type="primary" size="medium" @click="goBack()">返回上一页</el-button>
                    <el-button type="primary" size="medium" @click="goHome()">点击返回主页</el-button>
                </template>
            </el-result>
        </el-col>
    </div>
</template>
<script>
export default {
    name: 'NotFound',
    data() {
        return {

        }
    },
    methods:{
        goHome(){
            this.$router.push('/index')
        },
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}
</style>