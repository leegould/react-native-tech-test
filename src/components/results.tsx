import React, { memo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Result from './result';

const results = require('./test_results.json');

export default memo(function Results({ searchText }: { searchText: string }) {
    return (
        <View style={styles.container}>
            <FlatList
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                contentContainerStyle={styles.resultsContainer}
                data={results.data.recipe_search.hits}
                renderItem={({ item }) => {
                    // console.log('rec', item.recipe.media[0]);
                    return <Result searchResult={item} />;
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                // refreshing={loading}
                // onRefresh={() => { refetch(); }}
                keyExtractor={(item) => `${item.recipe.slug}`}
                ListHeaderComponent={() => (
                    <Text style={styles.headerText}>
                        {`Searching for ${searchText} - ${results.data.recipe_search.total_hits} matches`}
                    </Text>
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.placeholder}>No matches found</Text>
                )}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f6f1',
        paddingBottom: 70,
    },
    resultsContainer: {
        flexGrow: 1,
        backgroundColor: '#f8f6f1',
    },
    headerText: {
        textAlign: 'center',
        padding: 5,
        fontSize: 10,
        paddingHorizontal: 20,
    },
    placeholder: {
        fontSize: 20,
    },
    separator: {
        height: 0.5,
        backgroundColor: '#4e674a',
    },
});
