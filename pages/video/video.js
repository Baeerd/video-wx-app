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
        ],
        videos : [
            {"id":1, "name":"视频视频1", "flag":"1"},
            {"id":2, "name":"视频视频2", "flag":"1"},
            {"id":3, "name":"视频视频3", "flag":"0"},
            {"id":4, "name":"视频视频4", "flag":"0"},
            {"id":5, "name":"视频视频5", "flag":"0"},
            {"id":6, "name":"视频视频6", "flag":"0"},
            {"id":7, "name":"视频视频7", "flag":"0"},
            {"id":8, "name":"视频视频8", "flag":"0"},
            {"id":9, "name":"视频视频9", "flag":"0"},
            {"id":10, "name":"视频视频10", "flag":"0"},
            {"id":11, "name":"视频视频11", "flag":"0"},
            {"id":12, "name":"视频视频12", "flag":"0"},
            {"id":13, "name":"视频视频13", "flag":"0"},
            {"id":14, "name":"视频视频14", "flag":"0"},
            {"id":15, "name":"视频视频15", "flag":"0"},
            {"id":16, "name":"视频视频16", "flag":"0"}
        ],

        video:{},

        currentVideoIndex: 0,//当前播放视频的数组下标
        lastCurrentTime : 0,// 记录上次视频进度条位置
        duration : 0// 记录视频总时长
    },

    // 列表选择
    onSelect(e) {
        console.log(e.detail.id);
        // TODO 请求后台获取最新视频列表
        
    },

    // 拖动视频进度后恢复原位
    timeupdate(e) {
        // 如果是已经看过的视频，可以随意拖拽进度条
        if(this.isViewOver()) {
            return;
        }
        let {currentTime, duration} = e.detail;
        this.setData({duration, duration});
        if(currentTime - this.data.lastCurrentTime > 1) {
            this.videoContext.seek(this.data.lastCurrentTime);
            this.videoContext.play()
        }
        this.setData({ lastCurrentTime: currentTime })
    },

    // 视频播放结束
    playerEnd(e) {
        // 已经看过的视频不做处理
        if(this.isViewOver()) {
            return;
        }
        console.log(this.data.lastCurrentTime);
        console.log(this.data.duration);
        if(this.data.duration - this.data.lastCurrentTime < 1) {
            let flag = "videos[" + this.data.currentVideoIndex + "].flag";
            this.setData({ [flag]: '1' });
            // TODO 通知后台视频播放结束， ?自动播放下一个视频

        }
    },

    // 视频选择事件
    playVideo(e) {
        let index = e.currentTarget.dataset['index'];
        this.setData({currentVideoIndex: index});
        this.clearVideoChche();
        this.setData({video: this.data.videos[index]});
        this.videoContext.seek(this.data.lastCurrentTime);
    },

    // 清除缓存的视频信息
    clearVideoChche() {
        this.setData({
            lastCurrentTime : 0,// 记录上次视频进度条位置
            duration : 0// 记录视频总时长
        });
    },

    // 判断当前视频是否已经看过
     isViewOver() {
        return this.data.videos[this.data.currentVideoIndex].flag==='1';
     },

     // 初始化数据
     initData() {
        // TODO 初始化视频类别下拉框
        // TODO 初始化第一个视频类别下的视频列表
        // 初始化第一个视频
        this.setData({video: this.data.videos[this.data.currentVideoIndex]});
     },

   /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function(res) {
        this.videoContext = wx.createVideoContext('video');
        // 初始化数据
        this.initData();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
       
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