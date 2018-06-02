// pages/personl/fans/fans.js
const config=require('../../../utils/config.js');
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gztype:'添加关注',
    isgz:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    config.ajax('POST',{
      user_id: app.globalData.user_id
    }, config.fans,(res)=>{
      console.log(res)
      this.setData({
        allData:res.data.data
      })
    })
  },
//   gzone(){
//     console.log(1) 
//  },
  gzone(event) {
    console.log(1)
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      concerned_id: event.currentTarget.dataset.id
    }, config.follow, (res) => {
      console.log(res)
      if(res.data.code=='1'){
        if (res.data.data.status == '1') {
          this.setData({
            isgz: true,
            gztype: '取消关注'
          })
        } else if (res.data.data.status == '0') {
          this.setData({
            isgz: false,
            gztype: '添加关注'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '不可关注自己',
            showCancel: false,
          })
        }
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
  
  },
  /**
   * 关注
   */
  gz:function(e){
      if(e.currentTarget.dataset.true='false'){
        
      }
  }
})