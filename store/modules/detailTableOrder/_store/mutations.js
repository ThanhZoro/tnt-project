
const SET_TABLE = (state, messages) => {
  state.table = [];
  state.table = messages;
};

const SET_CURRENT_SO = (state, messages) => {
  if (!messages.dishList) {
    messages.dishList = [];
    let tempDish = state.listDish.data[0];
    tempDish.quantity = 0;
    messages.dishList.push(tempDish);
  }
  state.currentSO = messages;
  state.currentSO4Dish = messages;
};
const SET_LIST_DISH = (state, messages) => {
  state.listDish.data = messages.data;
  state.listDish.total = messages.total;
};
const SET_CATEGORY = (state, messages) => {
  state.category = messages;
};

const UP_CURRENT_SO_4_DISH = (state, messages) => {
  var data = _.find(state.currentSO4Dish.dishList, function (v) { return v.code == messages.code });
  if (data) {
    _.forEach(state.currentSO4Dish.dishList, (o) => {
      if (o.code == messages.code) {
        o.quantity++;
        return false;
      }
    })
  } else {
    messages.quantity++;
    state.currentSO4Dish.dishList.push(messages);
  }
};
const DOWN_CURRENT_SO_4_DISH = (state, messages) => {
  var data = _.find(state.currentSO4Dish.dishList, function (v) { return v.code == messages.code });
  if (data) {
    _.forEach(state.currentSO4Dish.dishList, (o) => {
      if (o.code == messages.code) {
        o.quantity == 0 ? 0 : o.quantity--;
        return false;
      }
    })
  } else {
    messages.quantity == 0 ? 0 : messages.quantity--;
    state.currentSO4Dish.dishList.push(messages);
  }
};
const UPDATE_CURRENT_SO_4_DISH = (state, messages) => {
  var data = _.find(state.currentSO4Dish.dishList, function (v) { return v.code == messages.code });
  if (data) {
    _.forEach(state.currentSO4Dish.dishList, (o) => {
      if (o.code == messages.code) {
        o.quantity = messages.quantity;
        return false;
      }
    })
  } else {
    state.currentSO4Dish.dishList.push(messages);
  }
};

export default {
  SET_TABLE,
  SET_CURRENT_SO,
  SET_LIST_DISH,
  SET_CATEGORY,
  UP_CURRENT_SO_4_DISH,
  DOWN_CURRENT_SO_4_DISH,
  UPDATE_CURRENT_SO_4_DISH
};
