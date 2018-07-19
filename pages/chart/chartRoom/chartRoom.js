// pages/chart/chartRoom/chartRoom.js
const config = require("../../../utils/config.js");
var time = config.options.duration;  //获取预定时间
var timeclone = null; //  开始录音时的定时器
var mytime = null; //录音文件的时间
var playTime = null;  //试听的时间
let app = getApp()
let concatWrap = null,
  page = 1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    more: false,
    loglist: [],
    audioshow: false,  //录音组件是否显示
    showaudio: true,  //是否显示录音组件
    playType: true,  //是否可以试听
    audio: {  //音频组件的数据
      mytype: 'start',  //显示类型
      showTime: null,  //显示的已录制时间
      loadingTime: 0,  //剩余录音时间
      audioTime: 0, //
      trylisten: true
    },
  },
  getMore() {
    wx.showLoading({
      title: '获取历史信息...',
      mask: true,
      success: (res) => {
        config.ajax('POST', {
          send_id: app.globalData.user_id,
          recieve_id: app.globalData.formId,
          page: page
        }, config.getUserChatLog, (res) => {
          if (res.data.data.length != 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].date = config.timeFormatNotime(res.data.data[i].date)
              for (var n = 0; n < res.data.data[i].list.length; n++) {
                res.data.data[i].list[n].create_time = config.timeFormat(res.data.data[i].list[n].create_time)
              }
            }
            var alldata = this.data.loglist
            alldata.unshift(res.data.data[0])
            this.setData({
              loglist: alldata,
              myTop: 0,
              myTopOne: 9
            })
            page++
            setTimeout((res) => {
              wx.hideLoading()
            }, 1500)
          } else {
            config.mytoast('没有更多数据了')
          }

        }, (res) => {

        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })
    // config.mytoast('正在获取更多数据', (res) => {

    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      uid: app.globalData.user_id
    })
    config.ajax('POST', {
      send_id: app.globalData.user_id,
      recieve_id: app.globalData.formId,
      page: 1
    }, config.getUserChatLog, (res) => {
      console.log(res)
      for (var i = 0; i < res.data.data.length; i++) {
        res.data.data[i].date = config.timeFormatNotime(res.data.data[i].date)
        for (var n = 0; n < res.data.data[i].list.length; n++) {
          res.data.data[i].list[n].create_time = config.timeFormat(res.data.data[i].list[n].create_time)
        }
      }
      if (res.data.data.length != 0) {
        this.setData({
          loglist: res.data.data,
          myTop: res.data.data.length - 1,
          myTopOne: res.data.data[res.data.data.length - 1].list.length - 1
        })
      }
    }, (res) => {

    })
    try {
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            myheight: res.windowHeight - res.windowWidth / 750 * 150
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    catch (err) {
      wx.showToast({
        title: '获取设备信息失败',
        icon: 'none',
        mask: true,
      })
    }
    finally {

    }
    this.toastedit = this.selectComponent("#myDialog")
    console.log(this.toastedit)
    var that = this
    var senddata = {
      userId: app.globalData.user_id,
      formId: app.globalData.formId
    }
    wx.connectSocket({
      url: 'wss://xiangyu.lu.broteam.cn:9501',
      data: '刘朕是大傻逼！哈哈',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        wx.onSocketOpen(function (res) {
          console.log('WebSocket连接已打开！')
          wx.sendSocketMessage({
            data: JSON.stringify(senddata),
            success: function (res) {
              console.log(res)

              console.log('第一次发送111')
            },
            fail: function () {
              console.log('发送失败')
            },
            complete: function () {
              // console.log(23)
            }
          })
        })

        wx.onSocketMessage(function (res) {
          console.log('收到消息')
          console.log(res)
          // console.log(JSON.parse(res.data))
          console.log(concatWrap)
          if (res.data == '' || res.data == '{"msg":"连接成功"}') {

          } else {
            var alldata = that.data.loglist
            if (concatWrap == undefined || concatWrap == null) {
              concatWrap = {
                date: config.timeFormatNotime(JSON.parse(res.data).create_time),
                list: [JSON.parse(res.data)]
              }
              alldata.push(concatWrap)
            } else {
              concatWrap.list.push(JSON.parse(res.data))
              alldata[alldata.length - 1] = concatWrap
            }
            that.setData({
              loglist: alldata,
              myTop: alldata.length - 1,
              myTopOne: alldata[alldata.length - 1].list.length - 1,
              more: false
            })
          }

          // var data = JSON.parse(res.data)
          // console.log(JSON.parse(data))
          // console.log(JSON.parse(res.data))
          // this.setData({
          //   alldata: JSON.parse(res.data)
          // })
          // console.log('收到服务器内容：' + res.data)
        })
        wx.onSocketClose(function (res) {
          console.log('WebSocket 已关闭！')
        })
        wx.onSocketError(function (res) {
          console.log('WebSocket连接打开失败，请检查！')
        })
      },
      fail: function () {
        console.log(res)
      }
    })
    that.setData({
      // title: options.title,
      'adder.adder': app.globalData.adder,
      // 'type': options.type
    });

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
  DialogSend() {
    this.setData({
      isShow: false
    })
    console.log('点击了确认')
  },
  DialogCel() {
    console.log('点击了取消')
  },
  /**
   * 点击开启视频，语音发送
   */
  more() {
    this.setData({
      more: !this.data.more,
      myTop: this.data.myTop,
      myTopOne: this.data.myTopOne
    })
  },
  /**
   * 选择照片
   */
  addPhoto() {
    config.chooseImage((res) => {
      console.log(res)
      wx.uploadFile({
        url: config.uploadFile, //仅为示例，非真实的接口地址
        filePath: res.tempFilePaths[0],
        name: 'file',
        formData: {
          filetype: 'image',
          app: 'material'
        },
        success: function (res) {
          console.log(JSON.parse(res.data))
          var myimgSrc = JSON.parse(res.data).data[0].url

          var data = JSON.stringify({
            userId: app.globalData.user_id,
            formId: app.globalData.formId,
            image: myimgSrc
          })

          wx.sendSocketMessage({
            data: data,
            success: function (res) {
              console.log(res)
            },
            fail: function () {
              console.log('发送失败')
            },
            complete: function () {

            }
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      config: {
        wrapBgcor: 'RGBA(0, 0, 0, 0.8)',   //wrap背景色
        myDialogBgcor: 'rgba(255, 255, 255, 1)', //Dialog背景色
        myDialogMain: '你好呀',  //Dialog内容
        myDialogWidth: '686rpx',  //Dialog宽度
        myDialog_contentPadding: '66rpx 119rpx',  //Dialog内容padding
        myDialog_contentFs: '36rpx',  //Dialog内容字号
        myDialog_bottonFs: '36rpx',  //Dialog按钮字号
        myDialog_delMain: '取消',  //Dialog取消文字
        myDialog_delBgcor: 'RGBA(235, 235, 235, 1)',  //Dialog取消按钮里面的
        myDialog_delCor: 'RGBA(0, 0, 0,1)',
        myDialog_sendMain: '确认',
        myDialog_sendBgcor: 'RGBA(152, 97, 225, 1)',
        myDialog_sendCor: 'RGBA(255, 255, 255, 1)',
        showCel: true
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  myipt(e) {
    this.setData({
      main: e.detail.value
    })
  },
  send(e) {
    var data = JSON.stringify({
      userId: app.globalData.user_id,
      formId: app.globalData.formId,
      word: e.detail.value || this.data.main
    })
    wx.sendSocketMessage({
      data: data,
      success: function (res) {
        console.log(res)
      },
      fail: function () {
        console.log('发送失败')
      },
      complete: function () {
        // console.log(23)
      }
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
    * 添加录音
    */
  addaudio: function () {
    console.log(1)
    var that = this
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
    //上传音频
    if (this.data.myaudio == null || this.data.myaudio == undefined) {
      var audio = ''
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
          console.log(res)
          var myaudio = JSON.parse(res.data).data[0].filepath

          var data = JSON.stringify({
            userId: app.globalData.user_id,
            formId: app.globalData.formId,
            media: myaudio
          })
          wx.sendSocketMessage({
            data: data,
            success: function (res) {
              console.log(res)
            },
            fail: function () {
              console.log('发送失败')
            },
            complete: function () {
              // console.log(23)
            }
          })


        }
      })
    }

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
  play(e) {
    console.log(e.currentTarget.dataset.src)
    var that = this;
    this.innerAudioContext.stop()
    this.innerAudioContext.src = e.currentTarget.dataset.src;
    this.innerAudioContext.play()
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

  },
  /**
 * 生命周期函数--监听页面隐藏
 */
  onHide: function () {
    this.innerAudioContext.stop()
  },

})