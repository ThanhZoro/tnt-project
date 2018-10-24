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
export default {
  buildFormData,
  sleep,
  treeRoles
};
