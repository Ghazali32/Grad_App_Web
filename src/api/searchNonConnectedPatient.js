import axios from 'axios';
import Config from '../../config';

const searchNonConnectedPatient = async (data) => {
  let res;
  try {
    res = await axios.post(
      `${Config.url}/api/expert/searchNotConnectedUsers`,
      data,
    );
    return {
      status: 'success',
      List: res.data.searchedUsersList,
    };
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default searchNonConnectedPatient;
