// component/amount/amount.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count:{
      type:Number,
      value:0
    },
    total:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addNum:function(){
      //改做一个判断，但是数据问题，先不做了
      // if (this.data.count < this.data.total){ //添加数量 小于 现有商品数量
      //   this.setData({
      //     count: ++this.data.count
      //   });
      // }else{
      //   wx.showToast({
      //     title: '商品存货不足',
      //     icon: 'success',
      //     duration: 2000//持续的时间
      //   })
      // }

      this.setData({
        count: ++this.data.count
      });
      this.triggerEvent('getCount', this.data.count);
    },
    ReduceNum:function(){
      if (this.data.count > 0) { 
        this.setData({
          count: --this.data.count
        });
      }

      this.triggerEvent('getCount', this.data.count);
    }
  }
})
