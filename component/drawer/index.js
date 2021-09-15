// component/drawer/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    city:null,
    modalName:null
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
    hideDrawer(e) {
      console.log("隐藏")
      this.setData({
        drawer: null
      })
    }
  }
})
