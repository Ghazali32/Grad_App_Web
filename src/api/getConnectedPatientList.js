import axios from 'axios';
import Config from '../../config';

const getConnectedPatientList = async (data) => {
  let res;
  try {
    res = await axios.post(`${Config.url}/api/expert/connectedUsers`, data);
    console.log(axios.defaults.headers.common);
    return {status: 'success', patientList: res.data.connectedUserList};
  } catch (e) {
    console.log(e, 'catchhhh');
    if (!e.response || !e.response.data) {
      console.log(e.response, 'catchhhh ifffff');
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getConnectedPatientList;
