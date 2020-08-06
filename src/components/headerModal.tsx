import React, { memo } from 'react';
import {
    ImageBackground,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
} from 'react-native';

export default memo(function HeaderModal({ onClose }: { onClose: () => void }) {
    return (
        <View style={styles.headerContainer}>
            <ImageBackground
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
            <TouchableHighlight onPress={onClose}>
                <Image
                    source={require('../assets/close.png')}
                    style={styles.close}
                />
            </TouchableHighlight>
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
    close: {
        tintColor: '#f8f6f1',
        width: 30,
        height: 30,
    },
});
