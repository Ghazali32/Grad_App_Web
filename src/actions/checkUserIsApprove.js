import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';
import axios from 'axios';

const checkUserIsApprove = ({userId}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});

  const {status, message} = await API.checkUserIsApprove({
    userId,
  });

  if (status === 'error') {
    Alert.alert('Error', message, [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }

  dispatch({type: 'checkUserIsApprove', status, message});
  dispatch({type: 'loading', loading: false});
  return;
};

export default checkUserIsApprove;
