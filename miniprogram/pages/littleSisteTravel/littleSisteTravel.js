// miniprogram/pages/littleSisteTravel/littleSisteTravel.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    showLoading: false,
    chioceData: [],
    allData: [],
    showComponent: false,
    clear: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllTitle()
    // this.getSomeTitle()
  },
  async getAllTitle() {
    const MAX_LIMIT = 20
    // get collection count
    const total =  (await db.collection('travel_index').count()).total
    // computed need request times
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // initialization a array that promise request constant
    const tasks = []
    // request tasks
    for (let index = 0; index < batchTimes; index++) {
      const promise = db.collection('travel_index').skip(index * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    // wait all request complete
    const result = (await Promise.all(tasks)).reduce((acc, cur) => {
      return acc.data ? acc.data.concat(cur.data) : acc.concat(cur.data)
    })
    this.setData({
      allData: result
    })
  },
  getSomeTitle() {
    db
      .collection('travel_index')
      .limit(5)
      .get({
        success: res => {
          console.log(res);
          
          this.setData({
            allData: res.data
          })
        }
      })
  },
  // 搜索 - 聚焦 / 失焦
  searchFocus() {
    this.setData({
      showComponent: true
    })
  },
  searchCancel() {
    this.setData({
      showComponent: false
    })
  },
  // 搜索
  searchSth: function() {
    const value = this.data.search
    this.setData({
      showLoading: true
    })
      // id or name
      const data = this.data.allData.filter(item => item.name.includes(value) || item._id.includes(value))
      // format data
      const result = data.map(item => {
        return {
          value: item._id,
          text: item.name
        }
      })
      this.setData({
        showLoading: false
      })
  },
  // 选中的值
  selectResult: function(e) {
    clearTimeout(this.data.clear)
    this.setData({
      showComponent: true
    })
    const _id = e.detail.item ? e.detail.item.value : e.currentTarget.dataset._id
    // 获取对应的数据
    db
      .collection('littleSiste_travel')
      .where({
        _id
      })
      .get({
        success: (res) => {
          console.log(res)
          const { data } = res
          const details = data[0].data
          getTempFileURL(details)
        }
      })
  },
  // 获得类型的图片
  getTempFileURL: function(data) {
    console.log(1)
    const upperCaseUrl = (data[1].t3).toUpperCase()
    wx.cloud.getTempFileURL({
      fileList: [`cloud://tiandao-data-u1rd1.7469-tiandao-data-u1rd1-1301868190/Imagesets/${upperCaseUrl}`],
      success: ({fileList}) => {          
        // 传送选中的条例所有的信息
        this.setData({
          chioceData: {
            ...data,
            url: fileList.tempFileUrl
          }
        })
        console.log(fileList)
        this.setData({
          showComponent: false
        })
        console.log(this.chioceData)
      },
      fail: (err) => {
        console.log(err.errMsg);
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