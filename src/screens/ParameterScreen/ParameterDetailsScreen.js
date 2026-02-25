import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import {
  Layout,
  Text,
  Card,
  useTheme,
  Button,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Divider,
} from "@ui-kitten/components";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import capitalizeFirstLetter from "../../common/Captial";
import Loader from "../../common/Loader";
import NoDataCard from "../../common/NodataCard";
import getRecomendationList from "../../actions/getRecomendationList";
import getParameter2ById from "../../actions/getParameter2ById";
import getParameter1ById from "../../actions/getParameter1ById";
import titleAlert from "../../utils/titleAlert";
import PdfIcon from "../../assets/pdf.png";
import OpenPdf from "react-native-open-pdf";
import moment from "moment";
// import ImageView from 'react-native-image-view';
import ImageView from "react-native-image-viewing";
import checkUserIsApprove from "../../actions/checkUserIsApprove";
import AudioPlayer from "./components/AudioPlayer";

const style = StyleSheet.create({
  layout: {
    flex: 1,
  },
  ContentView: {
    margin: "4%",
  },
  ParameterBox: {
    backgroundColor: "transparent",
    marginVertical: "10%",
    borderRadius: 10,
    shadowColor: "#000",
    borderWidth: 1,
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // elevation: 3,
    borderColor: "#49B585",
  },
  textColor: {
    color: "#49B585",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: "2%",
  },
  inputConntainers: {
    marginTop: "5%",
  },
  headingView: {
    height: "20%",
    paddingLeft: "5%",
    paddingTop: "8%",
  },
  headingText: {
    color: "black",
    fontSize: 25,
    padding: 0,
  },

  ViewTextLeft: {
    color: "#49B585",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: "3%",
  },
  ViewTextRight: {
    color: "#032F34",
    fontSize: 17,
    marginTop: "3%",
    fontWeight: "bold",
  },
  ViewTextRightt: {
    // color: '#49B585',
    fontSize: 18,
    marginTop: "3%",
    // fontWeight: 'bold',
  },
  icon: {
    width: 29,
    height: 29,
    fontWeight: "100",
  },
  backdrop: {
    backgroundColor: "red",
  },
});

export default function ParameterDetails({ navigation, route }) {
  const { date, patientId, isRecommended, dayId } = route.params;
  console.log(dayId);

  const dispatch = useDispatch();
  const parameter1Details = useSelector(
    (state) => (state.patientParameterDetails || {}).form1Details || {}
  );
  const parameter = useSelector(
    (state) => state.parameterList.parameter1 || {}
  );

  const parameter2Details = useSelector(
    (state) => (state.patientParameterDetails || {}).form2Details || {}
  );
  const checkUserIsApproved = useSelector(
    (state) => state.auth.checkUserIsApprove || ""
  );
  const approvedMessage = useSelector(
    (state) => state.auth.approvalMessage || ""
  );
  const loading = useSelector((state) => state.auth.loading || false);
  const theme = useTheme();
  const [urineSample, setUrineSample] = useState("");
  const [dialysisChecked, setDialysisChecked] = useState(1);
  const [kft, setKft] = useState(1);
  const [creatinine, setCreatinine] = useState("");
  const [sodium, setSodium] = useState("");
  const [potassium, setPotassium] = useState("");
  const [urea, setUrea] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");
  const [show, setShow] = useState(false);

  const [selectedUrl, setSelectedUrl] = useState(null);
  const [prescriptionImage, setPrescriptionImage] = useState([]);
  const [uploadedAudio, setUploadedAudio] = useState("");
  const [feedback, setFeedback] = useState("");
  const [discomforts, setDisomforts] = useState("");
  const EditIcon = (props) => (
    <Icon
      {...props}
      name="edit-2-outline"
      fill={theme["color-green-100"]}
      style={style.icon}
    />
  );

  const handlePress = useCallback((value) => {
    setSelectedUrl(value);
    setShow(true);
  }, []);

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
  const images = [
    {
      // source: {
      uri: selectedUrl,
      // },
      // title: 'Paris',
      width: 800,
      height: 1000,
    },
  ];

  const ThePdf = useCallback(() => {
    const path = parameter?.uploadFile;
    OpenPdf.open(path);
  }, [parameter1Details?.uploadFile]);

  useEffect(() => {
    if (parameter) {
      console.log("New PPP ---- ", parameter);
      setDisomforts(parameter.discomforts || "");
      setFeedback(parameter.feedback || "");
      setPrescriptionImage(parameter?.imagesList || []),
        setUploadedAudio(parameter?.audioFileUrl || "");

      console.log(feedback);
    }
  }, [parameter]);

  useEffect(() => {
    return () => {
      setUrineSample("");
      setDialysisChecked(1);
      setKft(1);
      setCreatinine("");
      setSodium("");
      setPotassium("");
      setUrea("");
      setHemoglobin("");
      setDisomforts("");
      setFeedback("");
    };
  }, [parameter]);

  // const onPressEdit1 = () => {
  //   dispatch(
  //     getParameter1ById({
  //       parameter1Id: parameter1Details._id,
  //     }),
  //   );
  //   navigation.navigate('OneTimeParameter', {
  //     patientId,
  //     date,
  //     type: 'update',
  //   });
  // };

  // const onPressEdit2 = (data) => {
  //   dispatch(getParameter2ById({parameter2Id: data._id}));
  //   navigation.navigate('MultipleTimeParameter', {
  //     patientId,
  //     date,
  //     type: 'update',
  //   });
  // };

  const onPressEdit1 = () => {
    dispatch(
      getParameter1ById({
        parameter1Id: parameter1Details._id,
      })
    );
    navigation.navigate("OneTimeParameter", {
      patientId,
      date,
      type: "update",
    });
  };

  const onPressEdit2 = (data) => {
    dispatch(getParameter2ById({ parameter2Id: data._id }));
    navigation.navigate("MultipleTimeParameter", {
      patientId,
      date,
      type: "update",
    });
  };

  const recommendationAlert = () => {
    titleAlert({
      title: "Recommended",
      message: "Doctor has Recommended for this date. Cannot add or edit",
    });
  };

  const BackIcon = (props) => (
    <Icon {...props} name="arrow-back" fill={theme["color-basic-100"]} />
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={navigateBack}
      appearance="control"
    />
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <TopNavigation
        title={(props) => (
          <Text
            {...props}
            style={[props.style, { color: theme["color-basic-100"] }]}
          >
            {date}
          </Text>
        )}
        alignment="center"
        style={{ backgroundColor: theme["color-green-100"] }}
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={style.layout}>
        <ScrollView>
          <Layout style={style.ContentView}>
            <View>
              <Text category="h4" style={{ padding: "1%" }}>
                Parameters Details
              </Text>
            </View>
            {parameter ? (
              <View style={style.ParameterBox}>
                {/* <View
                  style={{
                   
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View></View>
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin : 10
                        
                      }}
                      onPress={() =>
                        !isRecommended ? onPressEdit1() : recommendationAlert()
                      }
                    >
                      <View>
                        <EditIcon />
                      </View>
                      <View>
                        <Text category="h5" style={{ color: "#49B585" }}>
                          Edit
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View> */}
                <View style={{ padding: "2%" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <Text style={style.ViewTextLeft}>
                      Comforts / Discomforts
                    </Text>
                    <Text style={style.ViewTextRight}>{discomforts}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <Text style={style.ViewTextLeft}>
                      24hr Feedback / Query
                    </Text>
                    <Text style={style.ViewTextRight}>{feedback}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    {!parameter?.uploadFile && <Text style={style.ViewTextLeft}>Uploaded Report</Text>}
                    {parameter?.uploadFile ? (
                      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: 10 }}>
                        <Text style={style.ViewTextLeft}>Uploaded Report</Text>
                        {parameter.uploadFile ? (
                          <Card
                            style={{
                              borderColor: "none",
                              borderWidth: 0,
                              marginRight: "-7%",
                              margin: -10,
                              padding: 0,
                            }}
                            onPress={() => ThePdf(parameter.uploadFile)}
                          >
                            <Image source={PdfIcon} style={{ height: 40, width: 35 }} />
                          </Card>
                        ) : (
                          <Text style={style.ViewTextRight}>No report(s) uploaded</Text>
                        )}
                      </View>
                    ) : (
                      <Text style={style.ViewTextRight}>
                        No report(s) uploaded
                      </Text>
                    )}
                  </View>

                  {prescriptionImage.length > 0 ? (
                    <View
                      style={{
                        flexDirection:
                          prescriptionImage.length < 2 ? "row" : "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          ...style.ViewTextLeft,
                          padding: 10,
                        }}
                      >
                        Uploaded Image
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: "2%",
                          flexWrap: "wrap",
                        }}
                      >
                        {prescriptionImage.map((pic, index) => (
                          <View
                            key={index}
                            style={{
                              width: "29%",
                              margin: "2%",
                              marginTop: "0%",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity onPress={() => handlePress(pic)}>
                              <Image
                                source={{
                                  uri: pic,
                                }}
                                style={{
                                  width: 80,
                                  height: 80,
                                  margin: "2%",
                                }}
                              />
                            </TouchableOpacity>
                            {show && (
                              <ImageView
                                images={images}
                                imageIndex={0}
                                onRequestClose={() => setShow(false)}
                                visible={show}
                                isSwipeCloseEnabled={true}
                                backgroundColor="#787878"
                                animationType="fade"
                                style={style.backdrop}
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
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 15,
                      }}
                    >
                      <View
                        style={{
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text style={style.ViewTextLeft}>Uploaded Image</Text>
                      </View>
                      <View
                        style={{
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text style={style.ViewTextRight}>
                          No images(s) uploaded
                        </Text>
                      </View>
                    </View>
                  )}

                  <View>
                    {/* {uploadedAudio ? (
                      <View>
                        <Text
                          style={{
                            ...style.ViewTextLeft,
                            marginRight: '30%',
                          }}>
                          Uploaded Audio Files
                        </Text>
                        <View>
                          <View style={{marginVertical: '3%'}}>
                            <AudioPlayer
                              path={parameter1Details?.audioFileUrl}
                            />
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text style={style.ViewTextLeft}>
                            {' '}
                            Uploaded Audio Files
                          </Text>
                        </View>
                        <View>
                          <Text style={style.ViewTextRight}>
                            No audio files (s) uploaded
                          </Text>
                        </View>
                      </View>
                    )} */}
                    {uploadedAudio ? (
                      <View
                        style={{
                          flexDirection: "column",
                          marginVertical: "2%",
                          // width: Dimensions.get('screen').width,
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            padding: 10,
                          }}
                        >
                          <Text
                            style={{ ...style.ViewTextLeft, marginRight: "7%" }}
                          >
                            Uploaded Audio
                          </Text>
                        </View>
                        <View style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }} >
                          <AudioPlayer url={parameter?.audioFileUrl} />
                        </View>
                      </View>
                    ) : (

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          padding: 10,
                        }}
                      >
                        <View>
                          <Text style={style.ViewTextLeft}>Uploaded Audio</Text>
                        </View>
                        <View>
                          <Text style={style.ViewTextRight}>
                            No audio(s) uploaded
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                  <Button
                    style={{
                      backgroundColor: "#49B585",
                      margin: 10
                    }}
                    onPress={() => {
                      dispatch(
                        getRecomendationList({
                          userId: patientId,
                          day: date,
                        })
                      );
                      navigation.navigate("PreviousRecommendation", {
                        day: date,
                        patientId,
                        dayId: dayId,
                        type: "create",
                      });
                    }}
                  >
                    View Recommendation
                  </Button>
                </View>
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <NoDataCard Data="Parameter 1 Details not found" />
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  onPress={() =>
                    !isRecommended
                      ? navigation.navigate("OneTimeParameter", {
                        date,
                        patientId,
                      })
                      : recommendationAlert()
                  }
                >
                  <View>
                    <EditIcon />
                  </View>
                  <View>
                    <Text category="h5" style={{ color: "#49B585" }}>
                      Edit
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Layout>
        </ScrollView>
      </Layout>
    </>
  );
}
