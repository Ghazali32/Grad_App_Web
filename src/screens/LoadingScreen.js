import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Loader from '../common/Loader';
import * as SplashScreen from 'expo-splash-screen';

export const LoadingScreen = ({navigation}) => {
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    SplashScreen.hideAsync();
    
  
    if (token) {
      navigation.replace('DashboardScreen');
    } else {
      navigation.replace('Login');
    }
  }, []);


  // useEffect(() => {
  //   SplashScreen.hide();
  //   auth().onAuthStateChanged((user) => {
  //     if (user && token) {
  //       console.log(user, 'user exist');
  //       navigation.navigate('ParameterScreen');
  //     } else {
  //       navigation.navigate('Login');
  //     }
  //   });
  // }, []);

  return <Loader />;
};

export default LoadingScreen;
