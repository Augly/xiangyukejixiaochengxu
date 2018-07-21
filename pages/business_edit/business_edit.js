const config=require('../../utils/config.js');
let app=getApp()
// pages/business_edit/business_edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myimgArr:[],
    sex:['女','男']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mydata = new Date()
    this.setData({
      // mydata: mydata.getFullYear() - 16 + '-12-31',
      enddata: mydata.getFullYear() - 16 + '-12-31'
    })
  },
  selectSex(e) {
    console.log(e.detail.value)
    this.setData({
      sexIndex: this.data.sex[e.detail.value]
    })
  },
  mydata(e) {
    var birthday = e.detail.value;
    var st = birthday.split('-')
    var sm = parseInt(st[1] + st[2])
    var n = 0
    if (sm >= 321 && sm <= 419) {
      n = '白羊座'
    } else if (sm >= 420 && sm <= 520) {
      n = '金牛座'
    } else if (sm >= 521 && sm <= 621) {
      n = '双子座'
    } else if (sm >= 622 && sm <= 722) {
      n = '巨蟹座'
    } else if (sm >= 723 && sm <= 822) {
      n = '狮子座'
    } else if (sm >= 823 && sm <= 922) {
      n = '处女座'
    } else if (sm >= 923 && sm <= 1023) {
      n = '天枰座'
    } else if (sm >= 1024 && sm <= 1122) {
      n = '天蝎座'
    } else if (sm >= 1123 && sm <= 1221) {
      n = '射手座'
    } else if (sm >= 1222) {
      n = '魔蝎座'
    } else if (sm >= 120 && sm <= 218) {
      n = '水瓶座'
    } else if (sm >= 219 && sm <= 320) {
      n = '双鱼座'
    }
    this.setData({
      mydata: e.detail.value,
      star: n
    })
  },
  //选择图片
  upimg() {
    var that = this;
    wx.chooseImage({
      count: 5 - that.data.myimgArr.length, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          myimgArr: res.tempFilePaths
        })
      }
    })
    //上传图片
    // if (this.data.myimg.imgSrc == null || this.data.myimg.imgSrc == undefined) {
    //   imgSrc = ''
    // } else {
    //   var n = this.data.myimg.imgSrc.length - 1;
    //   var s = 0;
    //   (function upArr() {
    //     wx.uploadFile({
    //       url: config.uploadFile, //仅为示例，非真实的接口地址
    //       filePath: that.data.myimg.imgSrc[s],
    //       name: 'file',
    //       formData: {
    //         filetype: 'image',
    //         app: 'material'
    //       },
    //       success: function (res) {
    //         myimgurl += ',' + JSON.parse(res.data).data[0].filepath
    //         if (n > s) {
    //           s++
    //           upArr()
    //         } else {
    //           myimgurl.slice(1, myimgurl.length)
    //         }
    //       }
    //     })
    //   })()
    // }
  },
  /**
   * 后去座右名
   */
  Motto(e){
   this.setData({
     Motto:e.detail.value
   })
  },
  /**
   * 输入微信号
   */
  wxChart(e) {
    this.setData({
      wxChart: e.detail.value
    })
  },
  /**
   * 输入电话号
   */
  tell(e){
    this.setData({
      tell:e.detail.value
    })
  },
  /**
   * 输入性别
   */
  sex(e){
    this.setData({
      sex:e.detail.value
    })
  },
  /**
   * 输入生日
   */
  mydata(e){
    console.log(e)
    this.setData({
      brith:e.detail.value
    })
  },
  /**
   * 选择或输入地址
   */
  workpace(e){
    this.setData({
      workpace:e.detail.value
    })
  },
  /**
   * 输入职业
   */
  myporsesio(e){
    this.setData({
      myporsesio:e.detail.value
    })
  },
  /**
   * 获取用户信息
   */
  
  /**
   * 修改名片上传
   */

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