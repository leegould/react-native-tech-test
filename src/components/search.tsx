import React, { useState, memo } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';
import Header from './header';
import Results from './results';
import Recipe from './recipe';

export default memo(function Search() {
    const [inputText, setInputText] = useState('');
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [slug, setSlug] = useState('');

    const submit = () => {
        setSearchText(inputText);
    };

    const openModal = (aSlug: string) => {
        setSlug(aSlug);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Header />
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
            <Results
                searchText={searchText}
                onPress={(aSlug) => openModal(aSlug)}
            />
            <Modal
                animationType="slide"
                visible={modalVisible}
                supportedOrientations={['landscape', 'portrait']}>
                <Recipe slug={slug} onClose={closeModal} />
            </Modal>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
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
