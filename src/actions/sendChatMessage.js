import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';
import axios from 'axios';

const sendChatMessage = (data) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});
  const {status, messageList} = await API.sendChatMessage(data);

  if (status === 'error') {
    Alert.alert('Error', 'Network Error', [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({type: 'messageList', messageList: messageList});
  dispatch({type: 'loading', loading: false});
  return;
};

export default sendChatMessage;
