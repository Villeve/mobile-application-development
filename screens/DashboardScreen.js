import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

class DashboardScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.dashboardWrapper}>
                    <Text style={styles.userText}>
                        Hey user
                    </Text>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.logoutButtonText}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
    }
})