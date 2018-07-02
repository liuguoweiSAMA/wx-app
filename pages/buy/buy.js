// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      list: [],
      arr:[]
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
              if (i == list.length){
                  for(var j=0;j<list.length;j++){
                    if(list[j].bool){
                      var arr=this.data.arr
                      arr.push(list[j])
                      this.setData({
                        arr:arr
                      })
                      
                    }
                  }
              } 
            })
          })
        }
      })
    })
    setTimeout(this.me,0)
   
  },
me(){
  var str = 0
  for (var i = 0; i < this.data.arr.length; i++) {
    str += this.data.arr[i].price * this.data.arr[i].liang
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