import React from 'react';
import {useSelector} from 'react-redux';
import {Card, Layout, useTheme} from '@ui-kitten/components';
import {ScrollView, Text, StyleSheet, ImageBackground} from 'react-native';
import backGround from '../../assets/background.png';
import UpcomingAppointmentCard from './components/UpcomingAppointmentCard';
import Loader from '../../common/Loader';

const style = StyleSheet.create({
  layout: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  cardContainer: {
    marginTop: 25,
    marginHorizontal: 14,
    backgroundColor: 'transparent',
  },
});

export const UpcomingAppointmentScreen = () => {
  const theme = useTheme();
  const upcomingAppointmentList = useSelector(
    (state) => state.appointmentList.upcomingAppointmentList || [],
  );

  if (!upcomingAppointmentList) {
    return <Loader />;
  }

  return (
    <Layout style={style.layout}>
      <ImageBackground
        source={backGround}
        resizeMode="cover"
        style={style.image}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Layout style={style.cardContainer}>
            {upcomingAppointmentList && upcomingAppointmentList.length > 0 ? (
              upcomingAppointmentList.map((item, index) => {
                return (
                  <UpcomingAppointmentCard
                    key={index}
                    firstName={item.doctorId.firstName}
                    lastName={item.doctorId.lastName}
                    appointmentDate={item.appointmentDate}
                    appointmentTime={item.appointmentTimestamp}
                    appointmentType={item.appointmentType}
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
                  No Active Appointments
                </Text>
              </Card>
            )}
          </Layout>
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
};

export default UpcomingAppointmentScreen;
