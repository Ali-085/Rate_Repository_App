import React from 'react';
import { View, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import ReviewForm from './ReviewForm';
import { CREATE_REVIEW } from '../GraphQl/mutation';


const ReviewFormScreen = () => {
  const navigation = useNavigation();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values, formikHelpers) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });
      formikHelpers.resetForm();
      if (data?.createReview?.repositoryId) {
        navigation.navigate('SingleRepository', { id: data.createReview.repositoryId });
      } else {
        Alert.alert('Success', 'Review created!');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View>
      <ReviewForm onSubmit={onSubmit} />
    </View>
  );
};

export default ReviewFormScreen;
