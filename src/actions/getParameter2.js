import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';
import axios from 'axios';
const getParameter2 = ({userId, day}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});

  const {status, message, parameter2Details} = await API.getParameter2({
    userId,
    day,
  });
  if (status === 'error') {
    Alert.alert('Error', message, [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({type: 'parameter2Details', parameter2Details});
  dispatch({type: 'loading', loading: false});
  return;
};

export default getParameter2;
