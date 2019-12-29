// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partData:{},
    allPay:0, //总花费
    allCount:false //全选时为true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //初始化，读取本地购物车缓存商品
  getData(){
    let that = this;
    wx.getStorage({
      key: 'cartArray',
      success(res) {
        res.data.forEach(function(val){
          val.selected=false;
        })
       
        that.setData({
          partData:res.data
        })
      }
    })
  }, 
  selected(e){
    let id = e.target.dataset.name;
    let data = this.data.partData;
    let allCount = true;//全选开关

    for(let val in data){
      if (data[val].id === id) {
        data[val].selected = !data[val].selected;
        //计算合计钱
        let allPay = 0;
        data.forEach(function(val){
          if(val.selected){
            allPay += Number(val.price);
          }else{
            allCount=false;
          }
        });
        
        this.setData({
          partData:data, 
          allPay:allPay,
          allCount:allCount
        })
      }
    }
  },
  //全选事件
  AllSelect:function(){
    let data = this.data.partData;
    let allCount = !this.data.allCount;//全选判断的开关，true全选

    if(allCount){
      data.forEach(function (val) {
        val.selected=true;
      })
    }else{
      data.forEach(function (val) {
        val.selected = false;
      })
    }

    this.setData({
      partData:data,
      allCount: allCount
    })
  }  
})