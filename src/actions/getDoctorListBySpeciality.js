import API from '../api';
import {Alert} from 'react-native';
import axios from 'axios';
import {store} from '../../store';

const getDoctorBySpeciality = ({
  patientId,
  specialist,
  longitude,
  latitude,
}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});
  const {status, doctorBySpecialityList} = await API.getDoctorBySpeciality({
    patientId,
    specialist,
    longitude,
    latitude,
  });

  if (status === 'error') {
    Alert.alert('Error', 'Network Error', [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({
    type: 'doctorBySpecialityList',
    doctorBySpecialityList: doctorBySpecialityList,
  });
  dispatch({type: 'loading', loading: false});
  return;
};

export default getDoctorBySpeciality;
