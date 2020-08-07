import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ingredients } from './types';

export interface Props {
    ingredients: Ingredients;
}

export default memo(function IngredientsList({ ingredients }: Props) {
    const separator = <View style={styles.separator} />;

    if (ingredients.ingredients.length === 0) {
        return null;
    }

    return (
        <>
            <Text style={styles.title}>Ingredients</Text>
            {ingredients.ingredients.map((ingredient) => (
                <View key={ingredient}>
                    {separator}
                    <Text style={styles.text}>{ingredient}</Text>
                </View>
            ))}
            {separator}
        </>
    );
});

const styles = StyleSheet.create({
    separator: {
        height: 0.5,
        backgroundColor: '#4e674a',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
    },
    text: {
        fontSize: 15,
        marginVertical: 5,
    },
});
