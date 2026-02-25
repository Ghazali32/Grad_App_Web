import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';
import axios from 'axios';
const getParameter2ById = ({parameter2Id}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});

  const {status, message, getParameter2ById} = await API.getParameter2ById({
    parameter2Id,
  });

  if (status === 'error') {
    Alert.alert('Error', message, [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({type: 'getParameter2ById', getParameter2ById});
  dispatch({type: 'loading', loading: false});
  return;
};

export default getParameter2ById;
