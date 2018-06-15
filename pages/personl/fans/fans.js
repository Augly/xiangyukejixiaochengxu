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
    wx.setNavigationBarTitle({
      title:'我的'+options._type
    })

    if (options._type=='粉丝'){
      config.ajax('POST', {
        user_id: app.globalData.user_id
      }, config.fans, (res) => {
        console.log(res)
        for (let n = 0; n < res.data.data.length; n++) {
          if (res.data.data[n].is_each == 1) {
            res.data.data[n].gztype = '取消关注'
          } else {
            res.data.data[n].gztype = '添加关注'
          }
        }
        this.setData({
          _type: options._type,
          allData: res.data.data
        })
      })
    }else{
      config.ajax('POST', {
        user_id: app.globalData.user_id
      }, config.getfollow, (res) => {
        console.log(res)
        for (let n = 0; n < res.data.data.length; n++) {
          if (res.data.data[n].is_each == 1) {
            res.data.data[n].gztype = '取消关注'
          } else {
            res.data.data[n].gztype = '添加关注'
          }
        }
        this.setData({
          _type: options._type,
          allData: res.data.data
        })
        console.log(this.data.allData)
      })
    }
  },
//   gzone(){
//     console.log(1) 
//  },
  gzone(event) {
    var that=this
    console.log(event.currentTarget.dataset.id)
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      concerned_id: event.currentTarget.dataset.id
    }, config.follow, (res) => {
      console.log(res)
      console.log(event.currentTarget.dataset.index)
      var gz = this.data.allData
      if(res.data.code=='1'){
        if (res.data.data.status == '1') {
          gz[event.currentTarget.dataset.index].is_each=1
          gz[event.currentTarget.dataset.index].gztype = '取消关注'
          this.setData({
            allData: gz,
          })
        } else if (res.data.data.status == '0') {
          if (this.data._type=='关注'){
            gz.splice(event.currentTarget.dataset.index,1)
          }else{
          gz[event.currentTarget.dataset.index].is_each=0
          gz[event.currentTarget.dataset.index].gztype = '添加关注'
          
          }
          this.setData({
            allData: gz,
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