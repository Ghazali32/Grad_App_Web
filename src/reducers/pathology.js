const initialState = {
    pathologyList: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'pathologyList':
            return {
                ...state,
                pathologyList: action.pathologyList,
            };
        default:
            return state;
    }
};

export default reducer;
