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
    username: "",
    password: "",
    loading: false
  };

  onStateChange(state, value) {
    this.setState({
      [state]: value
    });
  }

  login() {
    const { username, password } = this.state;
    if(username && password) {
        const req = {
            email: username,
            password: password
          };
          this.setState({
              loading: true
          })
          axios.post("https://mobile-app-backend-uva.herokuapp.com/api/users/login", req).then(
            res => {
              this.setState({
                  loading: false,
                  username: "",
                  password: ""
              })
              console.log("LOGGING IN", res.data.name)
              AsyncStorage.setItem("token", res.data.token)
              AsyncStorage.setItem("name", res.data.name)
              AsyncStorage.setItem("role", res.data.role)
            .then(
                res => {
                    this.props.navigation.navigate("App");
                }
            ) 
            },
            err => {
              console.warn(err)
              this.setState({
                  loading: false,
                  password: ""
              })
              alert("Wrong username or password");
            }
          );
    }
    else {
        alert("Enter username and password")
    }
    
  }

  render() {
    const { username, password, loading } = this.state;
    return (
      <ImageBackground source={require('../assets/background4.jpg')} style={styles.container}>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Welcome to the great University App</Text>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Username"
              placeholderTextColor="#333"
              value={username}
              onChangeText={value => this.onStateChange("username", value)}
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
          <Text style={styles.registerText}
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
    fontSize: 28,
    fontWeight: "bold"
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
    color: "blue",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10
  }
});
