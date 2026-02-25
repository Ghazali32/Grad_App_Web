import React from 'react';
import {
  Layout,
  Text,
  Card,
  useTheme,
  Button,
  Avatar,
} from '@ui-kitten/components';
import {View, Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import ChatImage from '../../assets/chat.png';
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
    borderRadius: 33,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -10,
    marginVertical: -7,
  },
  docDetailsContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 25,
    flexShrink: 1,
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
  button: {
    position: 'absolute',
    right: -20,
    alignSelf: 'center',
  },
  col: {
    flexDirection: 'column',
  },
});
const Row = ({children}) => <View style={style.row}>{children}</View>;
export default function CardComponent({
  firstName,
  lastName,
  expertise,
  id,
  profilePic,
  navigation,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const ChatIcon = (props) => (
    <Avatar
      {...props}
      style={{borderRadius: 0}}
      size="medium"
      source={ChatImage}
    />
  );

  return (
    <Card
      style={style.card}
      onPress={() => {
        dispatch({
          type: 'currentDoctorReceiverId',
          currentDoctorReceiverId: id,
          docPic: profilePic,
        });
        navigation.navigate('ChatScreen', {
          navigation: navigation,
        });
      }}>
      <Row>
        <Image
          source={profilePic != null ? {uri: profilePic} : User}
          style={style.image}
        />
        <Layout style={style.docDetailsContainer}>
          <Text category="h6" style={style.text}>
            {`Dr. ${firstName} ${lastName}`}
          </Text>
          <Text>{expertise}</Text>
        </Layout>

        <Button
          style={style.button}
          appearance="ghost"
          accessoryRight={ChatIcon}
          onPress={() => {
            dispatch({
              type: 'currentDoctorReceiverId',
              currentDoctorReceiverId: id,
              docPic: profilePic,
            });
            navigation.navigate('ChatScreen', {
              navigation: navigation,
            });
          }}
        />
      </Row>
    </Card>
  );
}
