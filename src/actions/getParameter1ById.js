import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';
import axios from 'axios';

const getParameter1ById = ({parameter1Id}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});

  const {status, message, getParameter1ById} = await API.getParameter1ById({
    parameter1Id,
  });
  

  if (status === 'error') {
    Alert.alert(
      'Access Restricted',
      'Due to version changes, Experts are not permitted to view parameters from the older version.',
      [{ text: 'OK' }]
    );

    dispatch({type: 'loading', loading: false});
    return { success: false };
  }
  dispatch({type: 'getParameter1ById', payload : getParameter1ById});
  dispatch({type: 'loading', loading: false});
  return { success: true };
};

export default getParameter1ById;
