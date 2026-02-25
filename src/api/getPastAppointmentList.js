import axios from 'axios';
import Config from '../../config';

const getPastAppointmentList = async (data) => {
  let res;
  try {
    res = await axios.post(
      `${Config.url}/api/appointments/patientPastAppointment`,
      data,
    );
    return {
      status: 'success',
      patientPastAppointments: res.data.patientPastAppointments,
    };
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getPastAppointmentList;
