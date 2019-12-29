// component/IOU/iou.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iouData:{
      type:Array,
      value:''
    },
    hideIou:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex:0 //当前选中的分期
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideIou:function(e){
      if (e.target.dataset.target=="iouSelf"){
        this.setData({
          hideIou:false
        })
      }
    },
    // 点击对号或取消对号
    iscorrent: function (e) {
      // console.log(e.currentTarget.dataset.index,this.data)
      let index = e.currentTarget.dataset.index;
      this.data.iouData.forEach(function(val,index){
        if(val.select){
          val.select = false;
        }
      });
      this.data.iouData[index].select = true;

      this.setData({
        iouData:this.data.iouData,
        selectIndex:index
      })
    },
    // 点击立即打白条事件
    makeIou:function(e){
      //隐藏遮罩层
      this.setData({
        hideIou: false
      })
      let index = this.data.selectIndex;
      this.triggerEvent('updataSelect',index);
    }
  }
})
