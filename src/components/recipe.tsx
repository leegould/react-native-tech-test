import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    ScrollView,
} from 'react-native';
import IngredientsList from './ingredients';
import MethodList from './method';
import { getImageFromMedia, formatTime } from '../utils/common';
import { Ingredients, Media, Method } from './types';

export interface Props {
    recipe: {
        cook_time: string;
        ingredients: Ingredients[];
        introduction: string;
        media: Media[];
        method: Method[];
        name: string;
        notes: string;
        prep_time: string;
        serves: string;
        tags: string[];
        total_time: string;
    };
}

export default function Recipe({ recipe }: Props) {
    const {
        cook_time,
        ingredients,
        introduction,
        media,
        method,
        name,
        notes,
        prep_time,
        serves,
        tags,
        total_time,
    } = recipe;

    const image = getImageFromMedia(media);

    return (
        <ScrollView style={styles.container}>
            {image && (
                <ImageBackground
                    resizeMode="cover"
                    source={{ uri: image.uri }}
                    style={styles.image}
                />
            )}
            {!image && (
                <ImageBackground
                    resizeMode="contain"
                    source={require('../assets/placeholder.png')}
                    style={styles.image}
                />
            )}
            <Text style={[styles.text, styles.title]}>{name}</Text>

            <View style={styles.row}>
                <View style={styles.twinRow}>
                    <Image
                        source={require('../assets/person.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.subtext}>{`${serves}`}</Text>
                </View>
                <View style={styles.twinRow}>
                    <Image
                        source={require('../assets/clock.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.subtext}>
                        {`${formatTime(total_time)}`}
                    </Text>
                </View>
            </View>

            <Text style={[styles.text, styles.tags, styles.spacing]}>
                {tags.join(', ')}
            </Text>

            <Text style={[styles.text, styles.spacing]}>{introduction}</Text>

            {notes.length > 0 && (
                <>
                    <Text style={[styles.text, styles.title]}>
                        {"Cook's Notes"}
                    </Text>
                    <Text style={styles.text}>{notes}</Text>
                </>
            )}

            <IngredientsList ingredients={ingredients[0]} />

            <View style={[styles.row, styles.spacing]}>
                <View style={[styles.twinRow, styles.margin]}>
                    <Text style={styles.subtext}>Prep</Text>
                    <Image
                        source={require('../assets/clock.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.subtext}>{formatTime(prep_time)}</Text>
                </View>
                <View style={[styles.twinRow, styles.margin]}>
                    <Text style={styles.subtext}>Cook</Text>
                    <Image
                        source={require('../assets/clock.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.subtext}>{formatTime(cook_time)}</Text>
                </View>
            </View>

            <MethodList method={method[0]} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
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
    twinRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    subtext: {
        fontSize: 14,
        lineHeight: 20,
        marginHorizontal: 5,
    },
    icon: {
        tintColor: 'grey',
        width: 20,
        height: 20,
        marginRight: 2,
    },
    spacing: {
        marginVertical: 20,
    },
    margin: {
        margin: 5,
    },
});
