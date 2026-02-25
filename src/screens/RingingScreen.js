import React, { useEffect } from 'react';
import { Button, Layout, Text, Icon } from '@ui-kitten/components';
import { StyleSheet, ImageBackground, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import acceptCall from '../actions/acceptCall';
import declineCall from '../actions/declineCall';

import backGround from '../assets/background.png';
import User from '../assets/back.png';

const style = StyleSheet.create({
  layout: {
    flex: 1,
  },
  button: {
    marginBottom: 50,
    width: 150,
  },
  text: {
    fontSize: 40,
    marginTop: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 70,
    marginTop: 30,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  heading: {
    alignSelf: 'center',
    fontWeight: 'normal',
    color: 'black',
  },
  container: {
    margin: '20%',
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#49B585',
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: 40,
  },
});

export const RingingScreen = (props) => {
  const dispatch = useDispatch();

  const existingMeetingStatus = useSelector(
    (state) => state.videoCall.existingMeetingStatus,
  );

  useEffect(() => {
    dispatch({
      type: 'existingMeeting',
      status: 1,
    });
  }, []);

  console.log(existingMeetingStatus, 'meeting status in ringing screen');

  return (
    <Layout style={style.layout}>
      <ImageBackground
        source={backGround}
        resizeMode="cover"
        style={style.image}>

        <View flex={0.5} />

        <Text category="h4" style={{ alignSelf: 'center' }}>
          Calling..
        </Text>

        <View style={style.imageView}>
          <Image
            source={
              props?.route?.params?.profilePic
                ? { uri: props.route.params.profilePic }
                : User
            }
            style={style.imageContainer}
          />

          <Text category="h3">
            {props?.route?.params?.doctorName}
          </Text>

          <Text category="h6" style={{ marginVertical: 12 }}>
            {props?.route?.params?.mobile}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '40%',
          }}>

          {/* ACCEPT CALL */}
          <Button
            style={{
              height: 120,
              width: 120,
              marginHorizontal: 20,
              borderRadius: 60,
              backgroundColor: 'green',
            }}
            onPress={() => {
              dispatch(
                acceptCall({
                  meetingID: props?.route?.params?.meetingID,
                  user: props?.route?.params?.id,
                }),
              );

              props.navigation.navigate('VideoCallScreenHome', {
                meetingID: props?.route?.params?.meetingID,
              });
            }}>
            <Icon
              name="phone-call-outline"
              fill="white"
              style={{ height: 60, width: 60 }}
            />
          </Button>

          {/* DECLINE CALL */}
          <Button
            style={{
              marginHorizontal: 20,
              borderRadius: 60,
              height: 120,
              width: 120,
              backgroundColor: 'red',
            }}
            onPress={() => {
              dispatch(
                declineCall({
                  meetingID: props?.route?.params?.meetingID,
                  user: props?.route?.params?.id,
                }),
              );

              dispatch({
                type: 'existingMeeting',
                status: 2,
              });

              props.navigation.navigate('DashboardScreen');
            }}>
            <Icon
              name="phone-missed-outline"
              fill="white"
              style={{ height: 60, width: 60 }}
            />
          </Button>

        </View>
      </ImageBackground>
    </Layout>
  );
};

export default RingingScreen;
