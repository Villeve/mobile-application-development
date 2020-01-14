import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  const displayEnteredGoal = goalTitle =>
    setCourseGoals(goals => [
      ...goals,
      { key: Math.random().toString(), value: goalTitle }
    ]);

  return (
    <View style={styles.screen}>
      <GoalInput onAddGoal={displayEnteredGoal} />
      <FlatList
        data={courseGoals}
        renderItem={itemData => <GoalItem title={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});

// Lecture 1
/*
    <View style={{ padding: 50 }} >
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }} >
        <TextInput placeholder="Course Goal"
          style={{
            width: '80%',
            borderBottomColor: 'black',
            borderWidth: 1,
            padding: 10
          }}
        />
        <Button title="ADD" />
      </View>
      <View>

      </View>
    </View>
    */

// Lecture 2
/*
<View style={{ padding: 50, flexDirection: 'row' }} >
      <View
        style={{
          backgroundColor: 'red',
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>
          1
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'blue',
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>
          2
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'green',
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>
          3
        </Text>
      </View>
    </View>
*/

// Lecture 3
/*
export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  const goalInputHandler = text => setEnteredGoal(text);

  const displayEnteredGoal = () =>
    setCourseGoals(goals => [
      ...goals,
      { key: Math.random().toString(), value: enteredGoal }
    ]);

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title="ADD" onPress={displayEnteredGoal} />
      </View>
      <FlatList
        data={courseGoals}
        renderItem={itemData => (
          <View style={styles.listItem}>
            <Text>{itemData.item.value}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
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
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1
  }
});
*/
