import { ADD_SUCCESS, ADD_FAIL, FETCH_FAIL, FETCH_SUCCESS, LOADING} from '../actions/Types';
const initialState = {
  data: [],
  error: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case ADD_FAIL:
      return { ...state, loading: false, error: 'something want wrong...please refresh again' };
    case ADD_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_FAIL:
      return { ...state, loading: false, data: "something want wrong...please refresh again" };
    default:
      return { ...state, loading: false};
  }
}
