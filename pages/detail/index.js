// pages/detail/index.js
let url = require("../../utils/urlconfig.js");//数据接口

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baitiao:[],
    partData:{},
    desc:"【白条支付】首单立减优惠",
    IouHide:false,  //false隐藏遮罩层
    cartHide:false,  //购物车遮罩层
    addHide:false, //加入购物车组件 遮罩层
    count:0,//购物车内商品内容
    allCount:0, //页面最下方购物车，右上角数字
    id:0 //当前打开的这个商品id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.getData(id);
  
    let that = this;
    wx.getStorage({
      key: "cartArray",
      success: function(res) {
        res.data.forEach(function(val){
          if(val.id==id){
            that.setData({
              count: val.count,
              id:id//存这件商品的id，showAdd函数中用
            })
          }
        })
      }
    })
    //更新allCount数据
    wx.getStorage({
      key:"cartArray",
      success(res) {
        that.setData({
          allCount: res.data.length
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

  },
  // 获取页面数据
  getData:function(id){
    let that = this;

    wx.request({
      url: url.productionDetail,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        res.data.forEach(function(val,index){
          if(val.partData.id===id){
            that.setData({
              baitiao:val.baitiao,
              partData:val.partData
            });
          }
        });
      }
    })
  },
  // 组件支付
  popBaitiaoView:function(){
    this.setData({
      IouHide:true
    });
  },
  // 组件已选
  popBuyView: function () {
    this.setData({
      IouHide: true
    });
  },
  // 更新分期选择，显示文字
  updataSelect:function(e){
    this.setData({
      desc:this.data.baitiao[e.detail].desc
    });
  },
  //点击显示或隐藏购物车组件
  showCart:function(){
    //显示数字图标
    this.setData({ 
      cartHide:true
    })
    //跳到购物车页面
    wx.switchTab({
      url:'/pages/cart/index'
    })
  },
  // 点击显示add组件
  showAdd:function(options){
    let that=this;
    this.setData({
      addHide: true
    })
  },
  // 添加商品的件数，传给子组件
  getCount:function(e){
    let that = this;
    this.setData({
      count:e.detail
    })
    // 点击加入，已选组件关闭时，更新缓存商品件数
    wx.getStorage({
      key: 'cartArray',
      success: function(res) {
        let cartArray=res.data;
        cartArray.forEach(function(val){
          if(val.id==that.data.id){
            val.count = e.detail;

            wx:wx.setStorage({
              key: 'cartArray',
              data: cartArray
            })
          }
        });
      },
    })
  },
  // 点击加入购物车
  addEvent:function(){
    let that = this;
    let key = this.data.partData.id;
    let tempCount = 0;
    //先取本地数据有没有，有添加，没有加数据再添加数量
    wx.getStorage({
      key: "cartArray",
      success(res) {
        let data = res.data; //存起来修改值，在保存本地覆盖原数据
        let isExit = false;
        data.forEach(function(val){
          if(val.id==key){
            isExit=true; 
            wx.showToast({
              title: '已加入购物车',
              icon: 'success',
              duration: 2000
            })
          }
        })

        if(!isExit){
          data.push(that.data.partData);
          wx.setStorage({
            key: 'cartArray',
            data: data,
          })
        }

        that.setData({
          allCount: res.data.length//全选开关更新
        })
        // wx.getStorage({
        //   key: "cartArray",
        //   success(res) {
            // let tempCount = 1;
            // res.data.forEach(function(val){
            //   if(that.data.id==val.id){
            //     tempCount=val.id;
            //   }
            // })

          //   that.setData({
          //     allCount: res.data.length//更新allCount数据
          //     // count: tempCount //更新count数据
          //   })
          // }
        // })
      },
      fail(){
        //没有这一个数据，就原来基础上添加
        let partData =  that.data.partData;
        let cartArray=[];

        cartArray.push(partData);
        wx.setStorage({
          key: "cartArray",
          data: cartArray
        })

        //加入购物车弹窗
        wx.showToast({
          title: '已加入购物车',
          icon: 'success',
          duration: 2000
        })

        wx.getStorage({
          key:"cartArray",
          success(res) {
            that.setData({
              allCount: res.data.length,//更新allCount数据
              count:1 //更新count数据
            })
          }
        })
      }
    })
  }
})