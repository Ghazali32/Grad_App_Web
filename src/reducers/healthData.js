const initialState = {
  stepCount: [],
  heartRate: [],
  distance: [],
  activeEnergy: [],
  startDate: '',
  endDate: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Date':
      return {
        ...state,
        startDate: action.startDate,
        endDate: action.endDate,
      };
    case 'StepCount':
      return {
        ...state,
        stepCount: action.data,
      };
    case 'HeartRate':
      return {
        ...state,
        heartRate: action.data,
      };
    case 'Distance':
      return {
        ...state,
        distance: action.data,
      };
    case 'ActiveEnergy':
      return {
        ...state,
        activeEnergy: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
