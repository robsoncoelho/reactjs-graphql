import { SET_POC_RESULTS } from '../../Config/actionTypes';

export const setPocResults = (result) => {
  return {
    type: SET_POC_RESULTS,
    payload: result
  }
};