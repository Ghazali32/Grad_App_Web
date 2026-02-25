import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  Input,
  Layout,
  useTheme,
  Icon,
  Text,
  Avatar,
} from '@ui-kitten/components';
import {Image, StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import female from '../assets/profile.png';
import RNDatePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import Loader from '../common/Loader';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import male from '../assets/male.png';

const style = StyleSheet.create({
  layout: {
    flex: 1,
    marginBottom: 20,
  },
  headingView: {
    backgroundColor: '#49B585',
    height: '22%',
    paddingLeft: '5%', // padding:10,
    paddingTop: '8%',
  },
  headingText: {
    color: '#fff',
  },
  ContentView: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
    top: '-5%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: '85%',
    padding: '3%',
  },

  scrollView: {
    padding: 5,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#0D8892',
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  input: {
    // maxWidth: 350,
    // maxWidth: '95%',
    // marginBottom: 8,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    // borderBottomWidth: 1,
    color: 'red',
  },
  icon: {
    width: 29,
    height: 29,
    fontWeight: '100',
  },
});
export default function ProfileScreen() {
  const theme = useTheme();
  const patientDetails = useSelector(
    (state) => state.assignedPatientDetails.patientDetails || {},
  );
  const loading = useSelector((state) => state.auth.loading || false);

  const [gender, setGender] = useState('');

  useEffect(() => {
    if (patientDetails) {
      console.log(patientDetails)
      setGender(patientDetails?.gender || '');
    }
  }, [patientDetails]);

  const EditIcon = (props) => (
    <Icon
      {...props}
      name="edit-2-outline"
      fill={theme['color-black-100']}
      style={style.icon}
    />
  );

  const EmailIcon = (props) => (
    <Icon {...props} name="email-outline" fill={theme['color-green-100']} />
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

  const HeightIcon = (props) => (
    <MaterialCommunityIcon
      {...props}
      name="human-male-height"
      size={25}
      color={theme['color-green-100']}
    />
  );

  const WeightIcon = (props) => (
    <MaterialCommunityIcon
      {...props}
      name="weight-kilogram"
      size={25}
      color={theme['color-green-100']}
    />
  );
  console.log("Raw DOB:", patientDetails?.birthDate);
  const addressIcon = () => <Avatar source={require('../assets/male.png')} />;

  const cityIcon = () => (
    <Avatar size="small" source={require('../assets/State.png')} />
  );

  const stateIcon = () => (
    <Avatar size="small" source={require('../assets/City.png')} />
  );

  const pincodeIcon = () => <Avatar source={require('../assets/male.png')} />;

  const gstIcon = () => <Avatar source={require('../assets/male.png')} />;

  const professionIcon = () => (
    <Avatar source={require('../assets/male.png')} />
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Layout style={style.layout}>
        <View style={style.headingView}>
          <Text category="h3" style={style.headingText}>
            Patient Profile
          </Text>
        </View>
        <View style={style.ContentView}>
          <ScrollView style={style.scrollView}>
            <View style={style.imageContainer}>
              <Image
                source={
                  patientDetails?.profilePic != null
                    ? {uri: patientDetails?.profilePic}
                    : gender === 'Male'
                    ? male
                    : female
                }
                style={style.logo}
              />
            </View>
            <Layout style={{marginTop: '2%'}}>
              <Input
                disabled
                placeholder={'Patient Name'}
                value={patientDetails?.name || ''}
                textStyle={{color: theme['color-grey-100']}}
                size="medium"
                style={style.input}
                accessoryLeft={UserIcon}
              />
              <View style={{borderTopWidth: 1, marginBottom: 8}} />
              <Input
                disabled
                placeholder={'Address (Shipping)'}
                textStyle={{color: theme['color-grey-100']}}
                value={patientDetails?.streetAddress || ''}
                size="medium"
                style={style.input}
                accessoryLeft={StreetIcon}
              />
              <View style={{borderTopWidth: 1, marginBottom: 8}} />
              <Input
                disabled
                placeholder={'City (Shipping)'}
                textStyle={{color: theme['color-grey-100']}}
                value={patientDetails?.city || ''}
                size="medium"
                style={style.input}
                accessoryLeft={cityIcon}
              />
              <View style={{borderTopWidth: 1, marginBottom: 8}} />

              <Input
                disabled
                placeholder={'State (Shipping)'}
                textStyle={{color: theme['color-grey-100']}}
                value={patientDetails?.state || ''}
                size="medium"
                style={style.input}
                accessoryLeft={stateIcon}
              />
              <View style={{borderTopWidth: 1, marginBottom: 8}} />

              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{width: '50%'}}>
                  <Input
                    disabled
                    placeholder={'Pincode (Shipping)'}
                    textStyle={{color: theme['color-grey-100']}}
                    value={
                      patientDetails?.pincode
                        ? patientDetails?.pincode.toString()
                        : ''
                    }
                    keyboardType="numeric"
                    size="small"
                    style={style.input}
                  />
                  <View style={{borderTopWidth: 1, marginBottom: 8}} />
                </View>
                <View style={{width: '50%', marginLeft: 10}}>
                  <Input
                    disabled
                    placeholder={'GST No (If any)'}
                    textStyle={{color: theme['color-grey-100']}}
                    value={
                      patientDetails?.gstNumber
                        ? patientDetails?.gstNumber.toString()
                        : ''
                    }
                    size="small"
                    style={style.input}
                  />
                  <View style={{borderTopWidth: 1, marginBottom: 8}} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  maxWidth: '100%',
                  height: 50,
                  alignItems: 'center',
                  flex: 1,
                  marginBottom: 1,
                  backgroundColor: 'transparent',
                }}>
                <Icon
                  style={{marginLeft: 15}}
                  name="person-outline"
                  fill={theme['color-green-100']}
                  height={25}
                  width={25}
                />
                <RNPickerSelect
                  disabled
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
                      borderWidth: 0,
                      height: 45,
                      maxWidth: Dimensions.get('screen').width * 0.8,
                      width: Dimensions.get('screen').width * 0.8,
                      fontSize: 15,
                      marginLeft: 10,
                      color: theme['color-basic-700'],
                      fontWeight: 'bold',
                      marginBottom: 40,
                      borderBottomColor: 'transparent',
                      borderWidth: 0,
                    },
                  }}
                  useNativeAndroidPickerStyle={true}
                />
              </View>
              <View style={{borderTopWidth: 1, marginBottom: 8}} />
              <Input
                disabled
                placeholder={'Email'}
                textStyle={{color: theme['color-grey-100']}}
                value={patientDetails?.email || ''}
                keyboardType="email-address"
                size="medium"
                style={style.input}
                accessoryLeft={EmailIcon}
              />
              <View style={{borderTopWidth: 1, marginBottom: 8}} />

              <View
                style={{
                  flexDirection: 'row',
                  maxWidth: '100%',
                  height: 50,
                  alignItems: 'center',
                  flex: 1,
                  marginBottom: 1,
                  backgroundColor: 'transparent',
                }}>
                <Icon
                  style={{marginLeft: 15}}
                  name="calendar-outline"
                  fill={theme['color-green-100']}
                  height={25}
                  width={25}
                />
                <DatePicker
                  disabled
                  iOSDatePickerComponent={(props) => (
                    <RNDatePicker
                      {...props}
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    />
                  )}
                  style={{
                    backgroundColor: '#ffffff',
                    width: Dimensions.get('screen').width * 0.9,
                  }}
                  maxDate={new Date()}
                  date={
                    patientDetails?.birthDate
                      ? moment(patientDetails?.birthDate).format('MM/DD/YYYY')
                      : ''
                  }
                  showIcon={false}
                  mode="date"
                  placeholder="Date of birth*"
                  format="MM/DD/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      borderColor: 'transparent',
                      backgroundColor: '#ffffff',
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
                />
              </View>
              <View style={{borderTopWidth: 1, marginBottom: 8}} />
              <Input
                disabled
                placeholder={'Mobile Number'}
                textStyle={{color: theme['color-grey-100']}}
                keyboardType={'numeric'}
                value={patientDetails?.mobile || ''}
                size="medium"
                style={style.input}
                accessoryLeft={MobileIcon}
              />
              <View style={{borderTopWidth: 1, marginBottom: 8}} />
              <Input
                disabled
                placeholder={'Profession'}
                textStyle={{color: theme['color-grey-100']}}
                value={patientDetails?.profession || ''}
                size="medium"
                style={style.input}
              />
              <View style={{borderTopWidth: 1, marginBottom: 8}} />

              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{width: '50%'}}>
                  <Input
                    disabled
                    placeholder={'Height (in cms)'}
                    textStyle={{color: theme['color-grey-100']}}
                    value={
                      patientDetails?.heightInCm
                        ? patientDetails?.heightInCm.toString()
                        : ''
                    }
                    keyboardType={'numeric'}
                    size="small"
                    style={style.input}
                    accessoryLeft={HeightIcon}
                  />

                  <View style={{borderTopWidth: 1, marginBottom: 8}} />
                </View>
                <View style={{width: '50%', marginLeft: 10}}>
                  <Input
                    disabled
                    placeholder={'Weight (in kg)'}
                    textStyle={{color: theme['color-grey-100']}}
                    value={
                      patientDetails?.weightInKg
                        ? patientDetails?.weightInKg.toString()
                        : ''
                    }
                    keyboardType={'numeric'}
                    size="small"
                    style={style.input}
                    accessoryLeft={WeightIcon}
                  />
                  <View style={{borderTopWidth: 1, marginBottom: 8}} />
                </View>
              </View>
              <Input
                disabled
                placeholder={'Medical condition/Disease'}
                textStyle={{color: theme['color-grey-100']}}
                value={patientDetails?.medicalConditionOrDiseases || ''}
                size="medium"
                style={style.input}
              />
              <View style={{borderTopWidth: 1, marginBottom: 8}} />
              <Input
                disabled
                placeholder={'Name of the medications'}
                textStyle={{color: theme['color-grey-100']}}
                value={patientDetails?.medicationsTakenWithDosage || ''}
                size="medium"
                style={style.input}
              />
              <View style={{borderTopWidth: 1, marginBottom: 8}} />
              <Input
                multiline={true}
                numberOfLines={2}
                disabled
                placeholder={
                  'For how long have you been taking this/these medicine'
                }
                textStyle={{color: theme['color-grey-100']}}
                value={patientDetails?.durationOfTakenMedicine || ''}
                size="medium"
                style={style.input}
              />
              <View style={{borderTopWidth: 1, marginBottom: 8}} />
              <Input
                disabled
                placeholder={'Present discomfort or symptoms'}
                textStyle={{color: theme['color-grey-100']}}
                value={patientDetails?.presentDiscomfortOrSymptoms || ''}
                size="medium"
                style={style.input}
              />
              <View
                style={{
                  borderTopWidth: 1,
                  marginBottom: '10%',
                }}
              />
            </Layout>
          </ScrollView>
        </View>
      </Layout>
    </>
  );
}
