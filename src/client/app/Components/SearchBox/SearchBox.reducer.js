import { SET_POC_RESULTS } from '../../Config/actionTypes';

export default (state = [], action) => {
  switch (action.type){
    case SET_POC_RESULTS:
        return action.payload;
    default:
    	return state;
  }
};