import { Avatar, Text, useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import logo from "../../assets/profile.png";
import React from "react";

const style = StyleSheet.create({
    avatar: {
        marginHorizontal: 8,
        height: 140,
        width: 140,
        resizeMode: 'cover',
    },
    circle: {
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});
 
const ImageItem = ({ url, caption, size, vertiTicalMargin }) => {
    const theme = useTheme();

    return (
      <View alignItems="center">
        <Avatar
          style={{
            ...style.avatar,
            width: size,
            height: size,
            marginVertical: vertiTicalMargin,
          }}
          source={ url ? {uri: url} : (logo)}
        />
      </View>
    )
};

export default ImageItem;
