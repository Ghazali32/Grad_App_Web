import React from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View, Dimensions, Platform, Image } from 'react-native';
import { Icon, Text, Card, Avatar } from '@ui-kitten/components';

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 6,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#87CEEB',
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
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    color: '#000',
  },
});

const MenuCardItem = ({
  icon,
  color,
  caption,
  screenName,
  navigation,
  type,
  onPress,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const { portrait } = useDeviceOrientation();

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  let base;

  if (portrait) base = width < height ? width : height;
  else base = width > height ? width : height;

  let safeWidth = base - (insets.left || 0) - (insets.right || 0);

  if (Platform.isPad) safeWidth = safeWidth * (portrait ? 0.7 : 0.92);

  return (
    <Card
      onPress={() => {
        onPress ? onPress() : navigation.navigate(screenName);
      }}
      style={{
        ...styles.card,
        width: safeWidth / 2 - 24,
        height: safeWidth / (type === 'rectangle' ? 3 : 2) - 24,
        ...style,
      }}>
      <View style={styles.cardContent}>
        <Avatar style={styles.icon} source={icon} />
        {/* <Icon fill={color} name={icon} style={styles.icon} /> */}
        <Text style={styles.text}>{caption}</Text>
      </View>
    </Card>
  );
};

export default MenuCardItem;
