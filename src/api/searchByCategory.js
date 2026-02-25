import axios from 'axios';
import Config from '../../config';

const searchByCategory = async (data) => {
  let res;
  try {
    res = await axios.post(
      `${Config.url}/api/doctor/searchDocAndSpecialization`,
      data,
    );
    return {status: 'success', searchList: res.data.result};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default searchByCategory;
