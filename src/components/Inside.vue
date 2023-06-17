<template>
    <div>
        <div style="top: 61px;
                width: 182px;
                position: sticky;
                height: 100vh;
                overflow-x: hidden;
                overflow-y: auto;">

            <div style="background-color: white;
                    box-shadow: rgb(0 0 0 / 10%) 0px 0px 1px 1px;
                    border-radius: 4px;
                    width: 182px;
                    height: 100%;">
                <h2 id="text1">首页</h2>
                <div>
                    <div>
                        <a class="lefta">
                            <div class="div7">
                                <i class="iconfont icon-liebiao icon2"></i>
                                <span class="text2">全部关注</span>
                            </div>
                        </a>
                        <a class="lefta">
                            <div class="div7">
                                <i class="iconfont icon-xingxing icon2"></i>
                                <span class="text2">最新微博</span>
                            </div>
                        </a>
                        <a class="lefta">
                            <div class="div7">
                                <i class="iconfont icon-guanzhu icon2"></i>
                                <span class="text2">特别关注</span>
                            </div>
                        </a>
                        <a class="lefta">
                            <div class="div7">
                                <i class="iconfont icon-quanzi icon2"></i>
                                <span class="text2">好友圈</span>
                            </div>
                        </a>
                        <div class="line1"></div>
                        <!--分割线-->
                        <div style="display:flex">
                            <h3 class="text3">自定义分组</h3>
                            <div>
                                <button class="btn3">管理</button>
                            </div>
                        </div>
                        <a class="lefta">
                            <div class="div7">
                                <i class="iconfont icon-dian icon2"></i>
                                <span class="text2">同学</span>
                            </div>
                        </a>
                        <a class="lefta">
                            <div class="div7">
                                <i class="iconfont icon-dian icon2"></i>
                                <span class="text2">名人明星</span>
                            </div>
                        </a>
                        <a class="lefta">
                            <div class="div7">
                                <i class="iconfont icon-dian icon2"></i>
                                <span class="text2">同事</span>
                            </div>
                        </a>
                        <a class="lefta">
                            <div class="div7">
                                <i class="iconfont icon-dian icon2"></i>
                                <span class="text2">悄悄关注</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'Inside',
    data: function () {
        return {
            msg: ''
        }
    },
    created: function () {
    }
}
</script>
<style scoped>
* {
    margin: 0px;
    padding: 0px;
}

a:hover {
    text-decoration: none;
}

#app {
    width: 100%;
    min-height: 100%;
    /* height: 1200px; */
    background-color: #f5f5f5;
    display: flex;
}

#weibo-icon {
    height: 38px;
    margin-top: 9px;
    padding-left: 72px;
}


#input1 {
    background-color: inherit;
    border: none;
    outline: medium;
    color: antiquewhite;
    padding-left: 12px;
    font-size: 16px;
    font-family: emoji;
    font-weight: lighter;
    padding-top: 5px;
}




#text1 {
    margin: 0;
    padding: 10px 16px;
    line-height: 26px;
    font-size: 22px;
    font-weight: 500;
}


.div7 {
    display: flex;
    position: relative;
    padding: 8px 16px;
    border-radius: 2px;
    cursor: pointer;
    color: #838383;
}

.lefta :hover {
    background-color: #f5f5f5;
}

.icon2 {
    width: 24px;
    height: 24px;
    margin-right: 18px;
    overflow: hidden;
    font-size: 24px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-style: normal;
    -webkit-font-feature-settings: normal;
    font-feature-settings: normal;
    font-variant: normal;
    font-weight: 400;
    text-decoration: none;
    text-transform: none;
    display: inline-block;
    line-height: 1;
}

.text2 {
    line-height: 20px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
}

.line1 {
    margin: 10px -4px;
    border-bottom: 1px solid #f5f5f5;
}

.text3 {
    margin: 0;
    padding: 0px 16px;
    line-height: 22px;
    font-size: 16px;
    font-weight: 500;
    padding-right: 8px;
    white-space: nowrap;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

.btn3 {
    border-radius: 15px;
    line-height: 10px;
    margin-top: 16px;
    color: #FF8200;
    margin-right: 10px;
    border: 2px solid #FF8200;
    width: 61px;
    height: 20px;
    background-color: white;
}

.btn3 :hover {
    background-color: #fe6d45;
}


#addImage {
    font-family: woo;
    font-style: normal;
    font-weight: 100;
    -webkit-box-orient: vertical;
    flex-direction: column;
    text-decoration: none;
    text-transform: none;
    display: inline-block;
    -webkit-box-align: center;
    line-height: 1;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: gray;
    font-size: 38px;
    font-weight: 100;
    top: auto;
    position: absolute;
}
</style>