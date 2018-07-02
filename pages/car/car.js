// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      quan:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  del(e){ 
    wx.removeStorage({
      key: this.data.list[e.target.id].name,
      success: function (res) {
      }
    })
    this.loa()
  },
  ti(){
    wx.navigateTo({
      url: '../buy/buy'
    })
    wx.showToast({
      title: '正在提交....',
      icon: 'loading',
      duration: 2000
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
  loa(){
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    this.setData({
      list: []
    })
    wx.getStorageInfo({
      success: (res => {
        var list = res.keys.splice(1, res.keys.length)
        console.log(list)
        for (var i = 0; i < list.length; i++) {
          wx.getStorage({
            key: list[i],
            success: (res => {
              var list = this.data.list
              list.push(JSON.parse(res.data))
              this.setData({
                list: list
              })
            })
          })
        }
      })
    })
  },
  onShow: function () {
    this.loa()
  },
  up(e) {
    console.log(e)
    var list = this.data.list
    if (e.currentTarget.dataset.id == 2) {
      list[e.currentTarget.id].liang++
    } else if (e.currentTarget.dataset.id == 1) {
      if (list[e.currentTarget.id].liang > 1) {
        list[e.currentTarget.id].liang--
      }
    } else if (e.currentTarget.dataset.id == 3) {
      list[e.currentTarget.id].bool = !list[e.currentTarget.id].bool
    }
   
    var m = JSON.stringify(list[e.currentTarget.id])
    wx.setStorage({
      key: list[e.currentTarget.id].name,
      data:m ,
    })
    this.setData({
      list: list
    })
    this.zongjia()
  },
  quan() {
    var list = this.data.list
    if (this.data.quan != true) {
      for (var i = 0; i < this.data.list.length; i++) {
        list[i].bool = true
      }
      this.setData({
        list: list,
        quan: !this.data.quan
      })
    } else {
      for (var i = 0; i < this.data.list.length; i++) {
        list[i].bool = false
      }
      this.setData({
        list: list,
        quan: !this.data.quan
      })
    }
    this.zongjia()
  },
  zongjia() {
    var str = 0
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].bool) {
        str += this.data.list[i].price * this.data.list[i].liang
      }
    }
    this.setData({
      zong: str
    })
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