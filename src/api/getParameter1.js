import axios from 'axios';
import Config from '../../config';

const getParameter1 = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/parameter/getParameter1`, data);
    return {status: 'success', parameter1Details: res.data.parameter1Details};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getParameter1;
