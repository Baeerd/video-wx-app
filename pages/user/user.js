import { request } from '../../utils/request.js'
import { api } from '../../utils/api.js';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

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
    score:0,
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
  },


//事件处理函数
testRenlian () {
  let me = this;
  const ctx = wx.createCameraContext() //创建相机上下文
  ctx.takePhoto({
    quality: 'high', //获取原图
    success: (res) => {
      console.log(res.tempImagePath);

      wx.showToast({
        title: '鉴定中，请稍候',
        icon: 'loading',
        duration: 5000
      })

      wx.uploadFile({
        url: 'https://api-cn.faceplusplus.com/facepp/v3/detect', //仅为示例，非真实的接口地址
        header: {
          'content-type': 'multipart/form-data'
        },
        filePath: res.tempImagePath,
        name: 'image_file',
        formData: {
          'api_key':'U6Ulb3ok97Zugi63vDPcwE-27BzEai4D',
          'api_secret':'NJQwiAf4cNxXA00Ywn0jOp9NRAlae5bV',
          'return_attributes': "gender,age,ethnicity,beauty,skinstatus"
        },
        success: function (res) {
          wx.hideToast();
          console.log(res);
          var data = JSON.parse(res.data);
          var face_token = data.faces[0].face_token;
          console.log(face_token);
          

          wx.request({
            url: 'https://api-cn.faceplusplus.com/facepp/v3/compare',
            method: 'POST',
            dataType: "json",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              'api_key':'U6Ulb3ok97Zugi63vDPcwE-27BzEai4D',
              'api_secret':'NJQwiAf4cNxXA00Ywn0jOp9NRAlae5bV',
              'image_url1':'https://636c-cloud1-5gvqvnv2069f6684-1307004666.tcb.qcloud.la/02.jpg?sign=0c3b979228b4a1a9d040f19e8a147825&t=1630371693',
              'face_token2': face_token
            },
            success : (response)=> {
              console.log(response);
              Dialog.alert({
                title: '分数',
                message: '人脸识别分数：'+response.data.confidence,
                theme: 'round-button',
              }).then(() => {
                me.setData({score: response.data.confidence});
              });
            }
          })



        }, fail: (response)=> {
          var r = JSON.stringify(response);
          Dialog.alert({
            title: '人脸识别失败',
            message: r,
            theme: 'round-button',
          }).then(() => {
            me.setData({score: r});
          });
        }
      });





    }
  })
},
error(e) {
  console.log(e.detail)
}

})