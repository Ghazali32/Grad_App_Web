import API from '../api';
import {Alert} from 'react-native';
import axios from 'axios';
import {store} from '../../store';
import ParameterList from '../screens/ParameterScreen/ParameterList';

const getParameterList = ({userId}) => async (dispatch) => {
  // Set up authorization header
  axios.defaults.headers.common = {
    Authorization: `Bearer ${store.getState().auth.token}`,
  };

  // Start loading
  dispatch({type: 'loading', loading: true});

  try {
    // Fetch parameter list from API
    const {status, parameterList} = await API.getParameterList({userId});
    // console.log('Para ------- ',parameterList)

    // Handle error response from API
    if (status === 'error') {
      throw new Error('Error fetching data');
    }

    // Dispatch parameter list to store
    dispatch({type: 'parameterList', parameterList});
  } catch (error) {
    // Determine if the error is a network error
    if (axios.isAxiosError(error) && error.message.includes('Network Error')) {
      Alert.alert('Error', 'Network Error. Please check your internet connection.', [{text: 'OK'}]);
      dispatch({type: 'offline', offline: true}); // Set offline state
    } else {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.', [{text: 'OK'}]);
    }


    // Clear the parameter list data to prevent displaying outdated data
    dispatch({type: 'parameterList', parameterList: null});
  } finally {
    // Stop loading
    dispatch({type: 'loading', loading: false});
  }
};

export default getParameterList;
