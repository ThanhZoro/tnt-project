import  firebase from '@/services/fireinit.js';
import moment from 'moment';

const getListArea = async (context, request) =>{
  var category = [];
  await firebase.database().ref('/area/').once('value').then((data) => {
    const obj = data.val();
    for (let key in obj) {
      category.push({
        id: key,
        name: obj[key].name,
        weight: obj[key].weight,
      })
    }
  }).catch((err) => {
    console.log(err);
  })
  return category;
};

const getTable = async (context, request) =>{
  var table = {};
  await firebase.database().ref('/tables/' + request).once('value').then((data) => {
    table = data.val();
    table.code = data.key;
  }).catch((err) => {
    console.log(err);
  })
  return table;
};

const checkCodeTable = async (context, codeCheck) => {
  let result = null;
  await firebase.database().ref('/tables/').on('value', function(data) {
    const obj = data.val();
    for (let key in obj) {
     if(codeCheck == key) {
       result = key;
       return result;
     }
    }
  });
  return result
}

const editTable = async (context, request) => {
  let existCode = !request.createdAt ? await checkCodeTable(context, request.code) : null;
  if (!existCode) {
    let formData = {
      name: request.name,
      seats: request.seats,
      status: request.status,
      areaId: request.areaId,
      currentSO: '',
      weight: request.weight ? request.weight : 69,
      isDelete: false,
      createdAt: request.createdAt ? request.createdAt : moment().toISOString(),
      updatedAt: moment().toISOString()
    }
    await firebase.database().ref('tables').child(request.code).update(formData)
    .catch((err) => {
      console.log(err.message)
    })
  }
  return existCode;
};

const createListTable = async (context, request) => {
  let existCode;
  let minTableNumber =  Number(request.minTable)
  let maxTableNumber =  Number(request.maxTable)
  for (let i = minTableNumber; i <= maxTableNumber; i++) {
    let code = request.prefixCode + i;
    existCode = !request.createdAt ? await checkCodeTable(context, code) : null;
    if (!existCode) {
      let formData = {
        name: request.prefixName + ' ' + i,
        seats: request.seats,
        status: request.status,
        areaId: request.areaId,
        currentSO: '',
        weight: i,
        isDelete: false,
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString()
      }
      await firebase.database().ref('tables').child(code).update(formData)
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
  return existCode;
};
export default {
  getListArea,
  editTable,
  getTable,
  createListTable
};
