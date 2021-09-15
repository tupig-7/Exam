var utils = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    notice:"",
    skinStyle: "",
    skin: ["白天", "夜间"],
    skinModal: null,
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://windowleaf.cn/src/img/1.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://windowleaf.cn/src/img/2.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://windowleaf.cn/src/img/3.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://windowleaf.cn/src/img/4.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://windowleaf.cn/src/img/5.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://windowleaf.cn/src/img/6.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://windowleaf.cn/src/img/7.png'
    }],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    iconList: [{
      id: '1',
      icon: 'hotfill',
      color: 'red',
      badge: 120,
      name: '刷题'
    }, {
      id: '2',
      icon: 'medalfill',
      color: 'orange',
      badge: 1,
      name: '小瓶子'
    }, {
      id: '3',
      icon: 'formfill',
      color: 'yellow',
      badge: 0,
      name: '单词'
    }, {
      id: '4',
      icon: 'noticefill',
      color: 'olive',
      badge: "2w+",
      name: '调剂信息'
    }, {
      id: '5',
      icon: 'discoverfill',
      color: 'cyan',
      badge: 0,
      name: '资料列表'
    }, {
      id: '6',
      icon: 'lightfill',
      color: 'purple',
      badge: 0,
      name: '国家线'
    }, {
      id: '7',
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '国家线'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
    gridCol: 3,

    targetTime1: 0,
    myFormat1: ['天', '时', '分', '秒'],
    today: ""
  },
  onLoad() {
    
    const that = this
    wx.request({
      url: 'https://windowleaf.cn/data/words/notice.json',
      success: function (res) {
        that.setData({
          "notice": res.data.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    setInterval(function() {
      that.setData({
        today: utils.formatTime(new Date),
        skinStyle: app.globalData.skin
      })
    }, 1000);
    this.setData({
      targetTime1: new Date("2021-12-25 08:00:00").getTime()
    });
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },

  /**
   * 跳转链接
   */
  step: function(e) {
    const id = e.currentTarget.dataset.id;
    switch (id) {
      case '1':
        wx.navigateTo({
          url: '/pages/start/start',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        break
      case '2':
        wx.navigateTo({
          url: '/pages/bottle/bottle',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        break
      case '3':
        wx.navigateTo({
          url: '/pages/book/book',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        break
      case '4':
        wx.navigateTo({
          url: '/pages/adjust/adjust',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        break
      case '5':
        wx.navigateTo({
          url: '/pages/resource/resource',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        break
      case '6':
        //this.showSkinModal()
        wx.navigateTo({
          url: '/pages/scoreLine/scoreLine',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        break
      default:
        this.showModal(e)

    }
    console.log(id)
  },

  /**
   * 显示提示框
   */
  showModal(e) {
    console.log('错误')
    this.setData({
      modalName: 'Modal'
    })
  },

  /**
   * 隐藏提示框
   */
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  /**
   * 显示皮肤模态框
   */
  showSkinModal: function() {
    this.setData({
      skinModal: "skinModal"
    })
  },

  /**
   * 隐藏皮肤模态框
   */
  hideSkinModal: function() {
    this.setData({
      skinModal: ""
    })
  },

  /**
   * 分享页面
   */
  onShareAppMessage: function() {
    return {
      title: "听说我在偷偷学习",
      path: "pages/home/home",

    }
  },

  /**
   * 设置夜间模式等
   */
  switchStyle: function(e) {
    var that = this
    console.log(e)
    //设置全局变量
    if (e.detail.value == true) {
      app.globalData.skin = "dark"
    } else {
      app.globalData.skin = ""
    }
    that.setData({
      skinStyle: app.globalData.skin
    })
    //保存到本地
    wx.setStorage({
      key: "skin",
      data: app.globalData.skin
    })
  },

  /**
   * 获取皮肤属性
   */
  getSkin: function() {
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res) {
        that.globalData.skin = res.data
      }
    })
  }
})