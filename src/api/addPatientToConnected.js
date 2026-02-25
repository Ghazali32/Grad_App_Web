import axios from 'axios';
import Config from '../../config';

const addPatientToConnected = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/expert/connection`, data);
    return {Status: 'success', Message: res.data.message};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {Status: 'error', type: 'network', Message: 'network error'};
    }
    return {Status: 'error', ...e.response.data};
  }
};

export default addPatientToConnected;
