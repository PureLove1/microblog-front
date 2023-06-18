<template>
    <div>
        <el-dropdown>
            <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="value of options" :key="value.text"
                    @click.native="doCall(value.text, value.opt, blogId)">
                    {{ value.text }}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>

</template>

<script>
export default {
    name: 'OptionDropDown',
    props: ['options', 'blogId'],
    methods: {
        doCall: function (text, option, blogId) {
            if (text == '删除') {
                this.deleteBlog(option, blogId)
            }
        },
        deleteBlog(option, blogId) {
            this.$http.delete(option + blogId).then(
                res=> {
                    if (res.result) {
                        this.$parent.deleteBlog(blogId);
                        this.$message.success(res.message);
                    } else {
                        this.$message.error(res.message);
                    }

                }).catch(
                    err=>{
                        console.error(err);
                    }
                )
        }
    }
}
</script>
<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #585858;
}

.el-icon-arrow-down {
    font-size: 12px;
    font-weight: 700 !important;
}

.el-dropdown-menu__item:hover {
    color: black !important;
    background-color: #f5f5f5;
}

.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}
</style>