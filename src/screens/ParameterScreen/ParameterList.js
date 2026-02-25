import ParameterCard from "./components/ParameterCard";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import getUser from "../../actions/getUser";
import Loader from "../../common/Loader";
import NoDataCard from "../../common/NodataCard";
import getPatientParameterDetails from "../../actions/getPatientParameterDetails";
import checkUserIsApprove from "../../actions/checkUserIsApprove";
import moment from "moment";

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  headingView: {
    backgroundColor: "#49B585",
    height: "20%",
    paddingLeft: "5%",
    paddingTop: "8%",
  },
  headingText: {
    color: "#fff",
    fontWeight: "bold",
  },
  ContentView: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    position: "relative",
    top: "-5%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: "86.5%",
    padding: "3%",
  },
  button: {
    fontWeight: "bold",
    backgroundColor: "#49B585",
    borderRadius: 12,
  },
  scrollView: {
    paddingHorizontal: 5,
  },
});

export default function ParameterList({ navigation, route }) {
  const { patientId } = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const parameterList = useSelector(
    (state) => state.parameterList.parameterList || []
  );
  const checkUserIsApproved = useSelector(
    (state) => state.auth.checkUserIsApprove || ""
  );

  const fetchParameterDetails = async () => {
    let date = moment().format("DD MMM YYYY");
    setIsLoading(true);
    
    await dispatch(
      getPatientParameterDetails({ userId: patientId, day: date })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    fetchParameterDetails();
  }, [patientId]); 

  const navigationScreen = async () => {
    let date = moment().format("DD MMM YYYY");

    if (checkUserIsApproved !== "not-Approved") {
      if (
        parameterList.length > 0 &&
        parameterList[0].day === date &&
        parameterList[0].isEnable
      ) {
        Alert.alert(
          "Error",
          "Recommendation has already been given. Cannot add or edit parameters"
        );
      } else {
        navigation.navigate("OneTimeParameter", { date, patientId });
      }
    } else {
      Alert.alert(
        "Error",
        "This patient is not approved. Cannot add or edit parameters",
        [{ text: "OK" }]
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout style={styles.layout}>
      <View style={styles.headingView}>
        <Text category="h3" style={styles.headingText}>
          Patient Details
        </Text>
      </View>
      <View style={styles.ContentView}>
        <Button
          style={{
            ...styles.button, 
            marginVertical: "5%", 
          }}
          size="large"
          onPress={() => {
            dispatch(getUser({ userId: patientId }));
            navigation.navigate("ProfileScreen");
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold"}}>
            View Profile
          </Text>
        </Button>

        <ScrollView style={styles.scrollView}>
          {isLoading ? (
            <Loader />
          ) : parameterList.length > 0 ? (
            parameterList.map((data, index) => (
              <ParameterCard
              key={index}
              day={data.day}
              dayId = {data._id}
              id = {data.parameterId}
              createdDate = {data.createdDate}
              navigation={navigation}
              isRecommended={data.isEnable}
              patientId={patientId}
              />
            ))
          ) : (
            <View style={styles.ContentView}>
              <NoDataCard Data="No Data Found" />
            </View>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}
