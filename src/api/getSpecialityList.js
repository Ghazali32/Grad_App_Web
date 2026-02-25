import axios from 'axios';
import Config from '../../config';

const getSpecialityList = async () => {
  let res;
  try {
    res = await axios.get(
      `${Config.url}/api/specialization/getAllSpecialization`,
    );
    return {status: 'success', specialityList: res.data.specializations};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getSpecialityList;
