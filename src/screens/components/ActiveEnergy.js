import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {Text} from '@ui-kitten/components';
import moment from 'moment';

const ActiveEnergy = ({activeEnergy, startDate, endDate}) => {
  const style = StyleSheet.create({
    containerView: {
      borderColor: 'black',
      borderWidth: 1,
      marginHorizontal: 2,
    },
  });
  daysToShow = [];
  dataToShow = [];

  const dataMap = new Map();
  for (let i = 0; i < activeEnergy.length; i++) {
    if (dataMap.has(moment(activeEnergy[i].startDate).format('ddd'))) {
      var value = dataMap.get(moment(activeEnergy[i].startDate).format('ddd'));
      value += activeEnergy[i].value;
      dataMap.set(moment(activeEnergy[i].startDate).format('ddd'), value);
    } else {
      dataMap.set(
        moment(activeEnergy[i].startDate).format('ddd'),
        activeEnergy[i].value,
      );
    }
  }

  for (let [key, value] of dataMap) {
    daysToShow.push(key);
    dataToShow.push(Math.round(value));
  }

  const screenWidth = Dimensions.get('window').width;
  const data = {
    labels: daysToShow,
    datasets: [
      {
        data: activeEnergy.length > 0 ? dataToShow : [null],
        colors: [
          (opacity = 1) => `#1466A8`,
          (opacity = 1) => `#1466A8`,
          (opacity = 1) => `#1466A8`,
          (opacity = 1) => `#1466A8`,
          (opacity = 1) => `#1466A8`,
          (opacity = 1) => `#1466A8`,
          (opacity = 1) => `#1466A8`,
          (opacity = 1) => `#1466A8`,
          (opacity = 1) => `#1466A8`,
        ],
      },
    ],
  };
  const chartConfig = {
    decimalPlaces: 0,
    backgroundGradientFromOpacity: 0,
    fillShadowGradient: 'blue',
    fillShadowGradientOpacity: 1,
    backgroundGradientToOpacity: 0,
    color: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 0, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
    propsForBackgroundLines: {
      strokeWidth: 0.3,
      strokeDasharray: '0',
    },
  };

  let totalData = dataToShow.reduce((a, b) => Math.round(a + b), 0);
  let averageData = Math.round(totalData / daysToShow.length);

  return (
    <View style={{marginVertical: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text category="h5" style={{fontWeight: 'bold'}}>
          Total Active Energy
        </Text>

        <Text category="h5" style={{fontWeight: 'bold'}}>
          <Text category="h5" style={{fontWeight: 'bold', color: '#D4356F'}}>
            {activeEnergy.length > 0 ? averageData : 'No Data'}
          </Text>
          <Text>{'  '}</Text>
          {activeEnergy.length > 0 ? ' kcal' : ''}
        </Text>
      </View>
      <View style={style.containerView}>
        <Text style={{alignSelf: 'center'}}>
          {new Date(startDate).getDay() > 10 && new Date(endDate).getDay() > 10
            ? `${moment(startDate).format('DD')} - ${moment(endDate).format(
                'DD MMM YYYY',
              )}`
            : new Date(startDate).getDay() > 10
            ? `${moment(startDate).format('DD')} - ${moment(endDate).format(
                'D MMM YYYY',
              )}`
            : new Date(endDate).getDay() > 10
            ? `${moment(startDate).format('D')} - ${moment(endDate).format(
                'DD MMM YYYY',
              )}`
            : `${moment(startDate).format('D')} - ${moment(endDate).format(
                'D MMM YYYY',
              )}`}
        </Text>
        <BarChart
          //   style={graphStyle}
          data={data}
          width={screenWidth - 20}
          height={220}
          // yAxisLabel="$"
          showBarTops={false}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          withHorizontalLabels="abc"
          showValuesOnTopOfBars={true}
          withCustomBarColorFromData={true}
          flatColor={true}
          bezier
          style={{
            marginVertical: 8,
            marginHorizontal: -15,
          }}
        />
      </View>
    </View>
  );
};

export default ActiveEnergy;
