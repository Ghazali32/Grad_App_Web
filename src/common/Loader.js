import React from 'react';
import {useTheme} from '@ui-kitten/components';
import {ActivityIndicator, View} from 'react-native';

export const Loader = ({}) => {
  const theme = useTheme();

  return (
    <>
      <View flex={1} style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={theme['color-green-100']} />
      </View>
    </>
  );
};

export default Loader;
