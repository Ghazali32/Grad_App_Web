const initialState = {
  token: null,
  expertId: null,
  device_id: null,
  loading: false,
  userDetails: null,
  checkUserIsApprove: '',
  approvalMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: action.loading,
      };
    case 'logout':
      return {
        ...state,
        token: null,
        expertId: null,
      };
    case 'login':
      return {
        ...state,
        token: action.token,
        expertId: action.expertId,
      };
    case 'userDetails':
      return {
        ...state,
        userDetails: action.userDetails,
      };
    case 'device_id':
      return {
        ...state,
        device_id: action.deviceToken,
      };
    case 'checkUserIsApprove':
      return {
        ...state,
        checkUserIsApprove: action.status,
        approvalMessage: action.message,
      };
    default:
      return state;
  }
};

export default reducer;
