import axios from 'axios';
import Config from '../../config';

const sendChatMessage = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/messages/send`, data);
    res = await axios.post(`${Config.url}/api/messages/list`, data);
    return {status: 'success', messageList: res.data.messages};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default sendChatMessage;
