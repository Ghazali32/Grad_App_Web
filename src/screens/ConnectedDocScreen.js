import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  TopNavigation,
  TopNavigationAction,
  useTheme,
  Layout,
  Text,
  Icon,
  Card,
  Input,
} from '@ui-kitten/components';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Keyboard,
} from 'react-native';
import backGround from '../assets/background.png';
import CardComponent from './components/ConnectedDocCard';
// import getConnectedDocList from '../actions/getConnectedDocList';
import Loader from '../common/Loader';

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
  container: {
    marginBottom: 30,
    borderRadius: 10,
  },
  searchInputBox: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 10,
    borderColor: 'transparent',
  },
});

export default function CoonectedDocScreen({navigation}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const userId = useSelector((state) => state.auth.user || '');
  const connectedDocList = useSelector(
    (state) => state.connectedDocList.doctorsList || [],
  );

  const [doctorList, setDoctorList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // dispatch(getConnectedDocList({patientId: userId}));
  }, []);

  useEffect(() => {
    if (connectedDocList) {
      setDoctorList(connectedDocList);
    }
  }, [connectedDocList]);

  const clearFunction = () => {
    setSearch('');
    setDoctorList(connectedDocList);
  };

  const BackIcon = (props) => (
    <Icon {...props} name="arrow-back" fill={theme['color-grey-100']} />
  );

  const ClearIcon = (props) => (
    <Icon
      {...props}
      name="close-outline"
      fill={theme['color-black-100']}
      onPress={clearFunction}
    />
  );

  const SearchIcon = (props) => (
    <Icon {...props} name="search-outline" fill={theme['color-black-100']} />
  );

  const navigateBack = () => {
    Keyboard.dismiss();
    setSearch('');
    setDoctorList(connectedDocList);
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={navigateBack}
      appearance="control"
    />
  );

  const searchText = (inputText) => {
    if (inputText.length > 0) {
      setDoctorList(
        connectedDocList.filter(
          (item) =>
            item.firstName.toLowerCase().includes(inputText.toLowerCase()) ||
            item.lastName.toLowerCase().includes(inputText.toLowerCase()) ||
            item.specialization.name
              .toLowerCase()
              .includes(inputText.toLowerCase()),
        ),
      );
    } else {
      setDoctorList(connectedDocList || []);
    }
  };

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
            <View style={style.container}>
              <Input
                placeholder="Search doctor, specialities..."
                style={style.searchInputBox}
                accessoryLeft={SearchIcon}
                accessoryRight={search !== '' ? ClearIcon : ''}
                value={search}
                size="large"
                onChangeText={(nextValue) => {
                  searchText(nextValue.trim());
                  setSearch(nextValue);
                }}
              />
            </View>

            <Text category="h2" style={style.heading}>
              Connected Doctors
            </Text>

            {doctorList && doctorList.length > 0 ? (
              doctorList.map((item, index) => {
                return (
                  <CardComponent
                    key={index}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    expertise={item.specialization.name}
                    navigation={navigation}
                    doctorID={item._id}
                    profilePic={item.profilePic}
                  />
                );
              })
            ) : doctorList && search === '' ? (
              <Card
                style={{
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
            ) : (
              <Card
                style={{
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 1,
                  shadowRadius: 7,
                  elevation: 10,
                  borderColor: theme['color-grey-100'],
                }}>
                <Text category="h6" style={{alignSelf: 'center'}}>
                  No Search Result
                </Text>
              </Card>
            )}
          </Layout>
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
}
