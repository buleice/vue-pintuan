import * as types from './mutations-type';
const mutations={
  [types.SET_CANCASH](state,cancash){
    state.cancash=cancash;
  },
  [types.SET_CARDINFO](state,cardinfo){
    state.cardinfo=cardinfo;
  },
  [types.SET_CASHING](state,cashing){
    state.cashing=cashing
  }
}
export default mutations
