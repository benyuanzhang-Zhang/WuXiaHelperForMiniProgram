// miniprogram/pages/littleSisteTravel/littleSisteTravel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })
  },
  search: function(value) {
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database()
      db
        .collection('littleSiste_travel')
        .where({
          t1: '归雁名驹失窃案'
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  searchResult: (e) => {
    console.log(e);
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