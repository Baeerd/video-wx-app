import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    // 提交人脸识别照片
    submitPhoto() {
        
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
                
                wx.reLaunch({
                    url: '/pages/video/video'
                })
                
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    }

    
})