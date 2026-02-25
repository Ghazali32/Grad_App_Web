import API from "../api";
import { Alert } from "react-native";
import moment from "moment";
import axios from "axios";

const login =
  ({ mobile, deviceId, OTP, navigation }) =>
  async (dispatch) => {
    dispatch({ type: "loading", loading: true });

    const { token, expertId, Status, Message } = await API.login({
      mobile,
      deviceId,
    });

    console.log("Token -----", token);

    if (Status === "error") {
      Alert.alert("Login Error", Message, [{ text: "OK" }]);
      console.log("Error Message: ", Message);
      dispatch({ type: "loading", loading: false });
      return;
    }

    if (expertId && token) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };
    
      const { status, patientList, message } =
        await API.getUserForDashBaord({
          expertId,
          day: moment().format("DD MMM YYYY"),
          filterType: "",
        });
    
      if (status === "error") {
        Alert.alert("Error", message, [{ text: "OK" }]);
        dispatch({ type: "loading", loading: false });
        return;
      }

      dispatch({ type: "login", token, expertId });
      dispatch({
        type: "connectedPatientList",
        connectedPatientList: patientList,
      });

      navigation.navigate("DashboardScreen");
    } else {
      Alert.alert("", Message, [{ text: "OK" }]);
      dispatch({ type: "loading", loading: false });
    
      return;
    }

    dispatch({ type: "loading", loading: false });
  };

export default login;
