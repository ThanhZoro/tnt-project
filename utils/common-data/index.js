const language = ['en','vi'];

const roleList = ['admin', 'nvpv', 'nvpc'];

const dishStatus = ['active', 'inactive'];

const statusNotify = [{value: 'active', color: '#00ff00'}, {value: 'inactive', color: '#ff0000'}];

const tableStatus = [
  {value: 'empty', color: '#2dd400'},
  {value: 'full', color: '#ff1d1d'},
  {value: 'order', color: '#ffa90b'},
  {value: 'notUse', color: 'black'}
];
export default {
  language,
  roleList,
  dishStatus,
  tableStatus,
  statusNotify
};
