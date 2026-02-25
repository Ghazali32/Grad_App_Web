import API from '../api';
import {Alert} from 'react-native';
import axios from 'axios';
import {store} from '../../store';

const searchByCategory = ({
  userNameAndSpecialization,
  longitude,
  latitude,
}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  const {status, searchList} = await API.searchByCategory({
    userNameAndSpecialization,
    longitude,
    latitude,
  });

  if (status === 'error') {
    Alert.alert('Error', 'Network Error', [{text: 'OK'}]);
    return;
  }
  dispatch({
    type: 'searchList',
    searchList: searchList,
  });

  return;
};

export default searchByCategory;
