import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView
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

  render() {
    
    return (
      <ImageBackground source={require('../assets/background7.jpg')} style={styles.container}>
          <ScrollView>

          
          <View style={styles.infoContainer}>
        <Text style={styles.itemHeader}>Name:</Text>
        <View style={styles.listItem}>
            <Text>{this.state.courseInfo.name}</Text>
        </View>
        <Text style={styles.itemHeader}>Code:</Text>
        <View style={styles.listItem}>
            <Text>{this.state.courseInfo.code}</Text>
        </View>
        <Text style={styles.itemHeader}>Teacher:</Text>
        <View style={styles.listItem}>
            <Text>{this.state.courseInfo.teacher}</Text>
        </View>
        <Text style={styles.itemHeader}>Scope:</Text>
        <View style={styles.listItem}>
            <Text>{this.state.courseInfo.scope}</Text>
        </View>
        <Text style={styles.itemHeader}>Objectives:</Text>
        <View style={styles.listItem}>
            <Text>{this.state.courseInfo.objectives}</Text>
        </View>
          </View>
          </ScrollView>


        <Comment courseId={this.state.courseInfo._id}/>
      </ImageBackground>
    );
  }
}

export default CourseInfoScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  infoContainer: {
    height: "45%"
  },
  dashboardWrapper: {
    textAlign: "center"
  },
  userText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 0
  },
  itemHeader: {
    paddingLeft: 5
  },
  listItem: {
    padding: 5,
    marginBottom: 5,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlignVertical: "center",
    opacity: 0.8
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
    padding: 10
  }
});
