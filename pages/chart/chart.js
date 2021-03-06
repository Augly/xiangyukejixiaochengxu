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
      user_id: app.globalData.user_id,
      keyword: ''
    }, config.addressList, (res) => {
      console.log(res)
      // if(res.data.){

      // }
      this.setData({
        List: this.toArr(res.data.data)
      })
    }, (res) => {

    })
  },
  toCharrooom(e) {
    app.globalData.formId = e.currentTarget.dataset.id

    wx.navigateTo({
      url: "/pages/big_Card/big_Card",
    })
    // wx.navigateTo({
    //   url: '/pages/chart/chartRoom/chartRoom',
    // })
  },
    /**
 * 购买礼物商城
 */
  gift_shop: function () {
    wx.navigateTo({
      url: '../../personl/gift_Shop/gift_Shop'
    })
  },

  /**
   * 赠送礼物
   */
  sendGift: function () {
    var alldataArr = []
    var alldata = this.data.giftGroup.GiftData
    for (let n in alldata) {
      for (let x in alldata[n].presentList) {
        if (alldata[n].presentList[x].check == true) {
          alldataArr.push(alldata[n].presentList[x])
        }
      }
    }
    var allArr = JSON.stringify(alldataArr)
    wx.navigateTo({
      url: '../../personl/sendGift/sendGift?alldataArr=' + allArr + '&user_id=' + this.data.alldata.user_id,
    })
  },
  /**
 * 礼物切换
 */
  lookgift: function (event) {
    this.setData({
      'giftGroup.myindex': config.getDataset(event, 'id')
    })
  },
  /**
 * 选择礼物
 */
  selectIndex: function (event) {
    var allData = this.data.giftGroup.GiftData
    allData[this.data.giftGroup.myindex].presentList[config.getDataset(event, 'index')].check = !allData[this.data.giftGroup.myindex].presentList[config.getDataset(event, 'index')].check
    this.setData({
      'giftGroup.GiftData': allData
    })
  },
  /**
 * 切换
 */
  clicktab(e) {
    this.setData({
      clickIndex: e.currentTarget.dataset.id
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
    console.log(newarr)
    for (var i in newarr) {
      if (newarr[i].name == null || newarr[i].name == undefined) {
        newarr[i].name = '#'
      }
    }
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