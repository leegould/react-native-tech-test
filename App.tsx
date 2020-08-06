/**
 * Riverford Test App
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Search from './src/components/search';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                recipe_search: {
                    keyArgs: ['q'],
                    merge(existing, incoming) {
                        console.log('merge', existing, incoming);
                        if (!existing) {
                            return incoming;
                        }
                        return {
                            __typename: 'RecipeSearchResult',
                            total_hits: existing.total_hits,
                            hits: [...existing.hits, ...incoming.hits],
                        };
                    },
                },
            },
        },
    },
});

const client = new ApolloClient({
    uri: 'https://next.riverford.co.uk/graphql',
    cache,
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <Search />
            </SafeAreaView>
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4e674a',
    },
});
