import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';
import axios from 'axios';

const getUpcomingAppointmentList = () => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});
  const patientId = store.getState().auth.user;
  const {
    status,
    patientUpcomingAppointments,
  } = await API.getUpcomingAppointmentList({
    patientId,
  });

  if (status === 'error') {
    Alert.alert('Error', 'Network Error', [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({
    type: 'upcomingAppointmentList',
    data: patientUpcomingAppointments,
  });
  dispatch({type: 'loading', loading: false});
  return;
};

export default getUpcomingAppointmentList;
