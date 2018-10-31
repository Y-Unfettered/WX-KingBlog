// pages/loading/loading.js
const common = require("../../utils/common.js");
//每个需要使用到bmob的页面都需要引入这个js
const Bmob = require('../../dist/bmob.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    hasUserInfo: true,
    showModal: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      showModal: true
    })
  },
  getUserInfo: function(e) {
    this.setData({
      // userInfo: e.detail.userInfo,
      hasUserInfo: false,
      showModal: false
    })
   wx.Bmob.User.auth().then(res=>{
      // console.log(res);
      // console.log("一键登录成功");
      var userData = {nickName:res.nickName,objectId:res.objectId,openid:res.openid,userPic:res.userPic,username:res.username};
      wx.setStorageSync('userData', userData);
      wx.setStorageSync('openid', res.openid);
      // var userInfo=[];
      this.setData({
        "userInfo.nickName":userData.nickName,
        "userInfo.objectId":userData.objectId,
        "userInfo.openid":userData.openid,
        "userInfo.userPic":userData.userPic,
        "userInfo.username":userData.username,
      })
      // return userInfo;
      
    }).catch(err=>{
      console.log(err);
    })

  },
  noGetUserInfo: function(e) {
    console.log('n')
    this.setData({
      hasUserInfo: false,
      showModal: false
    })
    wx.switchTab({
      url: '../home/home'
    })
  },
  onTap: function() {
    wx.switchTab({
      url: '../home/home'
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

  }
})