import login from './login';
import register from './register';
import getChatMessages from './getChatMessages';
import sendChatMessage from './sendChatMessage';
import declineCall from './declineCall';
import acceptCall from './acceptCall';
import getSpecialityList from './getSpecialityList';
import getDoctorBySpeciality from './getDoctorBySpecilaity';
import getDoctorDetails from './getDoctorDetalis';
import searchByCategory from './searchByCategory';
import searchByCategoryId from './searchByCategoryId';
import getConnectedPatientList from './getConnectedPatientList';
import getUser from './getUser';
import updateUser from './updateUser';
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
import updateParameter1 from './updateParameter1';
import updateParameter2 from './updateParameter2';
import getParameter2 from './getParameter2';
import getParameter1 from './getParameter1';
import addParameter1 from './addParameter1'
import addParameter2 from './addParameter2'
import checkUserIsApprove from './checkUserIsApprove'
import getUserForDashBaord from './getUserForDashBoard'
const API = {
  login,
  register,
  getChatMessages,
  sendChatMessage,
  declineCall,
  acceptCall,
  getSpecialityList,
  getDoctorBySpeciality,
  getDoctorDetails,
  searchByCategory,
  searchByCategoryId,
  getConnectedPatientList,
  getUser,
  updateUser,
  getUpcomingAppointmentList,
  getUserForDashBaord,
  getPastAppointmentList,
  getParameterList,
  searchNonConnectedPatient,
  addPatientToConnected,
  getRecomendationList,
  addRecomendations,
  getPatientParameterDetails,
  getParameter2ById,
  getParameter1ById,
  updateParameter1,
  updateParameter2,
  getParameter2,
  getParameter1,
  addParameter2,
  addParameter1,
  checkUserIsApprove,
};

export default API;
