import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';
import axios from 'axios';

const addRecomendations = ({
  userId,
  pics,
  text,
  videoLink,
  day,
  navigation,
  audioFileUrl,
  dayId
}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  const expertId = store.getState().auth.expertId;
  dispatch({type: 'loading', loading: true});
  const {Status, Message} = await API.addRecomendations({
    userId,
    expertId,
    pics,
    text,
    videoLink,
    day,
    audioFileUrl,
    dayId
  });
  if (Status === 'error') {
    Alert.alert('Error', Message, [{text: 'OK'}]);
    dispatch({type: 'loading', loading: false});
    return;
  }
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
  const {
    getParameterStatus,
    getParameterMessage,
    parameterList,
  } = await API.getParameterList({
    userId,
  });
  if (getParameterStatus === 'error') {
    Alert.alert('Error', getParameterMessage, [{text: 'OK'}]);
    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({type: 'parameterList', parameterList});
  Alert.alert('Success', Message, [
    {text: 'OK', onPress: () => navigation.pop(3)},
  ]);
  dispatch({type: 'loading', loading: false});
};

export default addRecomendations;
