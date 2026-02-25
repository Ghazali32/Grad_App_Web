const initialState = {
  patientList: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'loadingNonConnectedPatientList':
      return {
        ...state,
        loading: true
      };
    case 'searchNonConnectedPatientList':
      return {
        ...state,
        loading: false,
        patientList: action.List,
      };
    case 'resetNonConnectedPatientList':
      return {
        ...state,
        loading: false,
        patientList: [],
      };
    default:
      return state;
  }
};

export default reducer;
