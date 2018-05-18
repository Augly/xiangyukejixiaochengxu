let uid = "";
const options = {
  duration: 120000,
  sampleRate:8000,
  numberOfChannels: 2,
  encodeBitRate: 16000,
  format:'mp3'
}
const getOpenid = "/api/portal/Index/getOpenid";  //获取openid
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
 * 登录
 */
module.exports = {
  getDataset: getDataset,
  uid: uid,
  ajax: ajax,
  getOpenid: getOpenid,
  options: options
}