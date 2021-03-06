// pages/Release/experience_res/experience_res.js
let app = getApp()
const config = require('../../../utils/config.js')
var moneytime = ''
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

    getfous: false,
    send_iptValue: '评论',
    gift: false,
    word: '',
    mid: '',
    joinIndex: ''
  },
  /**
   * * 输入框获得焦点 
   */
  myipt(event) {
    console.log(config.getDataset(event, 'id'))
    console.log(config.getDataset(event, 'index'))
    this.setData({
      getfous: true,
      joinIndex: config.getDataset(event, 'index'),
      mid: config.getDataset(event, 'id')
    })
  },
  /**
   * 点赞
   */
  joinzan(event) {
    var that = this
    this.setData({
      joinIndex: config.getDataset(event, 'index'),
      mid: config.getDataset(event, 'id')
    })
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      type: 6,
      jid: this.data.mid
    }, config.userGood, (res) => {
      console.log(res)
      var myjoin = that.data.alldata.join
      console.log(myjoin[that.data.joinIndex].good_list)
      if (res.data.code == 1) {
        myjoin[that.data.joinIndex].is_good = 1
        var myarr = myjoin[that.data.joinIndex].good_list

        myarr.push({
          user_nickname: res.data.data[0].user_nickname
        })
        myjoin[that.data.joinIndex].good_list = myarr
        console.log(myjoin[that.data.joinIndex].good_list)
        that.setData({
          'alldata.join': myjoin
        })
      } else {
        myjoin[that.data.joinIndex].is_good = 0
        //  function checkAdult(age) {
        //    return age == '';
        //  }
        that.setData({
          'alldata.join': myjoin
        })
      }
    })
  },
  /**
   * 评论
   */
  pl(e) {
    this.setData({
      word: e.detail.value
    })
  },
  /**
   * 发送消息
   */
  send() {
    var that = this
    if (this.data.word == '') {
      wx.showModal({
        title: '提示',
        content: '评论不能为空',
        showCancel: false
      })
    } else {
      config.ajax('POST', {
        user_id: app.globalData.user_id,
        join_id: this.data.mid,
        word: this.data.word
      }, config.joinComment, (res) => {
        console.log(res)
        if (res.data.code == 1) {
          var plArr = that.data.alldata.join;
          plArr[that.data.joinIndex].comment_list.push(res.data.data[0])
          that.setData({
            'alldata.join': plArr
          })
          console.log(that.data.alldata)
        }
      })
    }
  },
  /** 
   * * 输入框失去焦点 
   * 
   * */
  sendgift: function () {
    this.setData({
      gift: true,
    })
  },
  hidegift() {
    this.setData({
      gift: false,
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
    console.log(options)
    var that = this
    that.setData({
      id: options.id,
      need_id: options.userid
    })

    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
    })
    this.innerAudioContext.onPlay((res) => {
      console.log(res)
    })
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      lat: app.globalData.lat,
      lng: app.globalData.lng,
      need_id: options.id,
      type:2
    }, config.errDetail, (res) => {
      console.log(res)
      let myaudio = {
        src: res.data.data.media,
        time: res.data.data.time
      }
      // for (let i = 0; i < res.data.data.join.length; i++) {
      //   res.data.data.join[i].distance = (res.data.data.join[i].distance / 1000).toFixed(2)
      //   res.data.data.join[i].create_time = config.timeFormat(res.data.data.join[i].create_time * 1000)
      //   res.data.data.join[i].duration = that.formatDuringtwo(res.data.data.join[i].time)
      // }
      if (res.data.data.count == 0) {
        that.setData({
          iszan: false,
        })
      } else {
        that.setData({
          iszan: true,
        })
      }
      if (res.data.data.fabulous == 0) {
        that.setData({
          issc: false,
          sctype: '收藏'
        })
      } else {
        that.setData({
          issc: true,
          sctype: '已收藏'
        })
      }
      that.setData({
        alldata: res.data.data,
        myaudio: myaudio,
        'myvideo.videoSrc': res.data.data.video,
        time: res.data.data.time
      })
      moneytime = that.data.time;
      that.setData({
        'myaudio.duration': that.formatDuringtwo(that.data.myaudio.time),
      })

    })

  },
  /**
   * 播放音频
   */
  playaudio() {
    var that = this;
    var mytime = that.data.time
    if (mytime > moneytime) {

    } else {
      console.log(2)
      that.innerAudioContext.src = that.data.myaudio.src;
      that.innerAudioContext.play()
      var timeclone = setInterval(function () {
        moneytime -= 1000;
        if (moneytime < 1000) {
          clearInterval(timeclone)
          moneytime = mytime
        }
        that.setData({
          'myaudio.duration': that.formatDuringtwo(moneytime),
        })
      }, 1000)
    }

  },

  /**
   * 播放参与的东西
   */

  playjoinaudio(event) {
    var that = this;
    let index = config.getDataset(event, 'id')
    this.innerAudioContext.src = config.getDataset(event, 'src');
    this.innerAudioContext.play()
    var join = that.data.alldata.join
    var mytime = join[index].time;
    var moneytime = join[index].time;
    if (mytime > moneytime) {

    } else {
      clearInterval(timeclone)
      var timeclone = setInterval(function () {
        if (join[index].time < 1000) {
          clearInterval(timeclone)
          join[index].time = moneytime
        }
        join[index].time -= 1000;
        join[index].duration = that.formatDuringtwo(join[index].time);
        that.setData({
          'alldata.join': join,
        })
      }, 1000)
    }
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
      need_id: that.data.id,
      type:2
    }, config.errDetail, (res) => {
      console.log(res)
      let myaudio = {
        src: res.data.data.media,
        time: res.data.data.time
      }
      // for (let i = 0; i < res.data.data.join.length; i++) {
      //   res.data.data.join[i].distance = (res.data.data.join[i].distance / 1000).toFixed(2)
      //   res.data.data.join[i].create_time = config.timeFormat(res.data.data.join[i].create_time * 1000)
      //   res.data.data.join[i].duration = that.formatDuringtwo(res.data.data.join[i].time)
      // }
      that.setData({
        alldata: res.data.data,
        myaudio: myaudio,
        'myvideo.videoSrc': res.data.data.video,
        time: res.data.data.time
      })
      that.setData({
        'myaudio.duration': that.formatDuringtwo(that.data.myaudio.time),
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
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      concerned_id: this.data.alldata.user_id
    }, config.follow, (res) => {
      console.log(res)
      if (res.data.code == '1') {
        if (res.data.data.status == '1') {
          this.setData({
            isgz: true,
            gztype: '已关注'
          })
        } else if (res.data.data.status == '0') {
          this.setData({
            isgz: false,
            gztype: '关注'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '不可关注自己',
            showCancel: false,
          })
        }
      }

    })

  },
  /**
   * 收藏
   */

  sc() {
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      type: 1,
      object_id: this.data.id
    }, config.favorite, (res) => {
      console.log(res)
      if (res.data.code == 1) {
        this.setData({
          issc: true,
          sctype: '已收藏'
        })
      } else {
        this.setData({
          issc: false,
          sctype: '收藏'
        })
      }
    })
  },
  /**
   *点赞 
   */
  zan() {
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      type: 1,
      jid: this.data.id
    }, config.userGood, (res) => {
      console.log(res)
      if (res.data.code == 1) {
        this.setData({
          iszan: true,
          'alldata.good_count': res.data.data[0].count
        })
      } else {
        this.setData({
          iszan: false,
          'alldata.good_count': res.data.data[0].count
        })
      }
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