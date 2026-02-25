import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import {Layout, useTheme} from '@ui-kitten/components';
import CardItem from './components/CardItem';
import Appointment from '../assets/NewIcons/2.png';
import Chat from '../assets/NewIcons/5.png';
import connect from '../assets/NewIcons/7.png';
import profile from '../assets/NewIcons/profile.png';
import smartwatch from '../assets/NewIcons/21.png';
import srch from '../assets/NewIcons/19.png';
import backGround from '../assets/background.png';

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 12,
  },
  card: {
    marginHorizontal: 6,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    width: 60,
    height: 60,
  },
  text: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  bg: {
    flex: 1,
  },
});

const Row = ({children}) => <View style={styles.row}>{children}</View>;

const HomeScreen = ({navigation}) => {
  const theme = useTheme();

  return (
    <>
      <ImageBackground source={backGround} resizeMode="cover" style={styles.bg}>
        <ScrollView>
          <Layout
            style={{
              ...styles.layout,
              backgroundColor: theme['color-background-500'],
            }}>
            <Row>
              <CardItem
                image={profile}
                color={theme['color-primary-500']}
                caption={'User Profile'}
                screenName="ProfileScreen"
                navigation={navigation}
              />
              <CardItem
                image={connect}
                color={theme['color-primary-500']}
                caption={'Connected Doctors'}
                screenName="ConnectedDocScreen"
                navigation={navigation}
              />
            </Row>
            <Row>
              <CardItem
                image={srch}
                color={theme['color-primary-500']}
                caption={'Search Doctors'}
                screenName="SpecialityScreen"
                navigation={navigation}
              />
              <CardItem
                image={Chat}
                color={theme['color-primary-500']}
                caption={'Chat with Doctors'}
                screenName="ChatListScreen"
                navigation={navigation}
              />
            </Row>
            <Row>
              <CardItem
                image={Appointment}
                color={theme['color-primary-500']}
                caption={'Appointment'}
                screenName="AppointmentTabs"
                navigation={navigation}
              />
              <CardItem
                image={smartwatch}
                color={theme['color-primary-500']}
                caption={'Smart Watch'}
                screenName={Platform.OS === 'ios' ? 'HealthScreen' : ''}
                navigation={navigation}
              />
            </Row>
          </Layout>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default HomeScreen;
