import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Text, useTheme} from '@ui-kitten/components';
import moment from 'moment';

const HeartRate = ({heartRate, startDate, endDate}) => {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const style = StyleSheet.create({
    containerView: {
      borderColor: 'black',
      borderWidth: 1,
      marginHorizontal: 2,
    },
  });

  let date = [];
  let min = [];
  let max = [];

  for (data of heartRate) {
    if (date.length == 0) {
      date.push(moment(data.startDate).format('ddd'));
      min.push(data.value);
      max.push(data.value);
    } else {
      let index = date.indexOf(moment(data.startDate).format('ddd'));
      if (index == -1) {
        date.push(moment(data.startDate).format('ddd'));
        min.push(data.value);
        max.push(data.value);
      } else {
        if (min[index] > data.value) {
          min[index] = data.value;
        } else if (max[index] < data.value) {
          max[index] = data.value;
        }
      }
    }
  }
  const chartConfig = {
    decimalPlaces: 0,
    backgroundGradientFromOpacity: 0,
    fillShadowGradient: theme['color-green-100'],
    fillShadowGradientOpacity: 1,
    backgroundGradientToOpacity: 0,
    color: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
    propsForBackgroundLines: {
      strokeWidth: 0.3,
    },
  };

  let data = {
    labels: date,
    datasets: [
      {
        data: max.length > 0 ? max : [null],
      },
      {
        data: min.length > 0 ? min : [0.1],
      },
    ],
  };
  console.log(data, 'data');
  return (
    <View style={{marginBottom: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text category="h5" style={{fontWeight: 'bold'}}>
          Heart Rate
        </Text>
        <Text category="h5" style={{fontWeight: 'bold'}}>
          <Text
            category="h5"
            style={{
              fontWeight: 'bold',
              color: '#D4356F',
            }}>
            {heartRate.length > 0
              ? `Min ${Math.min.apply(null, min)} Max ${Math.max.apply(
                  null,
                  max,
                )}`
              : 'No Data'}
          </Text>
          {heartRate.length > 0 ? 'bpm' : ''}
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
        <LineChart
          data={data}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
    </View>
  );
};

export default HeartRate;
