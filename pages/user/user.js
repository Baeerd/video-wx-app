import { request } from '../../utils/request.js'
import { api } from '../../utils/api.js';

// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {
      'name':'姓名1',
      'video1' : 2,
      'video2' : 10,
      'exam1' : 3,
      'exam2' : 2,
      'fen' : 300
    },
    editNameFlag:false,
    hasUserInfo: false,
    openId:'', // 用户唯一标识
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 初始化数据
    this.initData();
  },

  //  姓名更改
  nameChange(e) {
    this.setData({['userInfo.name']: e.detail});
  },

  // TODO 更改文本框类型
  editName(e) {
    let flag = e.currentTarget.dataset['flag'];
    this.setData({editNameFlag: flag});
    if(!flag) {
      // 请求后台
      console.log('1111');
    }
  },

  initData() {
      // 根据openId获取用户信息

  },

  // 注销
  logout() {
    request(api.aaa, {
      appid: 'wxcec2524213396666',
      secret:'6e8d9bd155886b2a37ba56515322af43',
      grant_type: 'authorization_code'
    }, (res) => {
      console.log(res);
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
          hasUserInfo: true
        })
      }
    })
  }
})