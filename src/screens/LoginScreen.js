import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  View,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/logo.png';
import backGround from '../assets/background.png';
import Loader from '../common/Loader';
import validator from 'validator';
import titleAlert from '../utils/titleAlert';
import login from '../actions/login';
import logout from '../actions/logout';
import { CountryPicker } from 'react-native-country-codes-picker';
import { scale } from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';


const style = StyleSheet.create({
  wrapper: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginHorizontal: '15%',
    backgroundColor: '#fff',
    borderColor: '#707070',
  },
  button: {
    paddingHorizontal: '10%',
    paddingVertical: '3%',
    borderRadius: 5,
    borderColor: 'transparent',
  },
});

export const LoginScreen = ({ navigation }) => {

  const theme = useTheme();
  const loading = useSelector((state) => state.auth.loading);
  const deviceId = useSelector((state) => state.auth.device_id || null);
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [callingCode, setCallingCode] = useState('91');
  const [countryCode, setCountryCode] = useState('IN');
  const [shouldNavigate, setShouldNaviagte] = useState(true);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const CountryCode = (props) => (
    <Text {...props} style={{ color: theme['color-black-100'] }}>
      +91
    </Text>
  );



  const checkNetworkConnectivity = async () => {
    try {
      const response = await fetch("https://www.google.com", {
        method: "HEAD",
        cache: "no-store",
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };


  async function signInWithPhoneNumber(type, formattedValue) {

    const startTime = Date.now();

    try {
      dispatch({ type: 'loading', loading: true });

      const number = formattedValue
      console.log('Final Number : ', number)

      if (type === 'resend') {
        const resendStartTime = Date.now();
        const confirmation = await auth().signInWithPhoneNumber(number, true);
        const resendDuration = Date.now() - resendStartTime;
        console.log(`Resend duration: ${resendDuration}ms`);
        setConfirm(confirmation);
        return;
      }

      const signInStartTime = Date.now();
      const confirmation = await auth().signInWithPhoneNumber(number);
      const signInDuration = Date.now() - signInStartTime;
      console.log(`SignIn duration: ${signInDuration}ms`);

      navigation.navigate('PasswordResetOTPScreen', {
        phoneNumber: phoneNumber.trim(),
        confirmm: confirmation
      });

      const totalDuration = Date.now() - startTime;
      console.log(`Total function duration: ${totalDuration}ms`);
    } catch (error) {
      const errorTime = Date.now() - startTime;
      console.log(`Error occurred. Total time: ${errorTime}ms`);

      // Existing error handling
      switch (error.code) {
        case 'auth/missing-client-identifier':
          navigation.navigate('PasswordResetOTPScreen', {
            phoneNumber: phoneNumber.trim(),
            formattedValue: formattedValue.trim(),
            country: country,
            countryName: countryName,
            confirmation,
          });
          break;

        case 'auth/invalid-phone-number':
          titleAlert({
            title: 'Error',
            message: 'Invalid number'
          });
          setShouldNaviagte(false);
          break;

        case 'auth/too-many-requests':
          titleAlert({
            title: 'Error',
            message: error.message
          });
          navigation.navigate('PasswordResetOTPScreen', {
            phoneNumber: phoneNumber.trim(),
            signInWithPhoneNumber: signInWithPhoneNumber,
          });
          break;

        default:
          titleAlert({
            title: 'Error',
            message: error.message
          });
          break;
      }
    } finally {
      dispatch({ type: 'loading', loading: false });
    }
  }



  // const getOTP = () => {
  //   if (validator.isEmpty(phoneNumber.trim())) {
  //     return titleAlert({message: 'Mobile Number required'});
  //   }
  //   if (phoneNumber.trim().length !== 10) {
  //     return titleAlert({message: 'Please enter a valid number'});
  //   }
  //   if (validator.isMobilePhone(phoneNumber.trim())) {
  //     setPhoneNumber('');
  //     navigation.navigate('PasswordResetOTPScreen', {
  //       phoneNumber,
  //     });
  //   } else titleAlert({message: 'Please enter a valid number'});
  // };

  const getOTP = async () => {
    console.log(formattedValue)
    const isConnected = await checkNetworkConnectivity();
    if (!isConnected) {
      return titleAlert({
        message:
          "No internet connection. Please check your network settings and try again.",
      });
    }

    if (validator.isEmpty(phoneNumber.trim())) {
      console.log(phoneNumber)
      return titleAlert({ message: 'Mobile Number required' });
    }
    if (validator.isMobilePhone(phoneNumber.trim())) {
      setPhoneNumber('');
      signInWithPhoneNumber('first', formattedValue);
    } else titleAlert({ message: 'Please enter a valid number' });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={style.wrapper}
        keyboardShouldPersistTaps={false}>
        <TouchableWithoutFeedback
          style={style.wrapper}
          onPress={Keyboard.dismiss}>
          <Layout style={style.layout}>
            <ImageBackground
              source={backGround}
              resizeMode="cover"
              style={style.image}>
              <View flex={0.2} />
              <Image
                source={logo}
                style={{ height: scale(150), width: scale(150) }}
              />
              <View flex={1} />
              <Text category="h5" style={{ fontWeight: 'bold' }}>
                Register With Us!
              </Text>
              <Text style={{ color: '#40403F' }}>
                Your information is safe with us
              </Text>
              <View flex={0.2} />
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 5,
                marginHorizontal: '15%',
                height: 50,
              }}>
                <TouchableWithoutFeedback
                  onPress={() => setShowCountryPicker(true)}
                  style={{
                    height: '100%',
                    justifyContent: 'center',
                    paddingLeft: 10,
                    marginRight: 5
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                    <Text style={{ marginRight: 5 }}>{countryCode}</Text>
                    <Text>+{callingCode}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <Input
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                  }}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                    setFormattedValue(`+${callingCode}${text}`);
                  }}
                  keyboardType="phone-pad"
                  autoFocus
                />
              </View>
              <View flex={0.2} />
              <Button
                size="medium"
                onPress={getOTP}
                style={{
                  ...style.button,
                  backgroundColor: theme['color-green-100'],
                }}>
                SEND OTP
              </Button>
              <View flex={1} />
            </ImageBackground>
          </Layout>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <CountryPicker
        show={showCountryPicker}
        pickerButtonOnPress={(item) => {
          setCountryCode(item.code);
          setCallingCode(item.dial_code);
          setFormattedValue(`${item.dial_code}${phoneNumber}`);
          setShowCountryPicker(false);
        }}
        onBackdropPress={() => setShowCountryPicker(false)}
        style={{
          modal: {
            height: 500,
          },
        }}
      />
    </>
  );
};

export default LoginScreen;
