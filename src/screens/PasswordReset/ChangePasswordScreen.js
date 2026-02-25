import React, {useState, useEffect} from 'react';
import {
  Button,
  Divider,
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
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import logo from '../../assets/logo.png';
import titleAlert from '../../utils/titleAlert';
import isEmpty from '../../utils/isEmpty';
import BgImage from '../../assets/background.png';
import axios from 'axios';
import Config from '../../../config';
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
    height: 50,
    borderColor: 'black',
    borderColor: 'transparent',
    borderRadius: 10,
  },
  bgStyle: {
    flex: 1,
    alignItems: 'center',
  },
});

export default function ChangePasswordScreen({navigation, route}) {
  const theme = useTheme();
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const loading = useSelector((state) => state.auth.loading);
  const [keyboard, setKeyboard] = useState(false);
  const dispatch = useDispatch();

  const PasswordIcon = (props) => (
    <Icon {...props} name="lock-outline" fill={theme['color-green-100']} />
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

  const changePassword = async () => {
    if (isEmpty(password)) {
      return titleAlert({message: 'Password required'});
    }
    if (password.length < 6) {
      return titleAlert({
        message: 'Password should be at least 6 characters long',
      });
    }

    if (isEmpty(repeatPassword)) {
      return titleAlert({message: 'Repeat Password required'});
    }

    if (password !== repeatPassword) {
      return titleAlert({
        message: 'Password should be same as repeat password',
      });
    }

    dispatch({type: 'loading', loading: true});
    let res;
    try {
      res = await axios.post(Config.url + '/api/auth/change-password', {
        email: route?.params?.email.trim().toLowerCase(),
        otp: route?.params?.otp,
        password: password,
      });

      if (res.data.status == 'success') {
        dispatch({type: 'loading', loading: false});
        navigation.navigate('Login');
        return titleAlert({
          title: 'Success',
          message: 'Password  Changed Successfully',
        });
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
      <TopNavigation
        title={(props) => (
          <Text
            {...props}
            style={[props.style, {color: theme['color-basic-100']}]}>
            Change Password
          </Text>
        )}
        alignment="center"
        style={{backgroundColor: theme['color-green-100']}}
        accessoryLeft={BackAction}
      />
      <Divider />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={style.wrapper}
        keyboardShouldPersistTaps={false}>
        <TouchableWithoutFeedback
          style={style.wrapper}
          onPress={Keyboard.dismiss}>
          <Layout style={style.layout}>
            <ImageBackground source={BgImage} style={style.bgStyle}>
              <View flex={0.5} />
              <Image source={logo} style={style.logo} />
              <View flex={1} />
              <Input
                placeholder="Password"
                value={password}
                size="medium"
                onChangeText={(nextValue) => setPassword(nextValue)}
                style={style.input}
                secureTextEntry={true}
                accessoryLeft={PasswordIcon}
              />
              <Input
                placeholder="Repeat Password"
                value={repeatPassword}
                size="medium"
                onChangeText={(nextValue) => setRepeatPassword(nextValue)}
                style={style.input}
                secureTextEntry={true}
                accessoryLeft={PasswordIcon}
              />
              <View flex={1} />
              <Button
                size="small"
                onPress={changePassword}
                style={{
                  ...style.button,
                  backgroundColor: theme['color-green-100'],
                }}>
                CHANGE PASSWORD
              </Button>
              <View flex={0.5} />
            </ImageBackground>
          </Layout>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
