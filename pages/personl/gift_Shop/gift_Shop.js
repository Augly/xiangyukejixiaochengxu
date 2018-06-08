// pages/personl/gift_Shop/gift_Shop.js
const config=require('../../../utils/config.js');
let app=getApp()
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
    config.ajax('POST',{},config.giftlist,(res)=>{
      var all = res.data.data
      console.log(all)
      for (let x in all) {
        all[x].num =1
        all[x].check = false
      }
      this.setData({
        alldata:all
      })
    })
  },


  jian:function(e){
    var all = this.data.alldata
    if (all[e.currentTarget.dataset.index].num==1){
      all[e.currentTarget.dataset.index].num=1
    }else{
      all[e.currentTarget.dataset.index].num--
    }
    this.setData({
      alldata:all
    })
  },
  check:function(e){
    var all = this.data.alldata
    all[e.currentTarget.dataset.index].check = !all[e.currentTarget.dataset.index].check
    this.setData({
      alldata: all
    })
  },
  jia:function(e){
    var all = this.data.alldata
    if (all[e.currentTarget.dataset.index].num == 99) {
      all[e.currentTarget.dataset.index].num = 99
    } else {
      all[e.currentTarget.dataset.index].num++
    }
    this.setData({
      alldata: all
    })
  },
  ipt:function(e){
    console.log(e)
    var all = this.data.alldata
    all[e.currentTarget.dataset.index].num = e.detail.value
    if (all[e.currentTarget.dataset.index].num=='99'){
      all[e.currentTarget.dataset.index].num=99
      console.log(1)
    }
    this.setData({
      alldata: all
    })
  },
  /**
   * 确认购买
   */
  submit:function(){
    var arr=[]
    var all = this.data.alldata
    for(let x in all){
      if(all[x].check==true){
        arr.push({
          present_id:all[x].id,
          num:all[x].num
        })
      }
    }
    config.ajax('POST',{
      user_id:app.globalData.user_id,
      present:JSON.stringify(arr)
    }, config.giftBuy,(res)=>{
      wx.navigateTo({
        url: '../../pay/pay?mytype=' + JSON.stringify(res.data.data),
      })
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