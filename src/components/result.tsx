import React, { memo } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

export interface Props {
    searchResult: {
        recipe: {
            name: string;
            serves: string;
            total_time: string;
        };
    };
}

export default memo(function Result({ searchResult }: Props) {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/placeholder.png')}
                style={styles.image}
            />
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
                        <Text style={styles.subtext}>
                            {`${searchResult.recipe.serves}`}
                        </Text>
                    </View>
                    <View style={styles.iconPair}>
                        <Image
                            source={require('../assets/clock.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.subtext}>
                            {`${searchResult.recipe.total_time
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
    container: {
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
        backgroundColor: '#9a1c4d',
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
        marginLeft: 5,
    },
    icon: {
        tintColor: 'grey',
        width: 20,
        height: 20,
        marginRight: 2,
    },
    chevron: {
        tintColor: 'grey',
        width: 30,
        height: 30,
    },
});
