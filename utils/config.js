let uid = "";
const options = {
  duration: 120000,
  sampleRate: 8000,
  numberOfChannels: 2,
  encodeBitRate: 16000,
  format: 'mp3'
},

myimgUrl ="https://xiangyu.lu.broteam.cn/public/assets/", // 图片地址

addShare ="/api/portal/Share/setShare",

uploadFile ="https://xiangyu.lu.broteam.cn/portal/Common/upload", //上传文件接口

getOpenid = "/api/portal/Index/getOpenid",  //获取openid

setInfo ='/api/portal/User/changeName',

lists ='/api/portal/Purchase/lists',

setJoin ='/api/portal/Join/setJoin',

getShareDetail ='/api/portal/Share/getShareDetail',

setInterest ='/api/portal/Interest/setInterest',

person ='/api/portal/User/index',

interestSort ='/api/portal/Interest/interestSort', //兴趣社分类

insterstList ='/api/portal/Interest/interestList',

send ='/api/portal/Purchase/send', //发布跑腿

sortList ='/api/portal/Interest/interestSort',

fans ='/api/portal/User/fans',

follow ='/api/portal/User/follow', //关注

getexper ='/api/portal/Share/getShare';

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
};


/**
 * 时间转换
 */
function timeFormat(time) {
  var date = new Date(time),
    curDate = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 10,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    curYear = curDate.getFullYear(),
    curHour = curDate.getHours(),
    timeStr;

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
 * 登录
 */
module.exports = {
  getDataset: getDataset,
  uid: uid,
  setInfo: setInfo,
  ajax: ajax,
  getOpenid: getOpenid,
  options: options,
  uploadFile: uploadFile,
  addShare: addShare,
  myimgUrl:myimgUrl,
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
  getShareDetail: getShareDetail,
  setJoin: setJoin
}