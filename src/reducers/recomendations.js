const initialState = {
  recomendationList: [],
  imageUrls: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'recomendationList':
      return {
        ...state,
        recomendationList: action.List,
        // imageUrls: action.List?.pics.map(function (arras) {
        //   return {
        //     uri: arras,
        //   };
        // }),
      };
    default:
      return state;
  }
};

export default reducer;
