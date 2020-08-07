import React, { memo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableHighlight,
} from 'react-native';
import { useQuery } from '@apollo/client';
import Result from './result';
import SearchQuery from '../queries/recipeSearch';

export interface Props {
    searchText: string;
    onPress: (slug: string) => void;
}

export default memo(function Results({ searchText, onPress }: Props) {
    let onEndReachedCalledDuringMomentum = true;
    const pageSize = 15;
    const [page, setPage] = useState(1);

    const { loading, error, data, fetchMore, refetch } = useQuery(SearchQuery, {
        variables: { search: searchText, page: page, page_size: pageSize },
        notifyOnNetworkStatusChange: true,
    });

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
                    return (
                        <TouchableHighlight
                            onPress={() => {
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
                    <View style={styles.placeholderContainer}>
                        {!loading && (
                            <Text style={styles.placeholder}>
                                No matches found
                            </Text>
                        )}
                    </View>
                )}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f6f1',
    },
    resultsContainer: {
        backgroundColor: '#f8f6f1',
    },
    headerText: {
        textAlign: 'center',
        padding: 5,
        fontSize: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    placeholderContainer: {
        paddingVertical: 50,
    },
    placeholder: {
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 20,
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
