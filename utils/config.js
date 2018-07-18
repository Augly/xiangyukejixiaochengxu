let uid = "";
const options = {
  duration: 120000,
  sampleRate: 8000,
  numberOfChannels: 2,
  encodeBitRate: 16000,
  format: 'mp3'
},
  addressList='/api/portal/User/addressList',  //通讯录

  myorder='/api/portal/User/myOrder',  //我的订单

  recommend = '/api/portal/Index/recommend',  //推荐详情

  errDetail = '/api/portal/Purchase/errDetail', //需求详情

  myBalance = '/api/portal/User/myBalance',  //用户余额

  checkInterestJoin = '/api/portal/Join/checkInterestJoin', //检查兴趣社是否可参与

  imgurl = "http://xiangyu.wx.bronet.cn/images/",

  myimgUrl = "https://xiangyu.lu.broteam.cn/public/assets/", // 图片地址

  addShare = "/api/portal/Share/setShare",

  uploadFile = "https://xiangyu.lu.broteam.cn/portal/Common/upload", //上传文件接口

  getOpenid = "/api/portal/Index/getOpenid",  //获取openid

  setInfo = '/api/portal/User/changeName',

  lists = '/api/portal/Purchase/lists',

  setJoin = '/api/portal/Join/setJoin',

  getShareDetail = '/api/portal/Share/getShareDetail',

  setInterest = '/api/portal/Interest/setInterest',

  person = '/api/portal/User/index',

  interestSort = '/api/portal/Interest/interestSort', //兴趣社分类

  insterstList = '/api/portal/Interest/interestList',

  send = '/api/portal/Purchase/send', //发布跑腿

  sendCode = '/api/portal/Common/sendCode',  //发送手机短信

  bindMobile = '/api/portal/Common/bindMobile', //绑定手机号

  sortList = '/api/portal/Interest/interestSort',

  payOrder = '/api/portal/User/payOrder',  //购买礼物提交

  joinShare = '/api/portal/User/joinShare',  //我参与的共享经验

  joinInterest = '/api/portal/User/joinInterest', //我参与的兴趣社

  joinComment = '/api/portal/Common/joinComment', //发表评论

  fans = '/api/portal/User/fans',

  myOrder = '/api/portal/User/myOrder',  //礼物变现

  withdraw = '/api/portal/User/withdraw', //提现页面

  tx = '/api/portal/User/withdraw_handle', //提现提交

  userGood = '/api/portal/Common/userGood', //点赞

  follow = '/api/portal/User/addFollow', //关注

  favorite = '/api/portal/Common/favorite', //收藏 

  Recharge = '/api/portal/User/addBalance',

  authorize = '/api/portal/Common/authorize',  //个人信息存储

  giftlist = '/api/portal/User/gift', //礼物列表

  giftBuy = '/api/portal/User/giftBuy', //购买礼物

  myGift = '/api/portal/User/myGift',  //我的背包

  myDel = '/api/portal/User/myDel',  //我的删除

  needres = '/api/portal/Purchase/errDetail',  //需求详情

  interest = '/api/portal/Interest/interestindex',

  user_share = '/api/portal/User/share',  //我发布的共享经验

  user_interest = '/api/portal/User/interest',  //我发布的兴趣社

  user_need = '/api/portal/User/need',  //我发布的需求

  user_card = '/api/portal/User/myCard',  //我的名片

  myPresentWithdraw = '/api/portal/User/myPresentWithdraw', //礼物变现

  getexper = '/api/portal/Share/getShare',

  nearly = '/api/portal/Index/nearly',  //附近

  myCollection = '/api/portal/User/myCollection',  //我的收藏

  checkMobile = '/api/portal/Common/checkMobile', //检查是否绑定过手机号

  send_present = '/api/portal/Common/send_present', //赠送礼物

  userCard = '/api/portal/Common/userCard',  //获取用户名片信息

  getShareJoinUsers='/api/portal/Share/getShareJoinUsers',  //共享经验参与成员

  getfollow = '/api/portal/User/follow',  //获取我的关注列表

  getUserChatLog='/api/portal/Common/getUserChatLog',  //获取用户聊天内容

  userChangeCard ='/api/portal/User/userChangeCard',

  gitpresent = '/api/portal/Common/present';  

//获取dataset

function getDataset(event, key) {
  return event.currentTarget.dataset[key];
}
//自定义封装ajax
function ajax(Type, params, url, successData, errorData, completeData) {
  let headerType;
  if (Type == 'POST') {
    headerType = 'application/x-www-form-urlencoded'
  } else {
    headerType = 'application/json'
  }
  const https = "https://xiangyu.lu.broteam.cn";  //主域名
  wx.request({
    url: https + url,
    method: Type,
    header: {
      'content-type': headerType,
    },
    data: params,
    success: (res) => {
      successData(res)
    },
    success: (res) => {
      successData(res)
    },
    error(res) {
      if (errorData) {
        errorData(res)
      }
    },
    complete(res) {
      if (completeData) {
        completeData(res)
      }
    }
  })
}

function pay(res, successData) {
  wx.requestPayment({
    "timeStamp": res.data.data.timeStamp,
    "nonceStr": res.data.data.nonceStr,
    "package": res.data.data.package,
    "signType": "MD5",
    "paySign": res.data.data.paySign,
    "success": function (res) {
      wx.showToast({
        title: '支付完成',
        icon: "success",
        duration: 1500,
        success: function (data) {
          successData(data)
        }
      })
    },
    "fail": function (res) {
      console.log(res)
      wx.showToast({
        title: '取消支付成功！',
        icon: "success",
        duration: 1500,
      })
    }
  })
}

/**
 * 时间转换
 */
function timeFormat(time) {
  var date = new Date(time),
    curDate = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    curYear = curDate.getFullYear(),
    curHour = curDate.getHours(),
    timeStr;
  if (minute < 10) {
    minute = '0' + minute
  }
  if (year < curYear) {
    timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
  } else {
    var pastTime = curDate - date,
      pastH = pastTime / 3600000;

    if (pastH > curHour) {
      timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
    } else if (pastH >= 1) {
      timeStr = '今天 ' + hour + ':' + minute + '分';
    } else {
      var pastM = curDate.getMinutes() - minute;
      if (pastM > 1) {
        timeStr = pastM + '分钟前';
      } else {
        timeStr = '刚刚';
      }
    }
  }
  return timeStr;
}

/**
 * 时间转换
 */
function timeFormatNotime(time) {
  var date = new Date(time * 1000),
    curDate = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    curYear = curDate.getFullYear(),
    curHour = curDate.getHours(),
    timeStr;
  if (minute < 10) {
    minute = '0' + minute
  }
  if (year < curYear) {
    timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
  } else {
    var pastTime = curDate - date,
      pastH = pastTime / 3600000;

    if (pastH > curHour) {
      timeStr = month + '月' + day + '日 ';
    } else if (pastH >= 1) {
      timeStr = '今天 ' + hour + ':' + minute + '分';
    } else {
      var pastM = curDate.getMinutes() - minute;
      if (pastM > 1) {
        timeStr = pastM + '分钟前';
      } else {
        timeStr = '刚刚';
      }
    }
  }
  return timeStr;
}
/**
 * 封装自定义优美的toast
 */
function mytoast(main, successData) {
  wx.showToast({
    title: main,
    icon: 'none',
    mask: true,
    success: function (res) {
      if (successData){
        setTimeout((res) => {
          successData(res)
        }, 1500)
      }
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}
/**
 * 选择图片
 */
function chooseImage(successData) {
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: (res) => {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      // var tempFilePaths = res.tempFilePaths
      successData(res)
    }
  })
}
/**
 * 登录
 */
module.exports = {
  chooseImage: chooseImage,
  mytoast: mytoast,
  addressList: addressList,
  myorder: myorder,
  myDel: myDel,
  needres: needres,
  recommend: recommend,
  nearly: nearly,
  myCollection: myCollection,
  user_card: user_card,
  user_need: user_need,
  user_interest: user_interest,
  user_share: user_share,
  myBalance: myBalance,
  getfollow: getfollow,
  errDetail: errDetail,
  payOrder: payOrder,
  send_present: send_present,
  tx: tx,
  withdraw: withdraw,
  interest: interest,
  joinInterest: joinInterest,
  joinShare: joinShare,
  getDataset: getDataset,
  uid: uid,
  checkInterestJoin: checkInterestJoin,
  setInfo: setInfo,
  ajax: ajax,
  getOpenid: getOpenid,
  options: options,
  uploadFile: uploadFile,
  addShare: addShare,
  myimgUrl: myimgUrl,
  getexper: getexper,
  setInterest: setInterest,
  person: person,
  insterstList: insterstList,
  sortList: sortList,
  fans: fans,
  interestSort: interestSort,
  send: send,
  lists: lists,
  timeFormat: timeFormat,
  timeFormatNotime: timeFormatNotime,
  getShareDetail: getShareDetail,
  setJoin: setJoin,
  userGood: userGood,
  follow: follow,
  favorite: favorite,
  joinComment: joinComment,
  Recharge: Recharge,
  pay: pay,
  gitpresent: gitpresent,
  userCard: userCard,
  sendCode: sendCode,
  bindMobile: bindMobile,
  checkMobile: checkMobile,
  giftlist: giftlist,
  giftBuy: giftBuy,
  myGift: myGift,
  authorize: authorize,
  myPresentWithdraw: myPresentWithdraw,
  imgurl: imgurl,
  getShareJoinUsers: getShareJoinUsers,
  getUserChatLog: getUserChatLog,
  userChangeCard: userChangeCard
}