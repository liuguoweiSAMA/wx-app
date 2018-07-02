// pages/mess/mess.js
var app=getApp()

var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
        datalist:[],
        showModal:false,
        gui:[],
        ling:[],
        liang:1,
        pro:[],
        price:0,
        car:true
  },
  model(){
      this.setData({
        showModal:true,
        car:true
      })
  },
  model1() {
    this.setData({
      showModal: true,
      car:false
    })
  },
   close() {
    this.setData({
      showModal: false
    })
  },
  down(){
    var a = this.data.liang;
    if(a>1){
      a--
      this.setData({
        liang: a
      })
    }
    this.qian()
  },
  up() {
    var a = this.data.liang;
    a++
    this.setData({
      liang:a
    })
    this.qian()
  },
  changeCatoy(e) {
    console.log(e.target.dataset.grade);
    console.log(e.target.dataset.index);
    for (let i = 0; i < this.data.pro[e.target.dataset.grade].childsCurGoods.length; i++) {
      this.data.pro[e.target.dataset.grade].childsCurGoods[i].active = false;

    }
    this.data.pro[e.target.dataset.grade].childsCurGoods[e.target.dataset.index].active = true;
    this.setData({
      pro: this.data.pro
    })
      this.qian()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      liang:1
    })
      wx.request({
        url: `${app.globalData.userUrl}/shop/goods/detail?id=${options.id}`, //仅为示例，并非真实的接口地址
        success: (res => {
          console.log(res.data.data)
          WxParse.wxParse('article', 'html', res.data.data.content, this, 5);
          WxParse.wxParse('article2', 'html', res.data.data.title, this, 5);         
            if (res.data.data.properties != null){
              var data = res.data.data.properties;
              for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].childsCurGoods.length; j++) {
                  console.log(data[i].childsCurGoods[j])
                  data[i].childsCurGoods[j].active = false;
                }
              }
              this.setData({
                gooddetail: res.data.data.basicInfo,
                pro: data,
                id: options.id,
                price: res.data.data.basicInfo.minPrice,
                price1: res.data.data.basicInfo.minPrice,
              })
          }else{
              this.setData({
                gooddetail: res.data.data.basicInfo,
                id: options.id,
                price: res.data.data.basicInfo.minPrice,
                price1: res.data.data.basicInfo.minPrice
              })
          } 
        })
      })
  },
  tijiao() {
    var cansub = this.cansubmit();
  },
  qian(){
    if (this.data.pro != "") {
      var arr = [];
      var pro = this.data.pro;
      for (var i = 0; i < pro.length; i++) {
        for (var j = 0; j < pro[i].childsCurGoods.length; j++) {
          if (pro[i].childsCurGoods[j].active == true) {
            arr.push(pro[i].childsCurGoods[j])
            break;
          }
        }
      }
      var str = ""
      for (let k = 0; k < arr.length; k++) {
        str += arr[k].propertyId + ":" + arr[k].id + ","
      }
      console.log(str)
     
      var that = this;
      wx.request({
        url: "https://api.it120.cc/gxx/shop/goods/price?goodsId=" + that.data.id + "&propertyChildIds=" + str.substr(0, str.length - 1),
        success: (res => {
          console.log(res.data)
          if (res.data.code == 405) {
            return false;
          } else if (res.data.code == 600) {
            console.log("缺少参数")
            return false;
          } else {
            var price = (res.data.data.price) * this.data.liang
            this.setData({
              price: price
            })
          }
        })
      })
    }else{
      var price = this.data.price1 * this.data.liang
      this.setData({
        price: price
      })
    }
  },
  cansubmit() {
    if (this.data.pro!=""){
        var arr = [];
        var pro = this.data.pro;
        for (var i = 0; i < pro.length; i++) {
          for (var j = 0; j < pro[i].childsCurGoods.length; j++) {
            if (pro[i].childsCurGoods[j].active == true) {
              arr.push( pro[i].childsCurGoods[j] )
              break;
            }
          }
        }
        var str = ""
        for (let k = 0; k < arr.length; k++) {
          str += arr[k].propertyId + ":" + arr[k].id + ","

        }
        console.log(str)
        var that = this;
        wx.request({
          url: "https://api.it120.cc/gxx/shop/goods/price?goodsId=" + that.data.id + "&propertyChildIds=" + str.substr(0, str.length - 1),
          success: (res => {
            console.log(res.data)
            if (res.data.code == 405) {
              return false;
            } else if (res.data.code == 600) {
              console.log("缺少参数")
              return false;
            } else {
              if(this.data.car){
                console.log(this.data)
                res.data.data.liang=this.data.liang;
                res.data.data.name = this.data.gooddetail.name;
                res.data.data.pic = this.data.gooddetail.pic;
                res.data.data.unit = this.data.price1;
                res.data.data.bool=false;
                var res=JSON.stringify(res.data.data)
                wx.setStorage({
                  key: this.data.gooddetail.name,
                  data: res,
                })
                this.setData({
                  showModal: false
                })
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                  console.log("加入购物车")
              }else{
                wx.navigateTo({
                  url: '../buy/buy'
                })
                wx.showToast({
                  title: '正在跳转....',
                  icon: 'loading',
                  duration: 2000
                })
                console.log("点击购买")
              }
            }
          })
        })
    } else {
      var res={}
      if (this.data.car) {
        res.liang = this.data.liang;
        res.name = this.data.gooddetail.name;
        res.pic = this.data.gooddetail.pic;
        res.price = this.data.price
        var res = JSON.stringify(res)
        wx.setStorage({
          key: this.data.gooddetail.name,
          data: res
        })
        this.setData({
          showModal: false
        })
        console.log("加入购物车")
        wx.showToast({
          title: '添加购物车成功',
          iconColor: 'green',
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.navigateTo({
          url: '../buy/buy'
        })
        wx.showToast({
          title: '正在跳转....',
          icon: 'loading',
          duration: 2000
        })
        console.log("点击购买")
      }
    }
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