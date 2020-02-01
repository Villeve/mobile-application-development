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
        super(props)
        this.state = {
            universities: [],
            newUniversity: ""
          };
    }
  

  async componentDidMount() {
    await this.getUniversities()
    const role = await AsyncStorage.getItem("role");
    console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWW", role)
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
      url: "https://mobile-app-backend-uva.herokuapp.com/api/universities/" + universityId,
      headers: headers
    })
    .then(res => {
        console.warn(res.data);
        this.getUniversities()
      })
      .catch(error => {
        console.warn(error);
        alert("Error While Removing University");
      });
  }
  toggleFacultiesScreen(universityId) {
    this.props.navigation.navigate("Faculties", {universityId: universityId});
  }
  logout() {
    AsyncStorage.removeItem("token").then(res => {
      this.props.navigation.navigate("Auth");
    });
  }

  render() {
    const { universities, newUniversity } = this.state;
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
            this.getUniversities()
        })
        .catch(error => {
            console.warn(error);
            alert("Error while adding new university");
        });
    }
    return (
      <View style={styles.container}>
        <View style={styles.dashboardWrapper}>
          <Text style={styles.userText}>Hey user</Text>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText} onPress={() => this.logout()}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userText}>Universities</Text>
        <FlatList
            data={universities}
            renderItem={itemData => (
            <TouchableOpacity onPress={() => this.toggleFacultiesScreen(itemData.item._id)}>
            <View style={styles.listItem}>
                <Text>{itemData.item.name}</Text>
                <Button title="Remove" onPress={() => this.removeUniversity(itemData.item._id)}/>
            </View>
            </TouchableOpacity>
            )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add new university"
          style={styles.input}
          onChangeText={textAdded}
          value={this.state.newUniversity}
        />
        <Button title="ADD" onPress={addUniversity}/>
      </View>
      </View>
    );
  }
}

export default DashboardScreen;

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
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    width: 100,
    alignSelf: "center"
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
    alignItems: "center"
  },
  input: {
    width: "80%",
    borderBottomColor: "black",
    borderWidth: 1,
    padding: 10
  },
});
