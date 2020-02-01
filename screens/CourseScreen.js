import React from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button
} from "react-native";
import axios from "axios";

class CourseScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            newCourse: {},
            role: "0"
          };
    }
    async componentDidMount() {
      await this.getCourses()
      await this.setUserRole()
    }
    async setUserRole() {
      const role = await AsyncStorage.getItem("role");
      this.setState({
          role: role
      })
  }
    async componentWillReceiveProps() {
      await this.getCourses()
    }
    async getCourses() {
      try {
        const token = await AsyncStorage.getItem("token");
        const headers = {
          Authorization: "Bearer " + token
        };
        const res = await axios({
          method: "GET",
          url: "https://mobile-app-backend-uva.herokuapp.com/api/courses/" + this.props.navigation.state.params.facultyId,
          headers: headers
        })

            this.setState({
              courses: res.data
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
        const token = await AsyncStorage.getItem("token");
        const headers = {
          Authorization: "Bearer " + token
        };
        axios({
          method: "DELETE",
          url: "https://mobile-app-backend-uva.herokuapp.com/api/courses/" + courseId,
          headers: headers
        })
        .then(res => {
            this.getCourses()
          })
          .catch(error => {
            console.warn(error);
            alert("Error While Removing Course");
          });
      }
      toggleNewCourseScreen(facultyId) {
        this.props.navigation.navigate("NewCourse", {facultyId: facultyId});
     }
     toggleCourseInfoScreen(courseInfo) {
      this.props.navigation.navigate("CourseInfo", {courseInfo: courseInfo});
     }

  render() {
    const { courses, newCourse, role } = this.state;
    
    return (
      <View style={styles.container}>
        <Text style={styles.userText}>Courses</Text>
        <FlatList
            data={courses}
            keyExtractor={item => item._id}
            renderItem={itemData => (
            <TouchableOpacity onPress={() => this.toggleCourseInfoScreen(itemData.item)}>
            <View style={styles.listItem}>
                <Text>{itemData.item.name}</Text>
                {role === "1" && <Button title="Remove" onPress={() => this.removeCourse(itemData.item._id)}/>}
            </View>
            </TouchableOpacity>
            )}
      />
      {role === "1" && <Button title="New Course" onPress={() => this.toggleNewCourseScreen(this.props.navigation.state.params.facultyId)}/>}
      </View>
    );
  }
}

export default CourseScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  dashboardWrapper: {
    textAlign: "center"
  },
  userText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlignVertical: "center"
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: {
    width: "80%",
    borderBottomColor: "black",
    borderWidth: 1,
    padding: 10
  }
});
