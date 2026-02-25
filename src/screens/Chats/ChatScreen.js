import React from 'react';
import { View, Text } from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  useTheme,
} from '@ui-kitten/components';

const ChatScreen = ({ navigation }) => {
  const theme = useTheme();

  const BackIcon = (props) => (
    <Icon {...props} name="arrow-back" fill={theme['color-grey-100']} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <TopNavigation
        title="Chat"
        accessoryLeft={() => (
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => navigation.goBack()}
          />
        )}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: '#666',
            textAlign: 'center',
          }}
        >
          💬 Chat feature is coming soon.
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 14,
            color: '#999',
            textAlign: 'center',
          }}
        >
          This section is temporarily disabled.
        </Text>
      </View>
    </View>
  );
};

export default ChatScreen;
