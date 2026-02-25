import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';
import axios from 'axios';

const acceptCall = ({meetingID, user, navigation}) => async () => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  const {status} = await API.acceptCall({meetingID, user});

  if (status === 'error') {
    Alert.alert('Error', 'Network Error', [{text: 'OK'}]);
    return;
  }
  return;
};

export default acceptCall;
