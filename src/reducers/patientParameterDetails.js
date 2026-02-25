const initialState = {
  form1Details: {},
  form2Details: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'patientParameterDetails':
      return {
        ...state,
        form1Details: action.form1Details,
        form2Details: action.form2Details,
      };
    default:
      return state;
  }
};

export default reducer;
