import {combineReducers} from 'redux';
import auth from './auth';
import config from './config';
import pathology from './pathology';
import chat from './chat';
import specialityList from './specialityList';
import search from './search';
import connectedPatientList from './connectedPatientList';
import slot from './slot';
import appointmentList from './appointmentList';
import healthData from './healthData';
import location from './location';
import videoCall from './videoCall';
import notifications from './notifications';
import assignedPatientDetails from './assignedPatientDetails';
import parameterList from './parameterList';
import searchNonConnectedPatient from './searchNonConnectedPatient';
import recomendations from './recomendations';
import patientParameterDetails from './patientParameterDetails';
import authReducer from './notification';
export default combineReducers({
  auth,
  authReducer,
  config,
  pathology,
  chat,
  specialityList,
  search,
  connectedPatientList,
  slot,
  appointmentList,
  healthData,
  location,
  videoCall,
  notifications,
  assignedPatientDetails,
  parameterList,
  searchNonConnectedPatient,
  recomendations,
  patientParameterDetails,
});
