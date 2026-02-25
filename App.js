import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  StatusBar,
  View,
  NativeModules,
  Platform,
  PermissionsAndroid,
} from "react-native";
const { StatusBarManager } = NativeModules;
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./src/Navigation";
import { default as theme } from "./theme.json";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { store } from './store';
import { Provider } from 'react-redux';

import auth from '@react-native-firebase/auth';





export default () => {
  const [portrait, setPortrait] = useState(true);
  const landscape = false; // Simplified for Expo
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const bar = useRef();
  const dispatch = useDispatch();


  useEffect(() => {
    // Permissions handled by Expo modules via app.json
    // Firebase notifications configured via expo-notifications
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((response) => setStatusBarHeight(response.height));
    }
  }, [dispatch]);


  // useEffect(() => {
  //   console.log(eva);
  //   PushNotification.createChannel(
  //     {
  //       channelId: "Grad Expert", // (required)
  //       channelName: "My channel", // (required)
  //       channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
  //       playSound: false, // (optional) default: true
  //       soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
  //       importance: 4, // (optional) default: 4. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  //     },
  //     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  //   if (Platform.OS === "android") {
  //     try {
  //       const grants = PermissionsAndroid.requestMultiple([
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //       ]);

  //       console.log("write external stroage", grants);

  //       if (
  //         grants["android.permission.WRITE_EXTERNAL_STORAGE"] ===
  //           PermissionsAndroid.RESULTS.GRANTED &&
  //         grants["android.permission.READ_EXTERNAL_STORAGE"] ===
  //           PermissionsAndroid.RESULTS.GRANTED &&
  //         grants["android.permission.RECORD_AUDIO"] ===
  //           PermissionsAndroid.RESULTS.GRANTED
  //       ) {
  //         console.log("Permissions granted");
  //       } else {
  //         console.log("All required permissions not granted");
  //         console.warn("All required permissions not granted");
  //         return;
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //       return;
  //     }
  //   }
  //   Platform.OS === "ios"
  //     ? dispatch(registerForPushIos())
  //     : dispatch(registerForPush());
  // }, []);
  // "react-native-datepicker": "git+https://github.com/codynguyen/react-native-datepicker.git#ios-datepicker-component",
  // "react-native-datepicker": "git+https://github.com/codynguyen/react-native-datepicker.git#ios-datepicker-component",  //
  useEffect(() => {
    if (Platform.OS === "ios")
      StatusBarManager.getHeight((response) =>
        setStatusBarHeight(response.height)
      );
  }, [bar.current]);

  const windowWidth = Dimensions.get("window").width;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          {(portrait || Platform.isPad) && (
            <StatusBar
              translucent
              backgroundColor={theme["color-green-100"]}
              barStyle="light-content"
            />
          )}
          {landscape && !Platform.isPad && <StatusBar hidden ref={bar} />}
          <View
            style={{
              width: windowWidth * 4,
              position: "absolute",
              top: 0,
              left: 0,
              height: portrait || Platform.isPad ? statusBarHeight : 0,
              backgroundColor: theme["color-green-100"],
              zIndex: 1,
            }}
          />
          <AppNavigator />
        </ApplicationProvider>
      </SafeAreaProvider>
    </Provider>
  );
};
