//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    imagePath: '../image/plImage.png',
    STR:0,
    CON:0,
    SIZ:0,
    DEX:0,
    APP:0,
    INT:0,
    POW:0,
    EDU:0,
    LUC:0,
    damage: 0,
    major:0,
    interest:0,
    accountant:5,
    ifChange: false,
    age:15,
    hp: 0,
    MOV: 0
  },
  make:function(data){
    console.log(this.data.ifChange);
    this.setData({
      STR: dice(3, 6) * 5,
      CON: dice(3, 6) * 5,
      SIZ: (dice(2, 6) + 6) * 5,
      DEX: dice(3, 6) * 5, 
      INT: (dice(2, 6) + 6) * 5,
      POW: dice(3, 6) * 5,
      EDU: (dice(2, 6) + 6) * 5,
      LUC: dice(3, 6) * 5,
      APP: dice(3,6)*5,
    });

    this.setData({
      ifChange: false,
      hp: Math.floor((this.data.SIZ + this.data.CON) / 10),
      damage: damage(this.data.STR, this.data.SIZ),
    })
  },
  changeAge:function(e){
    console.log(e.detail.value);
    this.setData({
      age:e.detail.value
    })
  },
  confirm:function(){
    var mov = confMOV(this.data.DEX,this.data.STR,this.data.SIZ);
    console.log(Math.floor(this.data.age / 10))
    console.log(this.data.ifChange)
    if(this.data.ifChange){
      return;
    }
    switch (Math.floor(this.data.age / 10)){
      case 1:
        var radom = Math.floor(Math.random() * 5) + 1;
        this.setData({
          EDU:(this.data.EDU-5),
          STR:Math.max((this.data.STR-radom),0),
          SIZ:Math.max((this.data.SIZ-(5-radom)),0),
          LUC: Math.max(this.data.LUC, dice(3, 6) * 5),
        })
        break;
      case 3:
        this.setData({
          EDU: enhance(1,this.data.EDU)
        })
        break;
      case 4:
        var radom = Math.floor(Math.random() * 5) + 1;
        mov-=1;
        this.setData({
          EDU: enhance(2, this.data.EDU),
          STR: Math.max((this.data.STR - radom),0),
          SIZ: Math.max((this.data.SIZ - (5 - radom)), 0),
          APP: Math.max((this.data.APP - 5),0)
        })
        break;
      case 5:
        mov-=2;
        var radom = Math.floor(Math.random() * 10) + 1;
        this.setData({
          EDU: enhance(3, this.data.EDU),
          STR: Math.max((this.data.STR - radom),0),
          SIZ: Math.max((this.data.SIZ - (10 - radom)), 0),
          APP: Math.max((this.data.APP - 10),0)
        })
        break;
      case 6:
        mov-=3;
        var radom = Math.floor(Math.random() * 20) + 1;
        this.setData({
          EDU: enhance(4, this.data.EDU),
          STR: Math.max((this.data.STR - radom),0),
          SIZ: Math.max((this.data.SIZ - (20 - radom)), 0),
          APP: Math.max((this.data.APP - 15),0)
        })
        break;
      case 7:
        mov-=4;
        var radom = Math.floor(Math.random() * 40) + 1;
        this.setData({
          EDU: enhance(4, this.data.EDU),
          STR: Math.max((this.data.STR - radom),0),
          SIZ: Math.max((this.data.SIZ - (40 - radom)), 0),
          APP: Math.max((this.data.APP - 20),0)
        })
        break;
      case 8:
        mov-=5;
        var radom = Math.floor(Math.random() * 80) + 1;
        this.setData({
          EDU: enhance(4, this.data.EDU),
          STR: Math.max((this.data.STR - radom),0),
          SIZ: Math.max((this.data.SIZ - (80 - radom)), 0),
          APP: Math.max((this.data.APP - 25),0)
        })
        break;
    }
    this.setData({
      MOV:mov,
      hp: Math.floor((this.data.SIZ + this.data.CON) / 10),
      ifChange: true
    })

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
function confMOV(DEX,STR,SIZ){
  if(DEX<SIZ&&STR<SIZ){
    return 7;
  }else if(DEX>SIZ&&STR>SIZ){
    return 9;
  }else{
    return 8;
  }
}
function dice(times,limit){
  var res = 0;
  for(var i = 0;i < times ; i++){
    res += Math.floor(Math.random() * (limit + 1))
  }
  return res;
}
function damage(STR,SIZ){
  var add = STR+SIZ;
  console.log(add);
  if(add<65){
    return -2;
  }else if(add<85&&add>=65){
    return -1;
  }else if(add<125&&add>=85){
    return 0;
  }else if(add < 165&&add>=125){
    return "1d4";
  }else{
    return Math.floor((add - 165) / 80 + 1) + "*1d6";
  }
}
function enhance(times,original){
  for(var i=0;i<times;i++){
    if(dice(1,100)>original){
      original+=dice(1,10);
    }
  }
  return Math.min(99, original);
}