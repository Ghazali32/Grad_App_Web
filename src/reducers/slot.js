const initialState = {
  morningMap: {},
  loading: false,
  afterNoonMap: {},
  eveningMap: {},
  timeSlotIdMap: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'morningMap':
      return {
        ...state,
        morningMap: action.morningMap,
      };
    case 'afterNoonMap':
      return {
        ...state,
        afterNoonMap: action.afterNoonMap,
      };

    case 'eveningMap':
      return {
        ...state,
        eveningMap: action.eveningMap,
      };
    case 'timeSlotIdMap':
      return {
        ...state,
        timeSlotIdMap: action.timeSlotIdMap,
      };

    default:
      return state;
  }
};

export default reducer;
