import React from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required('Repository owner name is required'),
  repositoryName: Yup.string().required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: Yup.string(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Repository owner name"
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            value={values.ownerName}
            testID="ownerNameInput"
          />
          {touched.ownerName && errors.ownerName && <Text style={styles.error}>{errors.ownerName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Repository name"
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
            testID="repositoryNameInput"
          />
          {touched.repositoryName && errors.repositoryName && <Text style={styles.error}>{errors.repositoryName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Rating between 0 and 100"
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
            keyboardType="numeric"
            testID="ratingInput"
          />
          {touched.rating && errors.rating && <Text style={styles.error}>{errors.rating}</Text>}

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Review"
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
            multiline
            numberOfLines={4}
            testID="reviewInput"
          />
          {touched.text && errors.text && <Text style={styles.error}>{errors.text}</Text>}

          <Button onPress={handleSubmit} title="Create a review" testID="submitButton" disabled={isSubmitting} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default ReviewForm;
