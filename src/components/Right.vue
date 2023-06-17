<template>
    <div>
        <div style="width:282px">
            <div style="min-height: 1319px;width:100%">
                <div>
                    <div
                        style="background-color: white;box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;border-radius: 4px;">
                        <div style="display:flex;border-bottom: 1px solid #83838314; height: 40px;
                                                    padding: 0 18px;align-items: center;">
                            <div style="width:172px">微博热搜</div>
                            <div class="refresh_box">
                                <i style="font-size:16px" class="iconfont icon-shuaxin"></i>
                                <span style="font-size:10px" @click="refreshHotSearch">点击刷新</span>
                            </div>
                        </div>
                        <!--分割线-->
                        <div class="deliver1"></div>
                        <!--热搜榜-->
                        <HotSearch :hotSearchList="this.hotSearchList" />
                        <div class="deliver1"></div>
                        <div style="width: 100%;height: 34px;padding-top: 6px;text-align: -webkit-center;">
                            <a style="text-align:center;color:darkgray;text-decoration: none;"
                                href="/hotSearch">查看完整热搜榜单</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HotSearch from './HotSearch.vue';

export default {
    name: "Right",
    data: function () {
        return {
            msg: "123213",
            hotSearchList: []
        };
    },
    created: function () {
        this.refreshHotSearch();
    },
    methods: {
        refreshHotSearch() {
            var that = this;
            this.$http.get('/search/hot').then(
                res => {
                    that.hotSearchList = res.data;
                }, err => {
                    console.error(err);
                }
            )
        }
    },
    components: { HotSearch }
}
</script>
<style scoped>
@import '../assets/css/homepage.css';
</style>