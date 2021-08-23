// pages/exam/exam.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        answer:[],
        actions: [
            {
                id:'1',
                name: '试卷1',
            },
            {
                id:'2',
                name: '试卷2',
            },
            {
                id:'3',
                name: '试卷3'
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 试卷选择事件
    onSelect(e) {
        console.log(e.detail.id);
    },

    radioChange(e) {
        let ansArr = this.data.answer;
        ansArr[this.data.id] = e.detail.value;
        this.setData({
          answer: ansArr,
        })
        console.log(this.data.answer);
    },

    // 下一题
    nextq(e) {
        this.setData({
          id: this.data.id + 1,
        })
      },
       
      // 上一题
      lastq (e) {
          this.setData({
            id: this.data.id - 1,
          })
      },


    // 提交
    formSubmit() {
        // 校验是否全部选择
        let ansArr = this.data.answer;
        console.log(ansArr);
        let i = 0;
        let me = this;
        while(i<ansArr.length) {
            if(!ansArr[i]||ansArr[i].length==0) {
                wx.showModal({
                    title: '无法提交',
                    content: '您还有部分题目未完成，请检查后重新提交',
                    showCancel: false,
                    confirmColor: '#fcbe39',
                    confirmText: "好的",
                    success(res) {
                    me.setData({
                        id: i,
                    })
                    }
                })
                return;
            }
            i++;
        }
        // 提示交卷
        wx.showModal({
            title: '提示',
            content: '是否确认交卷',
            showCancel: true,
            confirmColor: '#fcbe39',
            confirmText: "交卷",
            success(res) {
                console.log(me.data.answer);
                // 调用接口
            }
        })
    },

    // 滑动改变事件
    swiperChange(current) {
        this.setData({
            id: current.detail.current,
        })
    }
      
   
})