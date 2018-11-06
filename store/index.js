import Vuex from 'vuex';
import _ from 'lodash';
import authModule from './modules/auth/_store';
import settingModule from './modules/setting/_store';
import userListModule from './modules/userList/_store';
import editUserModule from './modules/editUser/_store';
import editDishModule from './modules/editDish/_store';
import dishListModule from './modules/dishList/_store';
import editTableModule from './modules/editTable/_store';
import tableListModule from './modules/tableList/_store';
import listTableOrderModule from './modules/listTableOrder/_store';
import detailTableOrderModule from './modules/detailTableOrder/_store';

import commonData from '../utils/common-data';
import moment from 'moment';
import Cookie from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      hideMenu: false,
      locales: commonData.language,
      locale: 'vi',
      loadingFinish: false,
      roleCurrentUser: ''
    },
    modules: {
      auth: authModule,
      setting: settingModule,
      userList: userListModule,
      editUser: editUserModule,
      editDish: editDishModule,
      dishList: dishListModule,
      editTable: editTableModule,
      tableList: tableListModule,
      listTableOrder: listTableOrderModule,
      detailTableOrder: detailTableOrderModule,
    },
    getters: {
      activeUser: (state, getters) => {
        return !!state.user
      }
    },
    mutations: {
      HIDE_MENU: function (state) {
        state.hideMenu = !state.hideMenu;
      },
      SET_LANG(state, locale) {
        state.locale = locale;
        this.app.i18n.locale = locale;
        moment.locale(locale);
        localStorage.setItem('language', locale);
        Cookie.set('language', locale);
      },
      SET_LOADING_FINISH(state,messages) {
        state.loadingFinish = messages;
      },
      SET_ROLE(state,messages) {
        state.roleCurrentUser = messages;
      }
    },
    actions: {
      nuxtServerInit({ state }, { req, app,store }) {
        const languageCookie = req.headers.cookie ? req.headers.cookie
          .split(';')
          .find(c => c.trim().startsWith('language=')) : null;
        if (languageCookie) {
          app.i18n.locale = languageCookie.split('=')[1];
          state.locale = languageCookie.split('=')[1];
        }
        if (req.session && req.session.user) {
          store.state.auth.user = req.session.user;
        }
        try {
        } catch (error) {

        }
      },
      hideMenu({ commit }) {
        commit('HIDE_MENU');
      },
      setLang({ commit }, req) {
        commit('SET_LANG', req);
      },
      setLoadingFinish({ commit },request){
        commit('SET_LOADING_FINISH', request)
      },
      setRoleCurrentUser({ commit },request){
        commit('SET_ROLE', request)
      }
    }
  })
}

export default createStore
