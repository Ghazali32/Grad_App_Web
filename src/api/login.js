import axios from 'axios';
import Config from '../../config';

const login = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/auth/login`, data);
    return {
      Status: 'success',
      Message: res.data.message,
      token: res.data.token,
      expertId: res.data.userId,
    };
  } catch (e) {
    if (e.response.status === 404) {
      return {
        Status: 'error',
        type: 'network',
        Message: e.response.data.message,
      };
    }
    if (!e.response || !e.response.data) {
      return {Status: 'error', type: 'network', Message: 'network error'};
    }
    return {Status: 'error', ...e.response.data};
  }
};

export default login;
