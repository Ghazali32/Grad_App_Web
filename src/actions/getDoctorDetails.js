import API from '../api';
import {Alert} from 'react-native';
import axios from 'axios';
import {store} from '../../store';

const getDoctorDetails = ({doctorId}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});
  const {status, doctorDetails} = await API.getDoctorDetails({
    doctorId,
  });

  if (status === 'error') {
    Alert.alert('Error', 'Network Error', [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({
    type: 'doctorDetails',
    doctorDetails: doctorDetails,
  });
  dispatch({type: 'loading', loading: false});
  return;
};

export default getDoctorDetails;
