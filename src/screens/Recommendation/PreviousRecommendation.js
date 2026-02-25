import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
  Alert
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {
  Layout,
  Icon,
  Button,
  Text,
  Card,
  useTheme,
  Modal,
  Divider,
} from '@ui-kitten/components';
import { LogBox } from 'react-native';
import NoDataCard from '../../common/NodataCard';
import moment from 'moment';
import Loader from '../../common/Loader';
import checkUserIsApprove from '../../actions/checkUserIsApprove';
import AudioPlayer from '../components/AudioPlayer';
import { useSelector, useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    // marginBottom: 20,
    // padding:10,
  },
  headingView: {
    backgroundColor: '#49B585',
    // height: '18%',
    height: 100,
    paddingLeft: '5%',
    paddingTop: '8%',
  },
  headingText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ContentView: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
    top: '-10%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: '85%',
    padding: '3%',
  },
  button: {
    margin: 2,
    fontWeight: 'bold',
    backgroundColor: '#0c8c96',
    borderColor: '#0c8c96',
    color: '#fff',
    borderRadius: 12,
  },
  scrollView: {
    marginTop: '6%',
    marginHorizontal: '10%',
    maxWidth: '80%',
    // padding:50
  },
  Card: {
    margin: '1.8%',
    borderWidth: 2,
    borderRadius: 15,
  },
  backdrop: {
    backgroundColor: 'red',
  },
});
export default function PreviousRecommendation({ navigation, route }) {
  const { patientId, day, dayId } = route.params;
  const dispatch = useDispatch();
  const recomendationList = useSelector(
    (state) => state.recomendations.recomendationList || [],
  );
  const loading = useSelector((state) => state.auth.loading || false);
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const checkUserIsApproved = useSelector(
    (state) => state.auth.checkUserIsApprove || '',
  );
  const approvedMessage = useSelector(
    (state) => state.auth.approvalMessage || '',
  );
  const handlePress = (value) => {
    setSelectedUrl(value);
    setShow(true);
  };

  const images = [
    {
      // source: {
      uri: selectedUrl,
      // },
      // title: 'Paris',
      width: 800,
      height: 1000,
    },
  ];

  for (let obj in recomendationList) {
    console.log('Recomendation -----', recomendationList[obj])
  }
  const handleClickLink = async (VideoLink) => {
    const supported = await Linking.canOpenURL(VideoLink);
    if (supported) {
      await Linking.openURL(VideoLink);
    } else {
      await Linking.openURL('https://' + VideoLink);
    }
  };

  const CalenderIcon = (props) => (
    <Icon
      {...props}
      name="calendar-outline"
      fill={theme['color-grey-100']}
      height={20}
      width={20}
    />
  );
  const CrossIcon = (props) => (
    <Icon
      {...props}
      name="close-circle-outline"
      fill="grey"
      height={50}
      width={50}
    />
  );

  const ClockIcon = (props) => (
    <Icon
      {...props}
      name="clock-outline"
      fill={theme['color-grey-100']}
      height={20}
      width={20}
    />
  );
  const AddRecommendationFnction = () => {
    dispatch(
      checkUserIsApprove({
        userId: patientId,
      }),
    );
    // : Alert.alert('Error', approvedMessage, [{text: 'OK'}]);
    if (checkUserIsApproved === 'not-Approved') {
      Alert.alert(
        'Error',
        'This patient is not approved. Cannot send recommendation',
        [{ text: 'OK' }],
      );
      return;
    } else {
      navigation.navigate('AddRecommendation', { patientId, day, dayId });
    }
  };
  // To remove the console warning
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);



  if (loading) {
    return <Loader />;
  }

  return (
    <Layout style={styles.layout}>
      <View style={styles.headingView}>
        <Text category="h1" style={styles.headingText}>
          Recommendation
        </Text>
      </View>
      <View style={styles.ContentView}>
        <ScrollView style={{ paddingLeft: '.5%' }}>
          <Button
            style={{ margin: '6%' }}
            onPress={() => AddRecommendationFnction()}>
            {(props) => (
              <Text
                {...props}
                style={{
                  color: theme['color-white-100'],
                  fontWeight: 'bold',
                }}>
                Add Recommendation
              </Text>
            )}
          </Button>
          {recomendationList?.length > 0 ? (
            recomendationList.map((data, index) => (
              <Card key={index} style={styles.Card}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <CalenderIcon />

                    <Text style={{ marginHorizontal: '6%' }}>
                      {moment.unix(data.createdDate).format('DD-MMM-YYYY')}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <ClockIcon />
                    <Text style={{ marginHorizontal: '6%' }}>
                      {moment(data.createdDate * 1000).format('HH:mm:ss ')}
                    </Text>
                  </View>
                </View>
                {data.text != null && (
                  <View style={{ marginTop: '5%' }}>
                    <Text category="h6" style={{ marginTop: '3%' }}>
                      {data.text}
                    </Text>
                    <Divider style={{ marginVertical: '5%' }} />
                  </View>
                )}

                {data.videoLink != null && (
                  <View key={index}>
                    <Text
                      style={{ color: 'blue', marginTop: '5%' }}
                      onPress={() => handleClickLink(data.videoLink)}>
                      {data.videoLink}
                    </Text>
                    <Divider style={{ marginVertical: '5%' }} />
                  </View>
                )}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: '5%' }}>
                  {data?.pics?.length > 0 &&
                    data.pics.map((pic, index) => (
                      <View key={index}>
                        <TouchableOpacity onPress={() => handlePress(pic)}>
                          <Image
                            source={{
                              uri: pic,
                            }}
                            style={{ width: 80, height: 80, margin: '2%' }}
                          />
                        </TouchableOpacity>
                        <Divider style={{ marginVertical: '5%' }} />
                        {console.log(images)}



                      </View>
                    ))}
                </View>

                {show && (
                  <ImageView
                    images={images}
                    imageIndex={0}
                    visible={show}
                    onRequestClose={() => setShow(false)}
                    isSwipeCloseEnabled={true}
                    backgroundColor="#787878"
                    animationType="fade"
                    style={styles.backdrop}
                    HeaderComponent={() => (
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        paddingTop: 50,
                        paddingRight: 15,
                      }}>
                        <TouchableOpacity
                          onPress={() => setShow(false)}
                          style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                )}

                {data.audioFileUrl ? (
                  <AudioPlayer url={data.audioFileUrl} />
                ) : (
                  <></>
                )}
                <View style={{ alignSelf: 'flex-end', color: 'grey' }}>
                  <Text category="c1" style={{ color: 'grey' }}>
                    By : {data.expertId.name}
                  </Text>
                </View>
              </Card>
            ))
          ) : (
            <View style={styles.ContentView}>
              <NoDataCard Data="No recomendations found" />
            </View>
          )}
        </ScrollView>
      </View>
    </Layout>
  );


}
