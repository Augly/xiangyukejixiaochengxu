// pages/business_Card/business_Card.js
const config = require('../../utils/config.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    giftGroup: {
      gift: false,
      selectIndex: '0',
      myindex: '0'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options:options
    })
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let param = {
          code: res.code
        }
        //参数对象
        config.ajax("POST", param, config.getOpenid, (res) => {
          //ajax访问成功函数
          app.globalData.user_id = res.data.data.user_id

          config.ajax('POST', {
            user_id: app.globalData.user_id,
          }, config.gitpresent, (res) => {
            this.setData({
              'giftGroup.GiftData': res.data.data[0]
            })
          })
          config.ajax('POST', {
            user_id: app.globalData.user_id,
            recieve_id: app.globalData.formId
          }, config.userChangeCard, (res) => {
            console.log(res)
            if (res.data.data.sex == 1) {
              res.data.data.sex = "男"
            } else {
              res.data.data.sex = "女"
            }
            this.setData({
              alldata: res.data.data
            })
          })
        }, (res) => {

          //ajax访问失败函数
        }, (res) => {
          //不管成功与否都调用函数
        });
      }
    })

  },
  /** 
 * * 输入框失去焦点 
 * 
 * */
  sendgift: function () {
    console.log(1)
    this.setData({
      'giftGroup.gift': true,
    })
  },
  hidegift() {
    this.setData({
      'giftGroup.gift': false,
    })
  },
  chart(){
    wx.navigateTo({
      url: '/pages/chart/chartRoom/chartRoom',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
      url: "/pages/personl/sendGift/sendGift?alldataArr=" + allArr + '&user_id=' + app.globalData.formId,
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
   * 编辑名片
   */
  editCard: function () {
    wx.navigateTo({
      url: '../business_edit/business_edit',
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
    this.setData({
      'giftGroup.gift': false,
    })
    if (this.data.options != null && this.data.options != undefined || this.data.options != ''){
      var options = this.data.options
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          let param = {
            code: res.code
          }
          //参数对象
          config.ajax("POST", param, config.getOpenid, (res) => {
            //ajax访问成功函数
            app.globalData.user_id = res.data.data.user_id

            config.ajax('POST', {
              user_id: app.globalData.user_id,
            }, config.gitpresent, (res) => {
              this.setData({
                'giftGroup.GiftData': res.data.data[0]
              })
            })
            config.ajax('POST', {
              user_id: app.globalData.user_id,
              recieve_id: app.globalData.formId
            }, config.userChangeCard, (res) => {
              console.log(res)
              if (res.data.data.sex == 1) {
                res.data.data.sex = "男"
              } else {
                res.data.data.sex = "女"
              }
              this.setData({
                alldata: res.data.data
              })
            })
          }, (res) => {

            //ajax访问失败函数
          }, (res) => {
            //不管成功与否都调用函数
          });
        }
      })

    }
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