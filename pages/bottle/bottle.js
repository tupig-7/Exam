// pages/bottle/bottle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 'normal',
    iconList: [{
      id: '1',
      icon: 'https://windowleaf.cn/src/img/bottle.png',
      color: 'red',
      badge: 0,
      name: '猫'
    },{
        id: '2',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '狗'
      }, {
        id: '3',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '喜欢的食物'
      }, {
        id: '4',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '喜欢的人'
      }, {
        id: '5',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '和好朋友打电话'
      }, {
        id: '6',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '雨天'
      }, {
        id: '7',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '晴天'
      }, {
        id: '8',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '看电影'
      }, {
        id: '9',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '找到感兴趣的东西'
      }, {
        id: '10',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '大海'
      }, {
        id: '11',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '森林'
      }, {
        id: '12',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '碳酸饮料'
      }, {
        id: '13',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '小孩子'
      }, {
        id: '14',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '拿到好成绩'
      }, {
        id: '15',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '被夸赞'
      }, {
        id: '16',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '旅行'
      }, {
        id: '17',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '见到很久没见到的朋友'
      }, {
        id: '18',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '礼物'
      }, {
        id: '19',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '挑选礼物'
      }, {
        id: '20',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '收到亲笔贺卡/信'
      }, {
        id: '21',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '巧克力'
      }, {
        id: '21',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '意外找到口袋里的钱'
      }, {
        id: '23',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '芝士'
      }, {
        id: '24',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '花'
      }, {
        id: '25',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '雪'
      }, {
        id: '26',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '奶茶'
      }, {
        id: '27',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '火锅'
      }, {
        id: '28',
        icon: 'https://windowleaf.cn/src/img/bottle.png',
        color: 'red',
        badge: 0,
        name: '垃圾食品'
      }],
    gridCol: 4,
    gridBorder: true,
    skin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const iconList = this.data.iconList;
    //如果缓存中已经有瓶子，先获取本地瓶子
    wx.getStorage({
      key: 'iconList',
      success: function(res) {
        that.data.iconList = res.data;
      },
    })
    
    wx.setNavigationBarTitle({
      title: '快乐源泉小瓶子',
    })

  //设置缓存
    wx.setStorage({
      key: 'iconList',
      data: iconList,
    })
  },

  /**
   * 修改进度条
   */
  handleAdd(e) {
    const id = e.currentTarget.dataset.id - 1;
    const that = this;
    const iconList = this.data.iconList;
    if (this.data.iconList[id].badge === 100) return;
    iconList[id].badge += 1;
    this.setData({
      iconList: iconList
    });
    //设置缓存
    wx.setStorage({
      key: 'iconList',
      data: iconList,
    })
    if (this.data.iconList[id].badge === 100) {
      this.setData({
        status: 'success'
      });
    }
  },
  handleReduce(e) {
    
    const id = e.currentTarget.dataset.id - 1;
    if (this.data.iconList[id].badge === 0) return;
    const that = this;
    const iconList = this.data.iconList;
    iconList[id].badge -= 1;
    this.setData({
      iconList: iconList,
      status: 'normal'
    });
    //设置缓存
    wx.setStorage({
      key: 'iconList',
      data: iconList,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "这是一个神奇的小瓶子",
      path: "pages/bottle/bottle",
      
    }
  },
})