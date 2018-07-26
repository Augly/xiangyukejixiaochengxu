// pages/index/run/run.js
const config=require('../../../utils/config.js')
let app=getApp();
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
    this.setData({
      id:options.id
    })
    config.ajax('POST',{
      type:1,
      need_id:options.id,
      user_id: options.userid,
      lat: app.globalData.lat,
      lng: app.globalData.lng
    }, config.errDetail,(res)=>{
      console.log(res.data.data)
      res.data.data.user.distance = (res.data.data.user.distance / 1000).toFixed(2)
      res.data.data.err.create_time = config.timeFormat(res.data.data.err.create_time * 1000)
      
      this.setData({
        alldata:res.data.data
      })
    })
    this.setData({
      imgUrl: config.imgurl + 'kong@2x.png'
    })

   
  },
  tobill(){
    // config.mytoast('系统升级,正在维护',(res)=>{

    // })
    wx.navigateTo({
      url: '/pages/index/wantBill/wantBill?id='+this.data.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 评价
   */
  pl:function(){
    wx.navigateTo({
      url: '../pl/pl?id='+this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  




  },

  uploadImg(){
    var n = this.data.myimg.imgSrc.length - 1; //需要上传图片数组的长度-1
    var s = 0;  //初始化索引值标志
    (function upArr() {  //上传图片函数
      wx.uploadFile({
        url: config.uploadFile,  //需要上传的接口
        filePath: that.data.myimg.imgSrc[s],  //需要上传的图片文件
        name: 'file',
        formData: {
          filetype: 'image',
          app: 'material'
        },
        success: function (res) {  //上传成功后
          myimgurl += ',' + JSON.parse(res.data).data[0].filepath
          if (n > s) {  //判断是否全部上传完，此处为未全部上传完，继续调用上传函数
            s++   //标志
            upArr()
          } else {
            //全部上传成功区间
            console.log(myimgurl)
          }
        }
      })
    })()
  },
  /**
   * 我要接单
   */

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