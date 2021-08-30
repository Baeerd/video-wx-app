// app.js
App({
  onLaunch() {
    
  },

  onShow () {
    // 界面加载直接获取用户唯一标识
    this.initOpenId();
  },

  // 获取用户唯一标识
  initOpenId() {
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
              me.globalData.openId = res.data.openid;
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  globalData: {
    openId : ""
  }
})
