import React, { useState, useEffect, useCallback } from "react";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import {
  Button,
  Icon,
  Layout,
  Text,
  useTheme,
  Input,
  Card,
  Modal,
  Radio,
  RadioGroup,
  Divider,
} from "@ui-kitten/components";
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import API from "../../api";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../common/Loader";
import DashboardCard from "./components/DashboardCard";
import getConnectedPatientList from "../../actions//getConnectedPatientList";
import getUserForDashBaord from "../../actions/getUserForDashBoard";
import NoDataCard from "../../common/NodataCard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
// import PushNotification from "react-native-push-notification"; // TODO: Replace with expo-notifications
// import NotificationComponent from "../../common/NotificationComponent";
import { FlatList } from "react-native";

const style = StyleSheet.create({
  layout: {
    flex: 1,
    // marginBottom: 20,
    // paddingVertical:10,
  },
  container: {
    overflow: "hidden",
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    flex: 1,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
  btnContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flex: 1,
    position: "relative",
    top: "-5%",
    minHeight: "87%",
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
    marginBottom: "10%",
  },
  input: {
    width: "100%",
    marginBottom: 8,
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  button: {
    paddingVertical: "3%",
    borderRadius: 5,
    borderColor: "transparent",
    marginHorizontal: "25%",
    marginBottom: "5%",
  },
  row: {
    flexDirection: "row",
    flexShrink: 1,
    flexWrap: "wrap",
    justifyContent: "flex-start",
    // marginHorizontal: '3%',
    // borderWidth:1,
  },
  scroll: {
    marginTop: 2,
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
// funnel-outline

export default function DashboardScreen({ navigation }) {
  const theme = useTheme();
  const routing = useRoute();
  const dispatch = useDispatch();
  const [patientList, setPatientList] = useState([]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState(8);

  const list = useSelector(
    (state) => state.connectedPatientList.patientList || []
  );

  const expertId = useSelector((state) => state.auth.expertId || null);
  const loading = useSelector((state) => state.auth.loading || false);

  useEffect(() => {
    if (list.length > 0) {
      // Sort patients by status (active first)
      const sortedList = list.sort((a, b) => {
        const isStatusActiveA = !a.userId?.updateDate
          ? false
          : Math.abs(moment(a.userId?.updateDate).diff(new Date(), "days")) <=
          3;
        const isStatusActiveB = !b.userId?.updateDate
          ? false
          : Math.abs(moment(b.userId?.updateDate).diff(new Date(), "days")) <=
          3;

        return isStatusActiveB - isStatusActiveA; // Active patients come first
      });
      setPatientList(sortedList);
    } else {
      setPatientList([]);
    }
  }, [list]);

  useEffect(() => {
    console.log("enpert Id---" + expertId);
    console.log("re-rendered");
    dispatch(
      getUserForDashBaord({
        expertId,
        day: moment().format("DD MMM YYYY"),
        filterType: "",
      })
    );
  }, []);

  useEffect(() => {
    return () => {
      setPatientList([]);
      setSearch("");
      setVisible(false);
      setFilter(4);
    };
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      // console.log(list);
      setPatientList(list);
    } else {
      setPatientList([]);
    }
  }, [list]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (routing.name === "DashboardScreen") {
          BackHandler.exitApp();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [routing])
  );


  const FilterIcon = (props) => (
    <Icon
      {...props}
      style={{ width: 40, height: 40 }}
      name="funnel"
      size="small"
      fill={theme["color-white-100"]}
    />
  );

  const SettingIcon = (props) => (
    <Icon
      {...props}
      style={{ width: 40, height: 40 }}
      name="settings-outline"
      size="small"
      fill={theme["color-white-100"]}
    />
  );

  const clearFunction = () => {
    setSearch("");
    setPatientList(list);
  };

  const SearchIcon = (props) => (
    <Icon {...props} name="search-outline" fill={theme["color-black-100"]} />
  );

  const ClearIcon = (props) => (
    <Icon
      {...props}
      name="close-outline"
      fill={theme["color-black-100"]}
      onPress={clearFunction}
    />
  );

  const searchText = (inputText) => {
    if (inputText.length === 10) {
      setPatientList(
        list.filter((item) =>
          item.userId?.mobile ? item.userId?.mobile.includes(inputText) : false
        )
      );
    } else if (inputText.length < 10) {
      setPatientList(list || []);
    } else if (inputText.length > 10) {
      Alert.alert("Invalid Input", "Please enter a 10-digit mobile number.");
    }
  };

  const Row = ({ children }) => <Layout style={style.row}>{children}</Layout>;

  const onFilterChange = (index) => {
    setFilter(index);
    setVisible(false);
    let type =
      index === 0
        ? "1"
        : index === 2
          ? "0"
          : index === 4
            ? "yes"
            : index === 6
              ? "no"
              : "";
    dispatch(
      getConnectedPatientList({
        expertId,
        day: moment().format("DD MMM YYYY"),
        filterType: type,
      })
    );
  };

  // if (loading) {
  //   return <Loader />;
  // }

  const sendNotification = (patientName) => {
    console.log("Notification======" + patientName);
    // TODO: Implement with expo-notifications or Firebase Messaging
    // PushNotification.localNotification({
    //   channelId: "Grad Expert",
    //   title: "Patient Status Alert",
    //   message: `Patient ${patientName}'s status is now inactive. Please check.`,
    //   playSound: true,
    //   soundName: "default",
    // });
  };

  return (
    <Layout style={style.layout}>
      {/* <NotificationComponent /> */}
      <View style={style.headingView}>
        <View
          style={{
            width: "75%",
            backgroundColor: "transparent",
            marginBottom: "10%",
          }}
        >
          <Input
            placeholder="Enter 10-digit mobile number"
            style={style.searchInputBox}
            keyboardType="numeric"
            maxLength={10}
            accessoryLeft={SearchIcon}
            accessoryRight={search !== "" ? ClearIcon : ""}
            value={search}
            size="large"
            onChangeText={(nextValue) => {
              if (/^\d*$/.test(nextValue)) {
                searchText(nextValue.trim());
                setSearch(nextValue);
              } else {
                Alert.alert(
                  "Invalid Input",
                  "Please enter numeric values only."
                );
              }
            }}
          />
        </View>
        <View
          style={{
            width: "5%",
            backgroundColor: "transparent",
            marginLeft: 5,
            // top: '-4%',
          }}
        >
          <TouchableOpacity onPress={() => setVisible(true)}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "10%",
            backgroundColor: "transparent",
            marginLeft: 20,
            // top: '-4%',
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
            <SettingIcon />
          </TouchableOpacity>

          <Modal
            visible={visible}
            backdropStyle={style.backdrop}
            onBackdropPress={() => setVisible(false)}
            style={{ width: "65%" }}
          >
            <Card disabled={true} style={{ borderRadius: 15 }}>
              <RadioGroup
                selectedIndex={filter}
                onChange={(index) => {
                  onFilterChange(index);
                }}
              >
                <Radio>Parameters Provided</Radio>
                <Divider />
                <Radio>Parameters Not Provided</Radio>
                <Divider />
                <Radio>Dialysis: yes</Radio>
                <Divider />
                <Radio>Dialysis: no</Radio>
                <Divider />
                <Radio>No Filter</Radio>
              </RadioGroup>
            </Card>
          </Modal>
        </View>
      </View>

      <View style={style.btnContainer}>
        <Button
          size="medium"
          style={{
            ...style.button,
            marginTop: 15,
          }}
          onPress={() => navigation.navigate("PatientList")}
        >
          ADD PATIENT
        </Button>
        <Text
          category="h5"
          style={{
            color: theme["color-grey-100"],
            paddingLeft: "8%",
            paddingBottom: "5%",
          }}
        >
          List of assigned patients
        </Text>
        {loading ? (
          <View
            style={{
              margin: 10,
            }}
          >
            <Loader />
          </View>
        ) : (
          <FlatList
            data={patientList}
            keyExtractor={(item, index) => item.userId?._id || index.toString()}
            nestedScrollEnabled={true}
            renderItem={({ item }) => {
              const isStatusActive = !item.userId?.updateDate
                ? false
                : Math.abs(
                  moment(item.userId?.updateDate).diff(new Date(), "days")
                ) <= 3;

              return (
                <DashboardCard
                  navigation={navigation}
                  name={item.userId?.name}
                  profilePic={item.userId?.profilePic}
                  patientId={item.userId?._id}
                  gender={item?.userId?.gender}
                  status={isStatusActive}
                  style={{ flex: 1, margin: 8 }}
                />
              );
            }}
            ListEmptyComponent={<NoDataCard Data="No connected patients" />}
            numColumns={3}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: patientList.length > 0 ? "flex-start" : "center",
              alignItems: patientList.length > 0 ? "stretch" : "center",
            }}
            columnWrapperStyle={{
              justifyContent: "flex-start",
            }}
          />
        )}
      </View>
    </Layout>
  );
}
