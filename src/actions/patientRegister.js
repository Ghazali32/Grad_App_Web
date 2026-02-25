import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';

const patientRegister = ({
  firstName,
  lastName,
  streetAddress,
  email,
  gender,
  birthDate,
  password,
  mobile,
  navigation,
}) => async (dispatch) => {
  const deviceId = store.getState().auth.device_id;
  dispatch({type: 'loading', loading: true});
  const {status, message} = await API.register({
    firstName,
    lastName,
    streetAddress,
    email,
    gender,
    birthDate,
    password,
    mobile,
    deviceId,
  });

  if (status === 'error') {
    Alert.alert('Register Error', message, [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  Alert.alert('Success', message, [
    {text: 'OK', onPress: () => navigation.replace('Login')},
  ]);

  dispatch({type: 'loading', loading: false});
};

export default patientRegister;
