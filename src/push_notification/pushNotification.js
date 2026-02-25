// TEMPORARILY DISABLED - TO BE REPLACED WITH FIREBASE MESSAGING + EXPO-NOTIFICATIONS
// This file uses react-native-push-notification which is not Expo-compatible
// TODO: Reimplement using @react-native-firebase/messaging + expo-notifications

import axios from 'axios';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
import config from '../../config';

export const registerForPush = (expertId) => (dispatch) => {
  console.log('Push notification registration disabled during Expo migration');
  console.log('Expert ID:', expertId);

  // TODO: Implement Firebase Cloud Messaging registration
  // Reference: https://docs.expo.dev/push-notifications/push-notifications-setup/

  /* Original code - to be reimplemented:
  PushNotification.configure({
    onRegister: function (token) {
      console.log(token.token, 'firebase token in android');
      console.log('Expert----', expertId)
      PushNotification.subscribeToTopic('all');
      axios
        .post(config.url + '/api/device-tokens/create', {
          osType: 'android',
          notificationToken: token.token,
          expert : expertId
        })
        .then((res) => {
          if (res.status == 200) {
            console.log('====Res Notification====', res.data)
            console.log(res.data.deviceToken._id, '=========deviceid in android===========');
            dispatch({
              type: 'device_id',
              deviceToken: res.data.deviceToken._id,
            });
          }
        });
    },

    onNotification: function (notification) {
      PushNotification.localNotification({
        channelId: 'grad_expert',
        title: notification.title,
        message: notification.message,
        playSound: true,
        soundName: 'default',
      });
    },

    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });
  */
};
