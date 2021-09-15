// pages/bookList/bookList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCur: 0,
    scrollLeft: 0,
    list: ["未选", "已选", "全部"],
    listNum: [3108, 562, 5012],
    radioList: ["章节", "词频", "字母"],
    rl_index: 0,
    hidden: true,
    chapter:[],
    chapterList:[]
  },

  /**
     * 切换页面
     */
  tabSelect(e) {
    this.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  //显示设置
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  //隐藏设置
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  //将单词按照选定的排序
  sortedBy: function (e) {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://windowleaf.cn/data/words/2020%E6%81%8B%E6%81%8B%E6%9C%89%E8%AF%8D.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        var wordList = res.data["words"]
        var chapter = []
        var chapterList = []
        var k = -1
        var num = 0
        for(var i = 0; i < wordList.length; i++) {
          if (wordList[i][0] == "#") { //判断是否是章节名
            k++
            chapter.push(wordList[i].substring(1))
            chapterList[k] = []
          } else {
            num++
            chapterList[k].push(wordList[i])
          }
        }
        that.setData({
          chapter: chapter,
          chapterList, chapterList
        })
      }
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

  }
})