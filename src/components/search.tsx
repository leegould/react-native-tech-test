import React, { useState, memo } from 'react';
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import Results from './results';

export default memo(function Search() {
    const [inputText, setInputText] = useState('');
    const [searchText, setSearchText] = useState('');

    const submit = () => {
        setSearchText(inputText);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <ImageBackground
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.headerText}>Recipe App</Text>
            </View>
            <View style={styles.searchBar}>
                <TextInput
                    onChangeText={(text) => {
                        setInputText(text);
                    }}
                    value={inputText}
                    returnKeyType="search"
                    style={styles.textInput}
                    placeholder="Search for recipes"
                    placeholderTextColor="grey"
                    selectionColor="grey"
                    underlineColorAndroid="transparent"
                    onSubmitEditing={submit}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        submit();
                    }}>
                    <Image
                        source={require('../assets/search.png')}
                        style={styles.searchIcon}
                    />
                </TouchableOpacity>
            </View>
            <Results searchText={searchText} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
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
    searchBar: {
        height: 50,
        backgroundColor: '#4e674a',
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: 'row',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    searchIcon: {
        borderRadius: 5,
        backgroundColor: '#9a1c4d',
        tintColor: '#f8f6f1',
        width: 40,
        height: 40,
    },
    textInput: {
        flex: 1,
        color: 'black',
        backgroundColor: '#f8f6f1',
        borderRadius: 5,
        fontSize: 15,
        paddingVertical: 0,
        paddingHorizontal: 10,
    },
});
