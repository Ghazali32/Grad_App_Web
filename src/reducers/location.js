const initialState = {
  latitude: '',
  longitude: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Location':
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
      };
    default:
      return state;
  }
};

export default reducer;
