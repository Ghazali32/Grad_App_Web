import React from 'react';
import {Layout, Text, Card} from '@ui-kitten/components';
import {View, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    flex: 1,
    marginVertical: '0.8%',
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // elevation: 3,
    borderColor: 'transparent',
  },
  parameterDetailsContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    margin: 10,
  },
  Date: {
    color: '#49B585',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    // marginHorizontal: -10,
    marginVertical: -7,
    justifyContent: 'space-between',
  },
});

export default function NoDataCard({Data}) {
  const Row = ({children}) => <View style={style.row}>{children}</View>;

  return (
    <View style={style.card}>
      <Row>
        <Layout style={style.parameterDetailsContainer}>
          <Text category="h6" style={style.Date}>
            {Data}
          </Text>
        </Layout>
      </Row>
    </View>
  );
}
