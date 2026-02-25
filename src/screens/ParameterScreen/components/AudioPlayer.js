import React, { useState, useCallback, useEffect } from 'react';
import { View, BackHandler, StyleSheet } from 'react-native';
import { Icon, Button, Text, useTheme } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';

export default function AudioPlayer({ url }) {
  const theme = useTheme();

  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Format milliseconds to mm:ss
  const formatTime = (millis) => {
    if (!millis) return '00:00';
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  };

  async function loadSound() {
    console.log('Loading Sound');
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
    setIsPlaying(true);
  }

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(status.durationMillis); // Show full duration at end
        // Optional: reset to start
        // newSound.setPositionAsync(0);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const onStartPlay = async () => {
    if (!url) return;

    if (sound) {
      // If sound exists, just play it
      if (position >= duration && duration > 0) {
        // Replay from beginning if finished
        await sound.replayAsync();
      } else {
        await sound.playAsync();
      }
    } else {
      // Load and play
      await loadSound();
    }
  };

  const onPausePlay = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const onStopPlay = async () => {
    if (sound) {
      await sound.stopAsync();
      // await sound.setPositionAsync(0); // Reset to 0?
    }
  };

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  // Clean up on back press or unmount
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (sound) {
          sound.stopAsync();
        }
        return false; // Let default behavior happen? Or block? Original code blocked/handled it.
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        subscription.remove();
        if (sound) {
          sound.unloadAsync();
        }
      };
    }, [sound]),
  );

  // Re-load sound if url changes? 
  // For now trusting onStartPlay to handle generic logic

  const StopIcon = (props) => (
    <Icon
      {...props}
      name="stop-circle-outline"
      fill={theme['color-green-100']}
      height={25}
      width={25}
    />
  );

  const PauseIcon = (props) => (
    <Icon
      {...props}
      name="pause-circle-outline"
      fill={theme['color-green-100']}
      height={25}
      width={25}
    />
  );

  const PlayIcon = (props) => (
    <Icon
      {...props}
      name="play-circle-outline"
      fill={theme['color-green-100']}
      height={25}
      width={25}
    />
  );

  return (
    <View>
      <Text style={{ alignSelf: 'center' }}>
        {formatTime(position)} / {formatTime(duration)}
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: '3%',
        }}>
        <View>
          <Button
            size="small"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#49B585',
              color: 'black',
              paddingHorizontal: 0,
            }}
            appearance="outline"
            accessoryLeft={PlayIcon}
            onPress={onStartPlay}>
            <Text style={{ color: '#49B585' }}>PLAY</Text>
          </Button>
        </View>

        <View>
          <Button
            size="small"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#49B585',
              color: 'black',
              marginHorizontal: '3%',
              paddingHorizontal: 0,
            }}
            appearance="outline"
            accessoryLeft={PauseIcon}
            onPress={onPausePlay}>
            <Text style={{ color: '#49B585' }}>PAUSE</Text>
          </Button>
        </View>

        <View>
          <Button
            size="small"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#49B585',
              color: 'black',
              paddingHorizontal: 0,
            }}
            appearance="outline"
            accessoryLeft={StopIcon}
            onPress={onStopPlay}>
            <Text style={{ color: '#49B585' }}>STOP</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
