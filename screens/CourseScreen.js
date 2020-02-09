import React from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  Button,
  ImageBackground
} from "react-native";
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';

class CourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      newCourse: {},
      role: "0",
      loading: true
    };
  }
  async componentDidMount() {
    await this.getCourses();
    await this.setUserRole();
  }
  async setUserRole() {
    const role = await AsyncStorage.getItem("role");
    this.setState({
      role: role
    });
  }
  async componentWillReceiveProps() {
    await this.getCourses();
  }
  async getCourses() {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token
      };
      const res = await axios({
        method: "GET",
        url:
          "https://mobile-app-backend-uva.herokuapp.com/api/courses/" +
          this.props.navigation.state.params.facultyId,
        headers: headers
      });
      this.setState({
        courses: res.data,
        loading: false
      });
    } catch (error) {
      console.warn(error);
      this.setState({
        courses: []
      });
      alert("Error While fetching data");
    }
  }
  async removeCourse(courseId) {
    this.setState({
      loading: true
    });
    const token = await AsyncStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token
    };
    axios({
      method: "DELETE",
      url:
        "https://mobile-app-backend-uva.herokuapp.com/api/courses/" + courseId,
      headers: headers
    })
      .then(res => {
        this.getCourses();
      })
      .catch(error => {
        console.warn(error);
        alert("Error While Removing Course");
      });
  }
  toggleNewCourseScreen(facultyId) {
    this.props.navigation.navigate("NewCourse", { facultyId: facultyId });
  }
  toggleCourseInfoScreen(courseInfo) {
    this.props.navigation.navigate("CourseInfo", { courseInfo: courseInfo });
  }

  render() {
    const { courses, role, loading } = this.state;

    return (
      <ImageBackground
        source={require("../assets/background6.jpg")}
        style={styles.container}
      >
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        {role === "1" && (
          <Button
            title="New Course"
            onPress={() =>
              this.toggleNewCourseScreen(
                this.props.navigation.state.params.facultyId
              )
            }
          />
        )}
        <FlatList
          data={courses}
          keyExtractor={item => item._id}
          renderItem={itemData => (
            <TouchableOpacity
              onPress={() => this.toggleCourseInfoScreen(itemData.item)}
            >
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>{itemData.item.name}</Text>
                {role === "1" && (
                  <TouchableOpacity style={styles.removeButton}>
                    <Text
                      style={styles.removeButtonText}
                      onPress={() => this.removeCourse(itemData.item._id)}
                    >
                      Remove
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </ImageBackground>
    );
  }
}

export default CourseScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlignVertical: "center",
    opacity: 0.8
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  removeButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    width: 100
  },
  removeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }
});
