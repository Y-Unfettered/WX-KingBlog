const common = require("../../utils/common.js");
//每个需要使用到bmob的页面都需要引入这个js
const Bmob = require('../../dist/bmob.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    information: [],
    onPlay: true,
    onPause:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //引入Information这张表
    var Information = Bmob.Object.extend("Information");
    //创建类和实例
    var Information = wx.Bmob.Query("Information");
    // 查询所有数据
    Information.find().then(res => {
      // console.log("共查询到 " + res.length + " 条记录");
      this.setData({
        "information.name": res[0].name,
        "information.phone": res[0].phone,
        "information.qq": res[0].qq,
        "information.github": res[0].github,
        "information.motto": res[0].motto,
        "information.bgmusic": res[0].bgmusic,
        "information.musicimg": res[0].musicimg
      })
      // console.log(res)
      let that = this
      // 绑定播放器
      this.audioCtx = wx.createAudioContext('bgm')
      // 获取音乐的url
      const url = this.data.information.bgmusic
      // console.log(url)
      this.audioCtx.setSrc(url)
      this.audioCtx.play()
      // 定时执行，达到循环
      setInterval(function() {
        that.audioCtx.seek(0)
      }, 228000)
    }).catch(err => {
      console.log(err)
    });
  },
  //暂停
  audioPause:function(){
    this.audioCtx.pause()
    this.setData({
      onPlay:false,
      onPause:true
    })
  },
  //播放
  audioPlay() {
    this.audioCtx.play()
    this.setData({
      onPlay: true,
      onPause: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})