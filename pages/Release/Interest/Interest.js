// pages/Release/Interest/Interest.js
const config = require('../../../utils/config.js')
let app = getApp()
var moneytime = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sctype: '收藏',
    gztype: '关注',
    clickIndex: true,
    myheight: '100rpx',
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
    joinIndex: '',
    changeCard: {
      changeCard: false
    }
  },

  lookmore: function () {
    this.setData({
      myheight: 'auto'
    })
  },
  /**
* 显示名片
*/
  showCard: function () {
    console.log(1)
    this.setData({
      'changeCard.changeCard': true
    })
  },
  /**
   * 关闭名片按钮
   */
  cendelChangeCard: function () {
    this.setData({
      'changeCard.changeCard': false
    })
  },
  /**
 * 切换
 */
  clicktab(e) {
    this.setData({
      clickIndex: e.currentTarget.dataset.id
    })
  },

  /**
   * 立刻参与
   */
  rightJoin: function () {
    var that = this
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      type: 2,
      jid: that.data.id
    }, config.setJoin, (res) => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      interest_id: options.id,
      lat: app.globalData.lat,
      lng: app.globalData.lng
    }, config.interest, (res) => {
      for (let i = 0; i < res.data.data.join.length; i++) {
        res.data.data.join[i].distance = (res.data.data.join[i].distance / 1000).toFixed(2)
        res.data.data.join[i].create_time = config.timeFormat(res.data.data.join[i].create_time * 1000)
        res.data.data.join[i].duration = that.formatDuringtwo(res.data.data.join[i].time)
      }
      if (res.data.data.is_favorite == 0) {
        that.setData({
          sctype: '收藏',
        })
      } else {
        that.setData({
          sctype: '已收藏',
        })
      }
      if (res.data.data.is_concern == 0) {
        that.setData({
          gztype: '关注'
        })
      } else {
        that.setData({
          gztype: '已关注'
        })
      }
      console.log(res.data.data)
      that.setData({
        alldata: res.data.data,
      })
      that.setData({
        interestData: res.data.data,
        id: res.data.data.id,
        user_id: res.data.data.user_id
      })
    })
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
      var myarr = myjoin[that.data.joinIndex].good_list
      if (res.data.code == 1) {
        myjoin[that.data.joinIndex].is_good = 1
        myarr.push({
          user_nickname: res.data.data[0].user_nickname
        })
        myjoin[that.data.joinIndex].good_list = myarr
        that.setData({
          'alldata.join': myjoin
        })
      } else {
        myjoin[that.data.joinIndex].is_good = 0
        console.log(myarr)
        myarr = myarr.slice(0, myarr.length - 1)
        console.log(myarr)
        myjoin[that.data.joinIndex].good_list = myarr
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
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      interest_id: this.data.id
    }, config.checkInterestJoin, (res) => {
      if (res.data.code == 1) {
        wx.navigateTo({
          url: '../Publish/Publish?id=' + this.data.id + '&typeid=2',
        })
      }
    })


    // wx.navigateTo({
    //   url: '../Publish/Publish?id=' + this.data.id+'&typeid=2',
    // })
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
   * 关注
   */
  gz() {
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      concerned_id: this.data.user_id
    }, config.follow, (res) => {
      console.log(res)
      if (res.data.code == '1') {
        if (res.data.data.status == '1') {
          this.setData({
            gztype: '已关注'
          })
        } else if (res.data.data.status == '0') {
          this.setData({
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
      type: 2,
      object_id: this.data.id
    }, config.favorite, (res) => {
      console.log(res)
      if (res.data.code == 1) {
        this.setData({
          sctype: '已收藏'
        })
      } else {
        this.setData({
          sctype: '收藏'
        })
      }
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