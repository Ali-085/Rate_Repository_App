import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem';
import ReviewList from './ReviewList';
import { GET_REPOSITORY } from '../GraphQl/queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
    padding: 10,
  },
  button: {
    marginTop: 16,
  },
});


const REVIEWS_PAGE_SIZE = 5;

const SingleRepositoryView = () => {
  const route = useRoute();
  const { id } = route.params;
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: REVIEWS_PAGE_SIZE },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return null;
  if (error) return <View><Text>Error loading repository</Text></View>;
  if (!data?.repository) return null;

  const handleOpenGitHub = () => {
    Linking.openURL(data.repository.url);
  };

  const handleFetchMore = () => {
    const { pageInfo } = data.repository.reviews;
    if (!pageInfo.hasNextPage) return;
    fetchMore({
      variables: {
        id,
        after: pageInfo.endCursor,
        first: REVIEWS_PAGE_SIZE,
      },
    });
  };

  return (
    <View style={styles.container}>
      <RepositoryItem repository={data.repository} showGitHubButton />
      <View style={styles.button}>
        <Button title="Open in GitHub" onPress={handleOpenGitHub} />
      </View>
      {data.repository.reviews && (
        <ReviewList
          reviews={data.repository.reviews}
          onEndReached={handleFetchMore}
        />
      )}
    </View>
  );
};

export default SingleRepositoryView;
