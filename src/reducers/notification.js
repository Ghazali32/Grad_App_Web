const initialState = {
    expertId: null,
    isPushRegistered: false, // Track whether push registration is done
    // other state properties...
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PUSH_REGISTERED':
        return { ...state, isPushRegistered: true };
      // other cases...
      default:
        return state;
    }
  };
  
  export default authReducer;
  