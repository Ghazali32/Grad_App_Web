import axios from 'axios';
import Config from '../../config';

const getPatientParameterDetails = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/patient/userParaDetails`, data);
    return {
      status: 'success',
      form1Details: res.data.form1Details,
      form2Details: res.data.form2Details,
    };
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getPatientParameterDetails;
