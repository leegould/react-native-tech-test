import React, { memo } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useQuery } from '@apollo/client';
import RecipeQuery from '../queries/recipe';
import HeaderModal from './headerModal';
import Recipe from './recipe';

export interface Props {
    slug: string;
    onClose: () => void;
}

export default memo(function RecipeModal({ slug, onClose }: Props) {
    const { loading, error, data } = useQuery(RecipeQuery, {
        variables: { slug },
        notifyOnNetworkStatusChange: true,
    });

    if (error) {
        console.error('Recipe.Error', error);
        return null;
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <HeaderModal onClose={onClose} />

                {loading && (
                    <View style={styles.contentContainer}>
                        <Text style={styles.text}>..Loading..</Text>
                    </View>
                )}

                {!loading && <Recipe recipe={data.recipe} />}
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
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});
