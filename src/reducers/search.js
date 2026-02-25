const initialState = {
  searchList: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'searchList':
      return {
        ...state,
        searchList: action.searchList,
      };

    default:
      return state;
  }
};

export default reducer;
