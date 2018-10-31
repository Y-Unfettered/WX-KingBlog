const common = require("../../utils/common.js");
//每个需要使用到bmob的页面都需要引入这个js
const Bmob = require('../../dist/bmob.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [],
    id: [],
    comment: [],
    loading: false,
    userInfo: [],
    star: false,
    flower: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取id
    var postId = options.id
    //引入content这张表
    var content = Bmob.Object.extend("content");
    //创建类和实例
    var content = wx.Bmob.Query("content");
    // 查询所有数据
    content.find().then(res => {
      // console.log("共查询到 " + res.length + " 条记录");
      // 将数据丢到content中
      this.setData({
        content: res
      })
      // 这里可以获取数据了
      var content = this.data.content[postId]
      // 但是外面不能获得，所以打包丢出去
      this.setData({
        content: content
      })
    }).catch(err => {
      console.log(err)
    });

    // 获取页面评论的数据
    //引入content这张表
    var comment = Bmob.Object.extend("comment");
    //创建类和实例
    var comment = wx.Bmob.Query("comment");
    comment.find().then(res => {
      // console.log(res)
      // console.log("共查询到 " + res.length + " 条记录");
      this.setData({
        comment: res
      })
      var pinglun = this.data.comment
      this.setData({
        comment: pinglun
      })
    });
  },
  updata: function(event) {
    // 获取title
    var title = event.detail.value.title
    //检查是否内容
    if (title == "") {
      common.showTip("请填写完整", "loading");
      return false;
    }
    //获取用户信息
    let uesrInfo = this.data.userInfo;
    let name = uesrInfo.nickName;
    let nameSrc = uesrInfo.userPic;
    //引入commentt这张表
    var comment = Bmob.Object.extend("comment");
    //创建类和实例
    var comment = wx.Bmob.Query("comment");
    // 添加内容
    comment.set("title", title);
    comment.set("user", name);
    comment.set("userSrc", nameSrc);
    // 上传到服务器
    comment.save().then(res => {
      common.showTip("添加成功");
      this.setData({
        loading: false
      })
      this.setData({
        'comment.title': title,
        'comment.user': name,
        'comment.userSrc': nameSrc
      })
    }).catch(err => {
      console.log(err);
      common.showTip("添加失败", "loading");
    })

    const query = wx.Bmob.Query("comment");
    query.find().then(res => {
      // console.log(res)
      this.setData({
        comment: res
      })
      let pinglun = this.data.comment
      this.setData({
        comment: pinglun
      })
    });
    console.log(this.data.comment)
  },
  changeStar: function() {
    this.setData({
      star: true
    })
  },
  changeFlower: function() {
    this.setData({
      flower: true
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
  onShow: function(e) {
    // 获取进入页面人的身份信息
    wx.Bmob.User.auth().then(res => {
      var userData = {
        nickName: res.nickName,
        objectId: res.objectId,
        openid: res.openid,
        userPic: res.userPic,
        username: res.username
      };
      wx.setStorageSync('userData', userData);
      wx.setStorageSync('openid', res.openid);
      this.setData({
        "userInfo.nickName": userData.nickName,
        "userInfo.objectId": userData.objectId,
        "userInfo.openid": userData.openid,
        "userInfo.userPic": userData.userPic,
        "userInfo.username": userData.username,
      })
    }).catch(err => {
      console.log(err);
    })


//引入commentt这张表
    var comment = Bmob.Object.extend("comment");
    //创建类和实例
    var comment = wx.Bmob.Query("comment");
    // 只返回score和playerName字段值
    // 获取鲜花数量
    comment.select("flower");
    comment.find().then(res => {
      // 返回成功
      // console.log(res)
    });
    // 获取点赞数量
    // comment.select("star");
    comment.find().then(res => {
      // 返回成功
      // console.log(res)
    });
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