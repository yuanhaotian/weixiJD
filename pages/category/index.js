// pages/category/index.js
let url = require('../../utils/urlconfig.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems:[],
    navRightItems:[],
    curIndex:0  //当前选中的分类
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
  // 页面初始化加载数据
  getData:function(){
    wx.showLoading({
      title: '加载中'
    })
    let that = this;
    wx.request({
      url: url.productions,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          navLeftItems: res.data.navLeftItems,
          navRightItems: res.data.navRightItems
        });
        wx.hideLoading();
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
  // 点击改变左侧nav颜色
  chgeIndex:function(e){
    let index=e.target.dataset.index;
    this.setData({
      curIndex:index
    })
  },
  // 点击商品，跳到商品详情页面
  goTo:function(e){
    let txt = e.currentTarget.dataset.txt;

    wx.navigateTo({
      url: '/pages/list/index?title=' + txt
    })
  }
})