// 保存一些常用的恒量
const domain = 'http://192.168.0.139:8033/api/v1';
const shareinfo = {
  title: '青葱素材库',
  path: '/pages/index/index/index',
  imageUrl: '', //转发的图片
};
const miniProgrammerInfo = {
  APPID: 'wx9219f00d9c7c715c',
  SECRET: '2668baa5c5dfc541028353aa2d1a1089'
}
const videoType = ['ogv', 'm4v', 'mov', 'asx', 'mpg', 'opm', 'mpeg', 'avi', 'mp4', 'wmv', 'webm'];
const imagetype=[];
const default_all = 65433; //默认为部的下表，所以设置为一个不怎么常用的值
module.exports = {
  domain,
  shareinfo,
  videoType,
  imagetype,
  default_all,
  miniProgrammerInfo
}