//app.js
var t = require('./utils/question.js');

App({
  onLaunch: function () {
    var category = wx.getStorageSync('category');
    if(category){
      t.initAllQuestionFromStorage('q_'+category.id,'qid_'+category.id)
    }
  },
  globalData: {
    userInfo: null,
    url:'https://question.windowleaf.cn',
    uid: 0,
    openid: '',
    spid: 0,
    urlImages: '',
    skin: ""
  },
  info: !1,
  setIdsStroage: function (e, t, n, i) {
    console.log(t)
    wx.getStorage({
      key: e + "" + t,
      success: function (o) {
        for (var s = o.data, r = [], c = 0; c < s.length; c++) r.push(Object.keys(s[c]).toString());
        console.log(r)
        if (r.indexOf(n.toString()) > -1)
          for (c = 0; c < s.length; c++) Object.keys(s[c]).indexOf(n) > -1 && -1 == s[c][n].indexOf(i) && s[c][n].push(i);
        else {
          var a = {};
          a[n] = [], a[n].push(i), s.push(a);
        }
        wx.setStorage({
          key: e + "" + t,
          data: s
        });
      }, fail: function () {
        var o = [], s = {};
        s[n] = [], s[n].push(i), o.push(s), wx.setStorage({
          key: e + "" + t,
          data: o
        });
      }
    })
  },
  removeids: function(e,c,n) {
    wx.getStorage({
      key: e + "" + c,
      success: function (t) {
        for (var i = t.data, o = 0; o < i.length; o++) if (i[o][Object.keys(i[o]).toString()].indexOf(n) > -1) {
          var s = i[o][Object.keys(i[o]).toString()].indexOf(n);
          i[o][Object.keys(i[o]).toString()].splice(s, 1), 0 == i[o][Object.keys(i[o]).toString()].length && i.splice(o, 1);
        }
        wx.setStorage({
          key: e + "" + c,
          data: i
        });
      }
    });
  },
  saveInfo: function(e,t,n){
    wx.getStorage({
      key: e + "" + t,
      success: function(e){
        var t = e.data;
        getApp().info = !1;
        for (var i = 0; i < t.length; i++) if (t[i][Object.keys(t[i]).toString()].indexOf(n) > -1) return console.log(t[i][Object.keys(t[i]).toString()].indexOf(n) > -1),
          void (getApp().info = !0);
      }
    });
  }
})