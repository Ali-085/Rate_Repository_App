import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReviewItem = ({ review }) => {
  const { user, rating, createdAt, text } = review;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <View style={styles.container} testID="reviewItem">
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ratingContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rating: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: '#586069',
    marginBottom: 8,
  },
  text: {
    color: '#24292e',
  },
});

export default ReviewItem;
