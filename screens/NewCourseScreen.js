import React from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  ImageBackground
} from "react-native";
import axios from "axios";

class NewCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      facultyId: this.props.navigation.state.params.facultyId,
      code: "",
      scope: "",
      teacher: "",
      objectives: ""
    };
  }
  onStateChange(state, value) {
    this.setState({
      [state]: value
    });
  }
  async create() {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token
    };
    const { name, facultyId, code, scope, teacher, objectives } = this.state;
    if (name && facultyId && code && scope && teacher && objectives) {
      const req = {
        name: name,
        facultyId: facultyId,
        code: code,
        scope: scope,
        teacher: teacher,
        objectives: objectives
      };
      axios({
        method: "POST",
        url: "https://mobile-app-backend-uva.herokuapp.com/api/courses/",
        data: req,
        headers: headers
      })
        .then(res => {
          this.props.navigation.navigate("Courses", { facultyId: facultyId });
        })
        .catch(error => {
          console.warn(error);
          alert("Error while creating new course");
        });
    } else {
      alert("Fill Every Field");
    }
  }

  render() {
    const { name, code, scope, teacher, objectives } = this.state;

    return (
      <ImageBackground
        source={require("../assets/background6.jpg")}
        style={styles.container}
      >
        <View style={styles.formWrapper}>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Course name"
              placeholderTextColor="#333"
              value={name}
              onChangeText={value => this.onStateChange("name", value)}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder='Course code eg. "ICAT3310"'
              placeholderTextColor="#333"
              value={code}
              onChangeText={value => this.onStateChange("code", value)}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder='Course Scope eg. "5OP"'
              placeholderTextColor="#333"
              value={scope}
              onChangeText={value => this.onStateChange("scope", value)}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Teacher's name"
              placeholderTextColor="#333"
              value={teacher}
              onChangeText={value => this.onStateChange("teacher", value)}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Course description"
              placeholderTextColor="#333"
              value={objectives}
              onChangeText={value => this.onStateChange("objectives", value)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.button,
              backgroundColor: "blue"
            }}
          >
            <Text onPress={() => this.create()} style={styles.buttonText}>
              Create New Course
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default NewCourseScreen;

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
