import axios from 'axios';
import Config from '../../config';

const register = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/auth/register`, data);
    return {status: 'success', message: 'Registered successfully.'};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default register;
