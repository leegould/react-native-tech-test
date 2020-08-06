import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    SafeAreaView,
    Image,
    ScrollView,
} from 'react-native';
import HeaderModal from './headerModal';
import Ingredients from './ingredients';

export interface Props {
    slug: string;
    onClose: () => void;
}

export default memo(function Recipe({ slug, onClose }: Props) {
    const result = require('./test_recipe.json');

    console.log('slug', slug);

    const {
        data: {
            recipe: {
                // cook_time,
                ingredients,
                introduction,
                // media,
                // method,
                name,
                notes,
                // prep_time,
                serves,
                tags,
                total_time,
            },
        },
    } = result;

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <HeaderModal onClose={onClose} />

                <ScrollView style={styles.contentContainer}>
                    <ImageBackground
                        resizeMode="contain"
                        source={require('../assets/placeholder.png')}
                        style={styles.image}
                    />
                    <Text style={[styles.text, styles.title]}>{name}</Text>

                    <View style={styles.row}>
                        <View style={styles.iconPair}>
                            <Image
                                source={require('../assets/person.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.subtext}>{`${serves}`}</Text>
                        </View>
                        <View style={styles.iconPair}>
                            <Image
                                source={require('../assets/clock.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.subtext}>
                                {`${total_time
                                    .replace('PT', '')
                                    .replace('H', 'H ')}`}
                            </Text>
                        </View>
                    </View>

                    <Text style={[styles.text, styles.tags]}>
                        {tags.join(', ')}
                    </Text>

                    <Text style={styles.text}>{introduction}</Text>

                    {notes.length > 0 && (
                        <>
                            <Text style={[styles.text, styles.title]}>
                                {"Cook's Notes"}
                            </Text>
                            <Text style={styles.text}>{notes}</Text>
                        </>
                    )}

                    <Ingredients ingredients={ingredients[0]} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#4e674a',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#f8f6f1',
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    image: {
        height: 120,
        backgroundColor: '#9a1c4d',
        marginVertical: 10,
    },
    text: {
        fontSize: 15,
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    tags: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        backgroundColor: '#4e674a',
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconPair: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
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
});
