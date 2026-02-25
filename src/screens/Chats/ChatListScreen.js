import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, ImageBackground, ScrollView} from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  useTheme,
  Layout,
  Text,
  Icon,
  Card,
} from '@ui-kitten/components';
import backGround from '../../assets/background.png';
import CardComponent from './CardComponent';
// import getConnectedDocList from '../../actions/getConnectedDocList';
import Loader from '../../common/Loader';

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
    marginHorizontal: 14,
    backgroundColor: 'transparent',
  },
  heading: {
    marginBottom: 15,
    fontWeight: 'bold',
  },
});

export default function ChatListScreen({navigation}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const patient = useSelector((state) => state.auth.user || '');
  const connectedDocList = useSelector(
    (state) => state.connectedDocList.doctorsList || [],
  );

  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    // dispatch(getConnectedDocList({patientId: patient}));
  }, []);

  useEffect(() => {
    if (connectedDocList) {
      setDoctorList(connectedDocList);
    }
  }, [connectedDocList]);

  const navigateBack = () => {
    navigation.replace('DashboardScreen');
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
    <Layout style={style.layout}>
      <ImageBackground
        source={backGround}
        resizeMode="cover"
        style={style.image}>
        <TopNavigation
          alignment="center"
          style={{backgroundColor: 'transparent'}}
          accessoryLeft={BackAction}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Layout style={style.cardContainer}>
            {doctorList && doctorList.length > 0 ? (
              doctorList.map((item, index) => {
                return (
                  <CardComponent
                    key={index}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    expertise={item.specialization.name}
                    id={item._id}
                    navigation={navigation}
                    profilePic={item.profilePic}
                  />
                );
              })
            ) : (
              <Card
                style={{
                  // height:"100%",
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 1,
                  shadowRadius: 7,
                  elevation: 10,
                  borderColor: theme['color-grey-100'],
                }}>
                <Text category="h6" style={{alignSelf: 'center'}}>
                  No Connected Doctors
                </Text>
              </Card>
            )}
          </Layout>
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
}
