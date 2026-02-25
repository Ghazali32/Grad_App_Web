import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View} from 'react-native';
// import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

const VideoCallScreen = (props) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const existingMeetingStatus = useSelector(
    (state) => state.videoCall.existingMeetingStatus,
  );
  console.log(
    props.route.params.meetingID,
    existingMeetingStatus,
    'existingmeetingididididi',
  );
  useEffect(() => {
    //const url = props.route.params.meetingID;
    if (userDetails && existingMeetingStatus === 1) {
      console.log(
        props.route.params.meetingID,
        'ifffff useefeect of video call screen',
      );
      const userInfo = {
        displayName: `${userDetails?.firstName} ${userDetails?.lastName}`,
      };
      JitsiMeet.call(props.route.params.meetingID, userInfo);
    }
  }, [props?.route?.params?.meetingID, userDetails]);

  const onConferenceTerminated = (e) => {
    /* Conference terminated event */
    console.log('onConferenceTerminated');
    dispatch({
      type: 'existingMeeting',
      status: 2,
    });
    JitsiMeet.endCall();
    props.navigation.navigate('DashboardScreen');
  };

  const onConferenceJoined = (e) => {
    /* Conference joined event */
  };

  const onConferenceWillJoin = (e) => {
    /* Conference will join event */
  };
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <JitsiMeetView
        onConferenceTerminated={onConferenceTerminated}
        onConferenceJoined={onConferenceJoined}
        onConferenceWillJoin={onConferenceWillJoin}
        style={{flex: 1, height: '100%', width: '100%'}}
      />
    </View>
  );
};

export default VideoCallScreen;
