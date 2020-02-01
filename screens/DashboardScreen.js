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

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      universities: [],
      newUniversity: "",
      name: "",
      role: "0"
    };
  }

  async componentDidMount() {
    await this.getUniversities();
    await this.setUserNameAndType();
  }

  async setUserNameAndType() {
    const role = await AsyncStorage.getItem("role");
    const name = await AsyncStorage.getItem("name");
    console.log("NAME FROM STORAGE:", name);
    this.setState({
      role: role,
      name: name
    });
  }
  async getUniversities() {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token
    };
    axios({
      method: "GET",
      url: "https://mobile-app-backend-uva.herokuapp.com/api/universities",
      headers: headers
    })
      .then(res => {
        this.setState({
          universities: res.data
        });
      })
      .catch(error => {
        console.warn(error);
        this.setState({
          universities: {}
        });
        alert("Error While fetching data");
      });
  }
  async removeUniversity(universityId) {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token
    };
    axios({
      method: "DELETE",
      url:
        "https://mobile-app-backend-uva.herokuapp.com/api/universities/" +
        universityId,
      headers: headers
    })
      .then(res => {
        this.getUniversities();
      })
      .catch(error => {
        console.warn(error);
        alert("Error While Removing University");
      });
  }
  toggleFacultiesScreen(universityId) {
    this.props.navigation.navigate("Faculties", { universityId: universityId });
  }
  async logout() {
    try {
      await AsyncStorage.multiRemove(["token", "name", "role"]);
      this.props.navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { universities, newUniversity, name, role } = this.state;
    const textAdded = text =>
      this.setState({
        newUniversity: text
      });
    const addUniversity = async () => {
      const token = await AsyncStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token
      };
      const req = {
        name: newUniversity
      };
      axios({
        method: "POST",
        url: "https://mobile-app-backend-uva.herokuapp.com/api/universities",
        data: req,
        headers: headers
      })
        .then(res => {
          console.warn(res.data);
          this.getUniversities();
        })
        .catch(error => {
          console.warn(error);
          alert("Error while adding new university");
        });
    };
    return (
      <View style={styles.container}>
        <View style={styles.dashboardWrapper}>
          <Text style={styles.userText}>Hey {name}</Text>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText} onPress={() => this.logout()}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userText}>Universities</Text>
        {role === "1" && (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add new university"
              style={styles.input}
              onChangeText={textAdded}
              value={this.state.newUniversity}
            />
                <Button style={styles.newUniButton} title="ADD" onPress={addUniversity} />
          </View>
        )}
        <FlatList
          data={universities}
          keyExtractor={item => item._id}
          renderItem={itemData => (
            <TouchableOpacity
              onPress={() => this.toggleFacultiesScreen(itemData.item._id)}
            >
              <View style={styles.listItem}>
                <Text>{itemData.item.name}</Text>
                {role === "1" && (
                    <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText} onPress={() => this.removeUniversity(itemData.item._id)}>
                      Remove
                    </Text>
                    </TouchableOpacity>
                  
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    height: "100%",
    //alignItems: "center",
    //justifyContent: "center"
  },
  dashboardWrapper: {
    //textAlign: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  userText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    width: 100,
    //alignSelf: "center"
  },
  logoutButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
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
    alignItems: "center",
    padding: 10
    },
    input: {
        width: "80%",
        borderBottomColor: "black",
        borderWidth: 1,
        padding: 10
    },
  newUniButton: {
    
  },
  removeButton: {
      color: "red"
  }
});
