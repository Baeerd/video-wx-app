import { request } from '../../utils/request.js'
import { api } from '../../utils/api.js';

// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    openId:'', // 用户唯一标识
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  // 注销
  logout() {
    request(api.aaa, {
      appid: 'wxcec2524213396666',
      secret:'6e8d9bd155886b2a37ba56515322af43',
      grant_type: 'authorization_code'
    }, (res) => {
      console.log('success');
      console.log(res);
      console.log('success');
    });
  },

  // 登录
  login() {
    this.setData({
      openId: app.globalData.openId
    });
    this.getUserProfile();
  },

  onLoad() {
    let me = this;
    wx.getSetting({
      success (res) {
        me.setData({hasUserInfo: res.authSetting["scope.userInfo"]});
      }
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
})
