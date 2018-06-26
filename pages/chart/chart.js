// pages/chart/chart.js
let app = getApp()
const config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    config.ajax('POST', {
      user_id: 5,
      keyword: ''
    }, config.addressList, (res) => {
      this.setData({
        List: this.toArr(res.data.data)
      })
    }, (res) => {

    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.zh([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
  },
  zh(st) {
    var newArr = []
    for (var i = 0; i < st.length - 1; i++) {
      if (i % 2 == 0) {
        var newst = [st[i], st[i + 1]]
        newArr.push(newst)
      }
    }
    if (st.length % 2 != 0) {
      var newst = [st[st.length - 1]]
      newArr.push(newst)
    }
    return newArr
  },

  toArr(obj) {
    let newarr = []
    let result = Object.keys(obj).map((el) => {
      newarr.push(obj[el]);
    });
    return newarr
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