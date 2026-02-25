import React from 'react';
import {Layout, Text, Card, Icon, useTheme} from '@ui-kitten/components';
import {View, StyleSheet} from 'react-native';
import moment from 'moment';

const style = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    flex: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginVertical: 10,
    justifyContent: 'center',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -10,
    marginVertical: -7,
  },
  layout: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginHorizontal: 19,
    flexShrink: 1,
  },
  text: {
    color: '#49B585',
    fontWeight: 'bold',
  },
  textIconRow: {
    flexDirection: 'row',
  },
});
const Row = ({children}) => <View style={style.row}>{children}</View>;
const TextIconRow = ({children}) => (
  <View style={style.textIconRow}>{children}</View>
);
export default function NotificationCard({
  firstName,
  lastName,
  appointmentDate,
  appointmentTime,
}) {
  const theme = useTheme();
  const date = moment(new Date(appointmentDate * 1000)).format('DD MMM YYYY');
  const time = moment(new Date(appointmentTime * 1000)).format('hh:mm a');

  const CalendarIcon = (props) => (
    <Icon
      {...props}
      name="calendar"
      fill={theme['color-grey-100']}
      height={20}
      width={20}
    />
  );
  const ClockIcon = (props) => (
    <Icon
      {...props}
      name="clock-outline"
      fill={theme['color-grey-100']}
      height={20}
      width={20}
    />
  );

  return (
    <Card style={style.card}>
      <Row>
        <Layout style={style.layout}>
          <Text category="h6" style={style.text}>
            Dr. {firstName} {lastName}
          </Text>
          <TextIconRow>
            <TextIconRow>
              <CalendarIcon />
              <Text>{date}</Text>
            </TextIconRow>
            <TextIconRow>
              <ClockIcon style={{marginLeft: 10}} />
              <Text>{time}</Text>
            </TextIconRow>
          </TextIconRow>
        </Layout>
      </Row>
    </Card>
  );
}
