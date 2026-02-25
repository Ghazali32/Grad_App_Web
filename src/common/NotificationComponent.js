import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerForPush } from '../push_notification/pushNotification';
import { registerForPushIos } from '../push_notification/pushNotificationIos';
import { Platform } from 'react-native';
import { setPushRegistered } from '../actions/registerNotification';

const NotificationComponent = () => {
  const dispatch = useDispatch();
  const expertId = useSelector((state) => state.auth.expertId); // Get expertId from Redux store
  const isPushRegistered = useSelector((state) => state.auth.isPushRegistered); // Get push registration status

  useEffect(() => {
    const setupPermissionsAndNotifications = async () => {
      try {
        // Only run this if the user has not yet been registered for push notifications
        if (!isPushRegistered) {
          console.log('Sending req------');

          if (Platform.OS === 'ios') {
            dispatch(registerForPushIos());
          } else {
            console.log('Endinnnnnn --------- ');
            dispatch(registerForPush(expertId));
          }

          // After successful registration, update Redux state
          dispatch(setPushRegistered());
        } else {
          console.log('Push notification already registered.');
        }
      } catch (error) {
        console.warn('Error during permission request or notification setup:', error);
      }
    };

    setupPermissionsAndNotifications();

  }, [dispatch, expertId, isPushRegistered]); // Add isPushRegistered to dependencies


  return null; // This component does not render anything
};

export default NotificationComponent;
