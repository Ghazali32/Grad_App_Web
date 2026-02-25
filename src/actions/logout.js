import axios from 'axios';
import auth from '@react-native-firebase/auth';

const logout = ({navigation}) => async (dispatch) => {
  const logoutFunc = () => {
    dispatch({type: 'loading', loading: true});
    axios.defaults.headers.common['Authorization'] = null;
    dispatch({type: 'logout'});
    dispatch({type: 'loading', loading: false});
    navigation.navigate('Login');
  };
  try {
    console.log('logout try block');
    await auth().signOut();
    logoutFunc();
  } catch (e) {
    console.log(e, 'catch block');
    logoutFunc();
  }
};

export default logout;
