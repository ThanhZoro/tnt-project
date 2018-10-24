import  firebase from '@/services/fireinit.js';
import moment from 'moment';

const getListCategory = async (context, request) =>{
  var category = [];
  await firebase.database().ref('/category/').once('value').then((data) => {
    const obj = data.val();
    for (let key in obj) {
      category.push({
        id: key,
        name: obj[key].name
      })
    }
  }).catch((err) => {
    console.log(err);
  })
  return category;
};

const getDish = async (context, request) =>{
  var dish = {};
  await firebase.database().ref('/dishes/' + request).once('value').then((data) => {
    dish = data.val();
    dish.code = data.key;
  }).catch((err) => {
    console.log(err);
  })
  return dish;
};

const editDishWithPic = async (context, request) => {
  let existCode = !request.createdAt ? await checkCodeDish(context, request.code) : null;
  if (!existCode) {
    let formData = {
      name: request.name,
      unit: request.unit,
      price: request.price,
      status: request.status,
      categoryId: request.categoryId,
      isDelete: false,
      createdAt: request.createdAt ? request.createdAt : moment().toISOString(),
      updatedAt: moment().toISOString()
    }
    let fileName = request.picture.name;
    let ext = fileName.slice(fileName.lastIndexOf('.') + 1)
    let fileData = await firebase.storage().ref('dishes/').child(request.code + '.' + ext).put(request.picture, {
      contentType: 'image/' + ext
    });
    formData.pictureUrl = fileData.metadata.downloadURLs[0];
    await firebase.database().ref('dishes').child(request.code).update(formData)
    .catch((err) => {
      console.log(err.message)
    })
  }
  return existCode;
};

const checkCodeDish = async (context, codeCheck) => {
  let result = null;
  await firebase.database().ref('/dishes/').on('value', function(data) {
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

const editDishWithoutPic = async (context, request) => {
  let existCode = !request.createdAt ? await checkCodeDish(context, request.code) : null;
  if (!existCode) {
    let formData = {
      name: request.name,
      unit: request.unit,
      price: request.price,
      status: request.status,
      categoryId: request.categoryId,
      pictureUrl: request.pictureUrl,
      isDelete: false,
      createdAt: request.createdAt ? request.createdAt : moment().toISOString(),
      updatedAt: moment().toISOString()
    }
    await firebase.database().ref('dishes').child(request.code).update(formData)
    .catch((err) => {
      console.log(err.message)
    })
  }
  return existCode;
};
export default {
  getListCategory,
	editDishWithPic,
  editDishWithoutPic,
  getDish
};
