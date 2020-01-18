import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

class LoginScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.formWrapper}>
                    <Text style={styles.title}>
                        Welcome to the great University App
                    </Text>
                    <View style={styles.formRow}>
                        <TextInput style={styles.textInput} placeholder="Enter Username" placeholderTextColor="#333" />
                    </View>
                    <View style={styles.formRow}>
                        <TextInput style={styles.textInput} placeholder="Enter Password" placeholderTextColor="#333" secureTextEntry={true} />
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    formWrapper: {
        width: "80%"   
    },
    formRow: {
        marginBottom: 10
    },
    textInput: {
        backgroundColor: "#ddd",
        height: 40,
        paddingHorizontal: 10
    },
    title: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 28,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "green",
        paddingVertical: 10
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold"
    }
})