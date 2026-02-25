import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
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
  },
  cardTxtView: {
    flex: 1,
    paddingVertical: 30,
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

export const NotConnectedDocSlots = ({navigation, route}) => {
  const theme = useTheme();
  const loading = useSelector((state) => state.auth.loading);
  const morningMap = useSelector((state) => state.slot.morningMap);
  const afterNoonMap = useSelector((state) => state.slot.afterNoonMap);
  const eveningMap = useSelector((state) => state.slot.eveningMap);
  const fullMap = useSelector((state) => state.slot.timeSlotIdMap);
  const patient_id = useSelector((state) => state.auth.user);

  const width = Dimensions.get('window').width;
  const [dateList, setDateList] = useState([]);
  const [slotMap, setSlotMap] = useState({});

  const [activeDate, setActiveDate] = useState('');
  const [slotTimeList, setSlotTimeList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [morningSlots, setMorningSlots] = useState([]);
  const [afterNoonSlots, setAfterNoonSlots] = useState([]);
  const [eveningSlots, setEveningSlots] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [fees, setFees] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (morningMap?.size > 0 && activeDate) {
      const tempArray = [];
      const time = morningMap.get(activeDate);
      if (time?.length > 0) {
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
        setMorningSlots(tempArray);
      } else {
        setMorningSlots(tempArray);
      }
      setSlotTimeList(time);
    }
  }, [morningMap, activeDate]);

  useEffect(() => {
    if (afterNoonMap?.size > 0 && activeDate) {
      const tempArray = [];
      const time = afterNoonMap.get(activeDate);
      if (time?.length > 0) {
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
        setAfterNoonSlots(tempArray);
      } else {
        setAfterNoonSlots(tempArray);
      }
      setSlotTimeList(time);
    }
  }, [afterNoonMap, activeDate]);

  useEffect(() => {
    if (eveningMap?.size > 0 && activeDate) {
      const tempArray = [];
      const time = eveningMap.get(activeDate);
      if (time?.length > 0) {
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
        setEveningSlots(tempArray);
      } else {
        setEveningSlots(tempArray);
      }
      setSlotTimeList(time);
    }
  }, [eveningMap, activeDate]);

  useEffect(() => {
    setDescription(route.params.description || '');
    setFirstName(route.params.firstName || '');
    setLastName(route.params.lastName || '');
    setActiveDate(route.params.dateList[0]?.timeStamp || '');
    setDateList(route.params?.dateList || []);
    setSlotMap(route.params?.slotsMap);
    setFees(route.params.fees || '');
    setDoctorId(route.params?.doctorId || '');
    setProfilePic(route.params?.profilePic || null);
  }, [route.params]);

  const navigateBack = () => {
    navigation.goBack();
  };

  const getNumberOfSlots = (timestamp) => {
    var slot = 0;
    slot += morningMap.get(timestamp)?.length
      ? morningMap.get(timestamp).length
      : 0;
    slot += afterNoonMap.get(timestamp)?.length
      ? afterNoonMap.get(timestamp).length
      : 0;
    slot += eveningMap.get(timestamp)?.length
      ? eveningMap.get(timestamp).length
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
        },
        {
          text: 'Video',
          onPress: () => handleBookAppointment(timestamp, 0),
        },
      ],
      {cancelable: true},
    );
  };
  const handleBookAppointment = (timestamp, type) => {
    var time = fullMap.get(timestamp);

    let appointmentData = {
      patientId: patient_id,
      doctorId,
      appointmentType: type,
      appointmentDate: time.date,
      appointmentTimestamp: timestamp,
      slotType: time.slotType,
      appointmentId: time.id,
      fees,
    };
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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {dateList.length > 0 ? (
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <TopNavigation
            alignment="center"
            style={{backgroundColor: 'transparent'}}
            accessoryLeft={BackAction}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <View flex={1} style={styles.upperView}>
              <Image
                source={profilePic != null ? {uri: profilePic} : docImage}
                style={styles.image}
              />

              <View style={styles.textContainer}>
                <Text
                  category="h4"
                  style={{
                    color: theme['color-black-100'],
                    fontWeight: 'bold',
                  }}>
                  {`Dr. ${firstName} ${lastName}`}
                </Text>
                <Text category="p1" style={{color: theme['color-grey-100']}}>
                  {description}
                </Text>
              </View>
            </View>
            <View style={styles.bottomView}>
              <View style={styles.cardTxtView}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {dateList.map((data, index) => {
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
                            fontWeight: 'bold',
                            color:
                              activeDate === data.timeStamp
                                ? '#fff'
                                : theme['color-green-100'],
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
                  paddingBottom: 30,
                }}>
                AVAILABLE SLOTS
              </Text>
              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'baseline',
                  }}>
                  <Text
                    category="h6"
                    style={{
                      color: theme['color-grey-100'],
                      fontWeight: 'bold',
                    }}>
                    Morning -
                  </Text>
                  <Text
                    category="h6"
                    style={{
                      color: theme['color-grey-100'],
                    }}>
                    {morningSlots.length > 1
                      ? ` ${morningSlots?.length} slots`
                      : ` ${morningSlots?.length} slot`}
                  </Text>
                </View>
                <View style={styles.timeSlotView}>
                  {morningSlots?.map((timing, index) => {
                    return (
                      <Button
                        key={index}
                        size="medium"
                        onPress={() => {
                          handleAppointmentType(timing.timestamp);
                        }}
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
                            {timing.time}
                          </Text>
                        )}
                      </Button>
                    );
                  })}
                </View>
              </View>

              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'baseline',
                  }}>
                  <Text
                    category="h6"
                    style={{
                      color: theme['color-grey-100'],
                      fontWeight: 'bold',
                    }}>
                    Afternoon -
                  </Text>
                  <Text
                    category="h6"
                    style={{
                      color: theme['color-grey-100'],
                    }}>
                    {afterNoonSlots.length > 1
                      ? ` ${afterNoonSlots?.length} slots`
                      : ` ${afterNoonSlots?.length} slot`}
                  </Text>
                </View>
                <View style={styles.timeSlotView}>
                  {afterNoonSlots?.map((timing, index) => {
                    return (
                      <Button
                        key={index}
                        size="medium"
                        onPress={() => {
                          handleAppointmentType(timing.timestamp);
                        }}
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
                            {timing.time}
                          </Text>
                        )}
                      </Button>
                    );
                  })}
                </View>
              </View>

              <View style={{marginBottom: 50}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'baseline',
                  }}>
                  <Text
                    category="h6"
                    style={{
                      color: theme['color-grey-100'],
                      fontWeight: 'bold',
                    }}>
                    Evening -
                  </Text>
                  <Text
                    category="h6"
                    style={{
                      color: theme['color-grey-100'],
                    }}>
                    {eveningSlots.length > 1
                      ? ` ${eveningSlots?.length} slots`
                      : ` ${eveningSlots?.length} slot`}
                  </Text>
                </View>
                <View style={styles.timeSlotView}>
                  {eveningSlots?.map((timing, index) => {
                    return (
                      <Button
                        key={index}
                        size="medium"
                        onPress={() => {
                          handleAppointmentType(timing.timestamp);
                        }}
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
                            {timing.time}
                          </Text>
                        )}
                      </Button>
                    );
                  })}
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default NotConnectedDocSlots;
