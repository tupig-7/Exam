// pages/start/start.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    angle: 0,
    status: false, //是否通过审核
    remind: true,
    checkUser: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      uid = app.globalData.uid
      setTimeout(function () {
        that.setData({
          remind: false
        });
      }, 1500);
    } else {
      wx.request({
        url: app.globalData.url + '/routine/auth_api/get_user_info',
        method: 'get',
        dataType: 'json',
        data: {
          uid: uid,
        },
        success: function (res) {
          that.setData({
            userInfo: res.data.data,
            remind: ''
          });
          wx.setStorageSync('userInfo', res.data.data)
          app.globalData.uid = res.data.data.uid;
        }
      })
    }

    this.setData({
      uid: uid,
      userInfo: wx.getStorageSync('userInfo')
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
    var that = this;
  },

  //获取用户信息并授权
  bindgetuserinfo: function (e) {
    wx.showLoading({
      title: '授权中',
    })
    var that = this;
    wx.getUserInfo({
      lang: 'zh_CN',
      success: function (res) {
        var userInfo = res.userInfo
        wx.login({
          success: function (res) {
            if (res.code) {
              userInfo.code = res.code;
              userInfo.spid = app.globalData.spid;
              wx.request({
                url: app.globalData.url + '/routine/login/index',
                method: 'post',
                dataType: 'json',
                data: {
                  info: userInfo
                },
                success: function (res) {
                  wx.hideLoading();
                  
                  wx.setStorageSync('uid', res.data.data.uid);
                  app.globalData.uid = res.data.data.uid;
                  app.globalData.openid = res.data.data.routine_openid;
                  that.setData({
                    userInfo: res.data.data
                  });
                }
              })
            } else {
             
              wx.hideLoading();
            }
          }
        });
      }
    })
  },

  goSign: function () {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    });
    var uid = app.globalData.uid;
    
    if (this.data.userInfo.avatarUrl == undefined || this.data.userInfo.avatarUrl == '') {
      wx.redirectTo({
        url: '/pages/course/course',
      })
      return
    }
    that.startInit();
    wx.hideLoading();
  },
  startInit() {
    var course = wx.getStorageSync('course');
    if (course)
      wx.switchTab({
        url: "../index/index"
      })
    else
      wx.redirectTo({
        url: '/pages/course/course',
      })
  }

})