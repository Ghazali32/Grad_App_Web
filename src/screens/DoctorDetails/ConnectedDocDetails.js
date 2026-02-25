import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import getPastAppointmentList from '../../actions/getPastAppointmentList';
import getUpcomingAppointmentList from '../../actions/getUpcomingAppointmentList';
import moment from 'moment';
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
  Button,
  Card,
  Layout,
  List,
  Divider,
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
  container: {
    flex: 1,
  },
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
    paddingBottom: 30,
  },
  iconTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  btnsView: {
    marginTop: 40,
  },
  button: {
    marginBottom: 10,
  },
  dateSlotView: {
    paddingVertical: 0,
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
    paddingHorizontal: -1,
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
  listContainer: {
    backgroundColor: 'transparent',
    borderRightColor: '#49B585',
    borderLeftColor: '#49B585',
    borderBottomColor: '#49B585',
    borderWidth: 1,
    borderRadius: 10,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderTopWidth: 0,
    maxHeight: 150,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 0,
    padding: 0,
  },
  textIconRow: {
    flexDirection: 'row',
  },
});

export const ConnectedDocDetails = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const theme = useTheme();
  const dispatch = useDispatch();
  const [doctorId, setDoctorId] = useState('');
  useEffect(() => {
    dispatch(getUpcomingAppointmentList());
    dispatch(getPastAppointmentList());
  }, []);

  const loading = useSelector((state) => state.auth.loading);
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
  const upcomingAppointmentList = useSelector(
    (state) => state.appointmentList.upcomingAppointmentList || [],
  );
  const pastAppointmentList = useSelector(
    (state) => state.appointmentList.pastAppointmentList || [],
  );

  const [activeDate, setActiveDate] = useState('');
  const [slotTimeList, setSlotTimeList] = useState([]);
  const [slotDate, setSlotDate] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [fees, setFees] = useState('');
  const [description, setDescription] = useState('');
  const [fullMap, setFullMap] = useState({});
  const [profilePic, setProfilePic] = useState(null);

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
  const CalendarIcon = (props) => (
    <Icon
      {...props}
      name="calendar"
      fill={theme['color-grey-100']}
      height={20}
      width={20}
    />
  );
  const AddIcon = (props) => (
    <Icon {...props} name="plus-outline" fill="white" height={20} width={20} />
  );
  const SubIcon = (props) => (
    <Icon {...props} name="minus-outline" fill="white" height={20} width={20} />
  );
  const ClockIcon = (props) => (
    <Icon
      {...props}
      name="clock-outline"
      fill={theme['color-grey-100']}
      height={20}
      width={20}
    />
  );
  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={navigateBack}
      appearance="control"
    />
  );
  const TextIconRow = ({children}) => (
    <View style={styles.textIconRow}>{children}</View>
  );

  // const btnArr = [
  //   'Clinic Appointment',
  //   'Chat with Doctor',
  //   ' Video call with Doctor',
  //   'Payment History',
  // ];
  // const appointmentsArr = ['Upcoming Appointment', 'Past Appointment'];

  const Row = ({children}) => <View style={styles.row}>{children}</View>;
  const [upcomingListView, setUpcomingListView] = useState(true);
  const [PastListView, setPastListView] = useState(false);
  const toggleUpcomingList = () => {
    setUpcomingListView(!upcomingListView);
  };
  const togglePastList = () => {
    setPastListView(!PastListView);
  };
  var upcomingAppointmentFiltered = upcomingAppointmentList.reduce(function (
    filtered,
    option,
  ) {
    if (option.doctorId._id === doctorId) {
      var someNewValue = {
        appointmentTimestamp: option.appointmentTimestamp,
        appointmentDate: option.appointmentDate,
      };
      filtered.push(someNewValue);
    }
    return filtered;
  },
  []);

  var pastAppointMentFiltered = pastAppointmentList.reduce(function (
    filtered,
    option,
  ) {
    if (option.doctorId._id === doctorId) {
      var someNewValue = {
        appointmentTimestamp: option.appointmentTimestamp,
        appointmentDate: option.appointmentDate,
      };
      filtered.push(someNewValue);
    }
    return filtered;
  },
  []);
  const UpcomingAppointmentItem = ({item, index}) => (
    <Card
      style={{
        borderColor: 'green',
        borderWidth: 0,
        backgroundColor: 'transparent',
      }}>
      <View style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Row>
          <TextIconRow>
            <TextIconRow>
              <CalendarIcon />
              <Text>
                {moment(new Date(item.appointmentDate * 1000)).format(
                  'DD MMM YYYY',
                )}
              </Text>
            </TextIconRow>
            <TextIconRow>
              <ClockIcon style={{marginLeft: 10}} />
              <Text>
                {moment(new Date(item.appointmentTimestamp * 1000)).format(
                  'hh:mm a',
                )}
              </Text>
            </TextIconRow>
          </TextIconRow>
        </Row>
      </View>
    </Card>
  );

  const PastAppointmentItem = ({item, index}) => (
    <ScrollView>
      <Card
        style={{
          borderColor: 'green',
          borderWidth: 0,
          backgroundColor: 'transparent',
        }}>
        <View style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Row>
            <TextIconRow>
              <TextIconRow>
                <CalendarIcon />
                <Text>
                  {moment(new Date(item.appointmentDate * 1000)).format(
                    'DD MMM YYYY',
                  )}
                </Text>
              </TextIconRow>
              <TextIconRow>
                <ClockIcon style={{marginLeft: 10}} />
                <Text>
                  {moment(new Date(item.appointmentTimestamp * 1000)).format(
                    'hh:mm a',
                  )}
                </Text>
              </TextIconRow>
            </TextIconRow>
          </Row>
        </View>
      </Card>
    </ScrollView>
  );

  const ListEmptyComponent = () => {
    return (
      <Card style={{justifyContent: 'center'}}>
        <Text>No appointments to show.</Text>
      </Card>
    );
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Layout style={styles.container}>
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
                  style={{
                    flexShrink: 1,
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
              <Text category="h6" style={{color: theme['color-grey-100']}}>
                {streetAddress}
              </Text>
              <Text
                category="h6"
                style={{...styles.feeText, color: theme['color-grey-100']}}>
                {`AUD ${fees} Consultation Fees`}
              </Text>
              <Layout></Layout>
              {morningVacantSlots.length > 0 ||
              afterNoonVacantSlots.length > 0 ||
              eveningVacantSlots.length ? (
                <View>
                  <View style={styles.dateSlotView}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
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
                      dispatch({
                        type: 'morningMap',
                        morningMap: morningSlotsMap,
                      });
                      dispatch({
                        type: 'afterNoonMap',
                        afterNoonMap: afterNoonSlotsMap,
                      });
                      dispatch({
                        type: 'eveningMap',
                        eveningMap: eveningSlotsMap,
                      });
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
                  style={{paddingVertical: '20%', alignItems: 'center'}}>
                  <Text
                    category="h4"
                    style={{
                      color: theme['color-black-100'],
                      fontWeight: 'bold',
                    }}>
                    No Slot Available
                  </Text>
                </View>
              )}
              {/* {appointmentsArr.map((text, index) => {
                return (
                  <View key={index} style={styles.iconTextView}>
                    <Icon
                      name="arrow-forward-outline"
                      fill={theme['color-black-100']}
                      style={styles.icon}
                    />
                    <Text
                      category="h6"
                      style={{
                        color: theme['color-grey-100'],
                      }}>
                      {text}
                    </Text>
                  </View>
                );
              })} */}
              <View style={{marginVertical: 20}}>
                <Button
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  onPress={toggleUpcomingList}
                  accessoryRight={upcomingListView ? SubIcon : AddIcon}>
                  Upcoming Appointment
                </Button>
                {upcomingListView && (
                  <List
                    style={styles.listContainer}
                    data={upcomingAppointmentFiltered}
                    renderItem={UpcomingAppointmentItem}
                    ItemSeparatorComponent={Divider}
                    ListEmptyComponent={ListEmptyComponent}
                  />
                )}
              </View>
              <Button
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
                onPress={togglePastList}
                accessoryRight={!PastListView ? AddIcon : SubIcon}>
                Past Appointment
              </Button>
              {PastListView && (
                <View>
                  <List
                    style={styles.listContainer}
                    data={pastAppointMentFiltered}
                    renderItem={PastAppointmentItem}
                    ItemSeparatorComponent={Divider}
                    ListEmptyComponent={ListEmptyComponent}
                  />
                </View>
              )}
              {/* <View style={styles.btnsView}>
                {btnArr.map((text, index) => {
                  return (
                    <Button
                      key={index}
                      size="medium"
                      style={{
                        ...styles.button,
                        backgroundColor: theme['color-blue-100'],
                        borderColor: theme['color-green-100'],
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
                })}
              </View> */}
              <View style={styles.btnsView}>
                <Button
                  onPress={() => {
                    dispatch({
                      type: 'currentDoctorReceiverId',
                      currentDoctorReceiverId: doctorId,
                    });
                    navigation.navigate('ChatScreen', {
                      navigation: navigation,
                    });
                  }}
                  size="medium"
                  style={{
                    ...styles.button,
                    backgroundColor: theme['color-blue-100'],
                    borderColor: theme['color-green-100'],
                  }}>
                  <Text
                    style={{
                      color: theme['color-white-100'],
                    }}>
                    Chat with Doctor
                  </Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </Layout>
    </>
  );
};

export default ConnectedDocDetails;
