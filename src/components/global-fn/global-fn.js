import html2Canvas from "html2canvas";
import JsPDF from "jspdf";

//获取上个月的总天数
export function lastmonth_num() {
  //当前时间
  var myDate = new Date();
  var totalDay = new Date(
    myDate.getFullYear(),
    parseInt(myDate.getMonth()),
    0
  ).getDate();
  return totalDay;
}
// 全局方法，转换时间格式为year-month-date hour：minutes：seconds
export function changetime(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let Minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let Seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + Minutes + ":" + Seconds
  );
}
// 全局方法，转换时间格式为year-month-date
export function getDates(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return year + "-" + month + "-" + day;
}
// 全局方法，转换时间格式为*年-*月-*日
export function getDate_cn(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return year + "年" + month + "月" + day + "日";
}
// 全局方法，转换时间格式为*年-*月
export function getYearMonth_cn(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  return year + "年" + month + "月";
}
// 全局方法，转换时间格式为时：分：秒
export function gettimes(time) {
  let date = new Date(time);
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let Minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let Seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return hour + ":" + Minutes + ":" + Seconds;
}

//数字换大写
export function number_chinese(str) {
  var num = parseFloat(str);
  var strOutput = "",
    strUnit = "仟佰拾亿仟佰拾万仟佰拾元角分";
  num += "00";
  var intPos = num.indexOf(".");
  if (intPos >= 0) {
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  }
  strUnit = strUnit.substr(strUnit.length - num.length);
  for (var i = 0; i < num.length; i++) {
    strOutput +=
      "零壹贰叁肆伍陆柒捌玖".substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
  }
  return strOutput
    .replace(/零角零分$/, "整")
    .replace(/零[仟佰拾]/g, "零")
    .replace(/零{2,}/g, "零")
    .replace(/零([亿|万])/g, "$1")
    .replace(/零+元/, "元")
    .replace(/亿零{0,3}万/, "亿")
    .replace(/^元/, "零元");
}

//把一些元素转换为PDF导出
export function getPdf(setID) {
  var title = "test";
  html2Canvas(document.querySelector(setID), {
    // allowTaint: true,
    useCORS: true
  }).then(function(canvas) {
    const contentWidth = canvas.width * 2;
    const contentHeight = canvas.height * 2;
    const imgWidth = 595.28;
    const imgHeight = (595.28 / contentWidth) * contentHeight;
    const pageData = canvas.toDataURL("image/jpg", 1.0);
    const PDF = new JsPDF("p", "px", [imgWidth, imgHeight]);
    PDF.addImage(pageData, "PNG", 0, 0, imgWidth, imgHeight);
    PDF.save(title + ".pdf");
  });
}
