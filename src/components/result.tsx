import React, { memo } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

interface SearchResult {
    recipe: {
        name: string;
        serves: string;
        total_time: string;
    };
}

export default memo(function Result({
    searchResult,
}: {
    searchResult: SearchResult;
}) {
    return (
        <View style={styles.resultRowContainer}>
            <View>
                <ImageBackground style={styles.image} />
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={[styles.descriptionRow, styles.name]}>
                    {searchResult.recipe.name}
                </Text>
                <View style={styles.descriptionRow}>
                    <View style={styles.iconPair}>
                        <Image
                            source={require('../assets/person.png')}
                            style={styles.icon}
                        />
                        <Text
                            style={
                                styles.subtext
                            }>{` ${searchResult.recipe.serves}`}</Text>
                    </View>
                    <View style={styles.iconPair}>
                        <Image
                            source={require('../assets/clock.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.subtext}>
                            {` ${searchResult.recipe.total_time
                                .replace('PT', '')
                                .replace('H', 'H ')}`}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <Image
                    source={require('../assets/chevron.png')}
                    style={styles.chevron}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    resultRowContainer: {
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    descriptionContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    actionContainer: {
        justifyContent: 'center',
    },
    descriptionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
    },
    separator: {
        height: 0.5,
        backgroundColor: '#4e674a',
    },
    image: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    iconPair: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subtext: {
        fontSize: 14,
        lineHeight: 20,
    },
    icon: {
        tintColor: 'grey',
        width: 20,
        height: 20,
        marginRight: 2,
    },
    chevron: {
        width: 30,
        height: 30,
    },
});
