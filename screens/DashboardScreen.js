import React from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
  ImageBackground,
  StatusBar
} from "react-native";
import axios from "axios";

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      universities: [],
      newUniversity: "",
      role: this.props.navigation.state.params.role
    };
  }

  async componentDidMount() {
    await this.getUniversities();
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
    const { universities, newUniversity, role } = this.state;
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
          this.setState({
            newUniversity: ""
          });
          this.getUniversities();
        })
        .catch(error => {
          console.warn(error);
          alert("Error while adding new university");
        });
    };

    return (
      <ImageBackground source={require('../assets/uni2.jpg')} style={styles.container}>
        <View style={styles.dashboardWrapper}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText} onPress={() => this.logout()}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
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
                <Text style={styles.listItemText}>{itemData.item.name}</Text>
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
      </ImageBackground>
    );
  }
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  dashboardWrapper: {
    padding: 10,
    justifyContent: "space-between",
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    width: 100
  },
  logoutButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },
  listItem: {
    opacity: 0.75,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlignVertical: "center",
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "bold"
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
        padding: 10,
        backgroundColor: "white",
        opacity: 0.8
        
    },
  newUniButton: {
    
  },
  removeButton: {
      color: "red"
  }
});
