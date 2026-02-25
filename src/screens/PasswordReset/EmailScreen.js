import React, {useState, useEffect} from 'react';
import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import axios from 'axios';
import Config from '../../../config';
import {useSelector, useDispatch} from 'react-redux';
import logo from '../../assets/logo.png';
import titleAlert from '../../utils/titleAlert';
import isEmpty from '../../utils/isEmpty';
import BgImage from '../../assets/background.png';
import Loader from '../../common/Loader';

const style = StyleSheet.create({
  wrapper: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',

    marginTop: 50,
  },
  input: {
    maxWidth: 350,
    marginBottom: 8,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
  },
  button: {
    marginBottom: 8,
    width: 170,
    height: 45,
    borderColor: 'black',
  },
  bgStyle: {
    flex: 1,
    alignItems: 'center',
  },
});

export const EmailScreen = ({navigation}) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [keyboard, setKeyboard] = useState(false);

  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  const EmailIcon = (props) => (
    <Icon {...props} name="email-outline" fill={theme['color-green-100']} />
  );
  const BackIcon = (props) => (
    <Icon {...props} name="arrow-back" fill={theme['color-grey-100']} />
  );

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={navigateBack}
      appearance="control"
    />
  );
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setKeyboard(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboard(false));
    return () => {
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
    };
  }, []);

  const requestOTP = async () => {
    if (isEmpty(email)) {
      return titleAlert({message: 'Email required'});
    }

    let res;
    dispatch({type: 'loading', loading: true});
    try {
      res = await axios.post(Config.url + '/api/auth/request-otp', {
        email: email.trim().toLowerCase(),
      });
      if (res.data.status == 'success') {
        dispatch({type: 'loading', loading: false});
        Alert.alert('Success', 'Code has been sent to your email', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('PasswordResetOTPScreen', {
                email: email.trim().toLowerCase(),
              }),
          },
        ]);
      } else {
        dispatch({type: 'loading', loading: false});
        titleAlert({message: res.data.message});
      }
    } catch (e) {
      dispatch({type: 'loading', loading: false});
      titleAlert({message: 'Wrong Credentials'});
    }
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
            <TopNavigation
              title={(props) => (
                <Text
                  {...props}
                  style={[props.style, {color: theme['color-basic-100']}]}>
                  Forgot Password
                </Text>
              )}
              alignment="center"
              style={{backgroundColor: theme['color-green-100']}}
              accessoryLeft={BackAction}
            />
            <ImageBackground source={BgImage} style={style.bgStyle}>
              <Image source={logo} style={style.logo} />
              <View flex={0.5} />
              <Text
                category="h6"
                style={{fontWeight: 'bold', color: theme['color-black-100']}}>
                Forgot Password
              </Text>
              <View flex={0.2} />
              <Text
                category="s2"
                style={{
                  textAlign: 'center',
                  paddingHorizontal: '10%',
                  color: theme['color-grey-100'],
                }}>
                We just need your registered Email to send you password reset
                instructions
              </Text>
              <View flex={0.6} />
              <Input
                placeholder={'Email or Username'}
                value={email}
                size="medium"
                onChangeText={(nextValue) => setEmail(nextValue)}
                style={style.input}
                accessoryLeft={EmailIcon}
              />
              <View flex={1} />
              <Button
                size="small"
                onPress={requestOTP}
                style={{
                  ...style.button,
                  backgroundColor: theme['color-green-100'],
                  borderColor: 'transparent',
                  borderRadius: 10,
                }}>
                REQUEST CODE
              </Button>
              <View flex={0.5} />
            </ImageBackground>
          </Layout>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default EmailScreen;
