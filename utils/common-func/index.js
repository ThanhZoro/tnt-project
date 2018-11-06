import _ from 'lodash'

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const buildFormData = (formData, data, parentKey) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}
const treeRoles = (data, response) => {
  response = typeof response !== 'undefined' ? response : [];
  _.forEach(data, function (v) {
    if (v.key) {
      var elem = { value: v.key, label: v.key };
      if (v.value) {
        elem['children'] = [];
        _.forEach(v.value, function (o) {
          if (o.key) {
            elem['children'].push({ value: o.key, label: o.key });
            if (o.value) treeRoles(o.value);
          }
        });
      }
      response.push(elem);
    }
  });
  return response;
}
const formatMoneyToString = (num) => {
  let a = ['', 'một ', 'hai ', 'ba ', 'bốn ', 'năm ', 'sáu ', 'bảy ', 'tám ', 'chín ', 'mười ', 'mười một ', 'mười hai ', 'mười ba ', 'mười bốn ', 'mười lăm ', 'mười sáu ', 'mười bảy ', 'mười tám ', 'mười chín '];
  let b = ['', '', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
  if ((num = num.toString()).length > 12) return 'Số tiền quá lớn';
  var n = ('000000000000' + num).substr(-12).match(/^(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'trăm ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'tỷ ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'trăm ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'triệu ' : '';
  str += (n[5] != 0) ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'trăm ' : '';
  str += (n[6] != 0) ? (a[Number(n[6])] || b[n[6][0]] + ' ' + a[n[6][1]]) + 'ngàn ' : '';
  str += (n[7] != 0) ? (a[Number(n[7])] || b[n[7][0]] + ' ' + a[n[7][1]]) + 'trăm ' : '';
  str += (n[8] != 0) ? (a[Number(n[8])] || b[n[8][0]] + ' ' + a[n[8][1]]) + 'đồng ' : '';
  return str;
}
export default {
  buildFormData,
  sleep,
  treeRoles,
  formatMoneyToString
};
