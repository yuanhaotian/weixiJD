// pages/list/index.js
let url = require('../../utils/urlconfig.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    productionsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
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
  // 获取初始数据
  getData: function () {
    wx.showLoading({
      title: '加载中'
    })
    let that = this;
    wx.request({
      url: url.productionsList,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          productionsList: res.data
        })
        wx.hideLoading()
      },
      fali() {
        //防止没成功，还显示加载中图标
        wx.showModel({
          title: '提示',
          content: '数据加载失败，请重新加载！',
          success: function (res) {
            if (res.confirm) {
              //点击确定
              that.getData();
            }
          }
        });
        wx.hideLoading();
      }
    })
  },
  // 下拉刷新，重加载数据
  onPullDownRefresh: function(){
    this.getData();
  },
  // 跳转到商品详情页
  goTo:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/index?id='+id  
    })
  }
})