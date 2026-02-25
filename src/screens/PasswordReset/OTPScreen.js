import React, {useState, useEffect} from 'react';
import {Button, Layout, Text, useTheme} from '@ui-kitten/components';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import titleAlert from '../../utils/titleAlert';
import OTPTextView from 'react-native-otp-textinput';
import Loader from '../../common/Loader';
import auth from '@react-native-firebase/auth';
import login from '../../actions/login';
import logout from '../../actions/logout';
import validator from 'validator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const style = StyleSheet.create({
  wrapper: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
  layout: {
    flex: 1,
    marginBottom: 20,
  },
  input: {
    maxWidth: 300,
    marginBottom: 8,
  },
  button: {
    marginVertical: '15%',
    paddingHorizontal: '20%',
    alignSelf: 'center',
    paddingVertical: '3%',
    borderRadius: 5,
    borderColor: 'transparent',
    backgroundColor: '#49B585',
  },
  textInputContainer: {
    marginVertical: '15%',
  },
  roundedTextInput: {
    borderRadius: 7,
    borderWidth: 1,
    height: 60,
    width: 45,
  },
  headingView: {
    backgroundColor: '#49B585',
    height: '30%',
    paddingLeft: '5%', // padding:10,
    paddingTop: '8%',
  },
  headingText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ContentView: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
    top: '-5%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: '70%',
    padding: '3%',
  },
  scrollView: {
    padding: 5,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export const OTPScreen = ({route, navigation}) => {
  console.log()
  const {phoneNumber,confirmm} = route.params;
  const theme = useTheme();
  const dispatch = useDispatch();
  const [keyboard, setKeyboard] = useState(false);
  const loading = useSelector((state) => state.auth.loading || false);
  const deviceId = useSelector((state) => state.auth.device_id || null);

  const [OTP, setOtp] = useState('');
  const [initialTime, setInitialTime] = useState(30);
  const [startTimer, setStartTimer] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const expertId = useSelector((state) => state.auth.expertId || null);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setKeyboard(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboard(false));
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  useEffect(()=>{
    console.log('Expert Id in OTP Screen ---------- ',expertId)
    setConfirm(confirmm);
  },[])

  useEffect(() => {

    auth().onAuthStateChanged((user)=>{
      if(user)
      {
        dispatch({type: 'loading', loading: true});
        console.log("---------------------------------",user)
      dispatch(
        login({
          mobile: phoneNumber,
          deviceId,
          navigation,
          OTP
        }),
      );
      }else{
        // dispatch(logout({navigation}))
      }
      
    })
  },[])

  async function signInWithPhoneNumber(type, phoneNumber) {

    
    // await setCountryCode('+' + phoneInput.current?.getCallingCode());
    // await setCountryName(phoneInput.current?.getCountryCode());
  
    try {
      let number = '+91' + phoneNumber;
      console.log(number, phoneNumber, '=====>');
      dispatch({type: 'loading', loading: true});
      if (type === 'resend') {
        const confirmation = await auth().signInWithPhoneNumber(number, true);
        // Alert.alert('Success', 'New code has been sent to your number', [
        //   {text: 'OK', onPress: () => restartTimer()},
        // ]);
        setConfirm(confirmation);
        console.log("confirmation at sign ", confirmation);
      }

      dispatch({type: 'loading', loading: false});
    } catch (e) {
      // setShouldNaviagte(false);
      dispatch({type: 'loading', loading: false});

      switch (e.code) {
        case 'auth/invalid-phone-number':
          setShouldNaviagte(false);

          titleAlert({
            title: 'Error',
            // message: e.message,
            message: 'Invalid number',
          });
          break;
        case 'auth/too-many-requests':
          setShouldNaviagte(true); // Remove this when more exceed error will get fixed
          titleAlert({
            title: 'Error',
            message: e.message,
          });
          navigation.navigate('PasswordResetOTPScreen', {
            phoneNumber: phoneNumber.trim(),
            signInWithPhoneNumber: signInWithPhoneNumber,
          });
          break;
      }
    }
  }

  const confirmCode = async () => {
    if (validator.isEmpty(OTP)) {
      return titleAlert({message: 'OTP required'});
    }
    if (OTP.trim().length !== 6) {
      return titleAlert({message: 'OTP should be of 6 digit'});
    }
    console.log(phoneNumber,
      deviceId,
      navigation,
      OTP);

    
    try {
      // console.log("confirmation  ", confirm);
      // console.log("waiting response",OTP.trim())
      // dispatch({type: 'loading', loading: true});
      const response = await confirm.confirm(OTP.trim());
      // console.log({response});
      // console.log("checking response")
      if (response) {
        // console.log("otp veriyfoedr")
        dispatch({type: 'loading', loading: false});
        dispatch(
          login({
            mobile: phoneNumber,
            deviceId,
            navigation,
            OTP
          }),
        );
      }
    } catch (e) {
      console.log(e, e.message, 'error in confirm code');
      dispatch({type: 'loading', loading: false});
      if (e.code) {
        switch (e.code) {
          case 'auth/session-expired':
            titleAlert({
              title: 'Error',
              message: e.message,
            });
            break;
            case 'auth/invalid-verification-code':
              titleAlert({title: 'Error', message: "error in confirm code"});
              break;
        }
      } else {
        titleAlert({title: 'Error', message: e.message});
      }
    }
  };

  useEffect(() => {
    if (initialTime > 0) {
      setTimeout(() => {
        setInitialTime(initialTime - 1);
      }, 1000);
    }

    if (initialTime === 0 && startTimer) {
      setStartTimer(false);
    }
  }, [initialTime, startTimer]);


  const restartTimer = () => {
    setInitialTime(30);
    setStartTimer(true);
  };

  if (loading) {
    return <Loader />;
  }



  // useEffect(() => {
  //   signInWithPhoneNumber('first');
  // }, []);

  // async function signInWithPhoneNumber(type) {
  //   dispatch({type: 'loading', loading: true});
  //   try {
  //     let number = '+91' + phoneNumber;
  //     const confirmation =
  //       type === 'first'
  //         ? await auth().signInWithPhoneNumber(number)
  //         : await auth().signInWithPhoneNumber(number, true);
  //     if (type === 'resend') {
  //       Alert.alert('Success', 'New otp has been sent to your number', [
  //         {text: 'OK', onPress: () => restartTimer()},
  //       ]);
  //     }
  //     dispatch({type: 'loading', loading: false});
  //     setConfirm(confirmation);
  //   } catch (e) {
  //     console.log(e, e.message, 'error in signwithphone nuber');
  //     dispatch({type: 'loading', loading: false});
  //     switch (e.code) {
  //       case 'auth/too-many-requests':
  //         titleAlert({
  //           title: 'Error',
  //           message: e.message,
  //         });
  //         break;
  //       case 'auth/invalid-phone-number':
  //         titleAlert({
  //           title: 'Error',
  //           message: e.message,
  //         });
  //         break;
  //       case 'auth/network-request-failed':
  //         titleAlert({
  //           title: 'Error',
  //           message: e.message,
  //         });
  //         break;
  //     }
  //   }
  // }



  return (
    <Layout style={style.layout}>
      <KeyboardAwareScrollView
        enableAutomaticScroll={true}
        extraScrollHeight={0}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: 'transparent',
        }}>
        <View style={style.inner}>
          <View style={style.headingView}>
            <Text category="h5" style={style.headingText}>
              {'Enter the 6-digit OTP sent to \n' + '+91' + phoneNumber}
            </Text>
          </View>
          <View style={style.ContentView}>
            <TouchableWithoutFeedback
              style={style.wrapper}
              onPress={Keyboard.dismiss}>
              <Layout style={style.layout}>
                <OTPTextView
                  handleTextChange={(e) => setOtp(e)}
                  containerStyle={style.textInputContainer}
                  textInputStyle={{
                    ...style.roundedTextInput,
                    borderColor: theme['color-green-100'],
                  }}
                  inputCount={6}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      category="s1"
                      style={{color: theme['color-grey-100']}}>
                      Don't receive the code ?
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity
                      // onPress={() => signInWithPhoneNumber('resend')}
                      onPress={() =>
                        initialTime == 0
                          ? (signInWithPhoneNumber('resend', phoneNumber),
                            Alert.alert(
                              'Success',
                              'New code has been sent to your number',
                              [{text: 'OK', onPress: () => restartTimer()}],
                            ))
                          : {}
                      }>
                      <Text
                        category="h6"
                        style={
                          initialTime > 0
                            ? {color: theme['color-grey-100']}
                            : {color: theme['color-green-100']}
                        }>
                        {' Resend'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'column', flex: 1}}>
                    <Text
                      category="p1"
                      style={{
                        color: theme['color-green-100'],
                        fontWeight: 'bold',
                        alignSelf: 'flex-end',
                      }}>
                      {initialTime < 10
                        ? `00:0${initialTime}`
                        : `00:${initialTime}`}
                    </Text>
                  </View>
                </View>
                <Button
                  size="medium"
                  onPress={() => confirmCode()}
                  style={style.button}>
                  <Text
                    category="h6"
                    style={{color: '#fff', fontWeight: 'bold'}}>
                    VERIFY
                  </Text>
                </Button>
              </Layout>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export default OTPScreen;
