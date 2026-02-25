import API from '../api';
import {Alert} from 'react-native';
import titleAlert from '../utils/titleAlert';
import {store} from '../../store';
import axios from 'axios';
const saveParameter1 = ({
  urineOutputs,
  goForDialysisToday,
  kFTDone,
  kFTValue,
  day,
  userId,
  parameter1Id,
  uploadFile,
  chooseApi,
  navigation,
  setSaveBtnState,
}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});
  if (chooseApi === 'create') {
    const {Status, Message} = await API.addParameter1({
      urineOutputs,
      goForDialysisToday,
      kFTDone,
      kFTValue,
      day,
      userId,
      uploadFile,
    });
    if (Status === 'error') {
      Alert.alert('Error', Message, [{text: 'OK'}]);
      dispatch({type: 'loading', loading: false});
      return;
    }
  } else {
    const {Status, Message} = await API.updateParameter1({
      urineOutputs,
      goForDialysisToday,
      kFTDone,
      kFTValue,
      day,
      parameter1Id,
      uploadFile,
      userId,
      updateDate:Date.now()
    });
    if (Status === 'error') {
      Alert.alert('Error', Message, [{text: 'OK'}]);
      dispatch({type: 'loading', loading: false});
      return;
    }
  }

  const {
    status,
    message,
    form1Details,
    form2Details,
  } = await API.getPatientParameterDetails({
    day,
    userId,
  });
  if (status === 'error') {
    Alert.alert('Error', message, [{text: 'OK'}]);
    dispatch({type: 'loading', loading: false});
    return;
  }
  dispatch({type: 'patientParameterDetails', form1Details, form2Details});
  setSaveBtnState(true);
  if (chooseApi === 'create') {
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
    dispatch({type: 'loading', loading: false});
    titleAlert({title: 'Success', message: 'Parameter added successfully'});
  } else {
    dispatch({type: 'loading', loading: false});
    Alert.alert('Success', 'Parameter added successfully', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  }
  return;
};

export default saveParameter1;
