import _defineProperty from 'babel-runtime/helpers/defineProperty';

var _mutations;

import * as types from './mutations-type';
var mutations = (_mutations = {}, _defineProperty(_mutations, types.SET_CANCASH, function (state, cancash) {
  state.cancash = cancash;
}), _defineProperty(_mutations, types.SET_CARDINFO, function (state, cardinfo) {
  state.cardinfo = cardinfo;
}), _defineProperty(_mutations, types.SET_CASHING, function (state, cashing) {
  state.cashing = cashing;
}), _mutations);
export default mutations;