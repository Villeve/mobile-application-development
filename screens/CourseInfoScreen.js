import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import Comment from "../components/Comment"

class CourseInfoScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            courseInfo: this.props.navigation.state.params.courseInfo,
            comments: []
          };
    }
    async componentDidMount() {
        await this.fetchComments()
    }
    /*
    async fetchComments() {
        const token = await AsyncStorage.getItem("token");
        const headers = {
          Authorization: "Bearer " + token
        };
        axios({
          method: "GET",
          url: "https://mobile-app-backend-uva.herokuapp.com/api/comments/" + this.state.courseInfo._id,
          headers: headers
        })
          .then(res => {
            console.warn(res.data);
            this.setState({
              comments: res.data
            });
          })
          .catch(error => {
            console.warn(error);
            this.setState({
              comments: []
            });
            alert("Error While fetching data");
          });
    }
*/
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.userText}>Course Info Screen</Text>
        
        <Text>Name:</Text>
        <View style={styles.listItem}>
            <Text>{this.state.courseInfo.name}</Text>
        </View>
        <Text>Code:</Text>
        <View style={styles.listItem}>
            <Text>{this.state.courseInfo.code}</Text>
        </View>
        <Text>Teacher:</Text>
        <View style={styles.listItem}>
            <Text>{this.state.courseInfo.teacher}</Text>
        </View>
        <Text>Scope:</Text>
        <View style={styles.listItem}>
            <Text>{this.state.courseInfo.scope}</Text>
        </View>
        <Text>Objectives:</Text>
        <View style={styles.listItem}>
            <Text>{this.state.courseInfo.objectives}</Text>
        </View>
        <Comment courseId={this.state.courseInfo._id}/>
      </View>
    );
  }
}

export default CourseInfoScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
