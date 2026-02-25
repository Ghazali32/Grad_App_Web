import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Card, Layout} from '@ui-kitten/components';
import {View, StyleSheet, Image} from 'react-native';
import getDoctorBySepecilaity from '../../actions/getDoctorListBySpeciality';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import User from '../../assets/profile.png';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 9,
    borderColor: 'black',
    // height: 80,
    flex: 0.5,
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -10,
    marginVertical: -7,
    justifyContent: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 45,
    borderColor: 'green',
    borderWidth: 1,
    marginRight: 3,
    marginLeft: -10,
  },
  text: {
    fontSize: moderateScale(11, 0.6),
    fontWeight: 'bold',
    alignSelf: 'center',
    flex: 1,
    // flexWrap: 'wrap',
    // marginLeft: 4,
  },
});

const Row = ({children}) => <View style={styles.row}>{children}</View>;
export default function SpecialityCard({text, navigation, specializationPic}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const latitude = useSelector((state) => state.location.latitude);
  const longitude = useSelector((state) => state.location.longitude);

  const getDoctorList = () => {
    dispatch(
      getDoctorBySepecilaity({
        patientId: user,
        specialist: text,
        longitude: longitude,
        latitude: latitude,
      }),
    );
  };
  return (
    <Card
      style={styles.card}
      onPress={() => {
        getDoctorList();
        navigation.navigate('DoctorSpecialityScreen', {expertise: text});
      }}>
      <Row>
        <Image
          source={specializationPic != null ? {uri: specializationPic} : User}
          style={styles.image}></Image>
        <Text style={styles.text}>{text}</Text>
      </Row>
    </Card>
  );
}
