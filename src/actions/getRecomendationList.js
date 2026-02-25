import API from '../api';
import {Alert} from 'react-native';
import axios from 'axios';
import {store} from '../../store';

const getRecomendationList = ({userId, day}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});

  const {status, message, List} = await API.getRecomendationList({
    userId,
    day,
  });
  if (status === 'error') {
    Alert.alert('Error', message, [{text: 'OK'}]);

    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({type: 'recomendationList', List});
  dispatch({type: 'loading', loading: false});
  return;
};

export default getRecomendationList;
