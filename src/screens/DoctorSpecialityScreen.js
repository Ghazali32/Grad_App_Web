import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Layout,
  Text,
  useTheme,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Card,
} from '@ui-kitten/components';
import SearchBar from './components/SearchBar';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Keyboard,
} from 'react-native';
import backGround from '../assets/background.png';
import CardComponent from './components/DocSpecialityCard';
import Loader from '../common/Loader';
import searchByCategoryId from '../actions/searchByCategoryId';

const style = StyleSheet.create({
  layout: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  cardContainer: {
    marginHorizontal: 27,
    backgroundColor: 'transparent',
  },
  heading: {
    marginBottom: 30,
    fontWeight: 'bold',
  },
  searchListContainer: {
    position: 'relative',
    // borderRadius: 8,
    // borderTopStartRadius: 5,
    // borderWidth: 0.5,
    // borderColor: 'grey',
  },
  SearchCard: {
    borderColor: 'grey',
    borderWidth: 0,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    // borderWidth:1,
    // marginTop:18
    marginTop: 15,
  },
  searchStr: {marginLeft: -15, fontSize: 16},
});

export default function DoctorSpecialityScreen({navigation, route}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const doctorList = useSelector(
    (state) => state.specialityList.doctorBySpecialityList,
  );
  const loading = useSelector((state) => state.auth.loading);
  const searchData = useSelector((state) => state.search.searchList || []);
  const user = useSelector((state) => state.auth.user);
  const latitude = useSelector((state) => state.location.latitude);
  const longitude = useSelector((state) => state.location.longitude);

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const navigateBack = () => {
    Keyboard.dismiss();
    setSearch('');
    setShowSearch(false);
    navigation.goBack();
  };

  const BackIcon = (props) => (
    <Icon {...props} name="arrow-back" fill={theme['color-grey-100']} />
  );

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={navigateBack}
      appearance="control"
    />
  );

  const getDoctors = (id, category) => {
    dispatch(
      searchByCategoryId({
        patientId: user,
        userNameAndSpecialization: search,
        categoryId: id,
        longitude: longitude,
        latitude: latitude,
      }),
    );
    Keyboard.dismiss();
    setSearch('');
    setShowSearch(false);
    navigation.navigate('DoctorSpecialityScreen', {expertise: category});
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
            <SearchBar
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              search={search}
              setSearch={setSearch}
            />
            <View style={{bottom: 38}}>
              <Layout style={style.searchListContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {showSearch &&
                    search?.length > 2 &&
                    searchData.map((item, index) => {
                      return (
                        <Card
                          hitSlop={{top: 30, bottom: 20, left: 0, right: 0}}
                          key={index}
                          style={style.SearchCard}
                          onPress={() => {
                            getDoctors(item.categoryId, item.category);
                          }}>
                          <Text style={style.searchStr}>{item.searchStr}</Text>
                        </Card>
                      );
                    })}
                </ScrollView>
              </Layout>
            </View>
            {!showSearch && (
              <View>
                <Text category="h2" style={style.heading}>
                  {route.params.expertise}
                </Text>
                {doctorList && doctorList.length > 0 ? (
                  doctorList.map((data, index) => {
                    return (
                      <CardComponent
                        key={data._id}
                        doctorID={data._id}
                        firstName={data.firstName}
                        lastName={data.lastName}
                        expertise={route.params.expertise}
                        connected={data.connected}
                        profilePic={data.profilePic}
                        navigation={navigation}
                      />
                    );
                  })
                ) : (
                  <Card
                    style={{
                      // height:"100%",
                      borderRadius: 10,
                      shadowColor: 'black',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 1,
                      shadowRadius: 7,
                      elevation: 10,
                      borderColor: theme['color-grey-100'],
                    }}>
                    <Text category="h6" style={{alignSelf: 'center'}}>
                      {' '}
                      No Doctors Available
                    </Text>
                  </Card>
                )}
              </View>
            )}
          </Layout>
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
}
