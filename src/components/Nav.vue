<template>
    <div class="topNavigation">
      <div style="width:30%;height: 100%;display: flex;">
        <a href="#"><img id="weibo-icon" src="../assets/img/weibo.png"></a>
        <div style="width:220px">
          <form @mouseleave="stopSearch">
            <div style="border-radius:24px;margin-top: 14px;background-color: #fe6e45;height: 34px;display: flex;">
              <div>
                <span class="iconfont icon-sousuo icon"></span>
              </div>
              <div>
                <input type="text" id="input1" v-model="query" placeholder="搜索微博" @select="beginSearch" @click="beginSearch"
                  @input="beginSearch" @keyup.enter="search">
              </div>
            </div>
            <div v-show="searching && query != ''" class="search-result">
              <div class="search-tip" @click="weiboSearch">
                <div>
                  "{{ query.length > 6 ? query.substring(0, 6) + '...' : query }}"相关微博
                </div>
                <div>-></div>
              </div>
              <div class="topic-box" v-for="item of topicList" @click="getWeibo(item.content)">
                <i class="el-icon-search search-icon"></i>
                <div class="search-topic">{{item.content}}</div>
              </div>
              <div class="deliver"></div>
              <div class="search-tip" @click="userSearch">
                <div>
                  "{{ query.length > 6 ? query.substring(0, 6) + '...' : query }}"相关用户
                </div>
                <div>-></div>
              </div>
              <div class="search-user" v-for="item of userList" @click="getUser(item.id)">
                <img class="user-icon" :src="item.image" />
                <div class="user-name">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div v-show="searching && query == ''" class="search-result">
              <div class="tip">
                <div class="tip-title">最近搜索</div>
                <div><i class="el-icon-delete-solid icon-del" @click="delAll"></i></div>
              </div>
              <div style="text-align:center;padding:10px" v-show="history.length == 0">暂无数据</div>
              <div class="topic-box" v-for="item of history">
                <i class="el-icon-search search-icon"></i>
                <div class="search-topic search-delab">{{ item }}</div>
                <div><i class="el-icon-close icon-del" @click="delHistroy(item)"></i></div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div style="width:35%;height: 100%;">
        <div style="display:flex;width: 100%;height: 100%;">
          <router-link  class="a1 curr" to="/">
            <div class="div1">
              <div class="div2">
                <div class="div3">
                  <div class="el-icon-s-home icon"></div>
                </div>
              </div>
            </div>
          </router-link>
          <router-link  class="a1" to="/video">
            <div class="div1">
              <div class="div2">
                <div class="div3">
                  <div class="iconfont icon-shipin icon"></div>
                </div>
              </div>
            </div>
          </router-link>
          <router-link  class="a1" to="/hot">
            <div class="div1">
              <div class="div2">
                <div class="div3">
                  <div class="iconfont icon-retu icon"></div>
                </div>
              </div>
            </div>
          </router-link>
          <router-link  class="a1" to="/msg">
            <div class="div1">
              <div class="div2">
                <div class="div3">
                  <div class="el-icon-message icon"></div>
                </div>
              </div>
            </div>
          </router-link>
          <router-link v-if="userHeader != ''"  class="a1" :to="'/usr/' + userId">
            <div class="div1">
              <div class="div2">
                <div class="div3">
                  <img style="border-radius: 100%;
                                      width: 30px;
                                      height: 30px;
                                      margin-top: 4px;" :src="userHeader">
                </div>
              </div>
            </div>
          </router-link>
          <router-link :to="''" v-else @click.native="showdialog" class="a1">
            <div class="div1">
              <div class="div2">
                <div class="div3">
                  <div class="el-icon-user icon"></div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div style="width:35%;height: 100%;display: flex;">
        <div style="display: flex;">
          <div class="div4">
            <div class="div5">
              <div>
                <el-dropdown trigger="click" placement="top">
                  <span class="iconfont icon-shezhi btn1"></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>账号设置</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
          <div class="div4">
            <div class="div5">
              <span class="iconfont icon-taiyang btn1"></span>
            </div>
          </div>
          <div class="div4">
            <div class="div5">
              <span class="iconfont icon-bianji btn1"></span>
            </div>
          </div>
        </div>
        <div>
          <button class="btn2">无障碍</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import $ from 'jquery';
  const HISTORY = 'history';
  export default {
    name: 'TopNavigation',
    props: ['centerDialogVisible'],
    data() {
      return {
        query: '',
        searching: true,
        history: [],
        userList: [],
        topicList:[]
      }
    },
    computed: {
      userHeader() {
        let usericon = sessionStorage.getItem("userIconUrl");
        if (usericon) {
          return usericon;
        } else {
          return this.$store.state.userIconUrl;
        }
      },
      userId() {
        let userId = sessionStorage.getItem("userId");
        if (userId) {
          return userId;
        } else {
          return this.$store.state.userId;
        }
      }
    },
    created: function () {
      this.history = JSON.parse(localStorage.getItem(HISTORY)) || [];
    },
    methods: {
      getUser(id) {
        this.$router.push('/usr/' + id)
      },
      delAll() {
        localStorage.setItem(HISTORY, '[]');
        this.getHistory();
      },
      delHistroy(item) {
        let temp = JSON.parse(localStorage.getItem(HISTORY)) || [];
        temp.splice(temp.indexOf(item), 1);
        localStorage.setItem(HISTORY, JSON.stringify(temp));
        this.getHistory();
      },
      showdialog() {
        this.$emit('showdialog', true)
      },
      choose: function (event) {
        var curr = $(event.currentTarget);
        curr.siblings().removeClass("curr")
        curr.addClass("curr");
      },
      logout() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
          for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/microblog;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
            document.cookie = keys[i] + '=0;path=/microblog;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
            document.cookie = keys[i] + '=0;path=/microblog;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
          }
        }
        console.log('已清除');
        console.log(document.cookie)
        this.$store.commit('clearUser');
        this.$router.replace('/login');
      },
      search() {
        this.$router.push('/search?q=' + this.query);
      },
      storeHistory() {
        let inputValue = this.query.trim();
        let inputHis = JSON.parse(localStorage.getItem(HISTORY)) || [];
        //从这里开始
        if (inputValue || inputValue.length > 0) {
          // 用数组的includes()方法判定是否有重复数据
          if (inputHis.includes(inputValue)) {
            // 如果有,用splice删除指定元素,用indexOf获取对应删除元素的索引
            inputHis.splice(inputHis.indexOf(inputValue), 1);
            // 后再将搜索框的输入内容加到本地存储数组对象的最前面,这是为了后面好按顺序打印
            inputHis.unshift(inputValue);
            // 将输入好的数据用JSON.stringify()存回本地
            localStorage.setItem(HISTORY, JSON.stringify(inputHis));
          } else {
            // 如果没有重复,直接保存数据
            inputHis.unshift(inputValue);
            localStorage.setItem(HISTORY, JSON.stringify(inputHis));
          }
        }
        this.getHistory();
      },
      getHistory() {
        this.history = JSON.parse(localStorage.getItem(HISTORY)) || [];
      },
      weiboSearch() {
        this.stopSearch();
        this.storeHistory();
        this.$router.push('/search?q=' + this.query);
      },
      userSearch() {
        this.stopSearch();
        this.storeHistory();
        this.$router.push('/search?q=' + this.query + '&ref=user');
      },
      getWeibo(content){
        this.query=content
        this.$router.push('/search?q='+content);
      },
      beginSearch() {
        var that = this;
        if (this.query.trim != '') {
          this.$http.get('/user/name/' + this.query).then(res => {
            if (res.result) {
              that.userList = res.data;
            }
          }).catch(err => {
            console.error(err)
          })
  
          this.$http.get('/topic/name/' + this.query).then(res => {
            if (res.result) {
              that.topicList = res.data;
            }
          }).catch(err => {
            console.error(err)
          })
        }
        this.searching = true
      },
      stopSearch() {
        this.searching = false
      }
    }
  }
  </script>
  
  <style scoped>
  .search-delab {
    width: 150px;
  }
  
  .icon-del:hover {
    color: #fe6f45;
  }
  
  .icon-del {
    cursor: pointer;
  }
  
  .tip-title {
    width: 200px
  }
  
  #input1::-webkit-input-placeholder {
  
    color: wheat;
  
  }
  
  .tip {
    color: #939393;
    padding: 6px;
    display: flex;
  }
  
  .user-name {
    line-height: 34px;
    margin-left: 7px;
  }
  
  .search-user {
    display: flex;
    padding: 5px 22px;
    cursor: pointer;
  }
  
  .user-icon {
    width: 34px;
    height: 34px;
    border-radius: 100%;
  }
  
  .deliver {
    border-bottom: 1px solid #0000002b;
  }
  
  .topic-box {
    padding: 10px;
    display: flex;
    cursor: pointer;
  }
  
  .topic-box:hover,
  .search-user:hover {
    background-color: #f8f8fb;
  }
  
  .search-result {
    background-color: white;
    box-shadow: 1px 1px 1px 1px #00000033;
    border-radius: 2px;
  }
  
  .search-tip {
    display: inline-flex;
    padding: 14px 10px;
    cursor: pointer;
    color: #939393
  }
  
  .search-icon {
    line-height: 22px;
  }
  
  .search-topic {
    margin-left: 8px;
  }
  
  .curr {
    border-bottom: 4px solid gold;
  }
  
  .el-dropdown-link {
    cursor: pointer;
    color: #585858;
  }
  
  .el-dropdown-menu__item {
    width: 60px;
  }
  
  .el-dropdown-menu__item:hover {
    color: black !important;
    background-color: #f5f5f5 !important;
  }
  
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 0px;
  }
  
  /* * {
    margin: 0px;
    padding: 0px;
  } */
  
  a {
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: none;
  }
  
  .topNavigation {
    width: 100%;
    height: 60px;
    z-index: 2000;
    display: flex;
    position: sticky;
    top: 0px;
    background-color: #fe2501;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
    background-image: none;
    margin-bottom: 10px;
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
  
  .icon {
    line-height: 38px;
    font-size: 31px;
    color: wheat;
    text-decoration: none;
  }
  
  .a1 {
    width: 20%;
    text-align: center;
    text-decoration: none;
  }
  
  
  .div1 {
    display: flex;
    -webkit-box-align: center;
    height: 100%;
    -ms-flex-align: center;
    align-items: center;
    margin: 0 20px;
    justify-content: center;
    text-decoration: none;
  }
  
  .div2 {
    width: 100%;
    text-decoration: none;
  }
  
  .div2 :hover {
    background-color: #fe6f45;
    text-decoration: none;
  }
  
  .div3 {
    display: flex;
    justify-content: center;
    text-decoration: none;
    height: 38px;
    border-radius: 10px;
  }
  
  .div4 {
    margin-left: 10px;
  }
  
  .btn1 {
    border-style: none;
    border-radius: 20px;
    font-size: 20px;
    font-weight: lighter;
    background-color: transparent !important;
    color: #fae9d7;
  }
  
  .div5 {
    background-color: #fe6f45;
    border-radius: 30px;
    margin-left: 20px;
    line-height: 38px;
    width: 35px;
    height: 35px;
    text-align: center;
    margin-top: 13px;
    cursor: pointer;
  }
  
  
  .btn2 {
    margin-left: 101px;
    margin-top: 13px;
    border-style: none;
    background-color: #fe6e45;
    color: wheat;
    border-radius: 48px;
    height: 31px;
    width: 96px;
  }
  
  .btn2 :hover {
    color: #f5eeb3;
  }
  
  #text1 {
    margin: 0;
    padding: 10px 16px;
    line-height: 26px;
    font-size: 22px;
    font-weight: 500;
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
  }</style>
  