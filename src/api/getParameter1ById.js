import axios from 'axios';
import Config from '../../config';

const getParameter1ById = async (data) => {
  let res;
  try {
    res = await axios.post(
      `${Config.url}/api/parameter/getParameter1ById`,
      data,
    );
    return {
      status: 'success',
      getParameter1ById: res.data.parameter1DetailsById,
    };
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getParameter1ById;
