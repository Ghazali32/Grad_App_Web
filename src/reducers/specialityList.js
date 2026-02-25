const initialState = {
  specialityList: [],
  doctorBySpecialityList: [],
  doctorDetails: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'specialityList':
      return {
        ...state,
        specialityList: action.specialityList,
      };
    case 'doctorBySpecialityList':
      return {
        ...state,
        doctorBySpecialityList: action.doctorBySpecialityList,
      };
    case 'doctorDetails':
      return {
        ...state,
        doctorDetails: action.doctorDetails,
      };

    default:
      return state;
  }
};

export default reducer;
