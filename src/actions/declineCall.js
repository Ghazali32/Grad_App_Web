import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';
import axios from 'axios';

const declineCall = ({meetingID, user}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  const {status} = await API.declineCall({meetingID, user});

  if (status === 'error') {
    Alert.alert('Error', 'Network Error', [{text: 'OK'}]);
    return;
  }
  return;
};

export default declineCall;
