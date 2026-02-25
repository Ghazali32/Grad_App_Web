const initialState = {
  patientList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'connectedPatientList':
      return {
        ...state,
        patientList: action.connectedPatientList,
      };
    default:
      return state;
  }
};

export default reducer;
