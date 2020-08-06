import React, { memo } from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';

export default memo(function Header() {
    return (
        <View style={styles.headerContainer}>
            <ImageBackground
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.headerText}>Recipe App</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#4e674a',
        paddingHorizontal: 20,
    },
    logo: {
        width: 180,
        height: 38,
        marginHorizontal: 10,
    },
    headerText: {
        fontSize: 25,
        color: 'white',
    },
});
