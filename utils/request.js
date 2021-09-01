const app = getApp()

let request = (url, data, callback) => {
  // 拦截请求
  if(!app.globalData.token) {
    wx.reLaunch({
      url: '/pages/login/login'
    })
    return;
  }

  wx.request({
      url: url,
      method: 'POST',
      header: {"openId": app.globalData.openId },
      data: data,
      success : callback
    })
}

export { request };