import {Request} from '../../../lib/api/request'
import {axiosPost} from "../../../lib/api/axios-data";

export const getUserAddresslist=()=>{
 return new Request('/address/list.json')
}

export const updateUserAddress=(params)=>{
  return axiosPost('/address/update.json', params)
}

export const deleteUserAddress=(id)=>{
  return axiosPost('/address/delete',id)
}

export const addUserAddress=(params)=>{
  return axiosPost('/address/add.json',params)
}
