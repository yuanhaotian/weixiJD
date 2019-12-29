// component/add/add.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    partData:{
      type:Object,
      value:{}
    },
    hideAdd:{
      type:Boolean,
      value:true
    },
    count:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tempCount:0 //动态添加，没有点击加入关闭窗口，用于恢复操作前数量
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击阴影，叉 关闭
    closeAdd:function(e){
      if(e.target.dataset.name=="addSelf"){
        this.setData({
          hideAdd:false
        });
        this.triggerEvent('getCount', this.data.count);
         
        //点击阴影部分关闭，不添加
        // if(this.data.tempCount){
        //   this.setData({
        //     count:this.data.tempCount
        //   })
        //   this.triggerEvent('getCount', this.data.count);
        // }
      }
    },
    // 点击加入购物车，隐藏
    addcount:function(){
      this.setData({
        hideAdd: false
      })
      this.triggerEvent('getCount', this.data.count);
    },
    // 父子组件间，传递，所选商品数量
    getCount:function(e){
      this.setData({
        count:e.detail
      })
    }
  }
})
