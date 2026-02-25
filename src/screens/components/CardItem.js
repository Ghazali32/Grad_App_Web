import React from 'react';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, View, Dimensions, Platform, Image} from 'react-native';
import {Text, Card} from '@ui-kitten/components';
import titleAlert from '../../utils/titleAlert';

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 6,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    width: 40,
    height: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
});

const CardItem = ({caption, screenName, navigation, type, onPress, image}) => {
  const insets = useSafeAreaInsets();
  const {portrait} = useDeviceOrientation();

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  let base;

  if (portrait) base = width < height ? width : height;
  else base = width > height ? width : height;

  let safeWidth = base - (insets.left || 0) - (insets.right || 0);

  if (Platform.isPad) safeWidth = safeWidth * (portrait ? 0.7 : 0.92);

  return (
    <View>
      <Card
        onPress={() => {
          onPress
            ? onPress()
            : screenName === ''
            ? titleAlert({
                message: 'This feature is not available for android',
              })
            : navigation.navigate(screenName);
        }}
        style={{
          ...styles.card,
          width: safeWidth / 2 - 45, //24,
          height: safeWidth / (type === 'rectangle' ? 3 : 2) - 45, //24,
        }}>
        <View style={styles.cardContent}>
          <Image source={image} style={styles.logo} />
        </View>
      </Card>
      <Text style={styles.text}>{caption}</Text>
    </View>
  );
};

export default CardItem;
