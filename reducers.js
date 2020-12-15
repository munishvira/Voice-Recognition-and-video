import {combineReducers} from 'redux';

const rootReducer = (
  state = {
    error: null,
    video: false,
    pitch: null,
    end: '',
    started: '',
    result: '',
    number: '',
  },
  action,
) => {
  switch (action.type) {
    case 'GET_STARTED':
      return {...state, started: action.started};
    case 'GET_PITCH':
      return {...state, pitch: action.pitch};
    case 'GET_END':
      return {...state, end: action.end};
    case 'GET_RESULT':
      return {...state, result: action.result};
    case 'SAVE_STARTED':
      return {...state, started: action.token};
    case 'SAVE_PITCH':
      return {...state, pitch: action.pitch};
    case 'SAVE_END':
      return {...state, end: action.end};
    case 'SAVE_RESULT':
      return {...state, result: action.result};
    case 'SAVE_VIDEO':
      return {...state, video: action.video};
    case 'SAVE_NUMBER':
      return {...state, number: action.number};
    case 'REMOVE_STARTED':
      return {...state, started: action.started};
    case 'REMOVE_PITCH':
      return {...state, pitch: action.pitch};
    case 'REMOVE_END':
      return {...state, end: action.end};
    case 'REMOVE_RESULT':
      return {...state, result: action.result};
    case 'LOADING':
      return {...state, loading: action.isLoading};
    case 'ERROR':
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default combineReducers({
  voice: rootReducer,
});
