import axios from 'axios';
import Config from '../../config';

const updateParameter1 = async (data) => {

  let res;
  try {
    res = await axios.post(
      `${Config.url}/api/parameter/updateParameter1`,
      data,
    );
    return {Status: 'success'};
  } catch (e) {
    
    if (!e.response || !e.response.data) {
      
      return {Status: 'error', type: 'network', Message: 'network error'};
    }
    return {Status: 'error', ...e.response.data};
  }
};

export default updateParameter1;
