import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@ui-kitten/components';
import MenuScreen from './screens/MenuScreen';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDeviceOrientation} from '@react-native-community/hooks';
import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/PasswordReset/OTPScreen';
import LoadingScreen from './screens/LoadingScreen';
import ChatScreen from './screens/Chats/ChatScreen';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import PatientList from './screens/PatientList/PatientList';
import ParameterList from './screens/ParameterScreen/ParameterList';
import ProfileScreen from './screens/ProfileScreen';
import ParameterDetailsScreen from './screens/ParameterScreen/ParameterDetailsScreen';
import PreviousRecommendation from './screens/Recommendation/PreviousRecommendation';
import AddRecommendation from './screens/Recommendation/AddRecommendation';
import OneTimeParameter  from './screens/ParameterScreen/OneTimeParameter'
import MultipleTimeParameter from './screens/ParameterScreen/MultipleTimeParameter'
const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen name="Loading" component={LoadingScreen} />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{gestureEnabled: false}}
    />
    <Stack.Screen name="PasswordResetOTPScreen" component={OTPScreen} />
    <Stack.Screen
      name="DashboardScreen"
      component={DashboardScreen}
      options={{gestureEnabled: false}}
    />
    <Stack.Screen name="Menu" component={MenuScreen} />
    <Stack.Screen name="ParameterList" component={ParameterList} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
    <Stack.Screen
      name="ParameterDetailsScreen"
      component={ParameterDetailsScreen}
    />
    <Stack.Screen name="PatientList" component={PatientList} />
    <Stack.Screen
      name="PreviousRecommendation"
      component={PreviousRecommendation}
    />
    <Stack.Screen name="AddRecommendation" component={AddRecommendation} />
    <Stack.Screen name="MultipleTimeParameter" component={MultipleTimeParameter}/>
    <Stack.Screen name='OneTimeParameter' component={OneTimeParameter} />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const {landscape} = useDeviceOrientation();

  const marginBottom = () => {
    if (landscape) return insets.bottom > 20 ? -8 : 0;
    return insets.bottom > 20 ? -16 : 0;
  };

  return (
    <NavigationContainer>
      <View
        flex={1}
        style={{backgroundColor: theme['background-basic-color-1']}}>
        <SafeAreaView
          edges={['bottom', 'top']}
          style={{flex: 1, marginBottom: marginBottom()}}>
          <StackNavigator />
        </SafeAreaView>
      </View>
    </NavigationContainer>
  );
};
