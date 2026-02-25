import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  useTheme,
  Text,
  Icon,
  Card,
  Button,
} from '@ui-kitten/components';
import backgroundImage from '../../assets/background.png';
import docImage from '../../assets/back.png';
import Loader from '../../common/Loader';

const dateMap = new Map();
const fullSlotMap = new Map();
const morningSlotsMap = new Map();
const afterNoonSlotsMap = new Map();
const eveningSlotsMap = new Map();
const dateSet = new Set();

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  upperView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: 'red',
  },
  iconView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#49B585',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    right: '30%',
    top: '10%',
  },
  icon: {
    width: 20,
    height: 20,
  },
  textContainer: {
    flexShrink: 1,
    marginLeft: 12,
  },
  bottomView: {
    paddingHorizontal: '5%',
    paddingVertical: '10%',
  },
  feeText: {
    fontWeight: 'bold',
    paddingTop: 10,
  },
  dateSlotView: {
    paddingVertical: 30,
  },
  datextCard: {
    borderRadius: 5,
    marginHorizontal: 4,
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
  },
  timeSlotView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 0,
  },
  timeBtn: {
    backgroundColor: '#fff',
    marginRight: 6,
    marginTop: 10,
    borderRadius: 3,
    width: '31%',
  },
  allSlotsBtn: {
    backgroundColor: '#fff',
    marginHorizontal: '25%',
    marginTop: 30,
    marginBottom: 20,
  },
});

export const NotConnectedDocDetails = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const theme = useTheme();
  const dispatch = useDispatch();
  const [activeDate, setActiveDate] = useState('');
  const [slotTimeList, setSlotTimeList] = useState([]);
  const [slotDate, setSlotDate] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [fees, setFees] = useState('');
  const [description, setDescription] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [fullMap, setFullMap] = useState({});
  const [profilePic, setProfilePic] = useState(null);

  const doctorDetails = useSelector(
    (state) => state.specialityList.doctorDetails.doctorDetail,
  );

  const morningVacantSlots = useSelector(
    (state) => state.specialityList.doctorDetails.morningVacantSlots || [],
  );

  const afterNoonVacantSlots = useSelector(
    (state) => state.specialityList.doctorDetails.afterNoonVacantSlots || [],
  );
  const eveningVacantSlots = useSelector(
    (state) => state.specialityList.doctorDetails.eveningVacantSlots || [],
  );

  const patient_id = useSelector((state) => state.auth.user);

  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (
      morningSlotsMap?.size > 0 &&
      activeDate &&
      morningSlotsMap.get(activeDate)?.length > 0
    ) {
      const tempArray = [];
      const time = morningSlotsMap.get(activeDate);
      if (time?.length > 6) {
        for (let i = 0; i < 6; i++) {
          const currentTime = new Date(time[i] * 1000);
          const hours =
            currentTime.getHours() < 10
              ? `0${currentTime.getHours()}`
              : currentTime.getHours();
          const minutes =
            currentTime.getMinutes() < 9
              ? `0${currentTime.getMinutes()}`
              : currentTime.getMinutes();
          const divison = hours < 12 ? 'AM' : 'PM';
          tempArray.push({
            time: `${hours} : ${minutes} ${divison}`,
            timestamp: time[i],
          });
        }
      } else if (time?.length <= 6 && time?.length > 0) {
        for (let i = 0; i < time.length; i++) {
          const currentTime = new Date(time[i] * 1000);
          const hours =
            currentTime.getHours() < 10
              ? `0${currentTime.getHours()}`
              : currentTime.getHours();
          const minutes =
            currentTime.getMinutes() < 9
              ? `0${currentTime.getMinutes()}`
              : currentTime.getMinutes();
          const divison = hours < 12 ? 'AM' : 'PM';
          tempArray.push({
            time: `${hours} : ${minutes} ${divison}`,
            timestamp: time[i],
          });
        }
      }

      setSlotTimeList(tempArray);
    } else if (
      afterNoonSlotsMap?.size > 0 &&
      activeDate &&
      afterNoonSlotsMap.get(activeDate)?.length > 0
    ) {
      const tempArray = [];
      const time = afterNoonSlotsMap.get(activeDate);
      if (time?.length > 6) {
        for (let i = 0; i <= 6; i++) {
          const currentTime = new Date(time[i] * 1000);
          const hours =
            currentTime.getHours() < 10
              ? `0${currentTime.getHours()}`
              : currentTime.getHours();
          const minutes =
            currentTime.getMinutes() < 9
              ? `0${currentTime.getMinutes()}`
              : currentTime.getMinutes();
          const divison = hours < 12 ? 'AM' : 'PM';
          tempArray.push({
            time: `${hours} : ${minutes} ${divison}`,
            timestamp: time[i],
          });
        }
        setSlotTimeList(tempArray);
      } else if (time?.length < 6 && time?.length > 0) {
        for (let i = 0; i < time.length; i++) {
          const currentTime = new Date(time[i] * 1000);
          const hours =
            currentTime.getHours() < 10
              ? `0${currentTime.getHours()}`
              : currentTime.getHours();
          const minutes =
            currentTime.getMinutes() < 9
              ? `0${currentTime.getMinutes()}`
              : currentTime.getMinutes();
          const divison = hours < 12 ? 'AM' : 'PM';
          tempArray.push({
            time: `${hours} : ${minutes} ${divison}`,
            timestamp: time[i],
          });
        }
        setSlotTimeList(tempArray);
      }
    } else if (
      eveningSlotsMap?.size > 0 &&
      activeDate &&
      eveningSlotsMap.get(activeDate)?.length > 0
    ) {
      const tempArray = [];
      const time = eveningSlotsMap.get(activeDate);

      if (time?.length > 6) {
        for (let i = 0; i < 6; i++) {
          const currentTime = new Date(time[i] * 1000);
          const hours =
            currentTime.getHours() < 10
              ? `0${currentTime.getHours()}`
              : currentTime.getHours();
          const minutes =
            currentTime.getMinutes() < 9
              ? `0${currentTime.getMinutes()}`
              : currentTime.getMinutes();
          const divison = hours < 12 ? 'AM' : 'PM';
          tempArray.push({
            time: `${hours} : ${minutes} ${divison}`,
            timestamp: time[i],
          });
        }
        setSlotTimeList(tempArray);
      } else if (time?.length <= 6 && time?.length > 0) {
        for (let i = 0; i < time.length; i++) {
          const currentTime = new Date(time[i] * 1000);
          const hours =
            currentTime.getHours() < 10
              ? `0${currentTime.getHours()}`
              : currentTime.getHours();
          const minutes =
            currentTime.getMinutes() < 9
              ? `0${currentTime.getMinutes()}`
              : currentTime.getMinutes();
          const divison = hours < 12 ? 'AM' : 'PM';
          tempArray.push({
            time: `${hours} : ${minutes} ${divison}`,
            timestamp: time[i],
          });
        }
        setSlotTimeList(tempArray);
      }
    } else {
      setSlotTimeList([]);
    }
  }, [morningSlotsMap, afterNoonSlotsMap, eveningSlotsMap, activeDate]);

  useEffect(() => {
    dateSet.clear();
    morningSlotsMap.clear();
    afterNoonSlotsMap.clear();
    eveningSlotsMap.clear();
    if (morningVacantSlots?.length > 0) {
      for (let i = 0; i < morningVacantSlots.length; i++) {
        if (morningSlotsMap.has(morningVacantSlots[i].date)) {
          const tempList = morningSlotsMap.get(morningVacantSlots[i].date);
          tempList.push(morningVacantSlots[i].timestamp);
          morningSlotsMap.set(morningVacantSlots[i].date, tempList);
        } else {
          dateSet.add(morningVacantSlots[i].date);
          const tempList = [];
          tempList.push(morningVacantSlots[i].timestamp);
          morningSlotsMap.set(morningVacantSlots[i].date, tempList);
        }
      }
      const convertedDateList = [...dateSet];
      const dateListData = [];
      for (let i = 0; i < convertedDateList.length; i++) {
        var timestamp = convertedDateList[i];
        var date = new Date(timestamp * 1000);
        dateListData.push({
          date: `${date.getDate()} / ${
            date.getMonth() + 1
          } / ${date.getFullYear()}`,
          timeStamp: timestamp,
        });
      }
      setSlotDate(dateListData);
    }

    if (afterNoonVacantSlots?.length > 0) {
      for (let i = 0; i < afterNoonVacantSlots.length; i++) {
        if (afterNoonSlotsMap.has(afterNoonVacantSlots[i].date)) {
          const tempList = afterNoonSlotsMap.get(afterNoonVacantSlots[i].date);
          tempList.push(afterNoonVacantSlots[i].timestamp);
          afterNoonSlotsMap.set(afterNoonVacantSlots[i].date, tempList);
        } else {
          dateSet.add(afterNoonVacantSlots[i].date);
          const tempList = [];
          tempList.push(afterNoonVacantSlots[i].timestamp);
          afterNoonSlotsMap.set(afterNoonVacantSlots[i].date, tempList);
        }
      }
      const convertedDateList = [...dateSet];
      const dateListData = [];
      for (let i = 0; i < convertedDateList.length; i++) {
        var timestamp = convertedDateList[i];
        var date = new Date(timestamp * 1000);
        dateListData.push({
          date: `${date.getDate()} / ${
            date.getMonth() + 1
          } / ${date.getFullYear()}`,
          timeStamp: timestamp,
        });
      }
      setSlotDate(dateListData);
    }

    if (eveningVacantSlots?.length > 0) {
      for (let i = 0; i < eveningVacantSlots.length; i++) {
        if (eveningSlotsMap.has(eveningVacantSlots[i].date)) {
          const tempList = eveningSlotsMap.get(eveningVacantSlots[i].date);
          tempList.push(eveningVacantSlots[i].timestamp);
          eveningSlotsMap.set(eveningVacantSlots[i].date, tempList);
        } else {
          dateSet.add(eveningVacantSlots[i].date);
          const tempList = [];
          tempList.push(eveningVacantSlots[i].timestamp);
          eveningSlotsMap.set(eveningVacantSlots[i].date, tempList);
        }
      }
      const convertedDateList = [...dateSet];
      const dateListData = [];
      for (let i = 0; i < convertedDateList.length; i++) {
        var timestamp = convertedDateList[i];
        var date = new Date(timestamp * 1000);
        dateListData.push({
          date: `${date.getDate()} / ${
            date.getMonth() + 1
          } / ${date.getFullYear()}`,
          timeStamp: timestamp,
        });
      }

      setSlotDate(dateListData);
    }
  }, [morningVacantSlots, afterNoonVacantSlots, eveningVacantSlots]);

  useEffect(() => {
    if (morningVacantSlots?.length > 0) {
      for (let i = 0; i < morningVacantSlots.length; i++) {
        if (!fullSlotMap.has(morningVacantSlots[i].timestamp)) {
          fullSlotMap.set(morningVacantSlots[i].timestamp, {
            date: morningVacantSlots[i].date,
            id: morningVacantSlots[i]._id,
            slotType: 'morning',
          });
        }
      }
      setFullMap(fullSlotMap);
    }

    if (afterNoonVacantSlots?.length > 0) {
      for (let i = 0; i < afterNoonVacantSlots.length; i++) {
        if (!fullSlotMap.has(afterNoonVacantSlots[i].timestamp)) {
          fullSlotMap.set(afterNoonVacantSlots[i].timestamp, {
            date: afterNoonVacantSlots[i].date,
            id: afterNoonVacantSlots[i]._id,
            slotType: 'afterNoon',
          });
        }
      }
      setFullMap(fullSlotMap);
    }
    if (eveningVacantSlots?.length > 0) {
      for (let i = 0; i < eveningVacantSlots.length; i++) {
        if (!fullSlotMap.has(eveningVacantSlots[i].timestamp)) {
          fullSlotMap.set(eveningVacantSlots[i].timestamp, {
            date: eveningVacantSlots[i].date,
            id: eveningVacantSlots[i]._id,
            slotType: 'evening',
          });
        }
      }
      setFullMap(fullSlotMap);
    }
  }, [morningVacantSlots, afterNoonVacantSlots, eveningVacantSlots]);

  useEffect(() => {
    if (doctorDetails) {
      dateMap.clear();
      setFirstName(doctorDetails?.firstName || '');
      setLastName(doctorDetails?.lastName || '');
      setStreetAddress(doctorDetails?.streetAddress || '');
      setFees(doctorDetails?.fees || '');
      setDescription(doctorDetails?.description || '');
      setProfilePic(doctorDetails?.profilePic || null);
      var temp = [];
      if (
        morningVacantSlots?.length > 0 ||
        afterNoonVacantSlots?.length > 0 ||
        eveningVacantSlots?.length > 0
      ) {
        if (morningVacantSlots?.length > 0) {
          for (let i = 0; i < morningVacantSlots.length; i++) {
            temp.push(morningVacantSlots[i].date);
          }
        }
        if (afterNoonVacantSlots?.length > 0) {
          for (let i = 0; i < afterNoonVacantSlots.length; i++) {
            temp.push(afterNoonVacantSlots[i].date);
          }
        }
        if (eveningVacantSlots?.length > 0) {
          for (let i = 0; i < eveningVacantSlots.length; i++) {
            temp.push(eveningVacantSlots[i].date);
          }
        }
        temp = temp.sort();
        setActiveDate(temp[0]);
      }
      setDoctorId(doctorDetails?._id || '');
    }
  }, [
    doctorDetails,
    morningVacantSlots,
    afterNoonVacantSlots,
    eveningVacantSlots,
  ]);

  const getNumberOfSlots = (timestamp) => {
    var slot = 0;
    slot += morningSlotsMap.get(timestamp)?.length
      ? morningSlotsMap.get(timestamp).length
      : 0;
    slot += afterNoonSlotsMap.get(timestamp)?.length
      ? afterNoonSlotsMap.get(timestamp).length
      : 0;
    slot += eveningSlotsMap.get(timestamp)?.length
      ? eveningSlotsMap.get(timestamp).length
      : 0;
    return slot;
  };

  const handleAppointmentType = (timestamp) => {
    Alert.alert(
      'Alert',
      'Select Appointment Type',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clinic',
          onPress: () => handleBookAppointment(timestamp, 1),
          style: 'cancel',
        },
        {
          text: 'Video',
          onPress: () => handleBookAppointment(timestamp, 0),
        },
      ],
      {cancelable: false},
    );
  };

  const handleBookAppointment = (timestamp, type) => {
    var time = fullMap.get(timestamp);
    let appointmentData = {
      patientId: patient_id,
      doctorId: doctorDetails._id,
      appointmentType: type,
      appointmentDate: time.date,
      appointmentTimestamp: timestamp,
      slotType: time.slotType,
      appointmentId: time.id,
      fees,
    };
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackIcon = (props) => (
    <Icon {...props} name="arrow-back" fill={theme['color-grey-100']} />
  );

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={navigateBack}
      appearance="control"
    />
  );

  const btnArr = [
    'Clinic Appointment',
    ' Video call with Doctor',
    'Payment History',
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <TopNavigation
          alignment="center"
          style={{backgroundColor: 'transparent'}}
          accessoryLeft={BackAction}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View flex={1} style={styles.upperView}>
            <Image
              source={profilePic != null ? {uri: profilePic} : docImage}
              style={styles.image}
            />

            <View style={styles.textContainer}>
              <Text
                category="h4"
                style={{color: theme['color-black-100'], fontWeight: 'bold'}}>
                {`Dr. ${firstName} ${lastName}`}
              </Text>
              <Text category="p1" style={{color: theme['color-grey-100']}}>
                {description}
              </Text>
            </View>
          </View>
          <View style={styles.bottomView}>
            <Text category="h6" style={{color: theme['color-grey-100']}}>
              {streetAddress}
            </Text>
            <Text
              category="h6"
              style={{...styles.feeText, color: theme['color-grey-100']}}>
              {`AUD ${fees} Consultation Fees`}
            </Text>

            {morningVacantSlots.length > 0 ||
            afterNoonVacantSlots.length > 0 ||
            eveningVacantSlots.length ? (
              <View>
                <View style={styles.dateSlotView}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {slotDate
                      .sort(function (a, b) {
                        if (a.timeStamp < b.timeStamp) {
                          return -1;
                        }
                        if (a.timeStamp > b.timeStamp) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((data, index) => {
                        return (
                          <Card
                            key={index}
                            onPress={() => {
                              setActiveDate(data.timeStamp);
                            }}
                            style={{
                              ...styles.datextCard,
                              width: width / 2.3,
                              borderColor: theme['color-green-100'],
                              backgroundColor:
                                activeDate === data.timeStamp
                                  ? theme['color-green-100']
                                  : '#fff',
                            }}>
                            <Text
                              style={{
                                padding: -16,
                                color:
                                  activeDate === data.timeStamp
                                    ? '#fff'
                                    : theme['color-green-100'],
                                fontWeight: 'bold',
                              }}>
                              {data.date}
                            </Text>
                            <Text
                              style={{
                                fontSize: 13,
                                color:
                                  activeDate === data.timeStamp
                                    ? '#fff'
                                    : theme['color-grey-100'],
                              }}>
                              {getNumberOfSlots(data.timeStamp) > 1
                                ? `${getNumberOfSlots(
                                    data.timeStamp,
                                  )} Slots Available`
                                : `${getNumberOfSlots(
                                    data.timeStamp,
                                  )} Slot Available`}
                            </Text>
                          </Card>
                        );
                      })}
                  </ScrollView>
                </View>

                <Text
                  category="h6"
                  style={{
                    color: theme['color-grey-100'],
                    fontWeight: 'bold',
                    paddingBottom: 10,
                  }}>
                  AVAILABLE SLOTS
                </Text>

                <View style={styles.timeSlotView}>
                  {slotTimeList.map((time, index) => {
                    return (
                      <Button
                        key={index}
                        size="medium"
                        onPress={() => handleAppointmentType(time.timestamp)}
                        style={{
                          ...styles.timeBtn,
                          borderColor: theme['color-green-100'],
                        }}
                        appearance="ghost">
                        {(props) => (
                          <Text
                            {...props}
                            style={{
                              color: theme['color-green-100'],
                              fontWeight: 'bold',
                            }}>
                            {time.time}
                          </Text>
                        )}
                      </Button>
                    );
                  })}
                </View>

                <Button
                  size="medium"
                  style={{
                    ...styles.allSlotsBtn,
                    borderColor: theme['color-green-100'],
                  }}
                  appearance="ghost"
                  onPress={() => {
                    dispatch({type: 'morningMap', morningMap: morningSlotsMap});
                    dispatch({
                      type: 'afterNoonMap',
                      afterNoonMap: afterNoonSlotsMap,
                    });
                    dispatch({type: 'eveningMap', eveningMap: eveningSlotsMap});
                    dispatch({
                      type: 'timeSlotIdMap',
                      timeSlotIdMap: fullSlotMap,
                    });
                    navigation.navigate('NotConnectedDocSlots', {
                      dateList: slotDate,
                      firstName: firstName,
                      lastName: lastName,
                      streetAddress: streetAddress,
                      description: description,
                      doctorId: doctorId,
                      fees,
                      profilePic,
                    });
                  }}>
                  {(props) => (
                    <Text
                      {...props}
                      style={{
                        color: theme['color-green-100'],
                        fontWeight: 'bold',
                      }}>
                      View all Slots
                    </Text>
                  )}
                </Button>
              </View>
            ) : (
              <View
                flex={1}
                style={{paddingVertical: '50%', alignItems: 'center'}}>
                <Text
                  category="h4"
                  style={{color: theme['color-black-100'], fontWeight: 'bold'}}>
                  No Slot Available
                </Text>
              </View>
            )}

            {/* {btnArr.map((text, index) => {
              return (
                <Button
                  key={index}
                  size="medium"
                  style={{
                    backgroundColor: theme['color-blue-100'],
                    borderColor: theme['color-green-100'],
                    marginBottom: 10,
                  }}>
                  {(props) => (
                    <Text
                      {...props}
                      style={{
                        color: theme['color-white-100'],
                      }}>
                      {text}
                    </Text>
                  )}
                </Button>
              );
            })} */}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default NotConnectedDocDetails;
