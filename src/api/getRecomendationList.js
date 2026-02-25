import axios from 'axios';
import Config from '../../config';

const getRecomendationList = async (data) => {
  let res;
  try {
    res = await axios.post(
      `${Config.url}/api/recomdation/getRecomdatiion`,
      data,
    );
    console.log(res.data.recomdationDetails)
    return {status: 'success', List: res.data.recomdationDetails};
  } catch (e) {
    if (!e.response || !e.response.data) {
      return {status: 'error', type: 'network', message: 'network error'};
    }
    return {status: 'error', ...e.response.data};
  }
};

export default getRecomendationList;
