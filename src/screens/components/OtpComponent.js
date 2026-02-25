import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ onOTPChange }) => {
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp);
    onOTPChange(newOtp.join(''));

    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    alignSelf: 'center',
  },
  input: {
    width: 45,
    height: 60,
    borderWidth: 1,
    borderColor: '#0c8c96',
    borderRadius: 7,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default OTPInput;
