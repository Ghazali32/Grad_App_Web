import React from 'react';
import {Layout, Text, Card} from '@ui-kitten/components';
import {View, Image, StyleSheet} from 'react-native';
import getDoctorDetails from '../../actions/getDoctorDetails';
import {useDispatch} from 'react-redux';
import User from '../../assets/profile.png';

const style = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    flex: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginVertical: 10,
    justifyContent: 'center',
    borderWidth: 1,
  },

  image: {
    width: 66,
    height: 66,
    borderRadius: 43,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -10,
    marginVertical: -7,
  },
  docDetailsContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 19,
  },
  text: {
    color: '#49B585',
    fontWeight: 'bold',
  },
  connected: {
    alignSelf: 'flex-start',
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 14,
  },
  expertise: {
    alignSelf: 'flex-start',
  },
});
const Row = ({children}) => <View style={style.row}>{children}</View>;
export default function ConnectDocCard({
  firstName,
  lastName,
  expertise,
  doctorID,
  profilePic,
  navigation,
}) {
  const dispatch = useDispatch();
  const doctorDetails = () => {
    dispatch(
      getDoctorDetails({
        doctorId: doctorID,
      }),
    );
  };
  return (
    <Card
      style={style.card}
      onPress={() => {
        doctorDetails();
        navigation.navigate('ConnectedDocDetails');
      }}>
      <Row>
        <Image
          source={profilePic != null ? {uri: profilePic} : User}
          style={style.image}
        />
        <Layout style={style.docDetailsContainer}>
          <Text category="h6" style={style.text}>
            {firstName} {lastName}
          </Text>
          <Text style={style.expertise}>{expertise}</Text>
        </Layout>
      </Row>
    </Card>
  );
}
