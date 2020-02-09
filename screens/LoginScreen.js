import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground
} from "react-native";
import axios from "axios";

class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false
  };

  onStateChange(state, value) {
    this.setState({
      [state]: value
    });
  }

  login() {
    const { email, password } = this.state;
    if (email && password) {
      const req = {
        email: email,
        password: password
      };
      this.setState({
        loading: true
      });
      axios
        .post(
          "https://mobile-app-backend-uva.herokuapp.com/api/users/login",
          req
        )
        .then(
          res => {
            this.setState({
              loading: false,
              email: "",
              password: ""
            });
            var role = res.data.role;
            AsyncStorage.setItem("token", res.data.token);
            AsyncStorage.setItem("name", res.data.name);
            AsyncStorage.setItem("role", role).then(res => {
              this.props.navigation.navigate("App");
            });
          },
          err => {
            console.warn(err);
            this.setState({
              loading: false,
              password: ""
            });
            alert("Wrong email or password");
          }
        );
    } else {
      alert("Enter email and password");
    }
  }

  render() {
    const { email, password, loading } = this.state;
    return (
      <ImageBackground
        source={require("../assets/brickwall.jpg")}
        style={styles.container}
      >
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Welcome to the great University App</Text>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Email"
              placeholderTextColor="#333"
              value={email}
              onChangeText={value => this.onStateChange("email", value)}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Password"
              placeholderTextColor="#333"
              secureTextEntry={true}
              value={password}
              onChangeText={value => this.onStateChange("password", value)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#ddd" : "blue"
            }}
            onPress={() => this.login()}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Loading..." : "Sign in"}
            </Text>
          </TouchableOpacity>
          <Text
            style={styles.registerText}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            Click to Register
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  formWrapper: {
    width: "80%"
  },
  formRow: {
    marginBottom: 10
  },
  textInput: {
    backgroundColor: "#ddd",
    height: 40,
    paddingHorizontal: 10
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 38,
    fontWeight: "bold",
    color: "yellow"
  },
  button: {
    paddingVertical: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  },
  registerText: {
    textAlign: "center",
    color: "yellow",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10
  }
});