import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  useTheme,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';
import ImageItem from './components/ImageItem';
import CardItem from './components/MenuCardItem';
import { useDispatch, useSelector } from 'react-redux';
import logout from '../actions/logout';
import Loader from '../common/Loader';
import logoutIcon from '../assets/NewIcons/logout.png';
import profile from '../assets/NewIcons/profile.png';
import Appointment from '../assets/NewIcons/2.png';
import * as Application from 'expo-application';

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
  },
});

const Row = ({ children }) => <View style={styles.row}>{children}</View>;
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const MenuScreen = ({ navigation }) => {
  const theme = useTheme();
  // const userDetails = useSelector((state) => state.auth.userDetails);

  // const [url, setUrl] = useState(null);
  // const [avatarName, setAvatarName] = useState('BB');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setFirstName(userDetails?.firstName || '');
  //   setLastName(userDetails?.lastName || '');
  //   setUrl(userDetails?.profilePic || null);
  // }, [userDetails]);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={navigateBack}
      appearance="control"
    />
  );
  // if (!userDetails) {
  //   return <Loader />;
  // }
  return (
    <>
      <TopNavigation
        title={(props) => (
          <Text {...props} style={[props.style, { color: 'white' }]}>
            Menu
          </Text>
        )}
        alignment="center"
        style={{ backgroundColor: theme['color-green-100'] }}
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout
        style={{
          ...styles.layout,
          backgroundColor: theme['color-background-500'],
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentContainerStyle}>
          {/* <Row>
            <ImageItem url={url} caption={avatarName} size={55} />
            <View
              style={{
                width: 200,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: theme['color-primary-500'],
                }}>
                {firstName} {lastName}
              </Text>
            </View>
          </Row> */}
          <View flex={1} />
          <Row>
            <CardItem
              icon={Appointment}
              color={theme['color-primary-500']}
              caption="Dashboard"
              screenName="ProfileScreen"
              onPress={() => navigation.goBack()}
              navigation={navigation}
              type="rectangle"
            />
            {/* <CardItem
              icon="person-done-outline"
              color={theme['color-primary-500']}
              caption="Patient"
              screenName="PatientListScreen"
              navigation={navigation}
              type="rectangle"
            /> */}
            {/* </Row>
          <Row> */}
            {/* <CardItem
              icon="person-add-outline"
              color={theme['color-primary-500']}
              caption="Requests"
              screenName="PatientListScreen"
              navigation={navigation}
              type="rectangle"
            /> */}
            <CardItem
              icon={logoutIcon}
              color={theme['color-primary-500']}
              caption="Logout"
              screenName="Login"
              onPress={() => dispatch(logout({ navigation }))}
              navigation={navigation}
              type="rectangle"
            />
          </Row>
          {/* <Row>
            <CardItem
              icon="settings-outline"
              color={theme['color-primary-500']}
              caption="Settings"
              screenName="ProfileScreen"
              onPress={() => alert('Coming soon!')}
              navigation={navigation}
              type="rectangle"
              style={{backgroundColor: theme['color-basic-disabled']}}
            />
            <CardItem
              icon="bell-outline"
              color={theme['color-primary-500']}
              caption="Notifications"
              screenName="ProfileScreen"
              navigation={navigation}
              onPress={() => alert('Coming soon!')}
              type="rectangle"
              style={{backgroundColor: theme['color-basic-disabled']}}
            />
          </Row> */}
          {/* <Row>
            <CardItem
              icon="gift-outline"
              color={theme['color-primary-500']}
              caption="Achievements"
              screenName="ProfileScreen"
              navigation={navigation}
              onPress={() => alert('Coming soon!')}
              type="rectangle"
              style={{backgroundColor: theme['color-basic-disabled']}}
            />

            <CardItem
              icon={logoutIcon}
              color={theme['color-primary-500']}
              caption="Logout"
              screenName="Login"
              onPress={() => dispatch(logout({navigation}))}
              navigation={navigation}
              type="rectangle"
            />
          </Row> */}

          <Text
            category="label"
            style={{
              alignSelf: 'center',
              marginTop: '30%',
              textAlign: 'center',
            }}>
            {`Version ${Application.nativeApplicationVersion} \n  Build ${Application.nativeBuildVersion}`}
          </Text>
        </ScrollView>
      </Layout>
    </>
  );
};

export default MenuScreen;
