import axios from 'axios';
import Config from '../../config';

const checkUserIsApprove = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/auth/checkUserIsApprove`, data);
    return {message:res.data.message,status: res.data.status};
    
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {Status: 'error', type: 'network', Message: 'network error'};
    }
    return {Status: 'error', ...e.response.data};
  }
};

export default checkUserIsApprove;
