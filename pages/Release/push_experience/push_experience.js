// pages/Release/push_experience/push_experience.js
const config = require("../../../utils/config.js");
var time = config.options.duration;  //获取预定时间
var timeclone = null; //  开始录音时的定时器
var mytime = null; //录音文件的时间
var playTime = null;  //试听的时间
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showtext: false,  //文字是否显示
    audioshow: false,  //录音组件是否显示
    showaudio: true,  //是否显示录音组件
    playType: true,  //是否可以试听
    myvideo: {
      controls: false,
    },
    audio: {  //音频组件的数据
      mytype: 'start',  //显示类型
      showTime: null,  //显示的已录制时间
      loadingTime: 0,  //剩余录音时间
      audioTime: 0, //
      trylisten: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      that.tip("录音失败！")
    });
    this.recorderManager.onStop(function (res) {
      that.setData({
        src: res.tempFilePath,
      })
      mytime = res.duration
      playTime = mytime;
      that.setData({
        'audio.audioTime': that.formatDuring(mytime)
      })
    });
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
    })
    this.setData({
      'audio.showTime': this.formatDuring(time),
      'audio.loadingTime': this.formatDuring(config.options.duration - time)
    })
  },
  /**
   * 添加文字显示
   */
  showtext: function () {
    this.setData({
      showtext: true
    })
  },
  /**
   * 添加录音
   */
  addaudio: function () {
    var that = this
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success: function(res) {


    //         },
    //         fail: function(res) {
    //           wx.showModal({
    //             title: '提示',
    //             content: '您拒绝了录音授权无法使用录音功能',
    //           })

    //           wx.showModal({
    //             title: '提示',
    //             content: '您拒绝了录音授权无法使用录音功能,是否重新授权',
    //             success: function(res) {
    //               wx.openSetting()
    //             },
    //             fail: function(res) {},
    //             complete: function(res) {},
    //           })
    //         },
    //         complete: function(res) {},
    //       })
    //     }
    //   }
    // })
    time = config.options.duration;
    that.setData({
      audioshow: true,
      'audio.showTime': this.formatDuring(time),
      'audio.loadingTime': this.formatDuring(config.options.duration - time)
    })
  },
  //时间转换
  formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var min = minutes.toString().length == 1 ? '0' + minutes : minutes;
    var seconds = Math.round((mss % (1000 * 60)) / 1000);
    var sec = seconds.toString().length == 1 ? '0' + seconds : seconds;
    return min + "分" + sec + '秒';
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 开始录音
   */
  audio_start() {
    var that = this;
    that.setData({
      'audio.mytype': 'stop'
    })
    this.recorderManager.start(config.options);
    timeclone = setInterval(function () {
      time -= 1000;
      that.setData({
        'audio.showTime': that.formatDuring(time),
        'audio.loadingTime': that.formatDuring(config.options.duration - time)
      })
      if (time == 0) {
        clearInterval(timeclone)
      }
    }, 1000)
  },
  //录音停止
  audio_stop() {
    var that = this;
    this.recorderManager.stop()
    clearInterval(timeclone)
  },
  //下一步
  nextStep() {
    var that = this;
    if (time === config.options.duration) {
      wx.showModal({
        title: '提示',
        content: '请点击开始录制视频',
        showCancel: false
      })
    } else {
      this.recorderManager.stop()
      clearInterval(timeclone)
      time = config.options.duration;
      that.setData({
        'audio.mytype': 'start',
        'audio.showTime': that.formatDuring(time),
        'audio.loadingTime': that.formatDuring(config.options.duration - time),
        showaudio: false,
      })
    }
  },
  //试听音乐
  trylisten() {
    var that = this;
    this.innerAudioContext.src = this.data.src;
    this.innerAudioContext.play()
    that.setData({
      'audio.trylisten': false
    })
    var timetwo = setInterval(function () {
      playTime -= 1000;
      that.setData({
        'audio.audioTime': that.formatDuring(playTime)
      })
      if (playTime < 1000) {
        clearInterval(timetwo)
        that.setData({
          'audio.trylisten': true
        })
        playTime = mytime
      }
    }, 1000)
  },
  //取消录音
  celaudio() {
    this.recorderManager.stop()
    time = config.options.duration;
    this.setData({
      audioshow: false,
      'audio.showTime': this.formatDuring(time),
      'audio.loadingTime': this.formatDuring(config.options.duration - time),
      'audio.mytype': 'start',
      showaudio: true
    })
    clearInterval(timeclone)
  },
  //叉掉
  hideaudio() {
    this.setData({
      audioshow: false,
      showaudio: true,
      'audio.mytype': 'start',
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
  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})