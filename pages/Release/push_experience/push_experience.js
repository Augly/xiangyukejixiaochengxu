// pages/Release/push_experience/push_experience.js
const config = require("../../../utils/config.js");
var time = config.options.duration;  //获取预定时间
var timeclone = null; //  开始录音时的定时器
var mytime = null; //录音文件的时间
var playTime = null;  //试听的时间
let app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showtext: false,  //文字是否显示
    audioshow: false,  //录音组件是否显示
    showaudio: true,  //是否显示录音组件
    playType: true,  //是否可以试听
    sendgift: false,
    myvideo: {
      controls: false,
      videoSrc: null
    },
    myaudio: null,
    myimg: {
      imgSrc: null
    },
    bugGroup: {
      buy_number: 1
    },
    img: {
      imgurl: 'http://xiangyu.wx.bronet.cn/images/jiajia@2x.png'
    },
    audio: {  //音频组件的数据
      mytype: 'start',  //显示类型
      showTime: null,  //显示的已录制时间
      loadingTime: 0,  //剩余录音时间
      audioTime: 0, //
      trylisten: true
    },
    text:{
      info:null
    },
    adder:{
      adder:null
    },
    myallkind:{
      index:0,
      kindarray:['种类一','种类二','种类三'],
      seletMain:1
    },
    description:{
      descriptioncontent:''
    }
  },
  /**
   * 作者介绍
   */
  description:function(e){
    this.setData({
      'description.descriptioncontent': e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type=='兴趣'){
      wx.setNavigationBarTitle({
        title: '发布兴趣'
      })
      this.setData({
        showtext:true
      })
    }else{
      wx.setNavigationBarTitle({
        title: '发布共享经验'
      })
    }
    config.ajax('POST', {}, config.interestSort,(res)=>{
      console.log(res.data.data)
      this.setData({
        'myallkind.kindarray':res.data.data[0]
      })
    })
    this.setData({
      title:options.title,
      'adder.adder': app.globalData.adder,
      'type': options.type
    });
    var that = this;
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
   * 内容编辑
   */
  cendel: function () {
    this.setData({
      showtext: false,
      'text.info': '',
    })
  },
  /**
   * 上传封面图
   */
  upwrapimg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'img.imgurl': res.tempFilePaths
        })
      }
    })
  },
  /**
   * 选择种类
   */
  bindPickerKind:function(e){
    var that=this
    this.setData({
      'myallkind.index': e.detail.value,
      'myallkind.seletMain': that.data.myallkind.kindarray[that.data.myallkind.index].id
    })
  },
  /**
   * 送礼设置开关
   */
  switch1Change: function (res) {
    console.log(res.detail.value)
    if (res.detail.value==true){
      this.setData({
        sendgift:true
      })
    } else {
      this.setData({
        sendgift: false
      })}
  },

  jian:function(){
    this.setData({
      'bugGroup.buy_number': this.data.bugGroup.buy_number--
    })
  },
  jia:function(){
    this.setData({
      'bugGroup.buy_number': this.data.bugGroup.buy_number++
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


  subtext:function(e){
    this.setData({
      'text.info':e.detail.value,
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
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
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
  /**
   * 发布
   */
  push: function () {
    //参数对象
    var that=this
    

    let audio, myaudio = '', imgSrc, myimgSrc = '', videoSrc, myvideoSrc = '', imgurl, myimgurl = '', info, sendgift, giftnumber = this.data.bugGroup.buy_number;
    //封面图
    if (this.data.img.imgurl == 'http://xiangyu.wx.bronet.cn/images/jiajia@2x.png' || this.data.img.imgurl == undefined || this.data.img.imgurl == null) {
      wx.showModal({
        title: '提示',
        content: '请上传封面照片',
        showCancel: false,
      })
      return false
    }else{
      console.log(this.data.img.imgurl)
      wx.uploadFile({
        url: config.uploadFile, //仅为示例，非真实的接口地址
        filePath: this.data.img.imgurl[0],
        name: 'file',
        formData: {
          filetype: 'image',
          app: 'material'
        },
        success: function (res) {
          console.log(JSON.parse(res.data))
          myimgSrc = JSON.parse(res.data).data[0].filepath

        }
      })
    }



    //上传音频
    if (this.data.myaudio == null || this.data.myaudio == undefined) {
      audio = ''
    }else{
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
    }else{
      console.log(this.data.myimg)
      wx.uploadFile({
        url: config.uploadFile, //仅为示例，非真实的接口地址
        filePath: this.data.myimg.imgSrc[0],
        name: 'file',
        formData: {
          filetype: 'image',
          app: 'material'
        },
        success: function (res) {
          myimgurl = JSON.parse(res.data).data[0].filepath
        }
      })
    }

    //上传视频
    if (this.data.myvideo.videoSrc == null || this.data.myvideo.videoSrc == undefined) {
      videoSrc = ''
    }else{
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

    //礼物开关
    if (this.data.sendgift==true){
      sendgift=1
    }else{
      sendgift=0
    }
    //文字说明
    if (this.data.text.info == null || this.data.text.info == undefined) {
      wx.showModal({
        title: '提示',
        content: '请添加文字说明',
        showCancel: false,
      })
      return false
    } else {
      wx.showLoading({
        title: '正在发布...',
      })
      var ti = setInterval(function () {
        if (myimgSrc != null || myimgSrc != undefined) {
          if (audio != '' && audio != null && audio != undefined) {
            //上传了音频
            if (myaudio != null && myaudio != '' && myaudio != undefined) {
              if (imgurl != '' && imgurl != null && imgurl != undefined) {
                //上传图片
                if (myimgurl != null && myimgSrc != '' && myimgurl != undefined) {
                  if (videoSrc != '' && videoSrc != null && videoSrc != undefined) {
                    //上传视频
                    if (myvideoSrc != null && myvideoSrc != '' && myvideoSrc != undefined) {
                      //上传了图片，音频，视频都成功了
                      wx.hideLoading()
                      if(that.data.type=='兴趣'){
                        getins()
                      } else if (that.data.type == '共享经验'){
                        getshare()
                      }
                      clearInterval(ti)
                    }
                  } else {
                    //上传了图片，音频成功
                    wx.hideLoading()
                    if (that.data.type == '兴趣') {
                      getins()
                    } else if (that.data.type == '共享经验') {
                      getshare()
                    }
                    clearInterval(ti)
                  }
                }
              } else {
                if (videoSrc != '' && videoSrc != null && videoSrc != undefined) {
                  if (myvideoSrc != null && myvideoSrc != '' && myvideoSrc != undefined) {
                    //上传了音频，视频成功
                    wx.hideLoading()
                    if (that.data.type == '兴趣') {
                      getins()
                    } else if (that.data.type == '共享经验') {
                      getshare()
                    }
                    clearInterval(ti)
                  }
                } else {
                  //只上传了音频成功
                  wx.hideLoading()
                  if (that.data.type == '兴趣') {
                    getins()
                  } else if (that.data.type == '共享经验') {
                    getshare()
                  }
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
                    wx.hideLoading()
                    if (that.data.type == '兴趣') {
                      getins()
                    } else if (that.data.type == '共享经验') {
                      getshare()
                    }
                    clearInterval(ti)
                  }
                } else {
                  //上传了图片成功
                  wx.hideLoading()
                  if (that.data.type == '兴趣') {
                    getins()
                  } else if (that.data.type == '共享经验') {
                    getshare()
                  }
                  clearInterval(ti)
                }
              }
            } else {
              if (videoSrc != '' && videoSrc != null && videoSrc != undefined) {
                if (myvideoSrc != null && myvideoSrc != '' && myvideoSrc != undefined) {
                  //上传了视频和音频成功
                  wx.hideLoading()
                  if (that.data.type == '兴趣') {
                    getins()

                  } else if (that.data.type == '共享经验') {
                    getshare()
                  }
                  clearInterval(ti)
                }
              } else {
                //什么都没上传
                wx.hideLoading()
                if (that.data.type == '兴趣') {
                  getins()
                } else if (that.data.type == '共享经验') {
                  getshare()
                }
                clearInterval(ti)
              }
            }
          }
        }
      }, 1000)
    }


    function getshare(){
      let material=''
      console.log(myaudio)
      if (myaudio!=''){
        console.log(11)
        material = {
          myimgurl: myimgurl,
          time: that.data.audio_faile.duration,
          myaudio: myaudio,
          myvideoSrc: myvideoSrc
        }
      }else{
        console.log(22)
        material = {
          myimgurl: myimgurl,
          myaudio: myaudio,
          time:0,
          myvideoSrc: myvideoSrc
        }
      }
     
      console.log(JSON.stringify(material))
      var param = {
        user_id: app.globalData.user_id,
        title: that.data.title,
        thumb: myimgSrc,
        word: that.data.text.info,
        material: JSON.stringify(material),
        lat: app.globalData.lat,
        lng: app.globalData.lng,
        is_present: sendgift,
        num: giftnumber,
        position: that.data.adder.adder
      }
      config.ajax("POST", param, config.addShare, (res) => {
        //ajax访问成功函数
        console.log(res)
       
      }, (res) => {
        //ajax访问失败函数
      }, (res) => {
        //不管成功与否都调用函数
      });
    }

    function getins() {
      // let material = ''
      // console.log(myaudio)
      // if (myaudio != '') {
      //   console.log(11)
      //   material = {
      //     myimgurl: myimgurl,
      //     time: that.data.audio_faile.duration,
      //     myaudio: myaudio,
      //     myvideoSrc: myvideoSrc
      //   }
      // } else {
      //   console.log(22)
      //   material = {
      //     myimgurl: myimgurl,
      //     myaudio: myaudio,
      //     time: 0,
      //     myvideoSrc: myvideoSrc
      //   }
      // }
      var param = {
        user_id: app.globalData.user_id,
        sort_id: that.data.myallkind.seletMain,
        title: that.data.title,
        thumb: myimgSrc,
        word: that.data.text.info,
        // material: JSON.stringify(material),
        description: that.data.description.descriptioncontent,
        lat: app.globalData.lat,
        lng: app.globalData.lng,
        is_present: sendgift,
        num: giftnumber,
        position: that.data.adder.adder,
      }
      config.ajax("POST", param, config.setInterest, (res) => {
        //ajax访问成功函数
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
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})