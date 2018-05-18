// pages/Release/push_experience/push_experience.js
const config = require("../../../utils/config.js");
var recorderManager = wx.getRecorderManager()
var backgroundAudioManager = wx.getBackgroundAudioManager()
var time = config.options.duration;
var timeclone = null;
var temp=null;
var mytemp=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showtext: false,  //文字是否显示
    audioshow: false,  //录音组件是否显示
    showaudio: true,  //是否显示录音组件
    myvideo: {
      controls: false,
    },
    audio: {
      mytype: 'start',
      showTime: null,
      loadingTime: 0,
      audioTime:0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success: function(res) {


            },
            fail: function(res) {
              wx.showModal({
                title: '提示',
                content: '您拒绝了录音授权无法使用录音功能',
              })

              wx.showModal({
                title: '提示',
                content: '您拒绝了录音授权无法使用录音功能,是否重新授权',
                success: function(res) {
                  wx.openSetting()
                },
                fail: function(res) {},
                complete: function(res) {},
              })
            },
            complete: function(res) {},
          })
        }
      }
    })
    time = config.options.duration;
    that.setData({
      audioshow: true,
      'audio.showTime': this.formatDuring(time),
      'audio.loadingTime': this.formatDuring(config.options.duration - time)
    })
  },


  // audio_play: function () {
  //   recorderManager.start(options);

  // },



  //时间转换
  formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var min = minutes.toString().length == 1 ? '0' + minutes : minutes;
    var seconds =Math.round((mss % (1000 * 60)) / 1000);
    var sec = seconds.toString().length == 1 ? '0' + seconds : seconds;
    return min + "分" + sec+'秒';
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      temp=res
      that.setData({
        'audio.audioTime': that.formatDuring(temp.duration)
      })
      wx.saveFile({
        tempFilePath: res.tempFilePath,
        success: function (res) {
          temp =res.savedFilePath
        }
      })
      wx.hideLoading()
      const { tempFilePath } = res
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })
  },
  /**
   * 开始录音
   */
  audio_start() {
    var that = this;
    that.setData({
      'audio.mytype':'stop'
    })
    console.log(config.options)
    recorderManager.start(config.options)
    timeclone = setInterval(function () {
      time-=1000;
      that.setData({
        'audio.showTime': that.formatDuring(time),
        'audio.loadingTime': that.formatDuring(config.options.duration - time)
      })
      if(time==0){
        clearInterval(timeclone)
      }
    }, 1000)
  },
  //录音停止
  audio_stop(){
    var that = this;
    recorderManager.stop()
    clearInterval(timeclone)
    time = config.options.duration;
  },
  //下一步
  nextStep(){
    var that = this;
    if (time===config.options.duration){
      wx.showModal({
        title: '提示',
        content: '请点击开始录制视频',
        showCancel:false
      })
    }else{
      wx.showLoading({
        title: '正在保存...',
        mask:true
      })
      recorderManager.stop()
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
  trylisten(){
    var that=this;
    console.log(backgroundAudioManager)
    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '许巍'
    // console.log(temp.tempFilePath)
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    // wx.playVoice({
    //   filePath: temp.tempFilePath,
    //   success: function (res) {
    //     console.log(1);
    //   },
    //   complete: function () {
    //   }
    // })
    backgroundAudioManager.src = temp // 设置了 src 之后会自动播放
    backgroundAudioManager.play();
    // console.log(backgroundAudioManager)
    backgroundAudioManager.onPlay((res)=>{
      console.log(res)
    })
    
    var timetwo = setInterval(function () {
      backgroundAudioManager.duration -= 1000;
      that.setData({
        'audio.audioTime': that.formatDuring(backgroundAudioManager.duration)
      })
      if (backgroundAudioManager.duration<1000) {
        clearInterval(timetwo)
        // console.log(1)
      }
    }, 1000)
  },
  //取消录音
  celaudio(){
    recorderManager.stop()
    time = config.options.duration;
    this.setData({
      audioshow:false,
      'audio.showTime': this.formatDuring(time),
      'audio.loadingTime': this.formatDuring(config.options.duration - time),
      'audio.mytype':'start',
      showaudio:true
    })
    clearInterval(timeclone)
  },

  //叉掉
  hideaudio(){
    this.setData({
      audioshow:false,
      showaudio:true,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})