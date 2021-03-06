import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';

const Comment = props => {
  const [enteredComment, setEnteredComment] = useState("");
  const [role, setRole] = useState("0");
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const textAdded = text => setEnteredComment(text);

  useEffect(() => {
    setUserNameAndType();
    fetchComments();
  }, []);

  const setUserNameAndType = async () => {
    const role = await AsyncStorage.getItem("role");
    const username = await AsyncStorage.getItem("name");
    setUsername(username);
    setRole(role);
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
      setLoading(false);
    } catch (error) {
      console.warn(error);
      setComments([]);
      alert("Error While fetching data");
    }
  };
  const addComment = async () => {
    setLoading(true);
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
        setEnteredComment("");
        fetchComments();
      })
      .catch(error => {
        console.warn(error);
        alert("Error while adding new comment");
      });
  };
  const removeComment = async commentId => {
    setLoading(true);
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
      <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add comment"
          style={styles.input}
          onChangeText={textAdded}
          value={enteredComment}
        />
      </View>
      <Button title="Send" onPress={addComment} />
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
                  onPress={() => removeComment(itemData.item._id)}
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
  spinnerTextStyle: {
    color: '#FFF'
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
    opacity: 0.8
  },
  newCommentButton: {
    marginTop: 5,
    backgroundColor: "white",
    opacity: 0.9
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
