import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';
import titleAlert from '../utils/titleAlert';
import moment from 'moment';
import axios from 'axios';

const addPatientToConnected = ({
  userId,
  navigation,
  setSelectedPatient,
}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  setSelectedPatient('');
  
  const expertId = store.getState().auth.expertId;
  dispatch({type: 'loading', loading: true});
  const {Status, Message} = await API.addPatientToConnected({
    userId,
    expertId,
  });
  if (Status === 'error') {
    Alert.alert('Error', Message, [{text: 'OK'}]);
    dispatch({type: 'loading', loading: false});
    return;
  }

  if (Message === 'Users already Connected') {
    dispatch({type: 'loading', loading: false});
    titleAlert({title: '', message: Message});
    return;
  } else {
    const {status, patientList, message} = await API.getUserForDashBaord({
      expertId,
      day: moment().format('DD MMM YYYY'),
      filterType: '',
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
  }

  Alert.alert('Success', Message, [
    {text: 'OK', onPress: () => navigation.goBack()},
  ]);

  dispatch({type: 'loading', loading: false});
};

export default addPatientToConnected;
