// pages/personl/myBackpaker/myBackpaker.js
const config=require('../../../utils/config.js')
let app=getApp()
var arr=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wrap:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    config.ajax('POST',{
      user_id: app.globalData.user_id
    }, config.myGift,(res)=>{
      console.log(res)
      this.setData({
        alldata:res.data.data.list,
        all:res.data.data
      })
    })
  },

  Changemoney:function(){
    var that=this
    config.ajax('POST',{
      user_id: app.globalData.user_id,
      present_id: that.data.arr.present_id,
      num:that.data.arr.mynum,
      time: that.data.all.time,
      authcode: that.data.all.authcode
    }, config.myPresentWithdraw,(res)=>{
      var mydata = that.data.alldata
      console.log(mydata[that.data.arr.index])
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  zj(){
    var cont=this.data.arr.mynum*this.data.arr.tprice
      var st=cont.toFixed(2)
      return st
  },
  kong:function(){

  },
  jian: function () {
    var all = this.data.arr
    if (all.mynum == 1) {
      all.mynum = 1
    } else {
      all.mynum--
    }
    this.setData({
      arr: all,
      hj: this.zj()
    })
  },
  jia: function () {
    var all = this.data.arr
    if (all.mynum == all.num) {
      all.mynum = all.num
    } else {
      all.mynum++
    }
    this.setData({
      arr: all,
      hj: this.zj()
    })
  },
  ipt: function (e) {
    var all = this.data.arr
    console.log(e.detail.value, all.num)
    if (parseInt(e.detail.value) > all.num) {
      all.mynum = all.num
    } else if (e.detail.value == '' || parseInt(e.detail.value) ==0){
      all.mynum=0
    }else{
      all.mynum = parseInt(e.detail.value)
    }
    this.setData({
      arr: all,
      hj: this.zj()
    })
  },
  /**
   * 变现
   */
  bx:function(e){
    arr = ''
    var all = this.data.alldata
    console.log(all)
    all[e.currentTarget.dataset.index].mynum=1
    all[e.currentTarget.dataset.index].index = e.currentTarget.dataset.index
    this.setData({
      wrap:true,
      arr: all[e.currentTarget.dataset.index],
      hj: all[e.currentTarget.dataset.index].tprice
    }) 
  },
  /**
   * 关闭变现层
   */
  hidewrap:function(){
    this.setData({
      wrap:false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    config.ajax('POST', {
      user_id: app.globalData.user_id
    }, config.myGift, (res) => {
      this.setData({
        alldata: res.data.data.list
      })
    })
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