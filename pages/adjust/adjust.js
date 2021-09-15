// pages/adjust/adjust.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    drawer: null,
    city: [{
      level: "A区",
      cityName: ["北京", "天津", "河北", "山西", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "重庆", "四川", "陕西"]
    },
    {
      level: "B区",
      cityName: ["内蒙古", "广西", "海南", "贵州", "云南", "西藏", "甘肃", "青海", "宁夏", "新疆"]
    }],
    show: null,
    topNum: 0,
    adjust: [],
    adjustNo: 0,
    adjustNum: 0,
    searchValue: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '调剂信息',
    })
    const that = this
    try {
      that.getAdjust(0)
    } catch (e) {

    }

  },

  /**
   * 获取新的调剂数据
   */
  getAdjust: function(start) {
    const that = this
    const end = this.data.adjustNo + 10
    wx.request({
      url: 'https://windowleaf.cn/data/words/adjustList.php', //仅为示例，并非真实的接口地址
      data: {
        'start': start
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          adjustNo: 0
        })
        if (res.data.adjustRes.length != 0) {
          //下一页的数据拼接在原有数据后面
          that.setData({
            adjust: that.data.adjust.concat(res.data.adjustRes),
            adjustNo: end,
            loading: false
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '已无更多数据',
          })
        }
        
      }
    })
  },

  /**
   * 显示和隐藏侧边抽屉
   */
  showDrawer(e) {
    console.log("显示")
    this.setData({
      drawer: "show"
    })
  },
  hideDrawer(e) {
    console.log("隐藏")
    this.setData({
      drawer: null
    })
  },

  /**
   * 设置搜索内容
   */
  setSearchValue: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  /**
   * 搜索信息
   */
  search: function(e) {
    const that = this
    that.setData({
      show: "show"
    })
    wx.request({
      url: 'https://windowleaf.cn/backend/words/adjust.php', //仅为示例，并非真实的接口地址
      data: {
        searchValue: that.data.searchValue
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        that.setData({
          adjust: res.data.adjustRes
        })

        that.setData({
          show: "null"
        })
      }
    })

  
  },

  //到达底部
  scrollToLower: function(e) {
    console.log("到达底部")
    if (!this.data.loading) {
      this.setData({
        loading: true,
      })
      console.log(this.data.adjustNo)
      this.getAdjust(this.data.adjustNo);
    }
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    console.log("下拉刷新")
    this.getAdjust(0)
    wx.stopPullDownRefresh()
  },

  //回到顶部
  toTop: function(e) {
    this.setData({
      topNum: 0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "调剂速度上车",
      path: "pages/adjust/adjust",
    }
  },
})