// pages/Release/experience_res/experience_res.js
let app = getApp()
const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gztype: '关注',
    sctype: '收藏',
    clickIndex: true,
    myaudio: "",
    myvideo: {
      videoSrc: '',
      controls: false
    },

    getfous:false, 
    send_iptValue: '评论',
    gift:false
  },
 /**
  * * 输入框获得焦点 
  */ 
 myipt() {
    this.setData({
       getfous:true
    }) 
  },
  /** 
   * * 输入框失去焦点 
   * 
   * */
 sendgift:function(){
    this.setData({
      gift:true,
    })
 },

 hidemyipt() {
    this.setData({
      getfous: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.share_id
    })

    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
    })
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      lat: app.globalData.lat,
      lng: app.globalData.lng,
      share_id: options.share_id
    }, config.getShareDetail, (res) => {
      console.log(res)
      let myaudio = {
        src: res.data.data.media,
        time: res.data.data.time
      }
      for (let i = 0; i < res.data.data.join.length; i++) {
        res.data.data.join[i].distance = (res.data.data.join[i].distance / 1000).toFixed(2)
        res.data.data.join[i].create_time = config.timeFormat(res.data.data.join[i].create_time * 1000)
      }
      that.setData({
        alldata: res.data.data,
        myaudio: myaudio,
        'myvideo.videoSrc': res.data.data.video,
        time: res.data.data.time
      })
    })
  },
  /**
   * 播放音频
   */
  playaudio() {
    var that = this;
    this.innerAudioContext.src = that.data.myaudio.src;
    this.innerAudioContext.play()
    var moneytime = that.data.time;
    // if (mytime > moneytime) {

    // } else {
    var timeclone = setInterval(function () {
      if (that.data.myaudio.time < 1000) {
        clearInterval(timeclone)
        that.data.myaudio.time = moneytime
      }
      that.data.myaudio.time -= 1000;
      that.setData({
        'myaudio.duration': that.formatDuringtwo(that.data.myaudio.time),
      })
    }, 1000)
    // }

  },


  /**
   * 去参与页面
   */
  topublish: function () {
    wx.navigateTo({
      url: '../Publish/Publish?id=' + this.data.id,
    })
  },

  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  },
  //时间转换
  formatDuringtwo(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var min = minutes.toString().length == 1 ? '0' + minutes : minutes;
    var seconds = Math.round((mss % (1000 * 60)) / 1000);
    var sec = seconds.toString().length == 1 ? '0' + seconds : seconds;
    return min + ":" + sec + '"';
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
    var that = this
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      lat: app.globalData.lat,
      lng: app.globalData.lng,
      share_id: that.data.id
    }, config.getShareDetail, (res) => {
      console.log(res)
      let myaudio = {
        src: res.data.data.media,
        time: res.data.data.time
      }
      for (let i = 0; i < res.data.data.join.length; i++) {
        res.data.data.join[i].distance = (res.data.data.join[i].distance / 1000).toFixed(2)
        res.data.data.join[i].create_time = config.timeFormat(res.data.data.join[i].create_time * 1000)
      }
      that.setData({
        alldata: res.data.data,
        myaudio: myaudio,
        'myvideo.videoSrc': res.data.data.video,
        time: res.data.data.time
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

  },

  /**
   * 关注
   */
  gz() {
    this.setData({
      isgz: true,
      gztype: '已关注'
    })
  },
  /**
   * 收藏
   */
  sc() {
    this.setData({
      issc: true,
      sctype: '已收藏'
    })
  },
  /**
   *点赞 
   */
  zan() {
    this.setData({
      iszan: true,
    })
  },
  /**
   * 切换
   */
  clicktab() {
    this.setData({
      clickIndex: !this.data.clickIndex
    })
  }
})