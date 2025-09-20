import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews, onEndReached }) => {
  // reviews is expected to be the full reviews connection object
  const reviewNodes = reviews ? reviews.edges.map(edge => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContent}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 8,
    backgroundColor: '#f0f0f0',
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default ReviewList;
