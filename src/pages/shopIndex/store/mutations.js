import * as types from './mutations-type';
const mutations={
  [types.SET_FIRSTVISIT](state,firstVisit){
    state.firstVisit=firstVisit;
  }
}
export default mutations
