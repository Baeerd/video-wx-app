// pages/video/video.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      actions: [
            {
                id:'1',
                name: '视频类别1',
            },
            {
                id:'2',
                name: '视频类别2',
            },
            {
                id:'3',
                name: '视频类别3'
            },
        ]
    },

    onSelect(e) {
        console.log(e.detail.id);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    
})