import API from '../api';
import {Alert} from 'react-native';
import axios from 'axios';
import {store} from '../../store';

const searchNonConnectedPatient = ({userNameAndMobileNumber}) => async (
  dispatch,
) => {
  dispatch({
    type: 'loadingNonConnectedPatientList'
  });
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  console.log("tokenvalue",store.getState().auth.token);
  const {status, List} = await API.searchNonConnectedPatient({
    userNameAndMobileNumber,
  });

  if (status === 'error') {
    Alert.alert('Error', 'Network Error1', [{text: 'OK'}]);
    return;
  }
  dispatch({
    type: 'searchNonConnectedPatientList',
    List,
  });

  return;
};

export default searchNonConnectedPatient;
