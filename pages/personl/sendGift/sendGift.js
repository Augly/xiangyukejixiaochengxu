// pages/personl/sendGift/sendGift.js
const app=getApp()
let config=require('../../../utils/config.js');
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
    console.log(options)
    var data = JSON.parse(options.alldataArr)
    for(let x in data){
      data[x].value=1
    }
    this.setData({
      alldata: data,
      id: options.user_id
    })
  },
  /**
   * 减
   */
  jian:function(event){
    var vdata = this.data.alldata
    if (vdata[config.getDataset(event, 'index')].value==1){
      vdata[config.getDataset(event, 'index')].value=1
    }else{
      vdata[config.getDataset(event, 'index')].value--
    }
    this.setData({
      alldata: vdata
    })
  },
  /**
   * 删除
   */
  cendel:function(event){
    config.getDataset(event, 'index')
    var vdata = this.data.alldata
    vdata.splice(config.getDataset(event, 'index'),1)
    this.setData({
      alldata: vdata
    })
  },
  /**
   * 加
   */
  jia: function (event) {
    var vdata = this.data.alldata
    if (vdata[config.getDataset(event, 'index')].value == vdata[config.getDataset(event, 'index')].num) {
      vdata[config.getDataset(event, 'index')].value = vdata[config.getDataset(event, 'index')].num
    } else {
      vdata[config.getDataset(event, 'index')].value++
    }
    this.setData({
      alldata: vdata
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 确认送礼
   */
  sureSend:function(){
    var sendData = this.data.alldata
    var sendArr=[]
    for(let i in sendData){
      sendArr.push({
        present_id: sendData[i].id,
        num: sendData[i].value
      })
    }
    config.ajax('POST',{
      send_id: app.globalData.user_id,
      user_id:this.data.id,
      present: JSON.stringify(sendArr)
    }, config.send_present,(res)=>{
      console.log(res)
    })
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