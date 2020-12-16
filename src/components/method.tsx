import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Method } from './types';

export interface Props {
    method: Method;
}

export default function MethodList({ method }: Props) {
    if (method.steps.length === 0) {
        return null;
    }

    return (
        <>
            <Text style={styles.title}>Method</Text>
            {method.steps.map((step, idx) => (
                <View key={idx}>
                    <Text style={styles.subTitle}>Step {idx + 1}</Text>
                    <Text style={styles.text}>{step}</Text>
                </View>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 18,
        fontStyle: 'italic',
        marginTop: 10,
        flexDirection: 'row',
    },
    text: {
        fontSize: 15,
        marginVertical: 5,
    },
});
