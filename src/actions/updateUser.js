import API from '../api';
import {Alert} from 'react-native';
import axios from 'axios';
import {store} from '../../store';

const updateUser = ({
  userId,
  profilePic,
  email,
  firstName,
  lastName,
  birthDate,
  mobile,
  gender,
  streetAddress,
  subUrb,
  postCode,
  state,
  heightInCm,
  weightInKg,
  workPhone,
  emergencyPhone,
  emergencyContact,
  setBtnState,
}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});

  const {Status} = await API.updateUser({
    userId,
    profilePic,
    email,
    firstName,
    lastName,
    birthDate,
    mobile,
    gender,
    streetAddress,
    subUrb,
    postCode,
    state,
    heightInCm,
    weightInKg,
    workPhone,
    emergencyPhone,
    emergencyContact,
  });

  if (Status === 'error') {
    Alert.alert('Error', 'Network Error', [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  const {status, userDetails} = await API.getUser({userId});
  if (status === 'error') {
    Alert.alert('Error', 'Network Error', [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  Alert.alert('Success', 'Profile has updated successfully.', [{text: 'OK'}]);
  setBtnState(true);
  dispatch({type: 'userDetails', userDetails: userDetails});
  dispatch({type: 'loading', loading: false});
  return;
};

export default updateUser;
