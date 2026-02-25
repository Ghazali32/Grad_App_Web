import login from './login';
import logout from './logout';
import patientRegister from './patientRegister';
import getChatMessages from './getChatMessages';
import sendChatMessage from './sendChatMessage';
import declineCall from './declineCall';
import acceptCall from './acceptCall';
import getConnectedPatientList from './getConnectedPatientList';
import getUpcomingAppointmentList from './getUpcomingAppointmentList';
import getPastAppointmentList from './getPastAppointmentList';
import getParameterList from './getParameterList';
import searchNonConnectedPatient from './searchNonConnectedPatient';
import addPatientToConnected from './addPatientToConnected';
import getRecomendationList from './getRecomendationList';
import addRecomendations from './addRecomendations';
import getPatientParameterDetails from './getPatientParameterDetails';
import getParameter2ById from './getParameter2ById';
import getParameter1ById from './getParameter1ById';
import saveParameter1 from './saveParameter1'
import saveParameter2 from './saveParameter2';
import checkUserIsApprove from './checkUserIsApprove';
import { setPushRegistered } from './registerNotification';
import getUserForDashBaord from './getUserForDashBoard';


const Actions = {
  login,
  logout,
  patientRegister,
  getChatMessages,
  sendChatMessage,
  declineCall,
  acceptCall,
  getConnectedPatientList,
  getUserForDashBaord,
  getUpcomingAppointmentList,
  getPastAppointmentList,
  getParameterList,
  searchNonConnectedPatient,
  addPatientToConnected,
  getRecomendationList,
  addRecomendations,
  getPatientParameterDetails,
  getParameter2ById,
  getParameter1ById,
  saveParameter1,
  saveParameter2,
  setPushRegistered,
  updateParameter1,
  updateParameter2,
  checkUserIsApprove

  
};

export default Actions;
