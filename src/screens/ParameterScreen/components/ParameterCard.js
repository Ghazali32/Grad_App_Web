import React from "react";
import { Layout, Text, Card } from "@ui-kitten/components";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import ParameterIcon from "../../../assets/rx.png";
import ParameterIcon2 from "../../../assets/rx1.png";
import { useDispatch } from "react-redux";
import getPatientParameterDetails from "../../../actions/getPatientParameterDetails";
import getRecomendationList from "../../../actions/getRecomendationList";
import moment from "moment";
import getParameter1ById from "../../../actions/getParameter1ById";

const style = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
    flex: 1,
    marginVertical: "0.8%",
    borderRadius: 10,
    shadowColor: "#000",
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // elevation: 3,
    borderColor: "#49B585",
    borderWidth: 1,
  },
  parameterDetailsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    // alignItems: 'center',
    // justifyContent: 'center',
    margin: 10,
  },
  Date: {
    color: "#49B585",
    fontWeight: "bold",
  },

  numberOfParameterText: {
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    marginHorizontal: -10,
    marginVertical: -7,
    justifyContent: "space-between",
  },
  icon: {
    width: 26,
    height: 36,
    overflow: "hidden",
  },
});

export default function ParameterCard({
  navigation,
  day,
  createdDate,
  patientId,
  isRecommended,
  dayId,
  id,
}) {
  const dispatch = useDispatch();

  const Row = ({ children }) => <View style={style.row}>{children}</View>;

  const navigationScreen = async () => {
    try {
      // await dispatch(
      //   getPatientParameterDetails({
      //     userId: patientId,
      //     day,
      //   })
      // );
      const response = await dispatch(getParameter1ById({ parameter1Id: id }));
      if(response?.success){
      navigation.navigate("ParameterDetailsScreen", {
        date: day,
        patientId,
        isRecommended,
        createdDate,
        dayId,
        id,
      });
    }
    } catch (error) {
      console.log("Error fetching patient parameter details:", error);
    }
  };
  

  return (
    <Card style={style.card}>
      <Row>
        <TouchableOpacity  onPress={
      navigationScreen}>
          <Layout style={style.parameterDetailsContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text category="h6" style={[style.Date, { paddingRight: 0 }]}>
                {day}
              </Text>
              <Text style={{ fontSize: 12, color: "#0c8c96", marginLeft: 10 }}>
                {moment.unix(createdDate).format("hh:mm A")}
              </Text>
            </View>
          </Layout>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => {
              dispatch(
                getRecomendationList({
                  userId: patientId,
                  day,
                })
              );
              navigation.navigate("PreviousRecommendation", { patientId, day });
            }}
          >
            <Image
              source={isRecommended ? ParameterIcon : ParameterIcon2}
              style={style.icon}
            />
          </TouchableOpacity>
        </View>
      </Row>
    </Card>
  );
}
