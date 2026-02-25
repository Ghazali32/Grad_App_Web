import axios from 'axios';
import Config from '../../config';

const getUpcomingAppointmentList = async (data) => {
  let res;
  try {
    res = await axios.post(
      `${Config.url}/api/appointments/patientUpcomingAppointment`,
      data,
    );
    return {
      status: 'success',
      patientUpcomingAppointments: res.data.patientUpcomingAppointments,
    };
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getUpcomingAppointmentList;
