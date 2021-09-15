// component/cardList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    adjust: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 分享卡片
     */
    onShareAppMessage: function() {
      return {
        title: "调剂速度上车",
        path: "pages/adjust/adjust",
      }
    },

    /**
     * 复制到剪切板
     */
    copy: function(e) {
      const data = e.target.dataset.text
      wx.setClipboardData({
        data: data,
        success: function(res) {
          wx.showToast({
            title: '复制成功',
          })
        }
      })
    }
  }
})
