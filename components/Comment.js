import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import axios from "axios";

const Comment = props => {
  const [enteredComment, setEnteredComment] = useState("");
  const [role, setRole] = useState("0");
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState([]);
  const textAdded = text => setEnteredComment(text);

  useEffect(() => {
    setUserNameAndType();
    fetchComments();
  }, []);

  const setUserNameAndType = async () => {
    const role = await AsyncStorage.getItem("role");
    const username = await AsyncStorage.getItem("name");
    setUsername(username);
    setRole(userTroleype);
  };

  const fetchComments = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token
      };
      const res = await axios({
        method: "GET",
        url:
          "https://mobile-app-backend-uva.herokuapp.com/api/comments/" +
          props.courseId,
        headers: headers
      });
      setComments(res.data);
    } catch (error) {
      console.warn(error);
      setComments([]);
      alert("Error While fetching data");
    }
  };
  const addComment = async () => {
    const username = await AsyncStorage.getItem("name");
    const token = await AsyncStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token
    };

    const req = {
      content: enteredComment,
      postedBy: username,
      courseId: props.courseId
    };
    axios({
      method: "POST",
      url: "https://mobile-app-backend-uva.herokuapp.com/api/comments",
      data: req,
      headers: headers
    })
      .then(res => {
        fetchComments();
      })
      .catch(error => {
        console.warn(error);
        alert("Error while adding new comment");
      });
  };
  const removeCourse = async commentId => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token
    };
    axios({
      method: "DELETE",
      url:
        "https://mobile-app-backend-uva.herokuapp.com/api/comments/" +
        commentId,
      headers: headers
    })
      .then(res => {
        fetchComments();
      })
      .catch(error => {
        console.warn(error);
        alert("Error While Removing Comment");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add comment"
          style={styles.input}
          onChangeText={textAdded}
          value={enteredComment}
        />
      </View>
      <Button title="ADD" onPress={addComment} />
      <FlatList
        style={styles.newCommentButton}
        data={comments}
        keyExtractor={item => item._id}
        renderItem={itemData => (
          <View style={styles.commentItems}>
            <Text style={styles.commentHeader}>
              {itemData.item.postedBy} ({itemData.item.date.substring(0, 10)}):
            </Text>
            <Text> {itemData.item.content}</Text>
            {(itemData.item.postedBy === username || role === "1") && (
              <TouchableOpacity style={styles.removeButton}>
                <Text
                  style={styles.removeButtonText}
                  onPress={() => removeCourse(itemData.item._id)}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "55%"
  },
  inputContainer: {
    flexDirection: "row"
  },
  input: {
    width: "100%",
    borderBottomColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    backgroundColor: "white",
    opacity:0.7
  },
  newCommentButton: {
    marginTop: 5,
    backgroundColor: "white",
    opacity: 0.75
  },
  commentItems: {
    marginVertical: 5
  },
  commentHeader: {
    paddingLeft: 5,
    fontSize: 12,
    color: "grey"
  },
  removeButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    width: 70
  },
  removeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }
});

export default Comment;
