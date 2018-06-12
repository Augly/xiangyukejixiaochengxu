//index.js
//获取应用实例
const config=require('../../utils/config.js')
let app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    index: 1,
    myindex: 1,
    imgUrls: [
      'http://xiangyu.wx.bronet.cn/images/abanner@2x.png',
      'http://xiangyu.wx.bronet.cn/images/abanner@2x.png',
      'http://xiangyu.wx.bronet.cn/images/abanner@2x.png',
    ],
    note: [
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
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    circular: true,
    scrollView: {
      width: '100%',
      height: '100%',
    }
  },
  //事件处理函数
  navClick: function (event) {
    // var _type=''
    var that=this
    this.setData({
      index: event.currentTarget.dataset.id
    })
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      type: event.currentTarget.dataset.id,
      lat: app.globalData.lat,
      lng: app.globalData.lng
    }, config.myCollection, (res) => {
      console.log(res)
      if(res.data.data.length==0){
        that.setData({
          note: []
        })
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
        })
      }else{
        for (let i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].distance = (res.data.data.list[i].distance / 1000).toFixed(1)
        }
        that.setData({
          note: res.data.data.list
        })
      }
     
      //赋值给数据note
     
    })

    // if (event.currentTarget.dataset.id==1){
    //   _type=1
    // } else if (event.currentTarget.dataset.id == 2) {
    //   _type=2
    // } else if (event.currentTarget.dataset.id == 3) {
    //   _type
    // }else{

    // }
  },
  demindtap: function (event) {
    this.setData({
      myindex: event.currentTarget.dataset.id
    })
  },
  scrolltolower: function () {
    console.log(1)
  },
  /**
   * 获取设备信息
   */
  getSystemInfo() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          'scrollView.height': res.windowHeight + 'px',
        })
      }
    })
  },
  onLoad: function () {
    var that=this
    this.setData({
      imgurl: app.globalData.imgurl
    })
    this.getSystemInfo()
    config.ajax('POST',{
      user_id: app.globalData.user_id,
      type:1,
      lat: app.globalData.lat,
      lng: app.globalData.lng
    }, config.myCollection,(res)=>{
      for (let i = 0; i < res.data.data.list.length; i++) {
        res.data.data.list[i].distance = (res.data.data.list[i].distance / 1000).toFixed(1)
      }
      console.log(res.data.data.list)
      //赋值给数据note
      that.setData({
        note: res.data.data.list
      })
    })
  },
})
