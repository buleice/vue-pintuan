import * as types from './mutations-type';
export const setCanCash=({commit,state},cancash)=>{
  commit(types.SET_CANCASH,cancash);
}

export const setCardInfo=({commit,state},cardinfo)=>{
  commit(types.SET_CARDINFO,cardinfo);
}
export const setCashing=({commit,state},cashing)=>{
  commit(types.SET_CASHING,cashing);
}
