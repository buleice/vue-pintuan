import * as types from './mutations-type';
export const setFirstVisit=({commit,state},firstVisit)=>{
  commit(types.SET_FIRSTVISIT,firstVisit);
}
