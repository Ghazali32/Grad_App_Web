import API from '../api';
import {Alert} from 'react-native';
import axios from 'axios';
import {store} from '../../store';

const getPatientParameterDetails = ({userId, day}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});

  const {
    status,
    message,
    form1Details,
    form2Details,
  } = await API.getPatientParameterDetails({
    userId,
    day,
  });

  if (status === 'error') {
    Alert.alert('Error', message, [{text: 'OK'}]);
    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({type: 'patientParameterDetails', form1Details, form2Details});
  dispatch({type: 'loading', loading: false});
  return;
};

export default getPatientParameterDetails;
