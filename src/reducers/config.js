import config from '../../config';

const initialState = {
  url: config.url,
  env: config.env,
  logLevel: config.logLevel || 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
