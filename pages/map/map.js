var http = require('../../utils/HttpUtil.js');
var app = getApp() 
var lat = ''
var lng = ''
var markers1 = ''
Page({ 
 data: { 
  latitude: 0,//纬度 
  longitude: 0,//经度 
  accuracy: 10,//位置精准度 
  markers: '', 
 }, 
 onLoad: function (options) { 
    var that = this;
    lat = Number(options.lat)
    lng = Number(options.lng)
    markers1 = [{ 
        latitude:lat, 
        longitude:lng, 
        iconPath: '/images/ding.png', 
        width:40,
        height:40
    }] 
    console.log(markers1)
    that.setData({ 
        longitude: lng, 
        latitude: lat, 
        markers: markers1, 
        // covers: covers1, 
    }) 
 }
})
