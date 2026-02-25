import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Button,
  Input,
  Layout,
  useTheme,
  Icon,
  Text,
} from '@ui-kitten/components';
import {
  Image,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import logo from '../../assets/logo.png';
import patientRegister from '../../actions/patientRegister';
import titleAlert from '../../utils/titleAlert';
import validator from 'validator';
import isEmpty from '../../utils/isEmpty';
import backGround from '../../assets/background.png';
import RNDatePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import Loader from '../../common/Loader';

const style = StyleSheet.create({
  wrapper: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    // marginBottom: 12,
    marginBottom: '10%',
    // marginTop: 10,
    marginTop: '20%',
    alignSelf: 'center',
    flex: 1,
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
    marginTop: 40,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  scroll: {
    margin: 0,
    padding: 0,
    flex: 1,
  },
});

export const Register = ({navigation}) => {
  const theme = useTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [mobile, setMobile] = useState('');
  const loading = useSelector((state) => state.auth.loading || false);
  const dispatch = useDispatch();

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const EyeIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
        fill={theme['color-green-100']}
      />
    </TouchableWithoutFeedback>
  );
  const EmailIcon = (props) => (
    <Icon {...props} name="email-outline" fill={theme['color-green-100']} />
  );

  const PasswordIcon = (props) => (
    <Icon {...props} name="lock-outline" fill={theme['color-green-100']} />
  );

  const UserIcon = (props) => (
    <Icon {...props} name="person-outline" fill={theme['color-green-100']} />
  );
  const StreetIcon = (props) => (
    <Icon {...props} name="pin-outline" fill={theme['color-green-100']} />
  );

  const MobileIcon = (props) => (
    <Icon {...props} name="phone-outline" fill={theme['color-green-100']} />
  );
  const NextIcon = (props) => (
    <Icon
      {...props}
      name="arrow-forward-outline"
      fill={theme['color-basic-100']}
      style={[
        props.style,
        {
          position: 'absolute',
          bottom: -8,
          right: -22,
        },
      ]}
    />
  );

  const register = () => {
    if (isEmpty(firstName)) {
      return titleAlert({message: 'First name required'});
    }
    if (firstName.trim().length < 3) {
      return titleAlert({
        message: 'Firstname should be at least 3 characters long',
      });
    }
    if (isEmpty(lastName)) {
      return titleAlert({message: 'Last name required'});
    }
    if (lastName.trim().length < 3) {
      return titleAlert({
        message: 'Lastname should be at least 3 characters long',
      });
    }
    if (isEmpty(streetAddress)) {
      return titleAlert({message: 'Street Address required'});
    }

    if (isEmpty(email)) {
      return titleAlert({message: 'Email required'});
    }

    if (!validator.isEmail(email.trim())) {
      return titleAlert({message: 'Please enter a valid email'});
    }

    if (isEmpty(gender)) {
      return titleAlert({message: 'Gender required'});
    }
    if (isEmpty(birthDate)) {
      return titleAlert({message: 'Date of Birth required'});
    }

    if (isEmpty(password)) {
      return titleAlert({message: 'Password required'});
    }

    if (password.length < 6) {
      return titleAlert({
        message: 'Password should be at least 6 characters long',
      });
    }
    if (streetAddress.length < 10) {
      return titleAlert({
        message: 'Street address should be minimum 10 characters',
      });
    }

    if (isEmpty(mobile)) {
      return titleAlert({message: 'Mobile Phone required'});
    }

    dispatch(
      patientRegister({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        streetAddress: streetAddress.trim(),
        email: email.trim().toLowerCase(),
        gender,
        birthDate,
        password: password.trim(),
        mobile,
        navigation,
      }),
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout style={style.layout}>
      <ImageBackground
        source={backGround}
        resizeMode="cover"
        style={style.image}>
        <KeyboardAwareScrollView
          enableAutomaticScroll={true}
          extraScrollHeight={80}
          enableOnAndroid={false}
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: 'transparent', paddingTop: 0}}>
          <Image source={logo} style={style.logo} />

          <View flex={1} />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Input
              placeholder={'First Name'}
              placeholderTextColor={theme['color-grey-100']}
              value={firstName}
              size="medium"
              onChangeText={(nextValue) => setFirstName(nextValue)}
              style={style.input}
              accessoryLeft={UserIcon}
            />

            <Input
              placeholder={'Last Name'}
              placeholderTextColor={theme['color-grey-100']}
              value={lastName}
              size="medium"
              onChangeText={(nextValue) => setLastName(nextValue)}
              style={style.input}
              accessoryLeft={UserIcon}
            />
            <Input
              placeholder={'Street Address'}
              placeholderTextColor={theme['color-grey-100']}
              value={streetAddress}
              size="medium"
              onChangeText={(nextValue) => setStreetAddress(nextValue)}
              style={style.input}
              accessoryLeft={StreetIcon}
            />
            <Input
              placeholder={'Email'}
              placeholderTextColor={theme['color-grey-100']}
              value={email}
              size="medium"
              onChangeText={(nextValue) => setEmail(nextValue)}
              style={style.input}
              accessoryLeft={EmailIcon}
            />

            <View
              style={{
                flexDirection: 'row',
                borderWidth: 0,
                maxWidth: 350,
                borderColor: 'black',
                height: 45,
                borderRadius: 5,
                alignItems: 'center',
                flex: 1,
                marginBottom: 1,
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
              }}>
              <Icon
                style={{marginLeft: 15}}
                name="person-outline"
                fill={theme['color-primary-500']}
                height={25}
                width={25}></Icon>
              <RNPickerSelect
                value={gender}
                onValueChange={(value) => setGender(value)}
                placeholder={{}}
                items={[
                  {label: 'Gender', value: ''},
                  {label: 'Male', value: 'Male'},
                  {label: 'Female', value: 'Female'},
                  {label: 'Others', value: 'Others'},
                ]}
                style={{
                  inputIOS: {
                    height: 45,
                    fontSize: 15,
                    marginLeft: 15,
                    paddingVertical: 15,
                    color: theme['color-basic-700'],
                    maxWidth: Dimensions.get('screen').width * 0.9,
                    width: Dimensions.get('screen').width * 0.73,
                  },
                  inputAndroid: {
                    height: 45,
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    width: Dimensions.get('screen').width * 0.8,
                    fontSize: 15,
                    marginLeft: 10,
                    color: theme['color-basic-700'],
                    fontWeight: 'bold',
                    marginBottom: 40,
                  },
                }}
                useNativeAndroidPickerStyle={true}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderWidth: 0,
                maxWidth: 350,
                borderColor: 'black',
                height: 50,
                borderRadius: 5,
                alignItems: 'center',
                flex: 1,
                marginBottom: 1,
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
              }}>
              <Icon
                style={{marginLeft: 15}}
                name="calendar-outline"
                fill={theme['color-primary-500']}
                height={25}
                width={25}></Icon>
              <DatePicker
                iOSDatePickerComponent={(props) => (
                  <RNDatePicker
                    {...props}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  />
                )}
                style={{
                  width: Dimensions.get('screen').width * 0.8,
                }}
                maxDate={new Date()}
                date={birthDate}
                showIcon={false}
                mode="date"
                placeholder="Date of Birth"
                format="MM/DD/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    borderColor: 'transparent',
                    alignItems: 'flex-start',
                    marginLeft: 15,
                  },
                  placeholderText: {
                    fontSize: 15,
                    color: theme['color-grey-100'],
                  },
                  dateText: {
                    fontSize: 16,
                    color: theme['color-basic-700'],
                  },
                }}
                onDateChange={(date) => setBirthDate(date)}
              />
            </View>

            <Input
              placeholder={'Password'}
              placeholderTextColor={theme['color-grey-100']}
              value={password}
              size="medium"
              onChangeText={(nextValue) => setPassword(nextValue)}
              style={style.input}
              secureTextEntry={true}
              accessoryLeft={PasswordIcon}
              accessoryRight={EyeIcon}
             
            />
            <Input
              placeholder={'Mobile Phone'}
              placeholderTextColor={theme['color-grey-100']}
              keyboardType={'numeric'}
              value={mobile}
              size="medium"
              onChangeText={(nextValue) => setMobile(nextValue)}
              style={style.input}
              accessoryLeft={MobileIcon}
            />
          </View>
          <Button
            size="small"
            onPress={register}
            style={{
              ...style.button,
              marginLeft: '25%',
              marginRight: '25%',
              paddingLeft: 25,
              paddingRight: 45,
              borderRadius: 10,
              borderColor: 'transparent',
              backgroundColor: theme['color-green-100'],
            }}
            accessoryRight={NextIcon}>
            REGISTER
          </Button>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{color: theme['color-grey-100']}} category="h6">
              Already have an account?
            </Text>
            <Button
              size="medium"
              appearance="ghost"
              onPress={() => navigation.pop()}>
              {(props) => (
                <Text
                  {...props}
                  style={{
                    color: theme['color-black-100'],
                    fontWeight: 'bold',
                  }}>
                  LOGIN
                </Text>
              )}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </Layout>
  );
};

export default Register;
