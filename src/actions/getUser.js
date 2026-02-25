import API from '../api';
import {Alert} from 'react-native';
import axios from 'axios';
import {store} from '../../store';

const getUser = ({userId}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});

  const {status, patientDetails} = await API.getUser({userId});

  if (status === 'error') {
    Alert.alert('Error', 'Network Error', [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({type: 'patientDetails', patientDetails});
  dispatch({type: 'loading', loading: false});
  return;
};

export default getUser;
