import AsyncStorage from '@react-native-community/async-storage';

export const getstarted = (start) => ({
  type: 'GET_STARTED',
  start,
});

export const getpitch = (pitch) => ({
  type: 'GET_PITCH',
  pitch,
});

export const getend = (end) => ({
  type: 'GET_END',
  end,
});

export const getresult = (result) => ({
  type: 'GET_RESULT',
  result,
});

export const savestarted = (token) => ({
  type: 'SAVE_STARTED',
  token,
});

export const savepitch = (pitch) => ({
  type: 'SAVE_PITCH',
  pitch,
});

export const saveend = (end) => ({
  type: 'SAVE_END',
  end,
});

export const saveresult = (result) => ({
  type: 'SAVE_RESULT',
  result,
});

export const savevideo = (video) => ({
  type: 'SAVE_VIDEO',
  video,
});

export const savenumber = (number) => ({
  type: 'SAVE_NUMBER',
  number,
});

export const removestarted = () => ({
  type: 'REMOVE_STARTED',
});

export const removepitch = () => ({
  type: 'REMOVE_PITCH',
});

export const removeend = () => ({
  type: 'REMOVE_END',
});

export const removeresult = () => ({
  type: 'REMOVE_RESULT',
});

export const loading = (bool) => ({
  type: 'LOADING',
  isLoading: bool,
});

export const error = (error) => ({
  type: 'ERROR',
  error,
});

export const getUserstarted = () => (dispatch) =>
  AsyncStorage.getItem('userstarted')
    .then((data) => {
      dispatch(loading(false));
      dispatch(getstarted(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const getUserpitch = () => (dispatch) =>
  AsyncStorage.getItem('userpitch')
    .then((data) => {
      dispatch(loading(false));
      dispatch(getpitch(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const getUserend = () => (dispatch) =>
  AsyncStorage.getItem('userend')
    .then((data) => {
      dispatch(loading(false));
      dispatch(getend(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const getUserresult = () => (dispatch) =>
  AsyncStorage.getItem('userresult')
    .then((data) => {
      dispatch(loading(false));
      dispatch(getresult(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const saveUserstarted = (data) => (dispatch) =>
  AsyncStorage.setItem('userstarted', data)
    .then(() => {
      dispatch(loading(false));
      dispatch(savestarted(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const saveUserpitch = (d) => (dispatch) =>
  AsyncStorage.setItem('userpitch', d)
    .then(() => {
      dispatch(loading(false));
      dispatch(savepitch(d));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const saveUserend = (data) => (dispatch) =>
  AsyncStorage.setItem('userend', data)
    .then(() => {
      dispatch(loading(false));
      dispatch(saveend(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const saveUserresult = (data) => (dispatch) =>
  AsyncStorage.setItem('userresult', data)
    .then(() => {
      dispatch(loading(false));
      dispatch(saveresult(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const saveUservideo = (data) => (dispatch) =>
  AsyncStorage.setItem('uservideo', data)
    .then(() => {
      dispatch(loading(false));
      dispatch(savevideo(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const saveUsernumber = (data) => (dispatch) =>
  AsyncStorage.setItem('usernumber', data)
    .then(() => {
      dispatch(loading(false));
      dispatch(savenumber(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const removeUserstarted = () => (dispatch) =>
  AsyncStorage.removeItem('userToken')
    .then((data) => {
      dispatch(loading(false));
      dispatch(removestarted(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const removeUserpitch = () => (dispatch) =>
  AsyncStorage.removeItem('userpitch')
    .then((data) => {
      dispatch(loading(false));
      dispatch(removepitch(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const removeUserend = () => (dispatch) =>
  AsyncStorage.removeItem('userend')
    .then((data) => {
      dispatch(loading(false));
      dispatch(removeend(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const removeUserresult = () => (dispatch) =>
  AsyncStorage.removeItem('userresult')
    .then((data) => {
      dispatch(loading(false));
      dispatch(removeresult(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });
