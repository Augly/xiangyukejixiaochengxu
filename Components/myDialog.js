
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    config:{
      type:Object,
      value:{
        wrapBgcor:'RGBA(0, 0, 0, 0.8)',
        myDialogBgcor:'rgba(255, 255, 255, 1)',
        myDialogMain:'你好测试!',
        myDialogWidth:'686rpx',
        myDialog_contentPadding:'66rpx 119rpx',
        myDialog_contentFs:'36rpx',
        myDialog_bottonFs:'36rpx',
        myDialog_delMain:'取消',
        myDialog_delBgcor:'RGBA(235, 235, 235, 1)',
        myDialog_delCor:'RGBA(0, 0, 0,1)',
        myDialog_sendMain:'确认',
        myDialog_sendBgcor:'RGBA(152, 97, 225, 1)',
        myDialog_sendCor:'RGBA(255, 255, 255, 1)',
        showCel:true
      }
    },
    isShow:{
      type: Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hidemyDialog(){
      this.setData({
        isShow:false
      })
    },
    myDialogCel(){
      this.triggerEvent('mycel')
    },
    myDialogSend(){
      this.triggerEvent('mysend')
    },
  }
})
