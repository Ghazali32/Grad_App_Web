import axios from 'axios';
import Config from '../../config';

const getUserForDashBaord = async (data) => {
  let res;
  try {
    console.log('Hitting new Endpoint -----', axios.defaults.headers.common);
    res = await axios.post(`${Config.url}/api/expert/connectedUsersDashboard`, data);
    
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

export default getUserForDashBaord;
