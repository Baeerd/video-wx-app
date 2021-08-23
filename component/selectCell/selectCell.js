// component/selectCell/selectCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      title:{type:"string", value:""},
      sheetTitle:{type:"string", value:""},
      list:{type:"Array", value:[]}
  },
  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    selectName : '',
    selectId:''
  },

  lifetimes:{
    ready() {
      this.setData({
        selectId: this.properties.list[0].id,
        selectName: this.properties.list[0].name
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    showSelectList() {
        this.setData({
            show:true
        });
    },

    // 选项关闭
    onClose() {
        this.setData({ show: false });
    },
    
    // 选项选择事件
    onSelect(event) {
        this.setData({ 
          selectId: event.detail.id,
          selectName: event.detail.name 
        });
        var myEventDetail = {'id': this.data.selectId} // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('selectAction', myEventDetail, myEventOption)
    },
  }
})
