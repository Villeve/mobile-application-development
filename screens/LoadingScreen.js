import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

class LoadingScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        )
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
})