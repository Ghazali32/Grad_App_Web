import React, { useMemo } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import Female from '../../../assets/profile.png';
import { useDispatch } from 'react-redux';
import getParameterList from '../../../actions/getParameterList';
import Male from '../../../assets/male.png';

const style = StyleSheet.create({
  container: {
    width: '29%',
    margin: '2%',
    alignItems: 'center',
    minHeight: 120,
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 43,
    overflow: 'hidden',
    borderWidth: 1,
  },
  nameText: {
    alignSelf: 'center',
    textAlign: 'center',
    height: 36,
  },
});
const func = React.memo(() => {

})


const DashboardCard = React.memo(({
  navigation,
  name,
  profilePic,
  patientId,
  gender,
  status
}) => {
  const dispatch = useDispatch();
  return (
    <Card style={style.container}>
      <View style={{ backgroundColor: status ? "green" : "red", width: 10, height: 10, zIndex: 999, position: "absolute", right: 5, top: 5, borderRadius: 80 }}>

      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(
            getParameterList({
              userId: patientId,
            }),
          );
          navigation.navigate('ParameterList', { patientId });
        }}>
        <Image
          source={
            profilePic != null && profilePic
              ? { uri: profilePic }
              : gender === 'Male'
                ? Male
                : Female
          }
          style={style.image}
        />
      </TouchableOpacity>
      <Text
        category="label"
        numberOfLines={2}
        style={style.nameText}>
        {name ? name : 'No name'}
      </Text>
    </Card>
  );
})

export default DashboardCard;
