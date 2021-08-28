const app = getApp()

let request = (url, data, callback) => {
    wx.request({
        url: url,
        method: 'POST',
        header: {"openId": app.globalData.openId },
        data: data,
        success : callback
      })
}

export { request };