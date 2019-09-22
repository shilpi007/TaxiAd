import { LOADING } from '../actions/Types';
const initialState = {
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    default:
    return {...state}
  }
}
