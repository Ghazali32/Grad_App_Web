import axios from 'axios';
import Config from '../../config';

const getDoctorDetails = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/doctor/doctorDetails`, data);
    return {
      status: 'success',
      doctorDetails: res.data.doctorAndVacantSlotDetails,
    };
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getDoctorDetails;
