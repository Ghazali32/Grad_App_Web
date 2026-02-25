import io from 'socket.io-client';
import Config from '../../config';
import { store } from '../../store';
import getChatMessages from './getChatMessages';
// import JitsiMeet from 'react-native-jitsi-meet';

const ioConnect = (user, navigation) => dispatch => {
  const socket = io(Config.url, {
    query: { userId: user },
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('socket connected');
    console.log('emit join', user);
  });

  socket.on('handshake', data =>
    console.log(data, 'doctor handshake'),
  );

  socket.on(
    'call',
    ({ id, meetingID, doctorName, profilePic, mobile }) => {
      navigation.replace('RingingScreen', {
        id,
        meetingID,
        doctorName,
        profilePic,
        mobile,
      });
    },
  );

  socket.on('accept', ({ id, meetingID }) => {
    // Call accepted — handled elsewhere if needed
  });

  socket.on('decline', ({ user }) => {
    dispatch({
      type: 'existingMeeting',
      status: 2,
    });

    // JitsiMeet.endCall(); // enable only if Jitsi is used

    navigation.navigate('DashboardScreen');
  });

  socket.on('message', message => {
    const currentDoctorReceiverId =
      store.getState().chat.currentDoctorReceiverId;

    if (currentDoctorReceiverId === message.sender) {
      dispatch(getChatMessages({ receiverId: message.sender }));
    }
  });
};

export default ioConnect;
