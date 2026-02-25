import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RadioForm } from 'react-native-simple-radio-button';
import {
  Layout,
  Text,
  Card,
  Input,
  useTheme,
  Button,
  Icon,
} from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';

import UploadButton from '../../assets/uplad.png';
import Loader from '../../common/Loader';
import titleAlert from '../../utils/titleAlert';
import saveParameter1 from '../../actions/saveParameter1';
import NodataCard from '../../common/NodataCard';
import getParameter2ById from '../../actions/getParameter2ById';
import checkUserIsApprove from '../../actions/checkUserIsApprove';

const style = StyleSheet.create({
  layout: { flex: 1 },
  ContentView: { margin: '4%' },
  ParameterBox: {
    backgroundColor: 'transparent',
    marginVertical: '1.4%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#49B585',
  },
  textColor: {
    color: '#49B585',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: '2%',
  },
  inputContainer: { marginVertical: '2%' },
  ViewTextLeft: {
    color: '#49B585',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: '3%',
  },
  ViewTextRight: {
    color: '#032F34',
    fontSize: 17,
    marginTop: '3%',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  ViewTextRightt: {
    fontSize: 18,
    marginTop: '3%',
  },
  kftInput: { marginVertical: 5 },
  icon: { width: 29, height: 29 },
});

export default function OneTimeParameter({ navigation, route }) {
  const { date, patientId } = route.params;
  const theme = useTheme();
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const loading = useSelector(state => state.auth.loading);
  const checkUserIsApproved = useSelector(
    state => state.auth.checkUserIsApprove,
  );

  const parameter1Details = useSelector(
    state => state.patientParameterDetails.form1Details || {},
  );

  const parameter2Details = useSelector(
    state => state.patientParameterDetails.form2Details || [],
  );

  const [urineSample, setUrineSample] = useState('');
  const [dialysisChecked, setDialysisChecked] = useState(1);
  const [kft, setKft] = useState(1);
  const [creatinine, setCreatinine] = useState('');
  const [sodium, setSodium] = useState('');
  const [potassium, setPotassium] = useState('');
  const [urea, setUrea] = useState('');
  const [hemoglobin, setHemoglobin] = useState('');
  const [saveBtnState, setSaveBtnState] = useState(true);
  const [chooseApi, setChooseApi] = useState('create');
  const [uploadFile, setUploadFile] = useState('');

  const dialysis = [
    { label: 'Yes', value: 0 },
    { label: 'No', value: 1 },
  ];

  const KFT = [
    { label: 'Yes', value: 0 },
    { label: 'No', value: 1 },
  ];

  const EditIcon = props => (
    <Icon
      {...props}
      name="edit-2-outline"
      fill={theme['color-green-100']}
      style={style.icon}
    />
  );

  const UploadIcon = props => (
    <Image {...props} style={{ marginLeft: '5%' }} source={UploadButton} />
  );

  useEffect(() => {
    dispatch(checkUserIsApprove({ userId: patientId }));
  }, []);

  useEffect(() => {
    if (parameter1Details?.urineOutputs) {
      setUrineSample(parameter1Details.urineOutputs);
      setDialysisChecked(
        parameter1Details.goForDialysisToday === 'yes' ? 0 : 1,
      );
      setKft(parameter1Details.kFTDone === 'yes' ? 0 : 1);
      setCreatinine(parameter1Details.kFTValue?.creatinine || '');
      setSodium(parameter1Details.kFTValue?.sodium || '');
      setPotassium(parameter1Details.kFTValue?.potassium || '');
      setUrea(parameter1Details.kFTValue?.urea || '');
      setHemoglobin(parameter1Details.kFTValue?.hemoglobin || '');
      setUploadFile(parameter1Details.uploadFile || '');
      setChooseApi('update');
    }
  }, [parameter1Details]);

  const onSaveClick = () => {
    if (checkUserIsApproved === 'not-Approved') {
      return Alert.alert(
        'Error',
        'This patient is not approved. Cannot add or edit parameters',
      );
    }

    const numberFormat = /^[0-9]*\.?[0-9]+$/;

    if (!urineSample.trim().match(numberFormat)) {
      return titleAlert({ message: 'Invalid urine sample value' });
    }

    if (parameter2Details.length === 0) {
      return titleAlert({
        message: 'Please add at least one therapy parameter.',
      });
    }

    dispatch(
      saveParameter1({
        urineOutputs: urineSample.trim(),
        goForDialysisToday: dialysisChecked === 1 ? 'no' : 'yes',
        kFTDone: kft === 1 ? 'no' : 'yes',
        kFTValue: {
          creatinine,
          sodium,
          potassium,
          urea,
          hemoglobin,
        },
        day: date,
        userId: patientId,
        parameter1Id: parameter1Details?._id,
        uploadFile,
        chooseApi,
        navigation,
        setSaveBtnState,
      }),
    );
  };

  if (loading) return <Loader />;

  return (
    <Layout style={style.layout}>
      <ScrollView>
        <Layout style={style.ContentView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text category="h5">Enter Parameters</Text>
            <Button disabled={saveBtnState} onPress={onSaveClick}>
              Save
            </Button>
          </View>

          <Card style={style.ParameterBox}>
            <Input
              label="24 hrs Urine Output"
              keyboardType="numeric"
              value={urineSample}
              onChangeText={v => {
                setUrineSample(v);
                setSaveBtnState(false);
              }}
            />

            <RadioForm
              radio_props={dialysis}
              initial={dialysisChecked}
              onPress={v => {
                setDialysisChecked(v);
                setSaveBtnState(false);
              }}
            />

            <RadioForm
              radio_props={KFT}
              initial={kft}
              onPress={v => {
                setKft(v);
                setSaveBtnState(false);
              }}
            />

            <Button
              accessoryRight={UploadIcon}
              onPress={() =>
                titleAlert({
                  message: 'File upload feature is currently disabled',
                })
              }>
              Upload Reports
            </Button>
          </Card>

          {parameter2Details.length > 0 ? (
            parameter2Details.map((data, index) => (
              <Card key={index} style={style.ParameterBox}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(getParameter2ById({ parameter2Id: data._id }));
                    navigation.navigate('MultipleTimeParameter', {
                      patientId,
                      date,
                      type: 'update',
                    });
                  }}>
                  <EditIcon />
                </TouchableOpacity>
              </Card>
            ))
          ) : (
            <NodataCard Data="No Grad Therapy added" />
          )}

          <Button
            onPress={() =>
              navigation.navigate('MultipleTimeParameter', {
                patientId,
                date,
                type: 'create',
              })
            }>
            Add Therapy Parameter
          </Button>
        </Layout>
      </ScrollView>
    </Layout>
  );
}
