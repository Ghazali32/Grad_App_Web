const initialState = {
  parameterList: [],
  parameter1Details: [],
  parameter2Details: [],
  parameter2ById: {},
  parameter1: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "parameterList":
      return {
        ...state,
        parameterList: action.parameterList,
      };
    case "parameter1Details":
      return {
        ...state,
        parameter1Details: action.parameter1Details[0],
      };
    case "parameter2Details":
      return {
        ...state,
        parameter2Details: action.parameter2Details,
      };
    case "getParameter2ById":
      return {
        ...state,
        parameter2ById: action.getParameter2ById,
      };
    case "getParameter1ById":
      return {
        ...state,
        parameter1: action.payload, 
      };

    default:
      return state;
  }
};

export default reducer;
