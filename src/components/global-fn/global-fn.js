// 全局方法
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
export function getYearMonth_cn(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  return year + "年" + month + "月";
}
export function gettimes(time) {
  let date = new Date(time);
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let Minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let Seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return hour + ":" + Minutes + ":" + Seconds;
}
