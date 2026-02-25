import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Layout,
  Text,
  TopNavigation,
  useTheme,
  TopNavigationAction,
  Icon,
  Card,
} from '@ui-kitten/components';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  Keyboard,
} from 'react-native';
import SearchBar from './components/SearchBar';
import backGround from '../assets/background.png';
import CardComponent from './components/SpecialityCard';
import searchByCategoryId from '../actions/searchByCategoryId';

const style = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
  imageBg: {
    flex: 1,
  },
  heading: {
    marginBottom: 15,
    fontWeight: 'bold',
  },
  searchListContainer: {
    position: 'relative',
    borderRadius: 8,
    borderTopStartRadius: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
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

const SpecialityScreen = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const specialityList = useSelector(
    (state) => state.specialityList.specialityList,
  );
  const user = useSelector((state) => state.auth.user);
  const searchData = useSelector((state) => state.search.searchList || []);
  const latitude = useSelector((state) => state.location.latitude);
  const longitude = useSelector((state) => state.location.longitude);

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

  return (
    <>
      <ImageBackground source={backGround} style={style.imageBg}>
        <TopNavigation
          alignment="center"
          style={{backgroundColor: 'transparent'}}
          accessoryLeft={BackAction}
        />
        <Layout style={style.layout}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}>
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
                <Text category="h4" style={style.heading}>
                  Search by speciality
                </Text>
                <FlatList
                  data={specialityList}
                  numColumns={2}
                  keyExtractor={(item, index) => item._id}
                  renderItem={(item) => {
                    return (
                      <CardComponent
                        text={item.item.name}
                        specializationPic={item.item.picUrl}
                        navigation={navigation}
                      />
                    );
                  }}
                />
              </View>
            )}
          </ScrollView>
        </Layout>
      </ImageBackground>
    </>
  );
};

export default SpecialityScreen;
