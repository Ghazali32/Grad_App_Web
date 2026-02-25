import React from 'react';
import {useSelector} from 'react-redux';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  useTheme,
  Icon,
} from '@ui-kitten/components';
import {StyleSheet, ImageBackground, ScrollView} from 'react-native';
import backGround from '../assets/background.png';
import HeartRate from './components/HeartRate';
import StepCount from './components/StepCount';
import WalkRunDistance from './components/WalkRunDistance';
import Loader from '../common/Loader';
import ActiveEnergy from './components/ActiveEnergy';

const style = StyleSheet.create({
  layout: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
const HealthScreen = ({navigation}) => {
  const theme = useTheme();
  const loading = useSelector((state) => state.auth.loading);
  const stepCount = useSelector((state) => state.healthData.stepCount);
  const heartRate = useSelector((state) => state.healthData.heartRate);
  const distance = useSelector((state) => state.healthData.distance);
  const activeEnergy = useSelector((state) => state.healthData.activeEnergy);
  const startDate = useSelector((state) => state.healthData.startDate);
  const endDate = useSelector((state) => state.healthData.endDate);

  const BackIcon = (props) => (
    <Icon {...props} name="arrow-back" fill={theme['color-grey-100']} />
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
    <Layout style={style.layout}>
      <ImageBackground
        source={backGround}
        resizeMode="cover"
        style={style.image}>
        <TopNavigation
          alignment="center"
          style={{backgroundColor: 'transparent'}}
          accessoryLeft={BackAction}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeartRate
            heartRate={heartRate}
            startDate={startDate}
            endDate={endDate}
          />
          <StepCount
            steps={stepCount}
            startDate={startDate}
            endDate={endDate}
          />
          <WalkRunDistance
            distance={distance}
            startDate={startDate}
            endDate={endDate}
          />
          <ActiveEnergy
            activeEnergy={activeEnergy}
            startDate={startDate}
            endDate={endDate}
          />
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
};

export default HealthScreen;
