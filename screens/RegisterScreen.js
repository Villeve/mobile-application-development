import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import axios from "axios";

class RegisterScreen extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    loading: false
  };

  onStateChange(state, value) {
    this.setState({
      [state]: value
    });
  }

  register() {
    const { username, email, password, password2 } = this.state;
    if(username && password) {
        const req = {
            name: username,
            email: email,
            password: password,
            password2: password2
          };
          this.setState({
              loading: true
          })
          //https://reqres.in/api/login
          axios.post("https://mobile-app-backend-uva.herokuapp.com/api/users/register", req).then(
            res => {
              console.warn(res)
              this.setState({
                  loading: false
              })
              AsyncStorage.setItem("token", res.data.token)
              this.props.navigation.navigate("Auth");
              /*
            .then(
                res => {
                    alert("Account created successfully")
                    this.props.navigation.navigate("Auth");
                }
            )
            */
              //console.warn(res);
              
            },
            err => {
              console.warn(err)
              this.setState({
                  loading: false
              })
              alert("Error While Creating Account - Try Again");
            }
          );
    }
    else {
        alert("Fill Every Field")
    }
    
  }

  render() {
    const { username, email, password, password2, loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.formWrapper}>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter username"
              placeholderTextColor="#333"
              value={username}
              onChangeText={value => this.onStateChange("username", value)}
            />
          </View>
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
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Re-enter Password"
              placeholderTextColor="#333"
              secureTextEntry={true}
              value={password2}
              onChangeText={value => this.onStateChange("password2", value)}
            />
          </View>
          <TouchableOpacity
          activeOpacity={0.8}
            style={{
                ...styles.button,
                backgroundColor: loading ? "#ddd" : "blue"
            }}
            onPress={() => this.register()}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Loading..." : "Register"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RegisterScreen;

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
  button: {
    paddingVertical: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  }
});
