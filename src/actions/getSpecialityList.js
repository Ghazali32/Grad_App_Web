import API from '../api';
import {Alert} from 'react-native';
import axios from 'axios';
import {store} from '../../store';

const getSpecialityList = () => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});

  const {status, specialityList} = await API.getSpecialityList();

  if (status === 'error') {
    Alert.alert('Error', 'Network Error', [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({type: 'specialityList', specialityList: specialityList});
  dispatch({type: 'loading', loading: false});
  return;
};

export default getSpecialityList;
