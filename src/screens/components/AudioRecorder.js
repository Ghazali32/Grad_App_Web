import { View, Text, Alert, BackHandler, StyleSheet, Platform } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Icon, useTheme } from '@ui-kitten/components';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function AudioRecorder({
  setRecordSecs,
  recordTime,
  setRecordTime,
  setCurrentPositionSec,
  setCurrentDurationSec,
  playTime,
  setPlayTime,
  duration,
  setDuration,
  path,
  setPath,
  setUploadButtonStatus,
  showPlay,
  setPlayShow,
  resetFunction,
}) {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [isRecordingConfigured, setIsRecordingConfigured] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [recording, sound]);

  // Format milliseconds to mm:ss
  const formatTime = (millis) => {
    if (!millis) return '00:00';
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  };

  // Also updating parent props with format Time logic if needed, but keeping local format here for display if needed
  // The parent expects mm:ss format strings.

  const RecordIcon = (props) => (
    <Icon {...props} name="mic-outline" fill={theme['color-green-100']} height={30} width={30} />
  );
  const StopIcon = (props) => (
    <Icon {...props} name="stop-circle-outline" fill={theme['color-green-100']} height={30} width={30} />
  );
  const PauseIcon = (props) => (
    <Icon {...props} name="pause-circle-outline" fill={theme['color-green-100']} height={30} width={30} />
  );
  const PlayIcon = (props) => (
    <Icon {...props} name="play-circle-outline" fill={theme['color-green-100']} height={30} width={30} />
  );

  async function onStartRecord() {
    try {
      console.log('Requesting permissions..');
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        console.log('Starting recording..');
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        setUploadButtonStatus(false);
        setPlayShow(false);
        setPath('');

        // Start a timer/interval to update UI
        recording.setOnRecordingStatusUpdate((status) => {
          setRecordSecs(Math.floor(status.durationMillis / 1000));
          setRecordTime(formatTime(status.durationMillis));
        })

        console.log('Recording started');
      } else {
        Alert.alert('Permission Denied', 'Microphone permission is required to record audio.');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function onStopRecord() {
    console.log('Stopping recording..');
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);

    setRecording(undefined);
    setPath(uri);
    setUploadButtonStatus(true);
    setPlayShow(true);
    Alert.alert('Recording saved successfully.');
  }

  async function onStartPlay() {
    console.log('Loading Sound');
    if (!path) return;

    // Unload existing sound if any
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: path },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
    setUploadButtonStatus(false);
  }

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setCurrentPositionSec(Math.floor(status.positionMillis / 1000));
      setCurrentDurationSec(Math.floor(status.durationMillis / 1000));
      setPlayTime(formatTime(status.positionMillis));
      setDuration(formatTime(status.durationMillis));

      if (status.didJustFinish) {
        setUploadButtonStatus(true);
        // Optional: reset UI
      }
    }
  }

  async function onPausePlay() {
    if (sound) {
      await sound.pauseAsync();
      setUploadButtonStatus(true);
    }
  }

  async function onStopPlay() {
    if (sound) {
      await sound.stopAsync();
      setPlayTime('00:00:00');
      setUploadButtonStatus(true);
    }
  }

  // This onReset logic seems to be called from parent? or is it supposed to be an internal reset?
  // The prop `resetFunction` is passed DOWN, but `onReset` is defined locally and not used?
  // Checking original code: `onReset` was defined but not used in render. 
  // Parent likely calls `resetFunction` passed as prop. 
  // BUT the parent `AddRecommendation.js` calls `resetFunction` which resets PARENT state. 
  // It does NOT call child method.

  // So we just need to make sure we expose stop functionality if parent needs it? 
  // Actually parent code was directly calling `audioRecorderPlayer.stopPlayer()`.
  // Since we are now using local state `recording` and `sound`, the parent CANNOT stop them directly unless we lift state up or use ref.
  // Ideally, `AddRecommendation.js` should simply unmount this component or we use `useEffect` to listen to some props.
  // HOWEVER, `AddRecommendation.js` has `resetFunction` which it uses internally.

  // Let's stick to the UI buttons handling logic here.

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (recording) {
          onStopRecord();
        }
        if (sound) {
          sound.stopAsync();
        }
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation, recording, sound])
  );

  return (
    <>
      {showPlay ? (
        <>
          <Text style={{ alignSelf: 'center' }}>
            {playTime} / {duration}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '3%' }}>
            <Button
              size="small"
              style={{ backgroundColor: 'transparent', borderColor: '#49B585' }}
              appearance="outline"
              accessoryLeft={PlayIcon}
              onPress={onStartPlay}
            >
              <Text style={{ color: '#49B585' }}>PLAY</Text>
            </Button>
            <Button
              size="small"
              style={{ backgroundColor: 'transparent', borderColor: '#49B585' }}
              appearance="outline"
              accessoryLeft={PauseIcon}
              onPress={onPausePlay}
            >
              <Text style={{ color: '#49B585' }}>PAUSE</Text>
            </Button>
            <Button
              size="small"
              style={{ backgroundColor: 'transparent', borderColor: '#49B585' }}
              appearance="outline"
              accessoryLeft={StopIcon}
              onPress={onStopPlay}
            >
              <Text style={{ color: '#49B585' }}>STOP</Text>
            </Button>
          </View>
        </>
      ) : (
        <>
          <Text style={{ alignSelf: 'center' }}>{recordTime}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '3%' }}>
            <Button
              style={{ backgroundColor: 'transparent', borderColor: '#49B585' }}
              appearance="outline"
              accessoryLeft={RecordIcon}
              onPress={onStartRecord}
            >
              <Text style={{ color: '#49B585' }}>RECORD</Text>
            </Button>

            <Button
              style={{ backgroundColor: 'transparent', borderColor: '#49B585' }}
              appearance="outline"
              accessoryLeft={StopIcon}
              onPress={onStopRecord}
            >
              <Text style={{ color: '#49B585' }}>STOP</Text>
            </Button>
          </View>
        </>
      )}
    </>
  );
}
