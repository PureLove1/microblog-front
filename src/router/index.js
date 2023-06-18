import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import LeftNav from '@/components/LeftNav.vue'
import Main from '@/components/Main'
import Right from '@/components/Right'
import UserInfo from '@/components/UserInfo'
import NotFound from '@/components/NotFound'
import UserMessage from '@/components/UserMessage'
import BlogLoading from '@/components/BlogLoading'
import Message from '@/components/Message'
import Session from '@/components/Session'
import Search from '@/components/Search'
import FollowAndFans from '@/components/FollowAndFans'
import FollowList from '@/components/FollowList'
import Blog from '@/components/Blog'
import UserList from '@/components/UserList'
import UserSetting from '@/components/UserSetting'
import SetPassword from '@/components/SetPassword'
import VideoIndex from '@/components/VideoIndex'
import Video from '@/components/Video'
import VideoUpload from '@/components/VideoUpload'
import Show from '@/components/Show'
import VideoAdvice from '@/components/VideoAdvice'
import HotSearchList from '@/components/HotSearchList'
import Register from '@/components/Register'
import Retrieve from '@/components/Retrieve'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'link-active',
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          name: 'index',
          path: '',
          components: {
            left: LeftNav,
            default: Main,
            right: Right
          },
          props: {
            left: {
              //导航标题
              navTitle: '首页',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '全部关注',
                //链接路由
                link: '/index'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '最新微博',
                link: '/newest'
              }
              ],
              addition: undefined
            },
            default: {
              query: '',
              tabList: [
                { text: '全部', link: '/index' },
                { text: '原创', link: '/&original' },
                { text: '视频', link: '/&video' }
              ],
              display: true,
              showInput: true
            }
          }
        }
      ]
    },
    {
      path: '/&video',
      component: Index,
      children: [
        {
          name: '&video',
          path: '',
          components: {
            left: LeftNav,
            default: Main,
            right: Right
          },
          props: {
            left: {
              //导航标题
              navTitle: '首页',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '全部关注',
                //链接路由
                link: '/index'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '最新微博',
                link: '/newest'
              }
              ],
              addition: undefined
            },
            default: {
              query: '',
              tabList: [
                { text: '全部', link: '/index' },
                { text: '原创', link: '/&original' },
                { text: '视频', link: '/&video' }
              ],
              display: true,
              showInput: true
            }
          }
        }
      ]
    }, ,
    {
      path: '/&original',
      component: Index,
      children: [
        {
          name: '&original',
          path: '',
          components: {
            left: LeftNav,
            default: Main,
            right: Right
          },
          props: {
            left: {
              //导航标题
              navTitle: '首页',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '全部关注',
                //链接路由
                link: '/index'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '最新微博',
                link: '/newest'
              }
              ],
              addition: undefined
            },
            default: {
              query: '',
              tabList: [
                { text: '全部', link: '/index' },
                { text: '原创', link: '/&original' },
                { text: '视频', link: '/&video' }
              ],
              display: true,
              showInput: true
            }
          }
        }
      ]
    },
    {
      path: '/set',
      name: 'set',
      component: Index,
      children: [
        {
          path: 'index',
          components: {
            left: LeftNav,
            default: UserSetting,
            right: Right
          },
          props: {
            left: {
              //导航标题
              navTitle: '设置',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '编辑资料',
                //链接路由
                link: '/set/index'
              }, {
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '修改密码',
                //链接路由
                link: '/set/password'
              }
              ],
              addition: undefined
            }
          }
        }, {
          path: 'password',
          components: {
            left: LeftNav,
            default: SetPassword,
            right: Right
          },
          props: {
            left: {
              //导航标题
              navTitle: '设置',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '编辑资料',
                //链接路由
                link: '/set/index'
              }, {
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '修改密码',
                //链接路由
                link: '/set/password'
              }
              ],
              addition: undefined
            }
          }
        }
      ]
    },
    {
      path: '/search',
      component: Index,
      children: [
        {
          name: 'search',
          path: '',
          components: {
            left: LeftNav,
            default: Search,
            right: Right
          },
          props: {
            left: route => ({
              //导航标题
              navTitle: '搜索结果',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '综合',
                //链接路由
                link: '/search?q=' + route.query.q
              }, {
                icon: 'iconfont icon-xingxing',
                text: '用户',
                link: '/user?q=' + route.query.q + '&ref=user'
              }, {
                icon: 'iconfont icon-guanzhu',
                text: '话题',
                link: '/topic?q=' + route.query.q + '&ref=topic'
              }
              ],
              addition: undefined
            })
          }
        }
      ]
    },
    {
      path: '/user',
      component: Index,
      children: [{
        name: 'user',
        path: 'name',
        components: {
          left: LeftNav,
          default: UserList,
          right: Right
        },
        props: {
          left: route => ({
            //导航标题
            navTitle: '搜索结果',
            navGroup: [{
              //导航图标
              icon: 'iconfont icon-liebiao',
              //文本
              text: '综合',
              //链接路由
              link: '/search?q=' + route.query.q
            }, {
              icon: 'iconfont icon-xingxing',
              text: '用户',
              link: '/user?q=' + route.query.q + '&ref=user'
            }, {
              icon: 'iconfont icon-guanzhu',
              text: '话题',
              link: '/topic?q=' + route.query.q + '&ref=topic'
            }
            ],
            addition: undefined
          }),
          default: route => ({
            tabList: [
              { link: '/user?q=' + route.query.q + '&ref=user', text: '全部' },
              { link: '/user/name?q=' + route.query.q, text: '昵称' },
              { link: '/user/introduce?q=' + route.query.q, text: '简介' }
            ]
          })
        }
      }, {
        path: 'introduce',
        components: {
          left: LeftNav,
          default: UserList,
          right: Right
        },
        props: {
          left: route => ({
            //导航标题
            navTitle: '搜索结果',
            navGroup: [{
              //导航图标
              icon: 'iconfont icon-liebiao',
              //文本
              text: '综合',
              //链接路由
              link: '/search?q=' + route.query.q
            }, {
              icon: 'iconfont icon-xingxing',
              text: '用户',
              link: '/user?q=' + route.query.q + '&ref=user'
            }, {
              icon: 'iconfont icon-guanzhu',
              text: '话题',
              link: '/topic?q=' + route.query.q + '&ref=topic'
            }
            ],
            addition: undefined
          }),
          default: route => ({
            tabList: [
              { link: '/user?q=' + route.query.q + '&ref=user', text: '全部' },
              { link: '/user/name?q=' + route.query.q, text: '昵称' },
              { link: '/user/introduce?q=' + route.query.q, text: '简介' }
            ]
          })
        }
      },
      {
        path: '',
        components: {
          left: LeftNav,
          default: UserList,
          right: Right
        },
        props: {
          left: route => ({
            //导航标题
            navTitle: '搜索结果',
            navGroup: [{
              //导航图标
              icon: 'iconfont icon-liebiao',
              //文本
              text: '综合',
              //链接路由
              link: '/search?q=' + route.query.q
            }, {
              icon: 'iconfont icon-xingxing',
              text: '用户',
              link: '/user?q=' + route.query.q + '&ref=user'
            }, {
              icon: 'iconfont icon-guanzhu',
              text: '话题',
              link: '/topic?q=' + route.query.q + '&ref=topic'
            }
            ],
            addition: undefined
          }),
          default: route => ({
            tabList: [
              { link: '/user?q=' + route.query.q + '&ref=user', text: '全部' },
              { link: '/user/name?q=' + route.query.q, text: '昵称' },
              { link: '/user/introduce?q=' + route.query.q, text: '简介' }
            ]
          })
        }
      }
      ]
    },
    {
      path: '/topic',
      component: Index,
      children: [
        {
          name: 'topic',
          path: '',
          components: {
            left: LeftNav,
            default: Search,
            right: Right
          },
          props: {
            left: route => ({
              //导航标题
              navTitle: '搜索结果',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '综合',
                //链接路由
                link: '/search?q=' + route.query.q
              }, {
                icon: 'iconfont icon-xingxing',
                text: '用户',
                link: '/user?q=' + route.query.q + '&ref=user'
              }, {
                icon: 'iconfont icon-guanzhu',
                text: '话题',
                link: '/topic?q=' + route.query.q + '&ref=topic'
              }
              ],
              addition: undefined
            })
          }
        }
      ]
    },
    {
      path: '/video',
      component: VideoIndex,
      children: [
        {
          name: 'video',
          path: '',
          components: {
            left: LeftNav,
            right: Video
          },
          props: {
            left: route => ({
              //导航标题
              navTitle: '视频',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '推荐',
                //链接路由
                link: '/video'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '关注',
                link: '/fvideo'
              }, {
                icon: 'iconfont icon-guanzhu',
                text: '历史记录',
                link: '/history'
              }
              ],
              addition: undefined
            }),
            right: { title: '推荐视频' }
          }
        }
      ]
    },
    {
      path: '/history',
      component: VideoIndex,
      children: [
        {
          name: 'history',
          path: '',
          components: {
            left: LeftNav,
            right: Video
          },
          props: {
            left: route => ({
              //导航标题
              navTitle: '视频',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '推荐',
                //链接路由
                link: '/video'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '关注',
                link: '/fvideo'
              }, {
                icon: 'iconfont icon-guanzhu',
                text: '历史记录',
                link: '/history'
              }
              ],
              addition: undefined
            }),
            right: { title: '历史记录' }
          }
        }
      ]
    },
    {
      path: '/fvideo',
      component: VideoIndex,
      children: [
        {
          path: '',
          name: 'fvideo',
          components: {
            left: LeftNav,
            right: Video
          },
          props: {
            left: route => ({
              //导航标题
              navTitle: '视频',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '推荐',
                //链接路由
                link: '/video'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '关注',
                link: '/fvideo'
              }, {
                icon: 'iconfont icon-guanzhu',
                text: '历史记录',
                link: '/history'
              }
              ],
              addition: undefined
            }),
            right: { title: '关注' }
          }
        }
      ]
    },
    {
      path: '/show',
      name: 'show',
      component: VideoIndex,
      children: [
        {
          path: ':id',
          components: {
            left: Show,
            right: VideoAdvice
          },
          props:{
            left:true,
            right:true
          }
        }
      ]
    },
    {
      path: '/blog/',
      name: 'blog',
      component: Index,
      children: [
        {
          path: ':id',
          components: {
            left: LeftNav,
            default: Blog,
            right: Right
          },
          props: {
            left: {
              //导航标题
              navTitle: '首页',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '全部关注',
                //链接路由
                link: '/'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '最新微博',
                link: '/newest'
              }
              ],
              addition: undefined
            },
            default: true
          }
        }
      ]
    },
    {
      path: '/newest',
      component: Index,
      children: [
        {
          name: 'newest',
          path: '',
          components: {
            left: LeftNav,
            default: Main,
            right: Right
          },
          props: {
            left: {
              //导航标题
              navTitle: '首页',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '全部关注',
                //链接路由
                link: '/index'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '最新微博',
                link: '/newest'
              }
              ],
              addition: undefined
            },
            default: {
              query: 'newest',
              tabList: null,
              display: false,
              showInput: true
            }
          }
        }
      ]
    },
    {
      path: '/special',
      component: Index,
      children: [
        {
          name: 'special',
          path: '',
          components: {
            left: LeftNav,
            default: Main,
            right: Right
          },
          props: {
            left: {
              //导航标题
              navTitle: '首页',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '全部关注',
                //链接路由
                link: '/index'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '最新微博',
                link: '/newest'
              }
              ],
              addition: undefined
            },
            default: {
              query: '',
              tabList: [
                { text: '全部', link: '' },
                { text: '原创', link: '' },
                { text: '视频', link: '' },
                { text: 'V+微博', link: '' },
                { text: '群微博', link: '' },
              ],
              display: true,
              showInput: true
            }
          }
        }
      ]
    },
    {
      path: '/friend',
      component: Index,
      children: [
        {
          name: 'friend',
          path: '',
          components: {
            left: LeftNav,
            default: Main,
            right: Right
          },
          props: {
            left: {
              //导航标题
              navTitle: '首页',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '全部关注',
                //链接路由
                link: '/index'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '最新微博',
                link: '/newest'
              }
              ],
              addition: undefined
            },
            default: {
              query: '',
              tabList: [
                { text: '全部', link: '' },
                { text: '原创', link: '' },
                { text: '视频', link: '' },
                { text: 'V+微博', link: '' },
                { text: '群微博', link: '' },
              ],
              display: true,
              showInput: true
            }
          }
        }
      ]
    },
    {
      path: '/usr',
      component: Index,
      children: [{
        path: ':id',
        components: {
          left: LeftNav,
          default: UserInfo,
          right: Right
        },
        props: {
          left: route => (route.params.id == sessionStorage.getItem('userId') ? {
            //导航标题
            navTitle: '个人主页',
            navGroup: [{
              //导航图标
              icon: 'iconfont icon-liebiao',
              //文本
              text: '我的主页',
              //链接路由
              link: '/usr/' + route.params.id
            }, {
              icon: 'iconfont icon-xingxing',
              text: '我的关注',
              link: '/follow/' + route.params.id
            }, {
              icon: 'iconfont icon-guanzhu',
              text: '我的粉丝',
              link: '/follow/fan/' + route.params.id
            }
            ]
          } : {
            //导航标题
            navTitle: '首页',
            navGroup: [{
              //导航图标
              icon: 'iconfont icon-liebiao',
              //文本
              text: '全部关注',
              //链接路由
              link: '/'
            }, {
              icon: 'iconfont icon-xingxing',
              text: '最新微博',
              link: '/newest'
            }, {
              icon: 'iconfont icon-guanzhu',
              text: '特别关注',
              link: '/special'
            }, {
              icon: 'iconfont icon-quanzi',
              text: '好友圈',
              link: '/friend'
            }
            ],
            addition: {
              showBtn: true,
              arr: {
                icon: 'iconfont icon-dian',
                title: '自定义分组',
                tl: [{
                  text: '同学',
                  link: ''
                }, {
                  text: '名人明星',
                  link: ''
                }, {
                  text: '同事',
                  link: ''
                }, {
                  text: '悄悄关注',
                  link: ''
                }
                ],
              }
            }
          }),
          default: true
        }
      }, {
        path: '*',
        components: {
          left: LeftNav,
          default: NotFound,
          right: Right
        },
        props: {
          left: {
            //导航标题
            navTitle: '首页',
            navGroup: [{
              //导航图标
              icon: 'iconfont icon-liebiao',
              //文本
              text: '全部关注',
              //链接路由
              link: '/'
            }, {
              icon: 'iconfont icon-xingxing',
              text: '最新微博',
              link: '/newest/'
            }, {
              icon: 'iconfont icon-guanzhu',
              text: '特别关注',
              link: '/special/'
            }, {
              icon: 'iconfont icon-quanzi',
              text: '好友圈',
              link: '/friend/'
            }
            ],
            addition: {
              showBtn: true,
              arr: {
                icon: 'iconfont icon-dian',
                title: '自定义分组',
                tl: [{
                  text: '同学',
                  link: ''
                }, {
                  text: '名人明星',
                  link: ''
                }, {
                  text: '同事',
                  link: ''
                }, {
                  text: '悄悄关注',
                  link: ''
                }
                ],
              }
            }
          }
        }
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/msg',
      name: 'message',
      component: Message
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/retrieve',
      name: 'retrieve',
      component: Retrieve
    },
    {
      path: '/load',
      name: 'load',
      component: BlogLoading
    },
    {
      path: '/follow/',
      name: 'follow',
      component: Index,
      children: [{
        path: ':id',
        components: {
          left: LeftNav,
          default: FollowAndFans,
          right: Right
        },
        props: {
          left: route => ({
            //导航标题
            navTitle: '个人主页',
            navGroup: [{
              //导航图标
              icon: 'iconfont icon-liebiao',
              //文本
              text: '我的主页',
              //链接路由
              link: '/usr/' + route.params.id
            }, {
              icon: 'iconfont icon-xingxing',
              text: '我的关注',
              link: '/follow/' + route.params.id
            }, {
              icon: 'iconfont icon-guanzhu',
              text: '我的粉丝',
              link: '/follow/fan/' + route.params.id
            }
            ]
          })
        }
      }, {
        path: 'fan/:id',
        components: {
          left: LeftNav,
          default: FollowAndFans,
          right: Right
        },
        props: {
          left: route => ({
            //导航标题
            navTitle: '个人主页',
            navGroup: [{
              //导航图标
              icon: 'iconfont icon-liebiao',
              //文本
              text: '我的主页',
              //链接路由
              link: '/usr/' + route.params.id
            }, {
              icon: 'iconfont icon-xingxing',
              text: '我的关注',
              link: '/follow/' + route.params.id
            }, {
              icon: 'iconfont icon-guanzhu',
              text: '我的粉丝',
              link: '/follow/fan/' + route.params.id
            }
            ]
          })
        }
      }]
    },
    {
      path: '/session',
      name: 'session',
      component: Session
    },
    {
      path: '/hot',
      component: Index,
      children: [
        {
          name: 'hot',
          path: '',
          components: {
            left: LeftNav,
            default: Main,
            right: Right
          },
          props: {
            left: {
              //导航标题
              navTitle: '热门',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '热门微博',
                //链接路由
                link: '/hot'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '热门话题',
                link: '/newest'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '热搜榜',
                link: '/hotSearch'
              }
              ],
              addition: undefined
            }
          }
        }
      ]
    },
    {
      path: '/hotSearch',
      component: Index,
      children: [
        {
          name: 'hotSearch',
          path: '',
          components: {
            left: LeftNav,
            default: HotSearchList,
            right: Right
          },
          props: {
            left: {
              //导航标题
              navTitle: '热门',
              navGroup: [{
                //导航图标
                icon: 'iconfont icon-liebiao',
                //文本
                text: '热门微博',
                //链接路由
                link: '/hot'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '热门话题',
                link: '/newest'
              }, {
                icon: 'iconfont icon-xingxing',
                text: '热搜榜',
                link: '/hotSearch'
              }
              ],
              addition: undefined
            }
          }
        }
      ]
    },
    {
      path: '/upload',
      name: 'upload',
      component: VideoUpload
    },
    {
      path: '/**',
      name: 'notfound',
      component: NotFound
    }
  ]
})


