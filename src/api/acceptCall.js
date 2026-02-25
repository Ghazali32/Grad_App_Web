import axios from 'axios';
import Config from '../../config';

const acceptCall = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/videoConference/accept`, data);
    return {status: 'success'};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default acceptCall;
