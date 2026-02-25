import axios from 'axios';
import Config from '../../config';

const getDoctorBySpeciality = async (data) => {
  let res;
  try {
    res = await axios.post(
      `${Config.url}/api/doctor/searchDoctorsBySpecialization`,
      data,
    );
    return {status: 'success', doctorBySpecialityList: res.data.doctorsList};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getDoctorBySpeciality;
