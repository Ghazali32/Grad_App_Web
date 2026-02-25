const initialState = {
  existingMeetingStatus: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'existingMeeting':
      return {
        ...state,
        existingMeetingStatus: action.status,
      };

    default:
      return state;
  }
};

export default reducer;
