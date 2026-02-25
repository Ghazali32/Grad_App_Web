import React from 'react';
import {useSelector} from 'react-redux';
import {Card, Layout, useTheme} from '@ui-kitten/components';
import {ScrollView, Text, StyleSheet, ImageBackground} from 'react-native';
import backGround from '../../assets/background.png';
import PastAppointmentCard from './components/PastAppointmentCard';
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

export const PastAppointmentScreen = () => {
  const theme = useTheme();
  const pastAppointmentList = useSelector(
    (state) => state.appointmentList.pastAppointmentList || [],
  );

  if (!pastAppointmentList) {
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
            {pastAppointmentList && pastAppointmentList.length > 0 ? (
              pastAppointmentList.map((item, index) => {
                return (
                  <PastAppointmentCard
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
                  No Past Appointments
                </Text>
              </Card>
            )}
          </Layout>
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
};

export default PastAppointmentScreen;
