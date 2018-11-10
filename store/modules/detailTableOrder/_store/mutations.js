const SET_TABLE = (state, messages) => {
	state.table = [];
	state.table = messages;
};

const SET_CURRENT_SO = (state, messages) => {
  if (!messages.dishList) {
    messages.dishList = [];
  }
  state.currentSO4Dish = messages;
  _.forEach(state.listDish, o => {
    let existData = _.find(state.currentSO4Dish.dishList, v => { return v.code == o.code });
    if (!existData) {
      let formData = {
        code: o.code,
        quantity: 0
      };
      state.currentSO4Dish.dishList.push(formData);
    }
  });
  _.forEach(state.currentSO4Dish.dishList, o => {
    o.originalQuantity = o.quantity;
  })
};

const SET_LIST_DISH = (state, messages) => {
	state.listDish = messages;
};
const SET_CATEGORY = (state, messages) => {
	state.category = messages;
};

const UP_CURRENT_SO_4_DISH = (state, messages) => {
	_.forEach(state.currentSO4Dish.dishList, o => {
    if (o.code == messages.code) {
      ++o.quantity;
      return;
    }
  });
};
const DOWN_CURRENT_SO_4_DISH = (state, messages) => {
	_.forEach(state.currentSO4Dish.dishList, o => {
    if (o.code == messages.code) {
      o.quantity == o.originalQuantity ? o.originalQuantity : --o.quantity;
      return;
    }
  });
};
const UPDATE_CURRENT_SO_4_DISH = (state, messages) => {
	_.forEach(state.currentSO4Dish.dishList, o => {
    if (o.code == messages.code) {
      o.quantity = (messages.quantity <= o.originalQuantity) ? o.originalQuantity : messages.quantity;
      return;
    }
  });
};
const CHECK_CHANGE_VALUE = (state, messages) => {
  let exist = _.find(state.currentSO4Dish.dishList, o => { return o.quantity > o.originalQuantity});
  if (exist) {
    state.changeValue = true;
  } else {
    state.changeValue = false;
  }
};
const CLEAR_DATA_DETAIL = state => {
  state.trigger = false;
  state.changeValue = false;
  state.currentSO4Dish = {};
};

export default {
	SET_TABLE,
	SET_CURRENT_SO,
	SET_LIST_DISH,
	SET_CATEGORY,
	UP_CURRENT_SO_4_DISH,
	DOWN_CURRENT_SO_4_DISH,
	UPDATE_CURRENT_SO_4_DISH,
  CLEAR_DATA_DETAIL,
  CHECK_CHANGE_VALUE
};
