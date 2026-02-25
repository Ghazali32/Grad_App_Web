const initialState = {
  messageList: [],
  currentDoctorReceiverId: null,
  docPic: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'messageList':
      return {
        ...state,
        messageList: action.messageList,
      };

    case 'currentDoctorReceiverId':
      return {
        ...state,
        currentDoctorReceiverId: action.currentDoctorReceiverId,
        docPic: action.docPic,
      };

    default:
      return state;
  }
};

export default reducer;
