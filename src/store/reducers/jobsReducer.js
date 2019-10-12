import * as actions from '../actions/actionTypes';

const initialState = {
    error: null,
    loading: false,
    
    deleteJob: {
      error: null,
      loading: false,
    },
  };

export default (state = initialState, { type, payload }) => {
    switch (type) {

case actions.ADD_JOB_START:
      return { ...state, loading: true };

    case actions.ADD_JOB_SUCCESS:
      return { ...state, loading: false, error: false };

    case actions.ADD_JOB_FAIL:
      return { ...state, loading: false, error: payload };

    case actions.DELETE_JOB_START:
      return { ...state, deleteJob: { ...state.deleteJob, loading: true } };

    case actions.DELETE_JOB_SUCCESS:
      return {
        ...state,
        deleteJob: { ...state.deleteJob, loading: false, error: false },
      };

      case actions.GET_CATS:
      return {
        ...state,
       loading: false, error: false 
      };

    case actions.DELETE_JOB_FAIL:
      return {
        ...state,
        deleteJob: { ...state.deleteJob, loading: false, error: payload },
      };

    default:
      return state;
  }

};