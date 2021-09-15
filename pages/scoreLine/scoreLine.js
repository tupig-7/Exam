// pages/scoreLine/scoreLine.js
const app = getApp()
// 1、引入依赖脚本
const wxCharts = require('../../dist/wxcharts-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list1: [
      "哲学",
      "经济学", "法学",
      "教育学（不含体育学）",
      "文学", "历史学",
      "理学",
      "工学（不含工学照顾专业）",
      "农学",
      "医学（不含中医类照顾专业）",
      "军事学",
      "管理学",
      "艺术学",
      "体育学",
      "工学照顾专业",
      "享受少数民族照顾政策的考生"
    ],
    list2: [
      "金融、应用统计、税务、国际商务、保险、资产评估",
      "审计",
      "法律(非法学)、法律(法学)、社会工作、警务",
      "教育、汉语国际教育",
      "应用心理",
      "体育",
      "翻译、新闻与传播、出版",
      "文物与博物馆",
      "建筑学、工程(不含工程照顾领域)、城市规划",
      "农业、兽医、风景园林、林业",
      "临床医学(不含临床医学照顾专业)、口腔医学、公共卫生、护理、药学、中药学临床医学中医类照顾专业*",
      "工商管理、公共管理、会计、旅游管理、图书情报、工程管理",
      "艺术",
      "工程照顾领域*",
      "享受少数民族政策的考生*"
    ],
    load: true,
    current: "x",
    x: true,
    z: false,
    index:0,
    list:[],
    show: null,
    modalName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      "show":"show"
    })
    wx.setNavigationBarTitle({
      'title': '学硕国家线'
    });
    let that = this
    wx.request({
      url: 'https://windowleaf.cn/data/words/scoreLine.json',
      success: function(res) {
        console.log(res.data)
        wx.setStorage({
          key: 'data',
          data: res.data,
        })
        that.setData({
          "list": res.data.data1
        });
        that.setData({
          "show": null
        })
      }
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
   
  },
  handleChange(e) {
    let index = e.detail.key;
    let data = wx.getStorageSync("data");
    if (index == "x") {
      wx.setNavigationBarTitle({
        'title': '学硕国家线'
      });

      this.setData({
        'current': index,
        'x': true,
        'z': false,
        "list":data.data1
      })
    } else if (index == "z") {
      wx.setNavigationBarTitle({
        title: '专硕国家线'
      });
      this.setData({
        'current': index,
        'x': false,
        'z': true,
        "list": data.data2
      });
    }
  },
  /**绘制折线图 */
   showModal:function(e) {
     let data = e.currentTarget.dataset
     let a = data.a;
     let b = data.b;
     console.log(data)
     console.log()
     this.setData({
       "modalName":"Modal",
     })
     new wxCharts({
       canvasId: 'lineCanvas',
       type: 'line',
       categories: ['2015', '2016', '2017', '2018', '2019', '2020'],
       dataLabel:false,
       series: [{
         name: 'A区',
         data: a
       }, {
         name: 'B区',
         data: b
       }],
       yAxis: {
         title: '国家线变化图',
         min: 100
       },
       width: 320,
       height: 200
     });
   },
  /**绘制折线图 */
  hideModal: function (e) {
    const ctx = wx.createCanvasContext('lineCanvas')

    this.setData({
      "modalName": ''
    })
    ctx.draw()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "历年国家线",
      path: "pages/scoreLine/scoreLine",
    }
  }
})