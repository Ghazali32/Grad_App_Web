const initialState = {
  patientDetails: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'patientDetails':
      return {
        ...state,
        patientDetails: action.patientDetails,
      };
    default:
      return state;
  }
};

export default reducer;
