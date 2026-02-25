import React, { useState, useEffect } from "react";
import { View, StyleSheet, Select, SelectItem } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {
  Layout,
  Text,
  Card,
  Input,
  useTheme,
  Button,
  Radio,
  RadioGroup,
} from "@ui-kitten/components";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../common/Loader";
import validator from "validator";
import titleAlert from "../../utils/titleAlert";
import { ScrollView } from "react-native-gesture-handler";
import saveParaMeter2 from "../../actions/saveParameter2";
import checkUserIsApprove from "../../actions/checkUserIsApprove";
import { Alert } from "react-native";
const style = StyleSheet.create({
  layout: {
    flex: 1,
  },
  ContentView: {
    margin: "4%",
    marginTop: "10%",
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
    paddingVertical: "5%",
  },
  textColor: {
    color: "#49B585",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: "2%",
  },
  select: {
    color: "#49B585",
    marginLeft: "-45%",
    fontWeight: "bold",
  },
});
export default function MultipleTimeParameter({ navigation, route }) {
  const { patientId, date, type } = route.params;
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading || false);
  const parameter2Details = useSelector(
    (state) => state.parameterList.parameter2ById || {}
  );
  const checkUserIsApproved = useSelector(
    (state) => state.auth.checkUserIsApprove || ""
  );
  const approvedMessage = useSelector(
    (state) => state.auth.approvalMessage || ""
  );

  const [GradTherapy, setGradTherapy] = useState("");
  const [swellingBefore, setSwellingBefore] = useState(1);
  const [SwellingAfter, setSwellingAfter] = useState("");
  const [weightBefore, setWeightBefore] = useState("");
  const [weightAfter, setWeightAfter] = useState("");
  const [BloodPressureUpBefore, setBloodPressureUpBefore] = useState("");
  const [BloodPressureLowBefore, setBloodPressureLowBefore] = useState("");
  const [BloodPressureUpAfter, setBloodPressureUpAfter] = useState("");
  const [BloodPressureLowAfter, setBloodPressureLowAfter] = useState("");
  const [discomfortsBefore, setDiscomfortsBefore] = useState("");
  const [discomfortsAfter, setDiscomfortsAfter] = useState("");
  const [saveBtnState, setSaveBtnState] = useState(true);
  const [TherapyHours, setTherapyHours] = useState("");
  const [TherapyMinutes, setTherapyMinutes] = useState("");
  const [parameter2Id, setParameter2Id] = useState("");
  const [feedback_BeforeTherapy, setfeedback_BeforeTherapy] = useState("");
  const [fasting, setFasting] = useState("")
  const [ppLunch, setppLunch] = useState("");
  const [ppDinner, setppDinner] = useState("");
  const [insulinData, setInsulinData] = useState("");
  const [constipation, setConstipation] = useState(1);
  const [energyLevels, setEnergyLevels] = useState(0);
  const [bodyPain, setBodyPain] = useState("");
  const [bodyPainIntensity, setBodyPainIntensity] = useState(0);
  const [swelling, setSwelling] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (parameter2Details && type === "update") {
      console.log(parameter2Details + "----details----");
      setGradTherapy(parameter2Details?.gradTherapy || "");
      setWeightBefore(parameter2Details?.weight_BeforeTherapy || "");
      setWeightAfter(parameter2Details?.weight_AfterTherapy || "");
      setBloodPressureUpBefore(
        parameter2Details?.bloodPressureUpperValue_BeforeTherapy || ""
      );
      setBloodPressureLowBefore(
        parameter2Details?.bloodPressureLowerValue_BeforeTherapy || ""
      );
      setBloodPressureUpAfter(
        parameter2Details?.bloodPressureUpperValue_AfterTherapy || ""
      );
      setBloodPressureLowAfter(
        parameter2Details?.bloodPressureLowerValue_AfterTherapy || ""
      );
      var hours = Math.floor(parameter2Details?.therapyDuration / 60);
      var minutes = parameter2Details?.therapyDuration % 60;
      setTherapyHours(hours || "");
      setTherapyMinutes(minutes || "");
      let swellingBefore =
        parameter2Details?.swelling_BeforeTherapy === "yes" ? 0 : 1;
      setSwellingBefore(swellingBefore);
      setSwellingAfter(parameter2Details?.swelling_AfterTherapy || "");
      setDiscomfortsBefore(parameter2Details?.discomforts_BeforeTherapy || "");
      setDiscomfortsAfter(parameter2Details?.discomforts_AfterTherapy || "");
      setParameter2Id(parameter2Details?._id || "");
      setParameter2Id(parameter2Details?._id || "");
      setfeedback_BeforeTherapy(
        parameter2Details?.feedback_BeforeTherapy || ""
      );
      setFasting(parameter2Details?.fasting || "");
      setppLunch(parameter2Details?.pplunch || "");
      setppDinner(parameter2Details?.ppdinner || "");
      setInsulinData(parameter2Details?.insulinData || "");
      setConstipation(
        parameter2Details?.constipation === "no"
          ? 1
          : parameter2Details?.constipation === "mild"
            ? 2
            : 0
      );
      setEnergyLevels(
        parameter2Details?.energyLevels !== undefined
          ? parameter2Details.energyLevels.toString()
          : "0"
      );
      setBodyPain(parameter2Details?.bodyPain || "");
      setBodyPainIntensity(
        parameter2Details?.bodyPainIntensity !== undefined
          ? parameter2Details?.bodyPainIntensity.toString()
          : "0"
      );
      setSwelling(parameter2Details?.swelling || "");
      setFeedback(parameter2Details?.feedback || "");
    } else {
      // setGradTherapy('');
      // setWeightBefore('');
      // setWeightAfter('');
      // setBloodPressureUpBefore('');
      // setBloodPressureLowBefore('');
      // setBloodPressureUpAfter('');
      // setBloodPressureLowAfter('');
      // setTherapyHours('');
      // setTherapyMinutes('');
      // setSwellingBefore('');
      // setSwellingAfter('');
      // setDiscomfortsBefore('');
      // setDiscomfortsAfter('');
      // setfeedback_BeforeTherapy('');
      // setFeedback('')
    }
  }, [parameter2Details, type]);

  // useEffect(() => {
  //   if (parameter2Details?.gradTherapy) {
  //     return () => {
  //       setGradTherapy('');
  //       setWeightBefore('');
  //       setWeightAfter('');
  //       setBloodPressureUpBefore('');
  //       setBloodPressureLowBefore('');
  //       setBloodPressureUpAfter('');
  //       setBloodPressureLowAfter('');
  //       setTherapyHours('');
  //       setTherapyMinutes('');
  //       setSwellingBefore('');
  //       setSwellingAfter('');
  //       setDiscomfortsBefore('');
  //       setDiscomfortsAfter('');
  //       setfeedback_BeforeTherapy('');
  //     };
  //   }
  // }, [parameter2Details]);

  const GradTherapyOptions = [
    "No Therapy Advised",
    "Head Down Tilt",
    "Hot Water Immersion",
    "Leg Elevation",
    "Lower Leg Water Immersion",
  ];
  const TherapyOptions = ["Same", "Increased", "Decreased"];

  // Radio buttons
  var Swelling = [
    { label: "Yes", value: 0 },
    { label: "No", value: 1 },
  ];

  const Hour = (props) => (
    <Text {...props} style={{ color: theme["color-black-100"] }}>
      Hours
    </Text>
  );
  const Minute = (props) => (
    <Text {...props} style={{ color: theme["color-black-100"] }}>
      Minutes
    </Text>
  );
  const Kg = (props) => (
    <Text {...props} style={{ color: theme["color-black-100"] }}>
      Kg
    </Text>
  );
  React.useEffect(() => {
    dispatch(
      checkUserIsApprove({
        userId: patientId,
      })
    );
  }, [saveBtnState]);
  const onSaveClick = () => {
    dispatch(
      checkUserIsApprove({
        userId: patientId,
      })
    );
    if (checkUserIsApproved != "not-Approved") {
      let numberFormat = /^[0-9]*$/;
      let bloodPressureFormat = /^[0-9]\d{0,2}$/;
      let weightFormat = /^[1-9]\d{0,2}(?:\.\d{0,2})?$/;
      // if (validator.isEmpty(GradTherapy.trim())) {
      //   return titleAlert({message: 'Grad Therapy type required'});
      // }
      if (validator.isEmpty(weightBefore.toString().trim())) {
        return titleAlert({ message: "Weight Before Therapy required" });
      }
      if (!weightBefore.toString().trim().match(weightFormat)) {
        return titleAlert({
          message:
            "Weight Before Therapy can be of three digits upto two decimal places",
        });
      }
      // if (validator.isEmpty(weightAfter.toString().trim())) {
      //   return titleAlert({message: 'Weight After Therapy required'});
      // }
      if (weightAfter && !weightAfter.toString().trim().match(weightFormat)) {
        return titleAlert({
          message:
            "Weight After Therapy can be of three digits upto two decimal places",
        });
      }
      if (
        BloodPressureUpBefore &&
        !BloodPressureUpBefore.toString().trim().match(bloodPressureFormat)
      ) {
        return titleAlert({
          message:
            "Blood Pressure Upper Before Therapy can be of maximum three digits",
        });
      }
      // if (BloodPressureLowBefore && validator.isEmpty(BloodPressureLowBefore.toString().trim())) {
      //   return titleAlert({
      //     message: 'Blood Pressure Lower Before Therapy required',
      //   });
      // }
      if (
        BloodPressureLowBefore &&
        !BloodPressureLowBefore.toString().trim().match(bloodPressureFormat)
      ) {
        return titleAlert({
          message:
            "Blood Pressure Lower Before Therapy can be of maximum three digits",
        });
      }
      // if (validator.isEmpty(BloodPressureUpAfter.toString().trim())) {
      //   return titleAlert({
      //     message: 'Blood Pressure Upper After Therapy required',
      //   });
      // }
      if (
        BloodPressureUpAfter &&
        !BloodPressureUpAfter.toString().trim().match(bloodPressureFormat)
      ) {
        return titleAlert({
          message:
            "Blood Pressure Upper After Therapy can be of maximum three digits",
        });
      }
      // if (validator.isEmpty(BloodPressureLowAfter.toString().trim())) {
      //   return titleAlert({
      //     message: 'Blood Pressure Lower After Therapy required',
      //   });
      // }
      if (
        BloodPressureLowAfter &&
        !BloodPressureLowAfter.toString().trim().match(bloodPressureFormat)
      ) {
        return titleAlert({
          message:
            "Blood Pressure Lower After Therapy can be of maximum three digits",
        });
      }
      if (validator.isEmpty(energyLevels.toString().trim())) {
        return titleAlert({
          message: "Energy Level required",
        });
      }
      if (energyLevels > 10) {
        console.log({ "en levels": energyLevels });
        return titleAlert({
          message:
            "Energy Level/Intensity of Pain value should be less than 10",
        });
      }
      if (validator.isEmpty(bodyPain.toString().trim())) {
        return titleAlert({
          message: "Name of the Body Part Paining required",
        });
      }
      if (validator.isEmpty(bodyPainIntensity.toString().trim())) {
        return titleAlert({
          message: "Intensity of Pain required",
        });
      }
      if (bodyPainIntensity > 10) {
        return titleAlert({
          message:
            "Energy Level/Intensity of Pain value should be less than 10",
        });
      }
      if (validator.isEmpty(swellingBefore.toString().trim())) {
        return titleAlert({ message: "Swelling Before Therapy required" });
      }
      if (validator.isEmpty(SwellingAfter.trim())) {
        return titleAlert({ message: "Swelling After Therapy required" });
      }
      if (
        validator.isEmpty(TherapyHours.toString().trim()) &&
        validator.isEmpty(TherapyMinutes.toString().trim())
      ) {
        return titleAlert({
          message: "Duration of the Therapy required",
        });
      }
      if (TherapyHours) {
        if (!TherapyHours.toString().trim().match(numberFormat)) {
          return titleAlert({
            message: "Please enter Valid input in hours field",
          });
        }
      }
      if (TherapyMinutes) {
        if (!TherapyMinutes.toString().trim().match(numberFormat)) {
          return titleAlert({
            message: "Please enter Valid input in minutes field",
          });
        }
        if (TherapyMinutes > 59) {
          return titleAlert({
            message: "Therapy minutes should be less than 60",
          });
        }
      }
      if (validator.isEmpty(discomfortsBefore.trim())) {
        return titleAlert({ message: "Discomforts Before Therapy required" });
      }
      // if (discomfortsBefore.trim().length > 20) {
      //   return titleAlert({
      //     message:
      //       'Discomforts Before Therapy should be of maximum 20 characters',
      //   });
      // }
      if (validator.isEmpty(discomfortsAfter.trim())) {
        return titleAlert({ message: "Discomforts After Therapy required" });
      }
      if (validator.isEmpty(feedback.trim())) {
        return titleAlert({ message: "24 hours Feedback required" });
      }

      // if (discomfortsAfter.trim().length > 20) {
      //   return titleAlert({
      //     message: 'Discomforts After Therapy should be of maximum 20 characters',
      //   });
      // }
      let duration = +TherapyHours * 60 + +TherapyMinutes;
      dispatch(
        saveParaMeter2({
          gradTherapy: GradTherapy,
          weight_BeforeTherapy: parseFloat(weightBefore),
          weight_AfterTherapy: parseFloat(weightAfter),
          bloodPressureUpperValue_BeforeTherapy: parseInt(
            BloodPressureUpBefore
          ),
          bloodPressureLowerValue_BeforeTherapy: parseInt(
            BloodPressureLowBefore
          ),
          bloodPressureUpperValue_AfterTherapy: parseInt(BloodPressureUpAfter),
          bloodPressureLowerValue_AfterTherapy: parseInt(BloodPressureLowAfter),
          therapyDuration: parseInt(duration),
          swelling_BeforeTherapy: swellingBefore === 1 ? "no" : "yes",
          swelling_AfterTherapy: SwellingAfter.trim(),
          discomforts_BeforeTherapy: discomfortsBefore.trim(),
          discomforts_AfterTherapy: discomfortsAfter.trim(),
          day: date,
          userId: patientId,
          fasting: fasting,
          pplunch: ppLunch,
          ppdinner: ppDinner,
          insulinData: insulinData,
          constipation:
            constipation === 1 ? "no" : constipation === 2 ? "mild" : "yes",
          energyLevels: energyLevels,
          bodyPain: bodyPain,
          bodyPainIntensity: bodyPainIntensity,
          swelling: swelling,
          feedback: feedback,
          bodyPain: bodyPain,
          parameter2Id,
          setSaveBtnState,
          type,
          navigation,
          feedback_BeforeTherapy: feedback_BeforeTherapy.trim(),
        })
      );
      console.log("Saving data", { gradTherapy: GradTherapy });
      // setGradTherapy('');
      // setWeightBefore('');
      // setWeightAfter('');
      // setBloodPressureUpBefore('');
      // setBloodPressureLowBefore('');
      // setBloodPressureUpAfter('');
      // setBloodPressureLowAfter('');
      // setTherapyHours('');
      // setTherapyMinutes('');
      // setSwellingBefore('');
      // setSwellingAfter('');
      // setDiscomfortsBefore('');
      // setDiscomfortsAfter('');
    } else {
      Alert.alert(
        "Error",
        "This patient is not approved. Cannot add or edit parameters",
        [{ text: "OK" }]
      );
    }
  };

  if (loading) {
    return <Loader />;
  }
  console.log(parameter2Details?.feedback_BeforeTherapy, "ooo");
  return (
    <Layout style={style.layout}>
      <Layout style={style.ContentView}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text category="h5">Enter Therapy Parameters</Text>
            <Button
              style={
                !saveBtnState
                  ? { backgroundColor: "#0c8c96" }
                  : { backgroundColor: "transparent" }
              }
              disabled={saveBtnState}
              onPress={() => onSaveClick()}
            >
              Save
            </Button>
          </View>
          <Card style={style.ParameterBox}>
            <Layout style={{ borderWidth: 1, borderRadius: 10 }}>
              <SelectDropdown
                defaultButtonText={
                  GradTherapy !== "" ? GradTherapy : "Please Mention"
                }
                data={GradTherapyOptions}
                buttonStyle={{ backgroundColor: "transparent" }}
                buttonTextStyle={{
                  color: "#0c8c96",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
                onSelect={(selectedItem, index) => {
                  setGradTherapy(selectedItem);
                  setSaveBtnState(false);
                }}
                dropdownStyle={{ width: "80%", color: "#0c8c96" }}
              />
            </Layout>

            <View style={{ marginTop: "2%" }}>
              <Text category="h5" style={style.textColor}>
                Weight
              </Text>
              <View
                style={{
                  marginTop: "2%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "40%" }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text>Before Therapy </Text>
                    <Text
                      style={{
                        color: "red",
                      }}
                    >
                      *{" "}
                    </Text>
                  </View>
                  <Input
                    value={weightBefore.toString()}
                    keyboardType="numeric"
                    onChangeText={(nextValue) => {
                      setWeightBefore(nextValue);
                      setSaveBtnState(false);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      marginTop: "5%",
                      width: "100%",
                    }}
                    accessoryRight={Kg}
                  ></Input>
                </View>
                <View style={{ width: "40%" }}>
                  <Text>After Therapy</Text>
                  <Input
                    value={weightAfter.toString()}
                    keyboardType="numeric"
                    onChangeText={(nextValue) => {
                      setWeightAfter(nextValue);
                      setSaveBtnState(false);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      marginTop: "5%",
                      width: "100%",
                    }}
                    accessoryRight={Kg}
                  ></Input>
                </View>
              </View>
            </View>

            <View style={{ marginTop: "2%" }}>
              <Text category="h5" style={style.textColor}>
                Blood Sugar {"\n"}
                (only if you are a sugar patient)
              </Text>
              <Layout
                style={{
                  marginTop: "5%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "30%", alignSelf: "center" }}>
                  <Text>Fasting</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    justifyContent: "space-between",
                    marginLeft: "-5%",
                  }}
                >
                  <Input
                    keyboardType="numeric"
                    value={fasting}
                    onChangeText={(nextValue) => {
                      setFasting(nextValue);
                      setSaveBtnState(false);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      // marginTop: '5%',
                      width: "45%",
                    }}
                  ></Input>
                </View>
              </Layout>

              <Layout
                style={{
                  marginTop: "5%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "30%", alignSelf: "center" }}>
                  <Text>PP Lunch</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    justifyContent: "space-between",
                    marginLeft: "-5%",
                  }}
                >
                  <Input
                    keyboardType="numeric"
                    value={ppLunch}
                    onChangeText={(nextValue) => {
                      setppLunch(nextValue);
                      setSaveBtnState(false);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      // marginTop: '5%',
                      width: "45%",
                    }}
                  ></Input>
                </View>
              </Layout>

              <Layout
                style={{
                  marginTop: "5%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "30%", alignSelf: "center" }}>
                  <Text>PP Dinner</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    justifyContent: "space-between",
                    marginLeft: "-5%",
                  }}
                >
                  <Input
                    keyboardType="numeric"
                    value={ppDinner}
                    onChangeText={(nextValue) => {
                      setppDinner(nextValue);
                      setSaveBtnState(false);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      // marginTop: '5%',
                      width: "45%",
                    }}
                  ></Input>
                </View>
              </Layout>
            </View>

            <View style={{ marginTop: "2%" }}>
              <Text category="h5" style={style.textColor}>
                If you are Insulin Dependent Please mention
                {"\n"}
                <Text style={{ ...style.textColor, fontSize: 14 }}>
                  Insulin Dose : Name of the Insulin and dose {"\n"}( eg if you
                  take lantus & actrapid, write : Actrapid : (7 + 10 + 3) +
                  Lantus : 20U in morning or night)
                </Text>
              </Text>
              <Input
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                value={insulinData}
                onChangeText={(nextValue) => {
                  setInsulinData(nextValue);
                  setSaveBtnState(false);
                }}
                style={{
                  backgroundColor: "transparent",
                  marginTop: "5%",
                  width: "100%",
                }}
              ></Input>
            </View>

            <View style={{ marginTop: "2%" }}>
              <Text category="h5" style={style.textColor}>
                Blood Pressure
              </Text>
              <Layout
                style={{
                  marginTop: "5%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "50%", alignSelf: "center" }}>
                  <Text>Before Therapy</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    width: "60%",
                    justifyContent: "space-between",
                    marginLeft: "-10%",
                  }}
                >
                  <Input
                    keyboardType="numeric"
                    value={BloodPressureUpBefore.toString()}
                    onChangeText={(nextValue) => {
                      setBloodPressureUpBefore(nextValue);
                      setSaveBtnState(false);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      // marginTop: '5%',
                      width: "45%",
                    }}
                  ></Input>
                  <Text
                    category="h3"
                    style={{ fontWeight: "bold", color: "#0D8892" }}
                  >
                    /
                  </Text>
                  <Input
                    keyboardType="numeric"
                    value={BloodPressureLowBefore.toString()}
                    onChangeText={(nextValue) => {
                      setBloodPressureLowBefore(nextValue);
                      setSaveBtnState(false);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      // marginTop: '5%',
                      width: "45%",
                    }}
                  ></Input>
                </View>
              </Layout>
              <Layout
                style={{
                  marginTop: "5%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "50%", alignSelf: "center" }}>
                  <Text>After Therapy</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    width: "60%",
                    justifyContent: "space-between",
                    marginLeft: "-10%",
                  }}
                >
                  <Input
                    keyboardType="numeric"
                    value={BloodPressureUpAfter.toString()}
                    onChangeText={(nextValue) => {
                      setBloodPressureUpAfter(nextValue);
                      setSaveBtnState(false);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      // marginTop: '5%',
                      width: "45%",
                    }}
                  ></Input>
                  <Text
                    category="h3"
                    style={{ fontWeight: "bold", color: "#0D8892" }}
                  >
                    /
                  </Text>
                  <Input
                    keyboardType="numeric"
                    value={BloodPressureLowAfter.toString()}
                    onChangeText={(nextValue) => {
                      setBloodPressureLowAfter(nextValue);
                      setSaveBtnState(false);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      // marginTop: '5%',
                      width: "45%",
                    }}
                  ></Input>
                </View>
              </Layout>
            </View>

            <View style={{ marginTop: "2%", flexDirection: "column" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text category="h5" style={style.textColor}>
                  Constipation
                </Text>
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  *{" "}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* <Text> Before Therapy</Text> */}
                {/* <RadioForm
                radio_props={Swelling}
                initial={swellingBefore}
                buttonSize={10}
                formHorizontal={true}
                labelStyle={{marginRight: '5%'}}
                buttonColor={'#0c8c96'}
                selectedButtonColor={'#0c8c96'}
                animation={true}
                onPress={(value) => {
                  setSwellingBefore(value);
                  setSaveBtnState(false);
                  console.log(swellingBefore)
                }}
              /> */}
                <RadioGroup
                  style={{ flexDirection: "row" }}
                  selectedIndex={constipation}
                  onChange={(index) => {
                    console.log(
                      index === 1 ? "no" : index === 2 ? "mild" : "yes"
                    );
                    setConstipation(index), setSaveBtnState(false);
                  }}
                >
                  <Radio>Yes</Radio>
                  <Radio>No</Radio>
                  <Radio>Mild</Radio>
                </RadioGroup>
              </View>
            </View>

            <View style={{ marginTop: "2%" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text category="h5" style={style.textColor}>
                  Energy Levels
                  {"\n"}
                  <Text style={{ ...style.textColor, fontSize: 14 }}>
                    (Mention energy levels on a scale of 0 to 10 eg low energy
                    levels - 4 & full energy : 10)
                  </Text>
                </Text>
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  *{" "}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Input
                  onChangeText={(nextValue) => {
                    setEnergyLevels(nextValue);
                    setSaveBtnState(false);
                  }}
                  value={energyLevels}
                  keyboardType="numeric"
                  maxLength={2}
                  style={{
                    backgroundColor: "transparent",
                    marginTop: "2%",
                    width: "40%",
                  }}
                ></Input>
              </View>
            </View>

            <View style={{ marginTop: "2%" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text category="h5" style={style.textColor}>
                  Pain in the Body
                </Text>
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  *{" "}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ ...style.textColor, fontSize: 14 }}>
                  Mention name of the body part which is paining
                </Text>
                <Input
                  multiline={true}
                  numberOfLines={2}
                  textAlignVertical="top"
                  value={bodyPain}
                  onChangeText={(nextValue) => {
                    setBodyPain(nextValue);
                    setSaveBtnState(false);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    marginTop: "2%",
                    width: "100%",
                  }}
                ></Input>
              </View>
              <View
                style={{
                  marginTop: "3%",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ ...style.textColor, fontSize: 14 }}>
                  Intensity of Pain (on a scale of 0 to 10)
                </Text>
                <Input
                  multiline={true}
                  numberOfLines={2}
                  maxLength={2}
                  keyboardType="numeric"
                  textAlignVertical="top"
                  value={bodyPainIntensity}
                  onChangeText={(nextValue) => {
                    setBodyPainIntensity(nextValue);
                    setSaveBtnState(false);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    marginTop: "2%",
                    width: "100%",
                  }}
                ></Input>
              </View>
            </View>

            <View style={{ marginTop: "2%" }}>
              <Text category="h5" style={style.textColor}>
                Swelling{"\n"}
                <Text style={{ ...style.textColor, fontSize: 14 }}>
                  (Please mention the body part where swelling is seen)
                </Text>
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Input
                  multiline={true}
                  numberOfLines={2}
                  textAlignVertical="top"
                  value={swelling}
                  onChangeText={(nextValue) => {
                    setSwelling(nextValue);
                    setSaveBtnState(false);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    marginTop: "2%",
                    width: "100%",
                  }}
                ></Input>
              </View>
            </View>

            <View style={{ marginTop: "2%", flexDirection: "column" }}>
              <Text category="h5" style={style.textColor}>
                Swelling
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text>Before Therapy </Text>
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    *{" "}
                  </Text>
                </View>
                {/* <RadioForm
                radio_props={Swelling}
                initial={swellingBefore}
                buttonSize={10}
                formHorizontal={true}
                labelStyle={{marginRight: '5%'}}
                buttonColor={'#0c8c96'}
                selectedButtonColor={'#0c8c96'}
                animation={true}
                onPress={(value) => {
                  setSwellingBefore(value);
                  setSaveBtnState(false);
                  console.log(swellingBefore)
                }}
              /> */}
                <RadioGroup
                  style={{ flexDirection: "row" }}
                  selectedIndex={swellingBefore}
                  onChange={(index) => {
                    setSwellingBefore(index), setSaveBtnState(false);
                  }}
                >
                  <Radio>Yes</Radio>
                  <Radio>No</Radio>
                </RadioGroup>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "5%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text>After Therapy </Text>
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  *{" "}
                </Text>
              </View>
              <Layout style={{ borderWidth: 1, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText={
                    SwellingAfter !== "" ? SwellingAfter : "Please Mention"
                  }
                  data={TherapyOptions}
                  buttonStyle={{ backgroundColor: "transparent" }}
                  buttonTextStyle={{
                    color: "#0c8c96",
                    marginLeft: "-22%",
                    fontWeight: "bold",
                  }}
                  onSelect={(selectedItem, index) => {
                    setSwellingAfter(selectedItem);
                    setSaveBtnState(false);
                  }}
                  //   statusBarTranslucent={true}
                  dropdownStyle={{ width: "50%", color: "#0c8c96" }}
                />
              </Layout>
            </View>

            <View style={{ marginTop: "2%" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text category="h5" style={style.textColor}>
                  Duration of the Therapy
                </Text>
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  *{" "}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Input
                  onChangeText={(nextValue) => {
                    setTherapyHours(nextValue);
                    setSaveBtnState(false);
                  }}
                  value={TherapyHours.toString()}
                  keyboardType="numeric"
                  accessoryRight={Hour}
                  style={{
                    backgroundColor: "transparent",
                    marginTop: "2%",
                    width: "40%",
                  }}
                ></Input>
                <Text
                  category="h1"
                  style={{ fontWeight: "bold", color: "#0D8892", margin: "5%" }}
                >
                  :
                </Text>
                <Input
                  onChangeText={(nextValue) => {
                    setTherapyMinutes(nextValue);
                    setSaveBtnState(false);
                  }}
                  value={TherapyMinutes.toString()}
                  keyboardType="numeric"
                  accessoryRight={Minute}
                  style={{
                    backgroundColor: "transparent",
                    marginTop: "2%",
                    width: "47%",
                  }}
                ></Input>
              </View>
            </View>

            <View style={{ marginTop: "2%", flexDirection: "column" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text category="h5" style={style.textColor}>
                  Mention your Discomforts
                </Text>
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  *{" "}
                </Text>
              </View>
              <View>
                <Text>Before Therapy</Text>
                <Input
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={discomfortsBefore}
                  onChangeText={(nextValue) => {
                    setDiscomfortsBefore(nextValue);
                    setSaveBtnState(false);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    marginTop: "5%",
                    width: "100%",
                  }}
                ></Input>
              </View>
            </View>

            <View style={{ marginTop: "5%" }}>
              <Text>After Therapy</Text>
              <Input
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                textAlign="left"
                value={discomfortsAfter}
                onChangeText={(nextValue) => {
                  setDiscomfortsAfter(nextValue);
                  setSaveBtnState(false);
                }}
                style={{
                  backgroundColor: "transparent",
                  marginTop: "5%",
                  width: "100%",
                }}
              ></Input>
            </View>

            <View style={{ marginTop: "2%", flexDirection: "column" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text category="h5" style={style.textColor}>
                  24 hours feedback/Improvement
                </Text>
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  *{" "}
                </Text>
              </View>
              <View style={{ marginVertical: "2%" }}>
                {/* <Text>Before Therapy</Text> */}
                <Input
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={feedback}
                  onChangeText={(nextValue) => {
                    setFeedback(nextValue);
                    setTimeout(() => {
                      setSaveBtnState(false);
                    }, 3000);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    marginTop: "5%",
                    width: "100%",
                  }}
                ></Input>
              </View>
            </View>
          </Card>
        </ScrollView>
      </Layout>
    </Layout>
  );
}
