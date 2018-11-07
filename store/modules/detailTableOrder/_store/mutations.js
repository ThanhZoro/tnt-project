const SET_TABLE = (state, messages) => {
	state.table = [];
	state.table = messages;
};

const SET_CURRENT_SO = (state, messages) => {
  state.currentSO = messages;
	if (!messages.dishList) {
		messages.dishList = [];
    let formData = {
			code: state.listDish[0].code,
			name: state.listDish[0].name,
			price: state.listDish[0].price,
			pictureUrl: state.listDish[0].pictureUrl,
			quantity: 0,
			unit: state.listDish[0].unit
		};
		messages.dishList.push(formData);
	}
	state.currentSO4Dish = messages;
};
const SET_LIST_DISH = (state, messages) => {
	state.listDish = messages;
};
const SET_CATEGORY = (state, messages) => {
	state.category = messages;
};

const UP_CURRENT_SO_4_DISH = (state, messages) => {
	var data = _.find(state.currentSO4Dish.dishList, function(v) {
		return v.code == messages.code;
	});
	if (data) {
		_.forEach(state.currentSO4Dish.dishList, o => {
			if (o.code == messages.code) {
				o.quantity++;
				return false;
			}
		});
	} else {
		let formData = {
			code: messages.code,
			name: messages.name,
			price: messages.price,
			pictureUrl: messages.pictureUrl,
			quantity: ++messages.quantity,
			unit: messages.unit
		};
		state.currentSO4Dish.dishList.push(formData);
	}
};
const DOWN_CURRENT_SO_4_DISH = (state, messages) => {
	var data = _.find(state.currentSO4Dish.dishList, function(v) {
		return v.code == messages.code;
	});
	if (data) {
		_.forEach(state.currentSO4Dish.dishList, o => {
			if (o.code == messages.code) {
				o.quantity == 0 ? 0 : o.quantity--;
				return false;
			}
		});
	}
};
const UPDATE_CURRENT_SO_4_DISH = (state, messages) => {
	var data = _.find(state.currentSO4Dish.dishList, function(v) {
		return v.code == messages.code;
	});
	if (data) {
		_.forEach(state.currentSO4Dish.dishList, o => {
			if (o.code == messages.code) {
				o.quantity = messages.quantity;
				return false;
			}
		});
	} else {
    let formData = {
			code: messages.code,
			name: messages.name,
			price: messages.price,
			pictureUrl: messages.pictureUrl,
			quantity: messages.quantity,
			unit: messages.unit
		};
		state.currentSO4Dish.dishList.push(formData);
	}
};
const CLEAR_DATA_DETAIL = state => {
  state.trigger = false;
  state.currentSO4Dish = {};
  state.currentSO = {};
};

export default {
	SET_TABLE,
	SET_CURRENT_SO,
	SET_LIST_DISH,
	SET_CATEGORY,
	UP_CURRENT_SO_4_DISH,
	DOWN_CURRENT_SO_4_DISH,
	UPDATE_CURRENT_SO_4_DISH,
	CLEAR_DATA_DETAIL
};
