import * as types from './mutations-type';
export var setCanCash = function setCanCash(_ref, cancash) {
  var commit = _ref.commit,
      state = _ref.state;

  commit(types.SET_CANCASH, cancash);
};

export var setCardInfo = function setCardInfo(_ref2, cardinfo) {
  var commit = _ref2.commit,
      state = _ref2.state;

  commit(types.SET_CARDINFO, cardinfo);
};
export var setCashing = function setCashing(_ref3, cashing) {
  var commit = _ref3.commit,
      state = _ref3.state;

  commit(types.SET_CASHING, cashing);
};