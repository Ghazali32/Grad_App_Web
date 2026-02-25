const initialState = {
  upcomingAppointmentList: [],
  pastAppointmentList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'upcomingAppointmentList':
      return {
        ...state,
        upcomingAppointmentList: action.data,
      };
    case 'pastAppointmentList':
      return {
        ...state,
        pastAppointmentList: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
