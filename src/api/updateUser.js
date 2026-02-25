// TODO login api

import axios from 'axios';
import Config from '../../config';

const updateUser = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/auth/updateuser`, data);
    return {Status: 'success'};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {Status: 'error', type: 'network', message: 'network error'};
    }
    return {Status: 'error', ...e.response.data};
  }
};

export default updateUser;
