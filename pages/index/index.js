// pages/index/index.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataimg:[],
      datalist:[],
      activeid:0,
      message:[],
      title:[],
      
  },
  meimg(e){
    wx.navigateTo({
      url: `/pages/mess/mess?id=${e.currentTarget.dataset.id}`,
    })
  },
  tapName(e) {
    this.setData({
      activeid: e.target.id
    })
    wx.request({
      url: `${app.globalData.userUrl}shop/goods/list?categoryId=${e.target.id}`, //仅为示例，并非真实的接口地址
      success: (res => {
        
        this.setData({
          message: res.data.data
        })
      })
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: `${app.globalData.userUrl}banner/list`, //仅为示例，并非真实的接口地址
      success: (res=>{
        this.setData({
          dataimg: res.data.data
        })
      })  
    }),
      wx.request({
      url: `${app.globalData.userUrl}notice/list`, //仅为示例，并非真实的接口地址
        success: (res => {
                    console.log(res.data.data.dataList)
          this.setData({
            title: res.data.data.dataList
          })
        })
      }),
      wx.request({
        url: `${app.globalData.userUrl}shop/goods/list`, //仅为示例，并非真实的接口地址
        success: (res => {

          this.setData({
            message: res.data.data
          })
        })
      }),
    wx.request({
      url: `${app.globalData.userUrl}/shop/goods/category/all`, //仅为示例，并非真实的接口地址
      success: (res => {
        var list = res.data.data
        list.unshift({
          name:'全部',
          id:0
        })
        console.log(list)
        this.setData({
          datalist: list
        })
      })
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