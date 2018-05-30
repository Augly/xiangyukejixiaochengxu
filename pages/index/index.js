//index.js
//获取应用实例
const app = getApp();
const config = require("../../utils/config.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    index:1,
    myindex:1,
    myimgUrl: config.myimgUrl,
    imgUrls: [
      'http://xiangyu.wx.bronet.cn/images/abanner@2x.png',
      'http://xiangyu.wx.bronet.cn/images/abanner@2x.png',
      'http://xiangyu.wx.bronet.cn/images/abanner@2x.png',
    ],
    note:[
      {
        title: '为爱的人准备礼物',
        mian_imgurl: 'http://xiangyu.wx.bronet.cn/images/e01@2x.png',
        authur_imgurl: 'http://xiangyu.wx.bronet.cn/images/apic01@2x.png',
        authur_name: '仇益阳',
        authur_adder: '天津.建国楼',
        authur_distance: '0.5km',
        authur_called: true,
        authur_type: 'type_one',
        authur_act: 'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
      },
      {
        title: '为爱的人准备礼物',
        mian_imgurl: 'http://xiangyu.wx.bronet.cn/images/e01@2x.png',
        authur_imgurl: 'http://xiangyu.wx.bronet.cn/images/apic01@2x.png',
        authur_name: '仇益阳',
        authur_adder: '天津.建国楼',
        authur_distance: '0.5km',
        authur_called: true,
        authur_type: 'type_one',
        authur_act: 'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
      },
       {
        title: '为爱的人准备礼物',
        mian_imgurl: 'http://xiangyu.wx.bronet.cn/images/e01@2x.png',
        authur_imgurl: 'http://xiangyu.wx.bronet.cn/images/apic01@2x.png',
        authur_name: '仇益阳',
        authur_adder: '天津.建国楼',
        authur_distance: '0.5km',
        authur_called: true,
        authur_type: 'type_one',
        authur_act:'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
      },
       {
         title: '为爱的人准备礼物',
         mian_imgurl: 'http://xiangyu.wx.bronet.cn/images/e01@2x.png',
         authur_imgurl: 'http://xiangyu.wx.bronet.cn/images/apic01@2x.png',
         authur_name: '仇益阳',
         authur_adder: '天津.建国楼',
         authur_distance: '0.5km',
         authur_called: true,
         authur_type: 'type_one',
         authur_act: 'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
       },
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    circular:true,
    true: true,
    scrollView:{
      width:'100%',
      height:'100%',
    },
    selectIndex:0
  },

  //事件处理函数
  navClick: function(event) {
    var that=this
    this.setData({
      index: event.currentTarget.dataset.id
    })
    if (event.currentTarget.dataset.id=='2'){
      //获取共享经验数据
      wx.showLoading({
        title: '加载中',
        mask:true
      })
      config.ajax('POST', {
        user_id: app.globalData.user_id,
        lat: app.globalData.lat,
        lng: app.globalData.lng
      }, config.getexper, (res) => {
        console.log(res.data.data.list)

        for (let i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].distance = (res.data.data.list[i].distance / 1000).toFixed(2)
        }
        that.setData({
          note: res.data.data.list
        })
        wx.hideLoading()
      })
    } else if (event.currentTarget.dataset.id == '3'){
      //获取兴趣社数据
      wx.showLoading({
        title: '加载中...',
        mask: true,
      })
      config.ajax('POST', {}, config.interestSort, (res) => {
        console.log(res.data.data)
        that.setData({
          interestSort: res.data.data
        })
        
      })

      config.ajax('POST', {
        user_id: app.globalData.user_id,
        lat: app.globalData.lat,
        lng: app.globalData.lng,
        sort_id:''
      }, config.insterstList, (res) => {
        
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].distance = (res.data.data[i].distance / 1000).toFixed(2);
          res.data.data[i].authur_act = 'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
        }
        console.log(res.data.data)
        // that.setData({
        //   interestList: res.data.data
        // })

        // for(let n=0;n<res.data.data.length;n++){
          
        // }
        that.setData({
          interestList: res.data.data
        })
        wx.hideLoading()
      })
    } else if (event.currentTarget.dataset.id == '4') {
      //获取需求数据
      wx.showLoading({
        title: '加载中...',
        mask: true,
      })
      config.ajax('POST', {
        type: that.data.myindex,
        user_id: app.globalData.user_id,
        lat: app.globalData.lat,
        lng: app.globalData.lng,
      }, config.lists, (res) => {
        wx.hideLoading()
        for (let n = 0; n < res.data.data.length; n++) {
          res.data.data[n].create_time = config.timeFormat(res.data.data[n].create_time*1000)
        }
        that.setData({
          demindlist: res.data.data
        })
        console.log(res.data.data)
        // that.setData({
        //   interestSort: res.data.data
        // })

      })

      // config.ajax('POST', {
      //   user_id: app.globalData.user_id,
      //   lat: app.globalData.lat,
      //   lng: app.globalData.lng,
      //   sort_id: ''
      // }, config.insterstList, (res) => {

      //   for (let i = 0; i < res.data.data.length; i++) {
      //     res.data.data[i].distance = (res.data.data[i].distance / 1000).toFixed(2);
      //     res.data.data[i].authur_act = 'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
      //   }
      //   console.log(res.data.data)
      //   // that.setData({
      //   //   interestList: res.data.data
      //   // })

      //   // for(let n=0;n<res.data.data.length;n++){

      //   // }
      //   that.setData({
      //     interestList: res.data.data
      //   })
      //   wx.hideLoading()
      // })
    }
  },

  select_active:function(e){
    this.setData({
      selectIndex: e.currentTarget.dataset.index
    })
  },
  demindtap:function(event){
    var that=this
    this.setData({
      myindex: event.currentTarget.dataset.id
    })
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    config.ajax('POST', {
      type: that.data.myindex,
      user_id: app.globalData.user_id,
      lat: app.globalData.lat,
      lng: app.globalData.lng,
    }, config.lists, (res) => {
      wx.hideLoading()
      console.log(res.data.data)
      for(let n=0;n<res.data.data.length;n++){
        res.data.data[n].distance = (res.data.data[n].distance / 1000).toFixed(2);
        res.data.data[n].create_time = config.timeFormat(res.data.data[n].create_time*1000)
      }
      that.setData({
        demindlist: res.data.data
      })
      console.log(res.data.data)

    })
  },
  /**
   * 查看共享经验详情
   */
  lookres:function(e){
    wx.navigateTo({
      url: '../Release/experience_res/experience_res?share_id=' + e.currentTarget.dataset.id,
    })
  },
  scrolltolower:function(){
      console.log(1)
  },
  /**
   * 获取设备信息
   */
  getSystemInfo(){
    let that=this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          'scrollView.height': res.windowHeight+'px',
        })
      }
    })
  },
  onLoad: function () {
    this.setData({
      imgurl: app.globalData.imgurl
    })
    this.getSystemInfo()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
