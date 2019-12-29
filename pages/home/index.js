// pages/home/index.js
let url=require("../../utils/urlconfig.js");//数据接口

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerUrl:[], //轮播图
    log:[], //小图标分类
    quicks: [] //swiper滑动图文
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: url.homepage,
      header: {
        'content-type': 'application/json' 
      },
      success(res) {
        // console.log(res.data)
        let logData = [];
        let quicksData=[];
        res.data.logos.forEach(function(value,index){
          let str = '../../image/home/'+value.image.split("/").pop();
          logData.push({
            image:str,
            title:value.title
          })
        });

        res.data.quicks.forEach(function (val, index){ 
            let str = '../../image/home/' + val.image.split("/").pop();
            quicksData.push({
              image:str,
              price:val.price
            });
          }
        )
        // console.log(quicksData,666)
        that.setData({
          log: logData,
          quicks: quicksData,
          bannerUrl: res.data.swipers.map(item => '../../image/home/' + item.image.split("/").pop())
        })      
      }
    })
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

  }
})