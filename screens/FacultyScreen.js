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
            newFaculty: "",
            role: "0"
          };
    }
    async componentDidMount() {
        await this.getFaculties()
        await this.setUserRole()
    }
    async setUserRole() {
        const role = await AsyncStorage.getItem("role");
        this.setState({
            role: role
        })
    }
    async getFaculties() {
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
            this.getFaculties()
          })
          .catch(error => {
            alert("Error While Removing Faculty");
          });
      }
      toggleCourseScreen(facultyId) {
        this.props.navigation.navigate("Courses", {facultyId: facultyId});
    }

  render() {
    const { faculties, newFaculty, role } = this.state;
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
        {role === "1" && 
         <View style={styles.inputContainer}>
         <TextInput
           placeholder="Add new faculty"
           style={styles.input}
           onChangeText={textAdded}
           value={this.state.newFaculty}
         />
       </View>
      }
      <Button title="ADD" onPress={addFaculty}/>
        <FlatList
            data={faculties}
            keyExtractor={item => item._id}
            renderItem={itemData => (
            <TouchableOpacity onPress={() => this.toggleCourseScreen(itemData.item._id)}>
            <View style={styles.listItem}>
                <Text>{itemData.item.name}</Text>
                {role === "1" && 
                <TouchableOpacity style={styles.removeButton}>
                    <Text style={styles.removeButtonText} onPress={() => this.removeFaculty(itemData.item._id)}>
                      Remove
                    </Text>
                    </TouchableOpacity>
                }
            </View>
            </TouchableOpacity>
            )}
      />
      </View>
    );
  }
}

export default FacultyScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    height: "100%",
    //alignItems: "center",
    //justifyContent: "center"
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
    width: "100%",
    borderBottomColor: "black",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10
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
