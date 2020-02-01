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

class FacultyScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            faculties: [],
            newFaculty: ""
          };
    }
    async componentDidMount() {
        await this.getFaculties()
    }
    async getFaculties() {
        console.log("getting faculties...")
        const token = await AsyncStorage.getItem("token");
        const headers = {
          Authorization: "Bearer " + token
        };
        axios({
          method: "GET",
          url: "https://mobile-app-backend-uva.herokuapp.com/api/faculties/" + this.props.navigation.state.params.universityId,
          headers: headers
        })
          .then(res => {
            console.warn(res.data);
            this.setState({
              faculties: res.data
            });
          })
          .catch(error => {
            console.warn(error);
            this.setState({
              faculties: []
            });
            alert("Error While fetching data");
          });
      }
      async removeFaculty(facultyId) {
        const token = await AsyncStorage.getItem("token");
        const headers = {
          Authorization: "Bearer " + token
        };
        axios({
          method: "DELETE",
          url: "https://mobile-app-backend-uva.herokuapp.com/api/faculties/" + facultyId,
          headers: headers
        })
        .then(res => {
            console.warn(res.data);
            this.getFaculties()
          })
          .catch(error => {
            console.warn(error);
            alert("Error While Removing Faculty");
          });
      }
      toggleCourseScreen(facultyId) {
        console.log(facultyId)
        this.props.navigation.navigate("Courses", {facultyId: facultyId});
    }

  render() {
    const { faculties, newFaculty } = this.state;
    const textAdded = text =>
        this.setState({
            newFaculty: text
    });
    const addFaculty = async () => {
        const token = await AsyncStorage.getItem("token");
        const headers = {
        Authorization: "Bearer " + token
        };
        const req = {
            name: newFaculty,
            university: this.props.navigation.state.params.universityId
          };
        axios({
        method: "POST",
        url: "https://mobile-app-backend-uva.herokuapp.com/api/faculties", 
        data: req,
        headers: headers
        })
        .then(res => {
            console.warn(res.data);
            this.getFaculties()
        })
        .catch(error => {
            console.warn(error);
            alert("Error while adding new faculty");
        });
    }
    return (
      <View style={styles.container}>
        <Text style={styles.userText}>Faculties</Text>
        <FlatList
            data={faculties}
            renderItem={itemData => (
            <TouchableOpacity onPress={() => this.toggleCourseScreen(itemData.item._id)}>
            <View style={styles.listItem}>
                <Text>{itemData.item.name}</Text>
                <Button title="Remove" onPress={() => this.removeFaculty(itemData.item._id)}/>
            </View>
            </TouchableOpacity>
            )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add new faculty"
          style={styles.input}
          onChangeText={textAdded}
          value={this.state.newFaculty}
        />
        <Button title="ADD" onPress={addFaculty}/>
      </View>
      </View>
    );
  }
}

export default FacultyScreen;

const styles = StyleSheet.create({
  container: {
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
