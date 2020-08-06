import React, { memo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableHighlight,
} from 'react-native';
import Result from './result';
import RecipeQuery from '../queries/recipeSearch';
import { useQuery, useApolloClient } from '@apollo/client';

export interface Props {
    searchText: string;
    onPress: (slug: string) => void;
}

export default memo(function Results({ searchText, onPress }: Props) {
    let onEndReachedCalledDuringMomentum = true;
    const pageSize = 15;
    const [page, setPage] = useState(1);

    const { loading, error, data, fetchMore, refetch } = useQuery(RecipeQuery, {
        variables: { search: searchText, page: page, page_size: pageSize },
        notifyOnNetworkStatusChange: true,
    });

    const client = useApolloClient();

    if (error) {
        console.error('Results.Error', error);
        return null;
    }

    const getMore = () => {
        if (!loading) {
            const newPage = page + 1;
            setPage(newPage);
            fetchMore({
                variables: {
                    search: searchText,
                    page: newPage,
                    page_size: pageSize,
                },
            });
        }
    };

    console.log('results', data);

    console.log('cache', client.cache.extract());

    return (
        <View style={styles.container}>
            <FlatList
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                contentContainerStyle={styles.resultsContainer}
                data={data?.recipe_search?.hits}
                extraData={page}
                onEndReachedThreshold={0.7}
                onEndReached={() => {
                    if (!onEndReachedCalledDuringMomentum) {
                        getMore();
                        onEndReachedCalledDuringMomentum = true;
                    }
                }}
                onMomentumScrollBegin={() => {
                    onEndReachedCalledDuringMomentum = false;
                }}
                renderItem={({ item }) => {
                    // console.log('rec', item.recipe.media[0]);
                    return (
                        <TouchableHighlight
                            onPress={() => {
                                console.log('open', item.recipe.slug);
                                onPress(item.recipe.slug);
                            }}>
                            <Result searchResult={item} />
                        </TouchableHighlight>
                    );
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                refreshing={loading}
                onRefresh={() => {
                    refetch();
                    setPage(1);
                }}
                keyExtractor={(item) => `${item.recipe.slug}`}
                ListHeaderComponent={() => (
                    <Text style={styles.headerText}>
                        {searchText.length > 0 && (
                            <Text>{`Searching for ${searchText}`}</Text>
                        )}
                        <View style={styles.space} />
                        {data?.recipe_search?.total_hits && (
                            <Text>{`${data.recipe_search.total_hits} matches`}</Text>
                        )}
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
        flexDirection: 'row',
    },
    placeholder: {
        fontSize: 20,
    },
    separator: {
        height: 0.5,
        backgroundColor: '#4e674a',
    },
    space: {
        marginHorizontal: 5,
    },
});
