import API from '../api';
import {Alert} from 'react-native';
import axios from 'axios';
import {store} from '../../store';

const getUserForDashBaord = ({expertId, day, filterType}) => async (
  dispatch,
) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});
  const {status, patientList, message} = await API.getUserForDashBaord({
    expertId,
    day,
    filterType,
  });
  if (status === 'error') {
    Alert.alert('Error', message, [{text: 'OK'}]);
    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({
    type: 'connectedPatientList',
    connectedPatientList: patientList,
  });
  dispatch({type: 'loading', loading: false});
  return;
};

export default getUserForDashBaord;
