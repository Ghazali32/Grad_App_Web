import axios from 'axios';
import Config from '../../config';

const getParameter2ById = async (data) => {
  let res;
  try {
    res = await axios.post(
      `${Config.url}/api/parameter/getParameter2ById`,
      data,
    );
    return {
      status: 'success',
      getParameter2ById: res.data.parameter2DetailsById,
    };
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getParameter2ById;
