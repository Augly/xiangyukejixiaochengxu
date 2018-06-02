// pages/Release/Publish/Publish.js
let app = getApp()
const config = require('../../../utils/config.js')
var time = config.options.duration;  //获取预定时间
var timeclone = null; //  开始录音时的定时器
var mytime = null; //录音文件的时间
var playTime = null;  //试听的时间
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioshow: false,  //录音组件是否显示
    showaudio: true,  //是否显示录音组件
    playType: true,  //是否可以试听
    myvideo: {
      controls: false,
      videoSrc: null
    },
    myaudio: null,
    myimg: {
      imgSrc: null
    },
    audio: {  //音频组件的数据
      mytype: 'start',  //显示类型
      showTime: null,  //显示的已录制时间
      loadingTime: 0,  //剩余录音时间
      audioTime: 0, //
      trylisten: true
    },
    bjData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      adder: app.globalData.adder,
      id: options.id
    })
    console.log(app.globalData.adder)
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      that.tip("录音失败！")
    });
    this.recorderManager.onStop(function (res) {
      that.setData({
        audio_faile: res,
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
 * 输入文本
 */
bj:function(e){
  this.setData({
    bjData:e.detail.value
  })
},
  /**
     * 拍摄视频
     */
  Record() {
    wx.chooseVideo({
      sourceType: ['camera', 'album'],
      maxDuration: 10,
      camera: 'back',
      success: (res) => {
        console.log(res)
        this.setData({
          'myvideo.videoSrc': res.tempFilePath
        })
      }
    })
  },
  /**
   * 选择照片或者拍摄照片
   */
  upimg() {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'myimg.imgSrc': res.tempFilePaths
        })
      }
    })
  },
  /**
   * 添加录音
   */
  addaudio: function () {
    console.log(1)
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
    console.log(2)
    that.setData({
      audioshow: true,
      'audio.showTime': this.formatDuring(time),
      'audio.loadingTime': this.formatDuring(config.options.duration - time)
    })
  },

  /**
   * 重录
   */
  returnaddaudio: function () {
    this.innerAudioContext.stop()
    time = config.options.duration;
    this.setData({
      showaudio: true
    })
  },

  /**
   * 上传音频
   */
  uploadaudio() {
    this.innerAudioContext.stop()
    time = config.options.duration;
    this.setData({
      myaudio: this.data.audio_faile,
      showaudio: true,
      audioshow: false,
      'myaudio.duration': this.formatDuringtwo(this.data.audio_faile.duration)
    })

  },
  /**
   * 播放音频
   */
  playaudio() {
    var that = this;
    this.innerAudioContext.src = this.data.myaudio.tempFilePath;
    this.innerAudioContext.play()
    var moneytime = that.data.audio_faile.duration;
    if (mytime > moneytime) {

    } else {
      var timeclone = setInterval(function () {
        that.data.audio_faile.duration -= 1000;
        that.setData({
          'myaudio.duration': that.formatDuringtwo(that.data.audio_faile.duration),
        })
        if (that.data.audio_faile.duration < 1000) {
          clearInterval(timeclone)
          that.data.audio_faile.duration = moneytime
        }
      }, 1000)
    }

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
 * 发布
 */
  push: function () {
   
    //参数对象
    var that = this


    let audio, myaudio = '', imgSrc, myimgSrc = '', videoSrc, myvideoSrc = '', imgurl, myimgurl = '', info, sendgift;
    //封面图
    // if (this.data.img.imgurl == null || this.data.img.imgurl == undefined) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请上传封面照片',
    //     showCancel: false,
    //   })
    //   return false
    // } else {
    //   console.log(this.data.img.imgurl)
    //   wx.uploadFile({
    //     url: config.uploadFile, //仅为示例，非真实的接口地址
    //     filePath: this.data.img.imgurl[0],
    //     name: 'file',
    //     formData: {
    //       filetype: 'image',
    //       app: 'material'
    //     },
    //     success: function (res) {
    //       console.log(res)
    //       // console.log(JSON.parse(res.data))
    //       myimgSrc = JSON.parse(res.data).data[0].filepath

    //     }
    //   })
    // }



    //上传音频
    if (this.data.myaudio == null || this.data.myaudio == undefined) {
      audio = ''
    } else {
      console.log(this.data.myaudio)
      wx.uploadFile({
        url: config.uploadFile, //仅为示例，非真实的接口地址
        filePath: this.data.myaudio.tempFilePath,
        name: 'file',
        formData: {
          filetype: 'audio',
          app: 'material'
        },
        success: function (res) {
          myaudio = JSON.parse(res.data).data[0].filepath
        }
      })
    }

    //上传图片
    if (this.data.myimg.imgSrc == null || this.data.myimg.imgSrc == undefined) {
      imgSrc = ''
    } else {
      var n = this.data.myimg.imgSrc.length-1;
      var s=0;
      (function upArr(){
        wx.uploadFile({
          url: config.uploadFile, //仅为示例，非真实的接口地址
          filePath: that.data.myimg.imgSrc[s],
          name: 'file',
          formData: {
            filetype: 'image',
            app: 'material'
          },
          success: function (res) {
            myimgurl+= ','+JSON.parse(res.data).data[0].filepath
            if (n>s){
              s++
              upArr()
            }else{
              myimgurl.slice(1,myimgurl.length)
            }
          }
        })
      })()
    }

    //上传视频
    if (this.data.myvideo.videoSrc == null || this.data.myvideo.videoSrc == undefined) {
      videoSrc = ''
    } else {
      console.log(this.data.myvideo)
      wx.uploadFile({
        url: config.uploadFile, //仅为示例，非真实的接口地址
        filePath: this.data.myvideo.videoSrc,
        name: 'file',
        formData: {
          filetype: 'video',
          app: 'material'
        },
        success: function (res) {
          myvideoSrc = JSON.parse(res.data).data[0].filepath
        }
      })
    }
    if (that.data.bjData == '') {
      wx.showModal({
        title: '提示',
        content: '文字不能为空',
        showCancel: false,
      })
      return false
    } 
    wx.showLoading({
      title: '正在发布...',
    })
      var ti = setInterval(function () {

        
          if (audio != '' && audio != null && audio != undefined) {
            //上传了音频
            if (myaudio != null && myaudio != '' && myaudio != undefined) {
              if (imgurl != '' && imgurl != null && imgurl != undefined) {
                //上传图片
                if (myimgurl != null && myimgSrc != '' && myimgurl != undefined && s == n) {
                  if (videoSrc != '' && videoSrc != null && videoSrc != undefined) {
                    //上传视频
                    if (myvideoSrc != null && myvideoSrc != '' && myvideoSrc != undefined) {
                      //上传了图片，音频，视频都成功了
                      setJoin()
                      clearInterval(ti)
                    }
                  } else {
                    //上传了图片，音频成功
                    setJoin()
                    clearInterval(ti)
                  }
                }
              } else {
                if (videoSrc != '' && videoSrc != null && videoSrc != undefined) {
                  if (myvideoSrc != null && myvideoSrc != '' && myvideoSrc != undefined) {
                    //上传了音频，视频成功
                    setJoin()
                    clearInterval(ti)
                  }
                } else {
                  //只上传了音频成功
                  setJoin()
                  clearInterval(ti)
                }
              }
            }
          } else {
            if (imgurl != '' && imgurl != null && imgurl != undefined) {
              if (myimgurl != null && myimgurl != undefined) {
                if (videoSrc != '' && videoSrc != null && videoSrc != undefined) {
                  if (myvideoSrc != null && myvideoSrc != '' && myvideoSrc != undefined) {
                    //上传了视频，图片成功
                    setJoin()
                    clearInterval(ti)
                  }
                } else {
                  //上传了图片成功
                  setJoin()
                  clearInterval(ti)
                }
              }
            } else {
              if (videoSrc != '' && videoSrc != null && videoSrc != undefined) {
                if (myvideoSrc != null && myvideoSrc != '' && myvideoSrc != undefined) {
                  //上传了视频和音频成功

                  setJoin()
                  clearInterval(ti)
                }
              } else {
                //什么都没上传

                setJoin()
                clearInterval(ti)
              }
            }
          }
        

        // }
      }, 1000)
    // }


    function setJoin() {
      let material = ''
      if (myaudio != '') {
        console.log(11)
        material = {
          myimgurl: myimgurl.slice(1, myimgurl.length),
          time: that.data.audio_faile.duration,
          myaudio: myaudio,
          myvideoSrc: myvideoSrc
        }
      } else {
        console.log(22)
        material = {
          myimgurl: myimgurl.slice(1, myimgurl.length),
          myaudio: myaudio,
          time: 0,
          myvideoSrc: myvideoSrc
        }
      }

      console.log(JSON.stringify(material))
      var param = {
        user_id: app.globalData.user_id,
        type:1,
        jid: that.data.id,
        word: that.data.bjData,
        material: JSON.stringify(material),
        lat: app.globalData.lat,
        lng: app.globalData.lng,
        is_show: 1,
        position: that.data.adder
      }
      config.ajax("POST", param, config.setJoin, (res) => {
        //ajax访问成功函数
        wx.hideLoading()
        console.log(res)

      }, (res) => {
        //ajax访问失败函数
      }, (res) => {
        //不管成功与否都调用函数
      });
    }
  },
  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  },
  /**
 * 内容编辑
 */
  cendel: function () {
    this.setData({
      showtext: false,
      'text.info': '',
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