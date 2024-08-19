import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

function Taskbar(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <Image
          source={require("../assets/lge_logo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  rect: {
    width: 375,
    height: 51,
    backgroundColor: "rgba(176,218,174,0.06)",
    marginTop: 41,
    alignSelf: "center"
  },
  image: {
    width: 168,
    height: 39,
    marginTop: 4,
    marginLeft: 104
  }
});

export default Taskbar;
