// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        usernameCheck:false,
        passwordCheck:false,
        user: {
            username:"",
            password:""
        }
    },

    // 登录
    login() {
        // 验证
        if(!this.data.user.username) {
            this.setData({usernameCheck: true});
            return;
        };
        if(!this.data.user.password) {
            this.setData({passwordCheck: true}); 
            return;
        }
        // 记录用户名密码到Storage中
        wx.setStorage({
            "key":"userInfo",
            data:{
                "username":this.data.user.username,
                "password":this.data.user.password
            }
        });
        // 人脸识别
        if(!this.faceCheck()) {
            return;
        }
        // TODO 登录
        wx.reLaunch({
            url: '/pages/video/video'
        })
    },

    usernameChange(e) {
        this.setData({['user.username']: e.detail});
    },

    passwordChange(e) {
        this.setData({['user.password']: e.detail});
    },

    // 人脸识别方法
    faceCheck() {
        wx.navigateTo({
            url: '/pages/face/face'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let res = wx.getStorageSync('userInfo');
        this.setData({user: res});
    }
})