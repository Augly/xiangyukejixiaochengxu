// pages/personl/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mysrc: '',
    mytext: '半世纪前，林语堂先生写过的一篇文章，如今看来扔振聋发聩，说的是社会有十大俗：一、腰有十...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // wx.downloadFile({
    //   url: 'http://xiangyu.wx.bronet.cn/images/fenxbg@2x.png',
    //   success: function (sres) {
    //     that.data.mysrc = sres.tempFilePath
    //   }, fail: function (fres) {

    //   }
    // })  
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res,
          rem: res.windowWidth / 750
        })
      }
    })
    that.Canvas(that)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 创建画布内容
   */
  Canvas(that) {
    function rem(int) {
      return int * that.data.rem
    };
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.drawImage('https://tenement.wx.bronet.cn/public/images/fenxbg@2x.png', 0, 0, this.data.systemInfo.windowWidth, this.data.systemInfo.windowHeight)
    ctx.drawImage('https://tenement.wx.bronet.cn/public/images/pic@2x.png', rem(32), rem(36), rem(686), rem(383))
    ctx.setStrokeStyle('white')
    ctx.setLineWidth(rem(5))
    ctx.strokeRect(rem(32), rem(36), rem(686), rem(383))
    ctx.setFontSize(rem(34))
    ctx.setTextAlign('center')
    ctx.save()
    ctx.setFillStyle('white')
    ctx.fillText('你是怎么一步步变得庸俗的？', rem(435), rem(500))
    ctx.setFontSize(rem(26))
    ctx.setTextAlign('left')
    if (that.data.mytext.length > 26) {
      ctx.fillText(that.data.mytext.substr(26, 26), rem(35), rem(630), rem(684))
    }
    ctx.fillText(that.data.mytext.substr(0, 26), rem(35), rem(580), rem(684))
    ctx.save()
    ctx.arc(rem(375), rem(820), rem(120), 0, 2 * Math.PI)
    ctx.fill('white')
    ctx.clip()
    ctx.drawImage('https://tenement.wx.bronet.cn/public/images/flogo.jpg', rem(292.5), rem(735.5), rem(166), rem(166))
    ctx.restore();
    ctx.save()
    ctx.arc(rem(160), rem(488), rem(27), 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage('https://tenement.wx.bronet.cn/public/images/flogo.jpg', rem(133), rem(461), rem(55), rem(55))
    ctx.restore();
    ctx.draw()
  },
  /**
   * 比例转换
   */

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
  sava:function(){
    var that=this



    // saveImg: function() {


    // }
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.systemInfo.windowWidth,
      height: that.data.systemInfo.windowHeight,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        // wx.previewImage({
        //   current: res.tempFilePath, // 当前显示图片的http链接
        //   urls: [res.tempFilePath] // 需要预览的图片http链接列表
        // })

        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res)
          },
          fail(res) {
            console.log(res)
          },
          complete(res) {
            console.log(res)
          }
        })
      }
    })
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