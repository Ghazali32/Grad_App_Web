import {
  Layout,
  Text,
  Icon,
  useTheme,
  Card,
  Input,
} from "@ui-kitten/components";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import addPatientToConnected from "../../actions/addPatientToConnected";
import searchNonConnectedPatient from "../../actions/searchNonConnectedPatient";
import Loader from "../../common/Loader";
import { FlatList,Alert } from "react-native";

const style = StyleSheet.create({
  wrapper: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  headingView: {
    flexDirection: "row",
    backgroundColor: "#49B585",
    paddingLeft: "5%",
    paddingTop: "8%",
  },
  ContentView: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    position: "relative",
    height: "100%",
    paddingVertical: "5%",
  },
  row: {
    flexDirection: "row",
    marginVertical: 0,
    padding: 0,
  },
  textIconRow: {
    flexDirection: "row",
  },
  searchStr: {
    marginLeft: -15,
    fontSize: 16,
  },
  SearchCard: {
    borderColor: "grey",
    borderWidth: 0,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    marginTop: 50,
  },
  searchListContainer: {
    position: "relative",
    top: 20,
  },
  searchInputBox: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 10,
    borderColor: "transparent",
  },
  container: {
    marginBottom: 30,
    borderRadius: 10,
  },
});

export default function PatientList({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [noResult, setNoResult] = useState(false);

  const searchPatients = useSelector(
    (state) => state.searchNonConnectedPatient.patientList || []
  );
  const latitude = useSelector((state) => state.location.latitude);
  const longitude = useSelector((state) => state.location.longitude);

  // Debounce reference to avoid recreating the debounced function on each render
  const debouncedSearchRef = useRef(
    debounce((value) => {
      if (value.length == 10) {
        setIsLoading(true);
        setNoResult(false);
        dispatch(
          searchNonConnectedPatient({
            userNameAndMobileNumber: value,
            latitude,
            longitude,
          })
        )
          .then((response) => {
            if (response && response.length === 0) {
              setNoResult(true);
            }
          })
          .finally(() => setIsLoading(false));
      }
    }, 500)
  );

  useEffect(() => {
    return () => {
      dispatch({ type: "resetNonConnectedPatientList" });
      setShowSearch(false);
      setSearch("");
      debouncedSearchRef.current.cancel(); // Cancel debounced function on unmount
    };
  }, [dispatch]);

  const addPatient = async (item) => {
    setIsLoading(true); // Start the loader
    setSearch("");
    try {
      dispatch(
        addPatientToConnected({
          userId: item._id,
          navigation,
          setSelectedPatient,
        })
      );
      setSelectedPatient(item._id); // Update selected patient after adding
    } catch (error) {
      console.error("Error adding patient:", error); // Log any potential errors
    } finally {
      setIsLoading(false); // Stop the loader
    }
  };

  // Clear search input
  const clearFunction = useCallback(() => {
    setSearch("");
    setShowSearch(false);
    setNoResult(false);
  }, []);


  const handleSearchChange = (value) => {
    if (/[^0-9]/.test(value)) {
      Alert.alert("Invalid Input", "Please enter a 10-digit phone number.");
      return;
    }
    if (value.length > 10) {
      Alert.alert("Invalid Input", "Phone number cannot exceed 10 digits.");
      return;
    }
    setSearch(value);
  
    if (value.length ===10) {
      setShowSearch(true);
      debouncedSearchRef.current(value);
    } else {
      setShowSearch(false);
      setNoResult(false);
    }
  };
  
  const ClearIcon = (props) => (
    <Icon
      {...props}
      name="close-outline"
      fill={theme["color-black-100"]}
      onPress={clearFunction}
    />
  );

  const SearchIcon = (props) => (
    <Icon {...props} name="search-outline" fill={theme["color-black-100"]} />
  );

  return (
    <Layout style={style.layout}>
      <View style={style.headingView}>
        <View style={{ width: "85%" }}>
          <View style={style.container}>
            <Input
              placeholder="Enter Phone Number"
              style={style.searchInputBox}
              accessoryLeft={SearchIcon}
              keyboardType="numeric"
              accessoryRight={search !== "" ? ClearIcon : null}
              value={search}
              size="large"
              onChangeText={handleSearchChange}
            />
          </View>
        </View>
      </View>

      <View style={style.ContentView}>
        {(loading || isLoading) && <Loader />}
        {!isLoading && !loading && (
          // <ScrollView showsVerticalScrollIndicator={false}>
          <Layout style={style.ContentView}>
            <View style={{ bottom: 38 }}>
              <Layout style={style.searchListContainer}>
                {showSearch &&
                  (search?.length >= 3 ? (
                    searchPatients.length > 0 ? (
                      <FlatList
                        data={searchPatients}
                        keyExtractor={(item, index) =>
                          item._id || index.toString()
                        }
                        renderItem={({ item }) => (
                          <Card
                            hitSlop={{
                              top: 30,
                              bottom: 20,
                              left: 0,
                              right: 0,
                            }}
                            style={
                              item._id === selectedPatient
                                ? { backgroundColor: "#49B585" }
                                : { backgroundColor: "#fff" }
                            }
                            onPress={() => {
                              setSelectedPatient(item._id);
                              addPatient(item);
                            }}
                          >
                            <Text
                              style={
                                item._id === selectedPatient
                                  ? { color: "#fff" }
                                  : { color: "#000" }
                              }
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={
                                item._id === selectedPatient
                                  ? { color: "#fff" }
                                  : { color: "#000" }
                              }
                            >
                              {item.mobile}
                            </Text>
                          </Card>
                        )}
                      />
                    ) : noResult ? (
                      <Text
                        category="h5"
                        style={{ padding: 20, color: "#49B585" }}
                      >
                        No search result
                      </Text>
                    ) : (
                      <Text
                        category="h5"
                        style={{ padding: 20, color: "#49B585" }}
                      >
                        No search result
                      </Text>
                    )
                  ) : null)}
              </Layout>
            </View>
          </Layout>
          // </ScrollView>
        )}
      </View>
    </Layout>
  );
}
