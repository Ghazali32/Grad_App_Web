import axios from 'axios';
import Config from '../../config';

const getParameter2 = async (data) => {
  
  let res;
  try {
    res = await axios.post(`${Config.url}/api/parameter/getParameter2`, data);
  
    return {status: 'success', parameter2Details: res.data.parameter2Details};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getParameter2;
