import React, { useState, useEffect } from "react";
import { View, Button, TextInput, StyleSheet, Modal, Text, FlatList, TouchableOpacity, AsyncStorage } from "react-native";
import axios from "axios";

const Comment = props => {
    const [ enteredComment, setEnteredComment] = useState("");
    const [ role, setRole] = useState("0");
    const [ username, setUsername] = useState("");
    const [ comments, setComments] = useState([])
    const textAdded = text => setEnteredComment(text)

    useEffect(() => {
        setUserNameAndType()
        fetchComments()
    }, []);

    const setUserNameAndType = async () => {
        const role = await AsyncStorage.getItem("role");
        const username = await AsyncStorage.getItem("name");
        setUsername(username)
        setRole(userTroleype)
    }

    const fetchComments = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
        const headers = {
          Authorization: "Bearer " + token
        };
            const res = await axios({
                method: "GET",
                url: "https://mobile-app-backend-uva.herokuapp.com/api/comments/" + props.courseId,
                headers: headers
            })
            setComments(res.data)
        } catch(error) {
            console.warn(error);
            setComments([])
            alert("Error While fetching data");
        }

        /*
        axios({
          method: "GET",
          url: "https://mobile-app-backend-uva.herokuapp.com/api/comments/" + props.courseId,
          headers: headers
        })
          .then(res => {
            setComments(res.data)
          })
          .catch(error => {
            console.warn(error);
            setComments([])
            alert("Error While fetching data");
          });
          */
    }
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
                fetchComments()
            })
            .catch(error => {
                console.warn(error);
                alert("Error while adding new comment");
            });
    }
    const removeCourse = async (commentId) => {
        const token = await AsyncStorage.getItem("token");
        const headers = {
          Authorization: "Bearer " + token
        };
        axios({
          method: "DELETE",
          url: "https://mobile-app-backend-uva.herokuapp.com/api/comments/" + commentId,
          headers: headers
        })
        .then(res => {
            fetchComments()
          })
          .catch(error => {
            console.warn(error);
            alert("Error While Removing Comment");
          });
      }
      /*
      const displayButton = async (postedBy) => {
        const username = await AsyncStorage.getItem("name");
        const role = await AsyncStorage.getItem("role");
        return username
        
        console.log(postedBy, username, typeof(username), typeof(postedBy), role, typeof(role))
        if("Ville V" === postedBy) {
            console.log("XXX")
            return true
        }
        else {
            return false
        }
        
      }
      */
  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Add comment"
                style={styles.input}
                onChangeText={textAdded}
                value={enteredComment}
            />
        <Button title="ADD" onPress={addComment}/>
       </View>
        <FlatList
            data={comments}
            keyExtractor={item => item._id}
            renderItem={itemData => (
            <View>
            <Text>{itemData.item.postedBy} {itemData.item.date.substring(0, 10)}</Text>
                <Text>{itemData.item.content}</Text>
                {(itemData.item.postedBy === username || role === "1") && <Button title="Remove" onPress={() => removeCourse(itemData.item._id)} />}
            </View>
            )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        height: "30%",
        alignItems: "center",
        justifyContent: "center"
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

export default Comment;
