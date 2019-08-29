/**
工具类的封装
 */
// 返回当前时间
const formatTime = (date = new Date()) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 返回yyyy-mm-dd
const hgGetDate = (date = new Date()) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-');
}
// 返回yyyy-mm
const hgGetMonth = (date = new Date()) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return [year, month].map(formatNumber).join('-');
}
// 返回本月第一天
const complementedstart = (date = hgGetMonth()) => {
  date += '-01 00:00:00';
  return date;
}
// 返回本月的最后一天
const complementedend = (date = hgGetMonth()) => {
  let endDate = new Date(`${date}-01 00:00:00`); //date 是需要传递的时间如：2018-08
  let month = endDate.getMonth();
  let nextMonth = ++month;
  let nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1);
  let dateString = new Date(nextMonthFirstDay - 1000);
  return formatTime(dateString);
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
module.exports = {
  formatTime,
  hgGetDate,
  hgGetMonth,
  complementedstart,
  complementedend
}