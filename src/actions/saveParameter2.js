import API from '../api';
import {Alert} from 'react-native';
import {store} from '../../store';
import axios from 'axios';
const saveParameter2 = ({
  gradTherapy,
  weight_BeforeTherapy,
  weight_AfterTherapy,
  bloodPressureUpperValue_BeforeTherapy,
  bloodPressureLowerValue_BeforeTherapy,
  bloodPressureUpperValue_AfterTherapy,
  bloodPressureLowerValue_AfterTherapy,
  therapyDuration,
  swelling_BeforeTherapy,
  swelling_AfterTherapy,
  discomforts_BeforeTherapy,
  discomforts_AfterTherapy,
  parameter2Id,
  setSaveBtnState,
  type,
  navigation,
  feedback_BeforeTherapy,
  pplunch,
  ppdinner,
  insulinData,
  constipation,
  energyLevels,
  bodyPain,
  bodyPainIntensity,
  swelling,
  feedback,
  day,
  userId,
}) => async (dispatch) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };
  dispatch({type: 'loading', loading: true});
  if (type === 'create') {
    const {Status, Message} = await API.addParameter2({
      gradTherapy,
      weight_BeforeTherapy,
      weight_AfterTherapy,
      bloodPressureUpperValue_BeforeTherapy,
      bloodPressureLowerValue_BeforeTherapy,
      bloodPressureUpperValue_AfterTherapy,
      bloodPressureLowerValue_AfterTherapy,
      therapyDuration,
      swelling_BeforeTherapy,
      swelling_AfterTherapy,
      discomforts_BeforeTherapy,
      discomforts_AfterTherapy,
      day,
      parameter2Id,
      pplunch,
      ppdinner,
      insulinData,
      constipation,
      energyLevels,
      bodyPain,
      bodyPainIntensity,
      swelling,
      feedback,
      day,
      userId,
      updateDate:Date.now()
    });

    if (Status === 'error') {
      Alert.alert('Error', Message, [{text: 'OK'}]);
      dispatch({type: 'loading', loading: false});
      return;
    }
  } else {
    const {Status, Message} = await API.updateParameter2({
      gradTherapy,
      weight_BeforeTherapy,
      weight_AfterTherapy,
      bloodPressureUpperValue_BeforeTherapy,
      bloodPressureLowerValue_BeforeTherapy,
      bloodPressureUpperValue_AfterTherapy,
      bloodPressureLowerValue_AfterTherapy,
      therapyDuration,
      swelling_BeforeTherapy,
      swelling_AfterTherapy,
      discomforts_BeforeTherapy,
      discomforts_AfterTherapy,
      day,
      parameter2Id,
      feedback_BeforeTherapy,
      pplunch,
      ppdinner,
      insulinData,
      constipation,
      energyLevels,
      bodyPain,
      bodyPainIntensity,
      swelling,
      feedback,
      day,
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
  // parameter2Details
  setSaveBtnState(true);
  if (type === 'create') {
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
    Alert.alert('Success', 'Parameter added successfully', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  } else {
    dispatch({type: 'loading', loading: false});
    Alert.alert('Success', 'Parameter updated successfully', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  }
  return;
};

export default saveParameter2;
