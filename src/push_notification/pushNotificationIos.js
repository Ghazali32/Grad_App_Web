import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import config from '../../config';

export const registerForPushIos = () => (dispatch) => {
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken, 'fcmtoken in ios----');
      axios
        .post(config.url + '/api/device-tokens/create', {
          osType: 'ios',
          notificationToken: fcmToken,
        })
        .then((res) => {
          console.log(res.data.deviceToken._id, 'deviceid in ios----');
          if (res.status === 200) {
            dispatch({
              type: 'device_id',
              deviceToken: res.data.deviceToken._id,
            });
          }
        });
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
    }
  };

  requestUserPermission();
};
