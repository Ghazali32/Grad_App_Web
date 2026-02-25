import React, { useEffect, useState, useCallback } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import ImageView from "react-native-image-viewing";
// var ImagePicker = require('react-native-image-picker');
import * as ImagePicker from "expo-image-picker";
import {
  Icon,
  Button,
  Text,
  Input,
  useTheme,
  Modal,
  Card,
} from "@ui-kitten/components";
import addRecommendations from "../../actions/addRecomendations";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../common/Loader";
import titleAlert from "../../utils/titleAlert";
import validator from "validator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import Config from "../../../config";
import AudioRecorder from "../components/AudioRecorder";
import RNFetchBlob from "rn-fetch-blob";
import checkUserIsApprove from "../../actions/checkUserIsApprove";

import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from "@react-navigation/native";
const styles = StyleSheet.create({
  View: {
    flex: 1,
    marginBottom: 20,
  },
  btnContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flex: 1,
    top: "-3%",
  },
  headingView: {
    backgroundColor: "#49B585",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "3%",
    paddingVertical: "8%",
  },
  headingText: {
    color: "#fff",
    fontWeight: "bold",
  },

  ViewTextLeft: {
    fontSize: 17,
    fontWeight: "bold",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scroll: {
    // top: '-3%',
    padding: 0,
    margin: 0,
  },
});




export default function AddRecommendation({ navigation, route }) {
  const { patientId, day, dayId } = route.params;
  const dispatch = useDispatch();
  const theme = useTheme();
  const loading = useSelector((state) => state.auth.loading);
  const checkUserIsApproved = useSelector(
    (state) => state.auth.checkUserIsApprove || ""
  );
  const approvedMessage = useSelector(
    (state) => state.auth.approvalMessage || ""
  );
  const token = useSelector((state) => state.auth.token);
  const [imageUrl, setImageUrl] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [inputBox, setInputBox] = useState(10);
  const [medicineName, setMedicineName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [prescriptionImage, setPrescriptionImage] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [show, setShow] = useState(false);

  // Audio  component states
  // const [uploadButtonStatus, setUploadButtonStatus] = useState(false);
  const [uploadButtonStatus, setUploadButtonStatus] = useState(false);
  const [isLoggingIn, setIsLogginIn] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState("00:00:00");
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState("00:00:00");
  const [duration, setDuration] = useState("00:00:00");
  const [path, setPath] = useState("");
  const [showPlay, setPlayShow] = useState(false);
  const [imageUploaded, setUploaded] = useState(false);
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();


  // useEffect(()=>{
  //   setRecordSecs(0);
  //   setRecordTime('00:00:00');
  //   setCurrentPositionSec(0);
  //   setCurrentDurationSec(0);
  //   setPlayTime('00:00:00');
  //   setDuration('00:00:00');
  // },[])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (recording) {
          onStopRecord();
        }
        navigation.goBack();
        return true;
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [navigation, onStopRecord])
  );
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

  const dirs = RNFetchBlob?.fs?.dirs;
  const Audiopath = Platform.select({
    ios: "hello.m4a",
    android: `${dirs.CacheDir}/hello.mp3`,
  });

  const AddIcon = (props) => (
    <Icon
      {...props}
      name="plus-outline"
      fill={theme["color-primary-500"]}
      height={55}
      width={55}
    />
  );
  const CameraIcon = (props) => (
    <Icon
      {...props}
      name="camera-outline"
      fill={theme["color-grey-100"]}
      height={30}
      width={30}
    />
  );
  const GalleryIcon = (props) => (
    <Icon
      {...props}
      name="image-outline"
      fill={theme["color-grey-100"]}
      height={30}
      width={30}
      borderRadius={10}
    />
  );
  const MobileIcon = (props) => (
    <Icon {...props} name="phone-outline" fill={theme["color-green-100"]} />
  );

  const handlePress = (value) => {
    setSelectedUrl(value);
    setShow(true);
  };

  const images = [
    {
      // source: {
      uri: selectedUrl,
      // },

      width: 800,
      height: 1000,
    },
  ];
  const resetFunction = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(undefined);
    }
    if (recording) {
      await recording.stopAndUnloadAsync();
      setRecording(undefined);
    }
    setRecordSecs(0);
    setRecordTime("00:00:00");
    setPlayTime("00:00:00");
    setDuration("00:00:00");
    setPath("");
    setUploadButtonStatus(false);
    setPlayShow(false);
  };

  const imageUpload = async (data) => {
    setVisible(false);
    dispatch({ type: "loading", loading: true });

    // Expo ImagePicker result structure adaptation
    let builtFile = {
      name: data.fileName || data.uri.split('/').pop(),
      type: data.mimeType || 'image/jpeg',
      uri: data.uri,
    };

    const formData = new FormData();
    formData.append("image", builtFile);
    console.log({ sdfsdfsfsdfsdfsdf: builtFile });
    var res;
    try {
      res = await axios.post(
        `${Config.url}/api/recomdation/uploadFile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.log("eeeeeerrrrroooorrrrrr", e);
      return titleAlert({ title: "Error", message: e.message });
    }
    if (res?.data?.status === "success") {
      return res.data.imageUrl;
    }
  };

  const AudioUploadApi = async (data) => {
    const dirs = RNFetchBlob?.fs?.dirs;
    const Audiopath = Platform.select({
      ios: "hello.m4a",
      android: `${dirs.CacheDir}/hello.mp3`,
    });
    dispatch({ type: "loading", loading: true });
    let builtFile = {
      name: "hello.mp3",
      type: "audio/mp3",
      uri: Platform.OS === "android" ? data : data.replace("file://", ""),
    };

    const formData = new FormData();
    formData.append("image", builtFile);

    var res;
    try {
      res = await axios.post(
        `${Config.url}/api/recomdation/uploadFile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      return titleAlert({ title: "Error", message: e });
    }

    if (res?.data?.status === "success") {
      // let obj = {};
      // obj.uri = res.data.imageUrl;

      setAudioUrl(res.data.imageUrl);
      await setUploadButtonStatus(false);
      resetFunction();
      titleAlert({ title: "", message: "Audio uploaded successfully" });

      dispatch({ type: "loading", loading: false });
      return;
    }
  };
  useEffect(() => {
    console.log("updated          ", prescriptionImage);
  }, [prescriptionImage]);

  //
  const requestCameraPermission = async () => {
    setVisible(false);
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted) {
      LaunchCameraFunction();
    } else {
      Alert.alert("Permission Required", "App needs access to your camera");
    }
  };

  const LaunchCameraFunction = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setPrescriptionImage([...prescriptionImage, asset]);
    }
  };
  const selectImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "App needs access to your photos to select images.");
        return;
      }

      setVisible(false);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        if (result.assets.length > 3) {
          Alert.alert("Too Many Images", "You can select up to 3 images only.");
          return;
        }
        // Ensure assets have 'uri'
        setPrescriptionImage([...prescriptionImage, ...result.assets]);
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error", e.message || "Failed to pick image");
    }
  };

  const deleteImage = async (data) => {
    let temarr = [];
    console.log("!!!!!!!!!!!", data);
    prescriptionImage.map((e, i) => {
      if (i !== data) {
        console.log("$$$$$$$$$", i);
        console.log("%%%%%%%%%", prescriptionImage[i]);
        temarr.push(prescriptionImage[i]);
      }
    });
    console.log("########", temarr);
    setPrescriptionImage(temarr);
    temarr = [];
  };
  const uploadAllImage = async () => {
    try {
      // Check if there are more than 3 images to upload
      if (prescriptionImage.length > 3) {
        Alert.alert(
          "Too Many Images",
          "You can upload up to 3 images only.",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("Image upload limit exceeded. Resetting selected images.");
                // setPrescriptionImage([]); // Clear the images if the limit is exceeded
              },
            },
          ]
        );
        return; // Exit the function
      }

      // Show loading indicator
      dispatch({ type: "loading", loading: true });

      // Start uploading all images in parallel
      const uploadedImages = await Promise.all(
        prescriptionImage.map(async (image) => await imageUpload(image))
      );

      // Merge new uploaded images with the existing imageUrl state
      const updatedImageUrl = [...imageUrl, ...uploadedImages];

      // Update the imageUrl state with the new array
      setImageUrl(updatedImageUrl);

      console.log("@@@@@@@@@@@@@@@@", updatedImageUrl);

      // Hide loading indicator
      setUploaded(true);
      dispatch({ type: "loading", loading: false });

      // Show success alert once images are uploaded
      Alert.alert("Success", "Images uploaded successfully!", [{ text: "OK" }]);

      return updatedImageUrl; // Return the updated image list
    } catch (error) {
      // Hide loading indicator if there's an error
      dispatch({ type: "loading", loading: false });

      console.error("Error uploading images:", error);

      // Show error alert if there's an issue with image upload
      Alert.alert(
        "Error",
        "There was an issue uploading the images. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const sentRecomendation = async () => {
    if (videoLink) {
      if (!validator.isURL(videoLink)) {
        return titleAlert({
          title: "Error",
          message: "Video link is invalid.",
        });
      }
    }
    dispatch(
      addRecommendations({
        userId: patientId,
        pics: imageUrl,
        text: medicineName,
        videoLink,
        audioFileUrl: audioUrl,
        day,
        navigation,
        dayId
      })
    );
  };

  // Format milliseconds to mm:ss
  const formatTime = (millis) => {
    if (!millis) return '00:00:00';
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return "00:" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  };

  const onStartRecord = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        setUploadButtonStatus(false);
        setPlayShow(false);
        setPath('');

        recording.setOnRecordingStatusUpdate((status) => {
          setRecordSecs(Math.floor(status.durationMillis / 1000));
          setRecordTime(formatTime(status.durationMillis));
        })
      } else {
        Alert.alert('Permission Denied', 'Microphone permission is required.');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const onStopRecord = async () => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      setRecording(undefined);
      setPath(uri);
      setUploadButtonStatus(true);
      setPlayShow(true);
      Alert.alert("Recording stopped successfully.");
    } catch (error) {
      console.error("Failed to stop", error);
    }
  };

  const onStartPlay = async () => {
    if (!path) return;
    if (sound) await sound.unloadAsync();

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: path },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
    setUploadButtonStatus(false);
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setCurrentPositionSec(Math.floor(status.positionMillis / 1000));
      setCurrentDurationSec(Math.floor(status.durationMillis / 1000));
      setPlayTime(formatTime(status.positionMillis));
      setDuration(formatTime(status.durationMillis));
      if (status.didJustFinish) {
        setUploadButtonStatus(true);
        // handle finish
      }
    }
  };

  const onPausePlay = async () => {
    if (sound) await sound.pauseAsync();
    setUploadButtonStatus(true);
  };

  const onStopPlay = async () => {
    if (sound) await sound.stopAsync();
    setPlayTime("00:00:00");
    setUploadButtonStatus(true);
  };

  const RecordIcon = (props) => (
    <Icon
      {...props}
      name="mic-outline"
      fill={theme["color-green-100"]}
      height={30}
      width={30}
    />
  );
  const StopIcon = (props) => (
    <Icon
      {...props}
      name="stop-circle-outline"
      fill={theme["color-green-100"]}
      height={30}
      width={30}
    />
  );
  const PauseIcon = (props) => (
    <Icon
      {...props}
      name="pause-circle-outline"
      fill={theme["color-green-100"]}
      height={30}
      width={30}
    />
  );
  const PlayIcon = (props) => (
    <Icon
      {...props}
      name="play-circle-outline"
      fill={theme["color-green-100"]}
      height={30}
      width={30}
    />
  );

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <View style={styles.headingView}>
        <Text category="h1" style={styles.headingText}>
          Recommendation
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <ScrollView style={styles.scroll}>
          <View style={{ padding: "5%" }}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: "5%",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.ViewTextLeft}>Prescription</Text>
              {/* <AddIcon /> */}
            </View>

            <View style={{ flexDirection: "row", marginVertical: "5%" }}>
              <Input
                textAlignVertical="top"
                textAlign="left"
                multiline={true}
                numberOfLines={5}
                style={{ width: "100%", marginRight: "5%" }}
                value={medicineName}
                onChangeText={(nextValue) => setMedicineName(nextValue)}
              />
              {/* <SubIcon /> */}
            </View>
            <View
              style={{
                borderWidth: 0.3,
                borderStyle: "dashed",
                borderRadius: 1,
                borderColor: "black",
              }}
            />
            <View flex={1} />
          </View>
          <View style={{ padding: "5%" }}>
            <Text style={styles.ViewTextLeft}>Prescription Image</Text>
            <View style={{ flexDirection: "row", marginVertical: "5%" }}>
              {/* {prescriptionImage.length > 0 ?<View></View>: */}
              <View>
                <Button
                  onPress={() => setVisible(true)}
                  accessoryLeft={AddIcon}
                  style={{ backgroundColor: "white" }}
                ></Button>
              </View>
              {/* } */}
              {visible ? (
                <Modal
                  visible={visible}
                  backdropStyle={styles.backdrop}
                  onBackdropPress={() => setVisible(false)}
                  style={{ padding: 0 }}
                >
                  <Card
                    disabled={true}
                    style={{
                      flexDirection: "row",
                      padding: "0%",
                      borderRadius: 15,
                    }}
                  >
                    <View
                      style={{
                        borderBottomWidth: 1,
                        marginLeft: "0%",
                        width: "130%",
                      }}
                    >
                      <Text
                        style={{ marginVertical: "5%", fontWeight: "bold" }}
                      >
                        Select an option
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignContent: "center",
                        marginVertical: "10%",
                        alignItems: "center",
                        marginRight: "30%",
                      }}
                    >
                      <View>
                        <CameraIcon />
                      </View>

                      <Text
                        onPress={requestCameraPermission}
                        style={{ marginLeft: "3%" }}
                      >
                        Take a picture
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <GalleryIcon />
                      </View>
                      <Text
                        onPress={selectImage}
                        style={{ marginBottom: "20%", marginLeft: "3%" }}
                      >
                        Select from gallery
                      </Text>
                    </View>
                  </Card>
                </Modal>
              ) : (
                <></>
              )}
              <View
                style={{
                  flexDirection: "row",
                  flexShrink: 1,
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  width: Dimensions.get("screen").width,
                }}
              >
                {prescriptionImage.length > 0 ? (
                  prescriptionImage.map((data, index) => (
                    <View
                      key={data.uri || data.path || index}
                      style={{
                        // width: '29%',
                        margin: "2%",
                        marginTop: "0%",

                        alignItems: "center",
                      }}
                    >
                      <View>
                        <TouchableOpacity
                          onPress={() => deleteImage(index)}
                          style={{
                            backgroundColor: "#0c8c96",
                            width: 20,
                            height: 20,
                            position: "relative",
                            top: 15,
                            right: -85,
                            zIndex: 999,
                            borderRadius: 50,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            X
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handlePress(data.uri || data.path)}
                        >
                          <Image
                            source={{
                              uri: data.uri || data.path,
                            }}
                            style={{ width: 100, height: 100 }}
                          ></Image>
                        </TouchableOpacity>
                      </View>
                    </View>

                  ))
                ) : (
                  <View></View>
                )}

              </View>
              {show ? (
                <ImageView
                  images={images}
                  imageIndex={0}
                  visible={show}
                  onRequestClose={() => setShow(false)}
                  isSwipeCloseEnabled={true}
                  backgroundColor="#787878"
                  animationType="fade"
                  style={styles.backdrop}
                  HeaderComponent={() => (
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      paddingTop: 50,
                      paddingRight: 15,
                    }}>
                      <TouchableOpacity
                        onPress={() => setShow(false)}
                        style={{
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : (
                <></>
              )}
            </View>

            <View flex={1} />
          </View>
          {
            (prescriptionImage.length > 0 && imageUpload) &&
            <View style={{
              flexDirection: "row",
              justifyContent: 'center'
            }}>
              <Button
                style={{ marginRight: "2%" }}
                onPress={() => uploadAllImage()}
              >
                Upload
              </Button>
            </View>
          }
          <View
            style={{
              marginTop: 10,
              borderWidth: 0.3,
              borderRadius: 1,
              borderColor: "black",
            }}
          />

          <View style={{ padding: "5%" }}>
            <Text style={styles.ViewTextLeft}>Video Link</Text>
            <View style={{ flexDirection: "row", marginVertical: "5%" }}>
              <Input
                style={{ width: "100%" }}
                value={videoLink}
                onChangeText={(nextValue) => setVideoLink(nextValue)}
              />
            </View>
          </View>
          <View
            style={{
              borderWidth: 0.3,
              borderStyle: "dashed",
              borderRadius: 1,
              borderColor: "black",
            }}
          />
          <View style={{ padding: "5%" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.ViewTextLeft}> Audio</Text>
              <View style={{ flexDirection: "row" }}>
                <Button
                  style={{ marginRight: "2%" }}
                  disabled={uploadButtonStatus ? false : true}
                  onPress={() => AudioUploadApi(path)}
                >
                  Upload
                </Button>
                <Button
                  style={{ marginLeft: "2%" }}
                  disabled={!uploadButtonStatus}
                  onPress={resetFunction}
                >
                  Reset
                </Button>
              </View>
            </View>
            {showPlay ? (
              <>
                <Text style={{ alignSelf: "center" }}>
                  {playTime} / {duration}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: "3%",
                  }}
                >
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "#49B585",
                    }}
                    appearance="outline"
                    accessoryLeft={PlayIcon}
                    onPress={onStartPlay}
                  >
                    <Text style={{ color: "#49B585" }}>PLAY</Text>
                  </Button>
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "#49B585",
                    }}
                    appearance="outline"
                    accessoryLeft={PauseIcon}
                    onPress={onPausePlay}
                  >
                    <Text style={{ color: "#49B585" }}>PAUSE</Text>
                  </Button>
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "#49B585",
                    }}
                    appearance="outline"
                    accessoryLeft={StopIcon}
                    onPress={onStopPlay}
                  >
                    <Text style={{ color: "#49B585" }}>STOP</Text>
                  </Button>
                </View>
              </>
            ) : (
              <>
                <Text style={{ alignSelf: "center" }}>{recordTime}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: "3%",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "#49B585",
                    }}
                    appearance="outline"
                    accessoryLeft={RecordIcon}
                    onPress={onStartRecord}
                  >
                    <Text style={{ color: "#49B585" }}>RECORD</Text>
                  </Button>

                  <Button
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "#49B585",
                    }}
                    appearance="outline"
                    accessoryLeft={StopIcon}
                    onPress={onStopRecord}
                  >
                    <Text style={{ color: "#49B585" }}>STOP</Text>
                  </Button>
                </View>
              </>
            )}

            <View flex={1} />
            <View
              style={{ marginTop: "3%", width: "30%", alignSelf: "center" }}
            >
              <Button onPress={() => sentRecomendation()}>Add</Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
