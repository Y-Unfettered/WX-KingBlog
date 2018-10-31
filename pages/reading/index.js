//获取应用实例
// const app = getApp();
const common = require("../../utils/common.js");
//每个需要使用到bmob的页面都需要引入这个js
const Bmob = require('../../dist/bmob.js');

Page({
  data: {
    posetdata: [] //每页数据
  },
  onLoad() {
    //初始页面第一次获取页面数据
    this.getData();
  },
  getData() {
    //引入textarray这张表
    var postdata = Bmob.Object.extend("postdata");
    //创建类和实例
    var postdata = wx.Bmob.Query("postdata");
    // 查询所有数据
    postdata.find().then(res => {
      // console.log("共查询到 " + res.length + " 条记录");
      this.setData({
        posetdata: res
      })
    }).catch(err => {
      console.log(err)
    });
  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log("on post id is" + postId);
    wx.navigateTo({
      url: "../post-detail/post-detail?id=" + postId
    })
    // console.log(this.data.posetdata[0].postId)
  },
  onSwiperTap: function (event){
   var postId = event.target.dataset.postid;
    console.log("on post id is" + postId);

   wx.navigateTo({
     url: "../post-detail/post-detail?id=" + postId
   })
 }
})