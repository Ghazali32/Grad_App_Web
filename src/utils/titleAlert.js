import {Alert} from 'react-native';

const titleAlert = ({title = 'Error', message}) => {
  Alert.alert(title, message, [{text: 'OK'}]);
};

export default titleAlert;
