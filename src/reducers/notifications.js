const initialState = {
  notificationStatus: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NotificationStatus':
      return {
        ...state,
        notificationStatus: action.status,
      };
    default:
      return state;
  }
};

export default reducer;
