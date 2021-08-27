// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  // 登录
  login() {
    let me = this;
    wx.login({
      success (res) {
        if (res.code) {
          // 调用 auth.code2Session，使用 code 换取 openid、unionid、session_key 等信息
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxcec2524213396666',
              secret:'6e8d9bd155886b2a37ba56515322af43',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success (res) {
              console.log(res)
              me.setData({openId: res.data.openid});
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  globalData: {
    userInfo: null
  }
})
