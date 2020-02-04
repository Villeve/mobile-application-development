import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

class LoadingScreen extends React.Component {
  constructor() {
    super();
    this.checkToken();
  }

  checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      this.props.navigation.navigate("App");
    } else {
      this.props.navigation.navigate("Auth");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
