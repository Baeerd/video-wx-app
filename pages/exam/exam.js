// pages/exam/exam.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        answer:[], //答案数组
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
        ],
        examList : [
            {
                id: 1,
                question: "1.问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题1",
                type:"1",// 1-单选； 2-多选
                selections: [
                    { value: 'A', name: '选项一' },{ value: 'B', name: '选项二' },{ value: 'C', name: '选项三' },{ value: 'D', name: '选项四' }
                ]
            },
            {
                id: 2,
                question: "2.问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题2",
                type:"2",// 1-单选； 2-多选
                selections: [
                    { value: 'A', name: '选项一' },{ value: 'B', name: '选项二' },{ value: 'C', name: '选项三' },{ value: 'D', name: '选项四' }
                ]
            },
            {
                id: 3,
                question: "3.问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题3",
                type:"2",// 1-单选； 2-多选
                selections: [
                    { value: 'A', name: '选项一' },{ value: 'B', name: '选项二' },{ value: 'C', name: '选项三' },{ value: 'D', name: '选项四' }
                ]
            },
            {
                id: 4,
                question: "4.问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问问题问题问题问题题问题4",
                type:"1",// 1-单选； 2-多选
                selections: [
                    { value: 'A', name: '选项一' },{ value: 'B', name: '选项二' },{ value: 'C', name: '选项三' },{ value: 'D', name: '选项四' }
                ]
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 初始化数据
        this.initData();
    },

     // 初始化数据
     initData() {
        // TODO 初始化试卷类别下拉框
        // TODO 初始化第一个试卷类别下的试题
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
                Dialog.alert({
                    title: '无法提交',
                    message: '您还有部分题目未完成，请检查后重新提交',
                    theme: 'round-button',
                  }).then(() => {
                    me.setData({
                        id: i,
                    })
                  });
                return;
            }
            i++;
        }
        // 提示交卷
        Dialog.confirm({
            title: '提示',
            message: '是否确认交卷',
        })
        .then(() => {
            // on confirm
            console.log(me.data.answer);
            // 调用接口
        })
        .catch(() => {
            // on cancel
        });
    },

    // 滑动改变事件
    swiperChange(current) {
        this.setData({
            id: current.detail.current,
        })
    }
      
   
})