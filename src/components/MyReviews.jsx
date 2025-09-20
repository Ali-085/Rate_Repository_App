import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { ME } from '../GraphQl/queries';
import { DELETE_REVIEW } from '../GraphQl/mutation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
    padding: 10,
  },
  reviewContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
    borderRadius: 6,
  },
  repoName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rating: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 16,
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


const MyReviews = () => {
  const navigation = useNavigation();
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading reviews</Text>;

  const reviews = data?.me?.reviews?.edges?.map(edge => edge.node) || [];

  const handleViewRepository = (repositoryId) => {
    navigation.navigate('SingleRepository', { id: repositoryId });
  };

  const handleDeleteReview = (reviewId) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } });
              refetch();
            } catch (e) {
              Alert.alert('Error', e.message);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.repoName}>{item.repository.fullName}</Text>
      <Text style={styles.rating}>Rating: {item.rating}</Text>
      <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.text}>{item.text}</Text>
      <View style={{ flexDirection: 'row', marginTop: 12, gap: 8 }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Button
            title="View repository"
            onPress={() => handleViewRepository(item.repository.id)}
            color="#0366d6"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="Delete review"
            onPress={() => handleDeleteReview(item.id)}
            color="#d73a4a"
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No reviews found.</Text>}
      />
    </View>
  );
};

export default MyReviews;
