import axios from 'axios';
import Config from '../../config';

const addParameter2 = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/parameter/parameter2`, data);
    console.log(res.data)
    return {Status: 'success'};
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

export default addParameter2;
