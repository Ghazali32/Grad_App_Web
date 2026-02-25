import axios from 'axios';
import Config from '../../config';

const getUser = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/auth/getuser`, data);
    return {status: 'success', patientDetails: res.data.userDetails};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getUser;
