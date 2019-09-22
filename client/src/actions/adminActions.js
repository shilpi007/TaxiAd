import axios from 'axios';
import { FETCH_SUCCESS,FETCH_FAIL, ADD_SUCCESS, ADD_FAIL, LOADING } from './Types';

export const companyList = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  const res = await axios.get('/api/v1/company/list/NameAndId');

  dispatch({type: LOADING,payload:false})
  if (!res.data.err) {
    dispatch({ type: FETCH_SUCCESS, payload: res.data });
  } else {
    dispatch({ type: FETCH_FAIL, payload: res.data.err });
  }
};

// const fetch_success = (dispatch, data) => {
//     dispatch({type:DASHBOARD_FETCH_SUCCESS,payload:data})
// }

// const fetch_fail = (dispatch,data) =>{
//     dispatch({type:DASHBOARD_FETCH_FAIL,payload:data})
// }

const headers = {
  'Content-Type': 'application/json',
  'Authorization':  localStorage.getItem("a_token")
}
export const add = (data, type,user) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  let res;
  if (user ==='unsecured'){
    res = await axios.post(`/api/v1/${type}/add`,data);
  }else{
    res = await axios.post(`/api/v1/${type}/add`, data);
  }
  dispatch({type:LOADING,payload:false})
  if (!res.data.err) {
    dispatch({ type: ADD_SUCCESS, payload: res.data });
  } else {
    dispatch({ type: ADD_FAIL, payload: res.data.err });
  }
};

export const getDashboard = () => async (dispatch) => {

}