import React, {useEffect} from 'react';
import {
  Tab,
  TabBar,
  TopNavigation,
  TopNavigationAction,
  useTheme,
  Divider,
  Text,
  Icon,
} from '@ui-kitten/components';
import {ImageBackground, StyleSheet} from 'react-native';
import PastAppointmentScreen from './PastAppointmentScreen';
import UpcomingAppointmentScreen from './UpcomingAppointmentScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import getPastAppointmentList from '../../actions/getPastAppointmentList';
import getUpcomingAppointmentList from '../../actions/getUpcomingAppointmentList';
import Loader from '../../common/Loader';
import {useSelector, useDispatch} from 'react-redux';
import backGround from '../../assets/background.png';

const style = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const {Navigator, Screen} = createMaterialTopTabNavigator();

const TopTabBar = ({navigation, state}) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    style={{height: 50, alignSelf: 'center'}}>
    <Tab title="Active Appointment" />
    <Tab title="Past Appointment" />
  </TabBar>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <TopTabBar {...props} />}>
    <Screen
      name="UpcomingAppointmentScreen"
      component={UpcomingAppointmentScreen}
    />
    <Screen name="PastAppointmentScreen" component={PastAppointmentScreen} />
  </Navigator>
);

export const AppointmentTabs = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const BackIcon = (props) => (
    <Icon {...props} name="arrow-back" fill={theme['color-grey-100']} />
  );

  useEffect(() => {
    dispatch(getUpcomingAppointmentList());
    dispatch(getPastAppointmentList());
  }, []);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* <ImageBackground
        source={backGround}
        resizeMode="cover"
        style={style.image}> */}
      <TopNavigation
        title={(props) => (
          <Text
            {...props}
            style={[props.style, {color: theme['color-grey-100']}]}>
            Appointments
          </Text>
        )}
        alignment="center"
        style={{backgroundColor: theme['color-white-100']}}
        accessoryLeft={BackAction}
      />
      <Divider />
      <TabNavigator />
      {/* </ImageBackground> */}
    </>
  );
};

export default AppointmentTabs;
