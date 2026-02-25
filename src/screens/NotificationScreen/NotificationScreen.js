import React from 'react';
import {StyleSheet, ImageBackground, ScrollView} from 'react-native';
import {
  Layout,
  Text,
  TopNavigation,
  Card,
  TopNavigationAction,
  Icon,
  useTheme,
} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import backGround from '../../assets/background.png';
import Loader from '../../common/Loader';
import NotificationCard from './NotificationCard';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const style = StyleSheet.create({
  layout: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  cardContainer: {
    marginTop: 25,
    marginHorizontal: 14,
    backgroundColor: 'transparent',
  },
});

export default function NotificationScreen({navigation}) {
  const theme = useTheme();
  const loading = useSelector((state) => state.auth.loading);
  const notificationList = useSelector(
    (state) => state.appointmentList.upcomingAppointmentList || [],
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

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout style={style.layout}>
      <ImageBackground
        source={backGround}
        resizeMode="cover"
        style={style.image}>
        <TopNavigation
          title={(props) => (
            <Text {...props} style={[props.style, {color: 'white'}]}>
              Notifications
            </Text>
          )}
          alignment="center"
          style={{backgroundColor: theme['color-primary-500']}}
          accessoryLeft={BackAction}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Layout style={style.cardContainer}>
            {notificationList && notificationList.length > 0 ? (
              notificationList.map((item, index) => {
                return (
                  <NotificationCard
                    key={index}
                    firstName={item.doctorId.firstName}
                    lastName={item.doctorId.lastName}
                    appointmentDate={item.appointmentDate}
                    appointmentTime={item.appointmentTimestamp}
                    profilePic={item.doctorId.profilePic}
                  />
                );
              })
            ) : (
              <Card
                style={{
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 1,
                  shadowRadius: 7,
                  elevation: 10,
                  borderColor: theme['color-grey-100'],
                }}>
                <Text category="h6" style={{alignSelf: 'center'}}>
                  No Notifications
                </Text>
              </Card>
            )}
          </Layout>
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
}
